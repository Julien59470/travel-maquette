(() => {
  'use strict';
  const header = document.querySelector('.page-header');
  const toggle = document.getElementById('mobile-menu-toggle');
  const mobile = document.getElementById('mobile-links');
  const links = mobile ? [...mobile.querySelectorAll('a')] : [];
  function onScroll() { header?.classList.toggle('is-sticky', window.scrollY > 45); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  function closeMenu() {
    if (!toggle || !mobile) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir la navigation');
    toggle.textContent = '☰';
    mobile.classList.remove('open');
  }
  toggle?.addEventListener('click', () => {
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Fermer la navigation' : 'Ouvrir la navigation');
    toggle.textContent = opening ? '×' : '☰';
    mobile?.classList.toggle('open', opening);
  });
  links.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if(event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if(window.innerWidth > 900) closeMenu(); });
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    const observer = new IntersectionObserver((entries, self) => {
      for (const entry of entries) if(entry.isIntersecting) { entry.target.classList.add('visible'); self.unobserve(entry.target); }
    }, { threshold: .06, rootMargin: '0px 0px -22px 0px' });
    document.querySelectorAll('.fade-in').forEach(node => observer.observe(node));
  } else document.querySelectorAll('.fade-in').forEach(node => node.classList.add('visible'));

  const tabs = [...document.querySelectorAll('[data-offer-tab]')];
  const panels = [...document.querySelectorAll('[data-offer-panel]')];
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const active = tab.getAttribute('data-offer-tab');
    tabs.forEach(item => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.getAttribute('data-offer-panel') !== active; });
  }));
  document.querySelector('.offer-switch')?.addEventListener('keydown', event => {
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key) || !tabs.length) return;
    event.preventDefault();
    const index = tabs.indexOf(document.activeElement);
    let target = 0;
    if(event.key === 'Home') target=0;
    else if(event.key === 'End') target=tabs.length-1;
    else target=(index + (event.key==='ArrowRight'?1:-1) + tabs.length)%tabs.length;
    tabs[target].click();
    tabs[target].focus();
  });

  const form = document.getElementById('trip-form');
  if(form) {
    const message = document.getElementById('form-status');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const required = ['prenom','email','destination','projet'];
      const invalid = required.find(name => !String(data.get(name) || '').trim());
      if(invalid) {
        message.textContent='Veuillez compléter les champs obligatoires.';
        form.elements.namedItem(invalid)?.focus();
        return;
      }
      const emailField = form.elements.namedItem('email');
      if(emailField && !emailField.checkValidity()){
        message.textContent='Votre adresse e-mail semble invalide.';
        emailField.focus();
        return;
      }
      const target = data.get('destination') === 'amerique' ? 'americatravel57000@gmail.com' :
        data.get('destination') === 'europe' ? 'contact@europatravel.fr' : 'americatravel57000@gmail.com';
      const name = String(data.get('prenom')).trim();
      const mail = String(data.get('email')).trim();
      const dest = String(data.get('destination'));
      const dates = String(data.get('dates') || 'Non précisées').trim();
      const budget = String(data.get('budget') || 'Non précisé').trim();
      const people = String(data.get('voyageurs') || 'Non précisé').trim();
      const project = String(data.get('projet')).trim();
      const subject = encodeURIComponent('Demande de voyage sur mesure — ' + (dest === 'amerique' ? 'AmericaTravel' : dest === 'europe' ? 'EuropaTravel' : 'EurAmerica Travel'));
      const body = encodeURIComponent([
        'Bonjour Maurice,', '',
        'Je vous contacte depuis la maquette de votre futur site.', '',
        'Prénom : ' + name, 'E-mail : ' + mail, 'Destination : ' + (dest === 'amerique' ? 'Amérique du Nord' : dest === 'europe' ? 'Europe' : 'À définir'),
        'Période : ' + dates, 'Voyageurs : ' + people, 'Budget : ' + budget,
        '', 'Mon projet :', project, '', 'Merci pour votre retour.'
      ].join('\n'));
      message.style.color='#315d43';
      message.textContent='Un brouillon va s’ouvrir dans votre messagerie. Aucune donnée n’a été envoyée par le site.';
      window.location.href='mailto:'+target+'?subject='+subject+'&body='+body;
    });
  }
})();
