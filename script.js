/* Carnets & Horizons — interactions légères sans dépendances */
(() => {
  "use strict";
  const header = document.getElementById("site-header");
  const indicator = document.getElementById("scroll-indicator");
  const nav = document.getElementById("primary-nav");
  const toggle = document.getElementById("menu-toggle");
  const filters = [...document.querySelectorAll(".offer-filter")];
  const panels = [...document.querySelectorAll(".offer-panel")];
  const toast = document.getElementById("toast");

  let scheduled = false;
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      const scrolled = window.scrollY > 60;
      header.classList.toggle("scrolled", scrolled);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      indicator.style.width = (height > 0 ? (window.scrollY / height) * 100 : 0) + "%";
      scheduled = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    document.body.classList.remove("menu-open");
  }
  toggle.addEventListener("click", () => {
    const next = toggle.getAttribute("aria-expanded") !== "true";
    nav.classList.toggle("open", next);
    toggle.setAttribute("aria-expanded", String(next));
    toggle.setAttribute("aria-label", next ? "Fermer le menu" : "Ouvrir le menu");
    document.body.classList.toggle("menu-open", next);
  });
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, current) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        current.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -35px 0px", threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
  } else {
    document.querySelectorAll(".reveal").forEach((node) => node.classList.add("visible"));
  }

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const target = filter.dataset.offer;
      filters.forEach((button) => {
        const active = button === filter;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      panels.forEach((panel) => {
        const active = panel.dataset.panel === target;
        panel.hidden = !active;
        panel.classList.toggle("active", active);
      });
    });
  });

  const form = document.getElementById("demo-form");
  const feedback = document.getElementById("form-feedback");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll("[required]")];
    for (const field of fields) {
      if (!field.value.trim() || !field.checkValidity()) {
        field.focus();
        feedback.textContent = "Complétez les champs obligatoires avec des informations valides.";
        return;
      }
    }
    feedback.textContent = "Simulation réussie : le formulaire final sera connecté après validation du projet. Aucune donnée n'a été envoyée.";
    toast.textContent = "Mode démonstration : aucune donnée transmise.";
    toast.classList.add("visible");
    window.setTimeout(() => toast.classList.remove("visible"), 4500);
  });
})();
