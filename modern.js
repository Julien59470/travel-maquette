/* Progressive interaction enhancements. Core navigation/content work without JS. */
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js-motion');

  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.append(progress);

  const isContact = document.body.classList.contains('page-contact');
  let cta = null;
  if (!isContact) {
    cta = document.createElement('a');
    cta.href = 'contact.html';
    cta.className = 'mobile-cta';
    cta.setAttribute('aria-label','Décrire mon projet de voyage, premier échange gratuit');
    cta.innerHTML = '<span>Décrire mon voyage <span class="cta-note">· 1er échange gratuit</span></span><span aria-hidden="true">↗</span>';
    document.body.append(cta);
  }

  const footer = document.querySelector('.site-footer');
  const finalCta = document.querySelector('.home-conversion, .cta-section');
  let obscured = false;
  if ('IntersectionObserver' in window && cta) {
    const visibility = new IntersectionObserver(entries => {
      for(const e of entries) {
        if (e.isIntersecting) obscured = true;
        else if ([footer, finalCta].filter(Boolean).includes(e.target)) {
          const visibles = [footer, finalCta].filter(Boolean)
            .some(node => node.getBoundingClientRect().top < innerHeight && node.getBoundingClientRect().bottom > 0);
          obscured = visibles;
        }
      }
      updateScroll();
    }, {threshold:0.01});
    if(footer) visibility.observe(footer);
    if(finalCta) visibility.observe(finalCta);
  }

  let queued = false;
  function updateScroll() {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const fraction = max > 0 ? Math.min(1,Math.max(0,window.scrollY / max)) : 0;
    progress.style.transform = 'scaleX(' + fraction + ')';
    if (cta) {
      const visible = window.innerWidth <= 650 && window.scrollY > Math.min(650,window.innerHeight*.72) && !obscured;
      cta.classList.toggle('is-visible',visible);
      cta.tabIndex = visible ? 0 : -1;
    }
    queued = false;
  }
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(updateScroll);
  },{passive:true});
  window.addEventListener('resize',updateScroll,{passive:true});
  updateScroll();

  // Respect existing deep links. On the contact page, preselect an origin
  // without filling or submitting personal data.
  if (isContact) {
    const params = new URLSearchParams(location.search);
    const desired = params.get('destination');
    if (desired === 'amerique' || desired === 'europe') {
      const select = document.querySelector('select[name="destination"]');
      if (select) select.value = desired;
    }
  }
})();
