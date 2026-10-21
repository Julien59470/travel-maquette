#!/usr/bin/env python3
"""Build a self-hosted, optimized photograph collection for GitHub Pages.

All sources were individually curated from the source photo pages and are
documented in photos.json. Only Unsplash images marked free under their
Unsplash License are included; credits remain available in photos.json.
"""
from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen
import json
import re
import time

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_site" / "assets" / "photos"
PHOTOS = json.loads((ROOT / "photos.json").read_text(encoding="utf-8"))


def fetch(item: tuple[str, dict]) -> tuple[str, int]:
    name, spec = item
    if not re.fullmatch(r"[a-z0-9-]+", name):
        raise ValueError(f"Invalid image key: {name}")
    ident = spec["id"]
    if not re.fullmatch(r"photo-\d{13}-[a-f0-9]{12}", ident):
        raise ValueError(f"Invalid Unsplash ID: {ident}")
    size = int(spec["w"])
    quality = int(spec["q"])
    if not 400 <= size <= 2000 or not 55 <= quality <= 90:
        raise ValueError(f"Invalid image optimization settings: {name}")
    url = "https://images.unsplash.com/" + ident + "?" + urlencode(
        {"fm": "webp", "fit": "max", "w": size, "q": quality}
    )
    target = OUT / (name + ".webp")
    OUT.mkdir(parents=True, exist_ok=True)
    if target.exists() and target.stat().st_size > 2048:
        return name, target.stat().st_size

    last_error = None
    for attempt in range(3):
        try:
            request = Request(url, headers={
                "User-Agent": "Mozilla/5.0 EurAmericaTravel/1.0 (static demo image build)",
                "Accept": "image/webp,image/*;q=0.8",
            })
            with urlopen(request, timeout=35) as response:
                mime = response.headers.get("content-type", "")
                content = response.read(4_000_001)
                if len(content) > 4_000_000:
                    raise ValueError(f"Image too heavy (>4 MB) {name}")
                if "image/" not in mime:
                    raise ValueError(f"Not an image {name}: HTTP {response.status} {mime}")
                if len(content) < 2048 or content[:4] != b"RIFF" or content[8:12] != b"WEBP":
                    raise ValueError(f"Invalid WebP output from Unsplash for {name}: {content[:16]!r}")
                target.write_bytes(content)
                return name, len(content)
        except Exception as error:
            last_error = error
            if attempt < 2:
                time.sleep((attempt + 1) * 2)
    raise RuntimeError(f"Cannot fetch {name}: {last_error}")


def main() -> None:
    if len(PHOTOS) != len(set(PHOTOS)):
        raise ValueError("Duplicate photo manifest key")
    size = 0
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = [pool.submit(fetch, item) for item in PHOTOS.items()]
        for future in as_completed(futures):
            name, count = future.result()
            size += count
            print(f"{name}: {count / 1024:.0f} KiB", flush=True)
    print(f"Ready: {len(PHOTOS)} optimized, self-hosted WebP images / {size / 1048576:.2f} MiB total", flush=True)


if __name__ == "__main__":
    main()
