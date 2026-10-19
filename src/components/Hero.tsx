import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode, ChangeEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Compass, ExternalLink, FileText, Mail, MapPin, Paperclip, Route, Upload, X } from 'lucide-react';

type Destination = 'amerique' | 'europe';
type Panel = 'approche' | 'prestations' | 'faq' | 'contact' | null;

const VIDEO_URL = 'https://pollen-batch-41236914.figma.site/_components/v2/f0ee2dae7671c170c34f12e31c4cb41418976c98/769c564298c132f7919405cd9f17c1b1231f341d.769c5642.mp4';
const DESTINATIONS: Record<Destination, { brand: string; location: string; heading: string; teaser: string; image: string; email: string; example: string; coordinates: string }> = {
  amerique: {
    brand: 'AmericaTravel', location: 'AMÉRIQUE DU NORD', heading: 'L’appel des grands espaces.', teaser: 'Routes infinies, paysages grandioses et échappées qui marquent une vie.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=960&q=85',
    email: 'americatravel57000@gmail.com',
    example: 'J’imagine 12 jours dans l’Ouest américain, entre routes mythiques, petits motels de charme et grands espaces. Un itinéraire à notre rythme, loin des circuits classiques…',
    coordinates: '37° N — 112° W'
  },
  europe: {
    brand: 'EuropaTravel', location: 'EUROPE', heading: 'La beauté au détour du chemin.', teaser: 'Villages singuliers, adresses confidentielles et liberté de prendre son temps.',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=960&q=85',
    email: 'contact@europatravel.fr',
    example: 'Je rêve de 10 jours en Italie, avec de beaux villages, des tables locales, des étapes à taille humaine et un carnet de voyage pour ne rien manquer…',
    coordinates: '43° N — 11° E'
  }
};
const OFFERS: Record<Destination, [string,string,string][]> = {
  amerique: [['Travel Flash', '4 jours · jusqu’à 4 personnes', '65 €'], ['Travel Vibration', '5 à 7 jours · jusqu’à 4 personnes', '129 €'], ['Travel Odyssée', '8 à 10 jours · jusqu’à 4 personnes', '189 €'], ['Ultimate Road Trip', '11 à 21 jours · jusqu’à 4 personnes', '249 €']],
  europe: [['Escapade Express', '4 jours · jusqu’à 4 personnes', '65 €'], ['Grand Horizon', '5 à 10 jours · jusqu’à 4 personnes', '155 €'], ['Odyssée Road Trip', '11 à 21 jours · jusqu’à 4 personnes', '245 €'], ['Escale Romantique', 'Jusqu’à 21 jours · pour 2 personnes', '345 €']]
};

function NavButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="nav-link relative cursor-pointer border-none bg-transparent font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-wandor-text transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4">{children}</button>;
}

function DestinationTile({ destination, selected, onSelect }: { destination: Destination; selected: boolean; onSelect: (value:Destination) => void }) {
  const item = DESTINATIONS[destination];
  return (
    <button type="button" onClick={() => onSelect(destination)} aria-pressed={selected} className={'destination-tile group relative flex min-w-0 items-center overflow-hidden rounded-[18px] text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ' + (selected ? 'destination-tile-selected' : '')}>
      <img src={item.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <span className="absolute inset-0 bg-gradient-to-r from-[#101b19]/85 via-[#13251f]/55 to-[#101b19]/15" />
      <span className="absolute left-4 top-3 hidden text-[9px] font-semibold tracking-[.2em] text-white/65 sm:block">{item.coordinates}</span>
      <span className="relative z-10 flex w-full items-end justify-between gap-2 px-5 pb-4 pt-7 sm:px-6 sm:pb-5 sm:pt-10">
        <span className="min-w-0">
          <span className="mb-1 block text-[9px] font-semibold tracking-[.18em] text-white/80">{item.location}</span>
          <span className="brand-tile-title block truncate text-[20px] font-semibold tracking-[-.04em] text-white sm:text-[25px]">{item.brand}</span>
        </span>
        <span className="tile-arrow grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:bg-white group-hover:text-carnet-forest">
          {selected ? <Check size={17} strokeWidth={2} /> : <ArrowUpRight size={18} strokeWidth={1.7}/>}
        </span>
      </span>
    </button>
  );
}

export default function Hero() {
  const [destination, setDestination] = useState<Destination>('amerique');
  const [prompt, setPrompt] = useState(DESTINATIONS.amerique.example);
  const [edited, setEdited] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [formError, setFormError] = useState('');
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [offerDestination, setOfferDestination] = useState<Destination>('amerique');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const current = DESTINATIONS[destination];

  function chooseDestination(next:Destination) {
    setDestination(next);
    setFormError('');
    if (!edited || prompt === DESTINATIONS[destination].example) {
      setPrompt(DESTINATIONS[next].example);
      setEdited(false);
    }
  }
  function openPanel(next:Exclude<Panel,null>) {
    setPanel(next);
    setFormError('');
    if (next === 'prestations') setOfferDestination(destination);
  }
  function makeInquiry(event?:FormEvent) {
    event?.preventDefault();
    if (!prompt.trim()) {
      setFormError('Décrivez en quelques mots le voyage dont vous rêvez.');
      document.getElementById('travel-prompt')?.focus();
      return;
    }
    openPanel('contact');
  }
  function onFileChange(event:ChangeEvent<HTMLInputElement>) {
    const candidate = event.currentTarget.files?.[0];
    if (!candidate) return;
    const valid = candidate.type.startsWith('image/') || candidate.type === 'application/pdf' || /\.pdf$/i.test(candidate.name);
    if (!valid || candidate.size > 10 * 1024 * 1024) {
      setFileError('Choisissez une image ou un PDF de moins de 10 Mo.');
      event.currentTarget.value = '';
      return;
    }
    setFile(candidate);
    setFileError('');
  }
  function removeFile() {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) videoRef.current?.pause();
    const change = () => { if (media.matches) videoRef.current?.pause(); else videoRef.current?.play().catch(() => undefined); };
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    if (!panel) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => modalRef.current?.querySelector<HTMLButtonElement>('button[data-close]')?.focus(), 0);
    function keyListener(event:KeyboardEvent) {
      if (event.key === 'Escape') { setPanel(null); return; }
      if (event.key !== 'Tab' || !modalRef.current) return;
      const focusables = Array.from(modalRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', keyListener);
    return () => { document.body.style.overflow = previous; window.clearTimeout(focusTimer); document.removeEventListener('keydown', keyListener); };
  }, [panel]);

  const emailSubject = encodeURIComponent('Demande de voyage sur mesure — ' + current.brand);
  const emailBody = encodeURIComponent([
    'Bonjour Maurice,',
    '',
    'Je souhaiterais être accompagné(e) pour organiser un voyage en ' + (destination === 'amerique' ? 'Amérique du Nord.' : 'Europe.'),
    '',
    'Voici mon projet :', prompt.trim(), '',
    'Merci de me recontacter pour un premier échange.', '', 'Cordialement,'
  ].join('\n'));
  const emailHref = 'mailto:' + current.email + '?subject=' + emailSubject + '&body=' + emailBody;

  return (
    <section className="travel-hero relative min-h-svh w-full overflow-hidden" aria-label="Carnets & Horizons : votre prochain voyage sur mesure">
      <div className="absolute inset-0 z-0 bg-[#d6d9cf]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=85')" }} aria-hidden="true" />
        {!videoError && <video ref={videoRef} className={'absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ' + (videoReady ? 'opacity-100' : 'opacity-0')} src={VIDEO_URL} autoPlay muted loop playsInline preload="metadata" poster="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=85" onLoadedData={() => setVideoReady(true)} onError={() => setVideoError(true)} aria-hidden="true"/>}
        <div className="absolute inset-0 bg-[#122e29]/[0.04]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[687px]" style={{ background:'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[340px]" style={{ background:'linear-gradient(0deg, rgba(15,30,25,.72) 0%, rgba(22,36,31,.05) 100%)' }} />

      <div className="relative z-[2] mx-auto flex min-h-svh max-w-[1450px] flex-col">
        <header className="relative z-30">
          <nav className="relative flex items-center justify-between gap-4 px-6 pb-4 pt-5 md:px-10 md:pt-7 xl:px-20" aria-label="Navigation principale">
            <a href="#accueil" className="flex min-w-0 flex-col gap-0.5 text-wandor-dark no-underline transition-opacity hover:opacity-60" aria-label="Carnets et Horizons, accueil">
              <span className="font-display text-[27px] leading-none tracking-[-.055em] max-[390px]:text-[23px] md:text-[34px]">carnets <span className="relative top-[-2px] text-carnet-earth">&</span> horizons</span>
              <span className="pl-[2px] text-[8px] font-semibold uppercase tracking-[.23em] text-carnet-forest/65 md:text-[9px]">AmericaTravel · EuropaTravel</span>
            </a>
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
              <NavButton onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior:'smooth', block:'nearest' })}>Destinations</NavButton>
              <NavButton onClick={() => openPanel('approche')}>Notre approche</NavButton>
              <NavButton onClick={() => openPanel('prestations')}>Prestations</NavButton>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              <button type="button" onClick={() => openPanel('faq')} className="hidden bg-transparent text-[12px] font-semibold uppercase tracking-[.09em] text-[#292929] transition-opacity hover:opacity-55 xl:block">Questions fréquentes</button>
              <button type="button" onClick={() => makeInquiry()} className="group inline-flex items-center gap-2 rounded-full bg-wandor-dark px-4 py-3 text-[10px] font-semibold uppercase tracking-[.04em] text-[#fafafa] shadow-sm transition-all hover:bg-carnet-forest active:scale-95 sm:px-5 sm:py-3.5 sm:text-[12px]">Mon projet <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button>
            </div>
          </nav>
        </header>

        <main id="accueil" className="flex flex-1 flex-col items-center px-6 pb-8 pt-[42px] text-center sm:pt-12 md:pt-14 lg:pb-9">
          <div className="hero-intro mx-auto flex w-full flex-col items-center">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.22em] text-carnet-forest/75 sm:text-[11px]"><span className="h-px w-6 bg-carnet-earth/70 sm:w-9" />LE VOYAGE, AUTREMENT<span className="h-px w-6 bg-carnet-earth/70 sm:w-9" /></div>
            <h1 className="hero-heading mt-5 max-w-[900px] font-sans text-[clamp(40px,6vw,78px)] font-medium leading-[1.06] tracking-[-.062em] text-wandor-text">Et si votre prochain voyage<br className="hidden min-[570px]:block" /> <span className="headline-emphasis">ne ressemblait qu'à vous ?</span></h1>
            <p className="mt-5 max-w-[605px] text-[15px] font-medium leading-[1.75] text-[#4e5953] sm:text-[17px]">De l’Amérique du Nord à l’Europe, un seul regard : le vôtre. Je conçois votre itinéraire sur mesure. Vous vivez l’aventure, librement.</p>
            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-medium tracking-[.04em] text-carnet-forest/70"><Compass size={13} strokeWidth={1.8} aria-hidden="true"/><span>Organisateur de voyages indépendant · Premier échange gratuit</span></div>
          </div>
          <div className="relative mx-auto mt-7 w-[701px] max-w-[calc(100vw-36px)] sm:mt-9 sm:max-w-[calc(100vw-48px)]">
            <div className="glass-orbit pointer-events-none absolute -inset-[8px] rounded-[51px] border border-white/25" />
            <form onSubmit={makeInquiry} className="liquid-card relative min-h-[240px] w-full overflow-hidden rounded-[34px] border-[3px] border-white bg-white/[0.06] text-left shadow-liquid backdrop-blur-[20px] sm:min-h-[234px] sm:rounded-[44px]">
              <div className="absolute left-[22px] right-[22px] top-[18px] flex items-center justify-between sm:left-[29px] sm:right-[29px] sm:top-[19px]">
                <label htmlFor="travel-prompt" className="text-[9px] font-bold uppercase tracking-[.17em] text-carnet-forest/80 sm:text-[10px]">Votre prochaine aventure commence ici</label>
                <span className="hidden items-center gap-1 text-[10px] font-semibold text-carnet-forest/60 sm:inline-flex"><MapPin size={12}/> Sur mesure</span>
              </div>
              <textarea id="travel-prompt" aria-label="Décrivez votre projet de voyage" maxLength={800} value={prompt} onChange={(event) => { setPrompt(event.target.value); setEdited(true); setFormError(''); }} className="glass-textarea absolute left-[22px] right-[22px] top-[52px] h-[105px] w-[calc(100%-44px)] resize-none border-none bg-transparent px-0 text-[15px] font-medium leading-[1.6] text-wandor-prompt placeholder:text-carnet-earth/75 focus:outline-none focus:ring-0 sm:left-[29px] sm:right-[29px] sm:top-[56px] sm:h-[95px] sm:w-[calc(100%-58px)] sm:text-[18px]" placeholder="Racontez-moi votre prochain voyage…"/>
              <div className="absolute bottom-[18px] left-[18px] flex items-center gap-2 sm:bottom-[20px] sm:left-[21px]">
                <input ref={fileInputRef} id="inspiration-upload" type="file" accept="image/*,.pdf" className="hidden" onChange={onFileChange} aria-label="Ajouter une inspiration"/>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/15 backdrop-blur-[14px] transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2" aria-label="Ajouter une image ou un PDF d'inspiration" title="Ajouter une inspiration (locale)"><Upload className="h-[18px] w-[18px] shrink-0 text-wandor-text" strokeWidth={1.7}/></button>
                {file ? <span className="flex max-w-[150px] items-center gap-1 rounded-full bg-white/60 px-2 py-2 text-[10px] font-semibold text-carnet-forest sm:max-w-[240px]"><Paperclip size={12} className="shrink-0"/><span className="truncate">{file.name}</span><button type="button" onClick={removeFile} aria-label="Retirer le fichier" className="ml-1 rounded-full p-0.5 hover:bg-white/80"><X size={12}/></button></span> : <span className="hidden max-w-[210px] text-[10px] font-medium text-carnet-forest/75 sm:inline">Ajouter une inspiration <span className="opacity-60">· Photo ou PDF</span></span>}
              </div>
              <button type="submit" className="glass-submit absolute bottom-[18px] right-[18px] flex h-14 min-w-[150px] items-center justify-center gap-3 rounded-full border-none bg-wandor-dark px-5 text-[12px] font-semibold uppercase tracking-[.035em] text-[#fafafa] shadow-[0_0_2px_rgba(0,0,0,.05)] transition-all hover:bg-carnet-forest active:scale-95 sm:bottom-[20px] sm:right-[21px] sm:min-w-[186px] sm:text-[13px]">Imaginer mon voyage <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true"/></button>
            </form>
            {(fileError || formError) && <p role="alert" className="mt-2 rounded-md bg-white/85 px-4 py-2 text-left text-xs font-semibold text-[#883b2e]">{fileError || formError}</p>}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[10px] font-medium text-[#263e35]/75 sm:text-[11px]">
              <span className="inline-flex items-center gap-1.5"><Check size={13} strokeWidth={2}/> 100 % sur mesure</span>
              <span className="inline-flex items-center gap-1.5"><Check size={13} strokeWidth={2}/> Réservations en direct</span>
              <span className="inline-flex items-center gap-1.5"><Check size={13} strokeWidth={2}/> Sans commission cachée</span>
            </div>
          </div>

          <div className="mt-auto w-full max-w-[1200px] pt-8 sm:pt-10 lg:pt-14" id="destinations">
            <div className="mb-3 flex items-center justify-between gap-3 text-left text-white sm:mb-4">
              <div className="flex items-center gap-3"><span className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/85 sm:text-[10px]">Deux univers, un même savoir-faire</span><span className="hidden h-px w-12 bg-white/60 sm:block"/></div>
              <span className="hidden items-center gap-1.5 text-[10px] font-medium text-white/80 sm:inline-flex">Choisissez votre horizon <ChevronDown size={14}/></span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <DestinationTile destination="amerique" selected={destination === 'amerique'} onSelect={chooseDestination}/>
              <DestinationTile destination="europe" selected={destination === 'europe'} onSelect={chooseDestination}/>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-left text-[9px] font-medium uppercase tracking-[.08em] text-white/85 sm:text-[10px]">
              <span>Une signature commune · Deux expertises</span>
              <button type="button" onClick={() => openPanel('approche')} className="inline-flex items-center gap-1 transition-opacity hover:opacity-65">Découvrir ma méthode <ArrowRight size={14}/></button>
            </div>
          </div>
        </main>
      </div>

      {panel && <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-7">
        <div className="absolute inset-0 bg-[#101c17]/70 backdrop-blur-[9px]" onClick={() => setPanel(null)}/>
        <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="panel-title" className="panel-enter relative z-[1] max-h-[min(90svh,780px)] w-full max-w-[680px] overflow-y-auto rounded-[28px] border border-[#fff9] bg-[#f6f2e9] p-6 text-left text-wandor-text shadow-[0_30px_100px_rgba(0,0,0,.25)] sm:rounded-[35px] sm:p-10">
          <div className="mb-7 flex items-start justify-between gap-3">
            <div><span className="text-[10px] font-bold uppercase tracking-[.19em] text-carnet-earth">CARNETS & HORIZONS</span><h2 id="panel-title" className="mt-2 text-[30px] font-medium leading-[1.1] tracking-[-.06em] sm:text-[40px]">{panel === 'approche' ? 'Le voyage, à votre image.' : panel === 'prestations' ? 'La liberté de choisir.' : panel === 'faq' ? 'Tout ce qu’il faut savoir.' : 'Votre histoire commence ici.'}</h2></div>
            <button type="button" data-close onClick={() => setPanel(null)} aria-label="Fermer la fenêtre" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#213b31]/20 bg-white/75 transition-all hover:rotate-90 hover:bg-white"><X size={19}/></button>
          </div>

          {panel === 'approche' && <div>
            <p className="mb-7 max-w-[540px] text-[14px] leading-[1.8] text-[#596960]">Maurice est Travel Planner : il recherche, organise et dessine vos voyages sur mesure, sans vendre directement billets d'avion, nuits d'hôtel ou activités.</p>
            <div className="space-y-3">
              {[
                ['01','On échange','Vos envies, votre budget, vos dates et votre rythme : tout commence par une première discussion gratuite.'],
                ['02','Je compose votre carnet','Je prépare itinéraires, transports, hébergements et belles adresses selon votre projet.'],
                ['03','Vous gardez la main','Vous réservez et payez directement chaque prestation auprès des fournisseurs retenus.']
              ].map(([num,title,detail]) => <div key={num} className="flex gap-4 rounded-2xl border border-[#244236]/10 bg-white/55 px-5 py-4"><span className="text-[11px] font-bold tracking-widest text-carnet-earth">{num}</span><div><h3 className="mb-1 text-[16px] font-semibold">{title}</h3><p className="mb-0 text-[13px] leading-[1.7] text-[#58665e]">{detail}</p></div></div>)}
            </div>
            <button type="button" onClick={() => setPanel('contact')} className="panel-primary mt-6">Parlons de votre projet <ArrowUpRight size={17}/></button>
          </div>}

          {panel === 'prestations' && <div>
            <p className="mb-5 text-[13px] leading-[1.7] text-[#58665e]">Un accompagnement personnalisé, facturé indépendamment de votre voyage. Tarifs indicatifs repris des sites actuels, à confirmer avec le professionnel.</p>
            <div className="mb-5 flex gap-2">{(['amerique','europe'] as Destination[]).map(item => <button type="button" key={item} onClick={() => setOfferDestination(item)} className={'rounded-full px-4 py-2.5 text-[11px] font-semibold transition-all ' + (offerDestination === item ? 'bg-carnet-forest text-white' : 'border border-[#213b31]/15 bg-white/80 text-carnet-forest hover:bg-white')}>{DESTINATIONS[item].brand}</button>)}</div>
            <div className="space-y-2">{OFFERS[offerDestination].map(([title,detail,price]) => <div key={title} className="flex items-center justify-between gap-4 rounded-xl border border-[#284b3f]/10 bg-white/70 px-4 py-3.5"><div><h3 className="m-0 text-[14px] font-semibold">{title}</h3><p className="m-0 mt-1 text-[11px] text-[#647168]">{detail}</p></div><span className="shrink-0 text-[16px] font-semibold text-carnet-forest">{price}</span></div>)}</div>
            <p className="mt-4 text-[11px] leading-[1.65] text-[#6a766c]">Ces tarifs concernent la conception et l'accompagnement ; transport, hébergement et activités restent à réserver directement par le voyageur. Des conditions particulières peuvent s'appliquer.</p>
            <button type="button" onClick={() => { chooseDestination(offerDestination); setPanel('contact'); }} className="panel-primary mt-3">Parlons de votre projet <ArrowUpRight size={17}/></button>
          </div>}

          {panel === 'faq' && <div className="space-y-3">{[
            ['Êtes-vous une agence de voyages ?','Non. Maurice est organisateur de voyages indépendant : il conseille et construit des itinéraires personnalisés, mais ne vend pas directement les vols, hébergements ou activités.'],
            ['Qui effectue les réservations ?','Vous effectuez et payez vous-même les réservations auprès des prestataires, à partir des recherches et liens transmis.'],
            ['Le premier échange est-il payant ?','Non, un premier échange permet de comprendre le projet, sans engagement.'],
            ['Le carnet de voyage est-il prévu ?','Oui, les offres existantes proposent un carnet de voyage selon les prestations retenues et des options complémentaires.'],
            ['Peut-on voyager au-delà de ces deux régions ?','La maquette est consacrée aux deux univers demandés. D’autres destinations peuvent être discutées avec le professionnel.']
          ].map(([q,a]) => <details key={q} className="faq-item group rounded-2xl border border-[#244236]/10 bg-white/65 px-5 py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-semibold">{q}<ChevronDown size={17} className="shrink-0 transition-transform group-open:rotate-180"/></summary><p className="mb-0 mt-3 text-[13px] leading-[1.75] text-[#58665e]">{a}</p></details>)}</div>}

          {panel === 'contact' && <div>
            <div className="mb-5 flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-2 rounded-full border border-[#213b31]/15 bg-white/65 px-3 py-1.5 text-[10px] font-semibold tracking-[.12em] text-[#315044]"><MapPin size={12}/>{current.location}</span><span className="inline-flex items-center gap-2 rounded-full border border-[#213b31]/15 bg-white/65 px-3 py-1.5 text-[10px] font-semibold tracking-[.12em] text-[#315044]"><FileText size={12}/>Premier échange gratuit</span></div>
            <div className="rounded-2xl border border-[#244236]/10 bg-white/70 p-5"><span className="text-[10px] font-bold uppercase tracking-[.15em] text-carnet-earth">Votre projet</span><p className="mb-0 mt-3 whitespace-pre-wrap text-[14px] leading-[1.8] text-[#243c31]">{prompt.trim()}</p></div>
            <p className="mt-4 text-[12px] leading-[1.8] text-[#57685e]">La maquette ne génère pas automatiquement d’itinéraire. Le bouton ci-dessous ouvre votre messagerie avec un message préparé pour {current.brand} : vous choisissez ensuite si vous souhaitez l’envoyer.</p>
            {file && <p className="text-[11px] font-medium text-[#82613f]">Votre fichier « {file.name} » est resté sur votre appareil : il n’est pas joint automatiquement à l’e-mail.</p>}
            <a href={emailHref} className="panel-primary mt-5" onClick={() => setPanel(null)}>Ouvrir mon e-mail préparé <Mail size={17}/></a>
            <a className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-carnet-forest underline underline-offset-4 transition-opacity hover:opacity-55" href={destination === 'amerique' ? 'https://americatravel.fr/' : 'https://europatravel.fr/'} target="_blank" rel="noopener noreferrer">Voir le site actuel {current.brand} <ExternalLink size={13}/></a>
          </div>}

          <div className="mt-8 flex items-center justify-between gap-2 border-t border-[#244236]/15 pt-5 text-[10px] text-[#748078]"><span>Maquette de présentation · Identité provisoire</span><span className="inline-flex items-center gap-1 text-carnet-forest"><Route size={13}/> AmericaTravel × EuropaTravel</span></div>
        </div>
      </div>}
      <div className="sr-only" aria-live="polite">{current.heading} {current.teaser}</div>
      <div className="absolute right-5 top-[50%] z-[2] hidden items-center gap-2 text-[10px] font-medium uppercase tracking-[.13em] text-[#213b31]/60 2xl:flex" style={{writingMode:'vertical-rl'}} aria-hidden="true"><ArrowDown size={16}/> EXPLORE MORE · EST. 2026</div>
    </section>
  );
}
