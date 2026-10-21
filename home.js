(() => {
  'use strict';
  const art = document.querySelector('.home-hero-visual');
  const small = document.querySelector('.hero-photo-small');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const precise = matchMedia('(pointer:fine)');
  if (!art || !small || !precise.matches || motion.matches) return;
  let animation = 0;
  art.addEventListener('pointermove', (event) => {
    if (animation) return;
    const rect = art.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    animation = requestAnimationFrame(() => {
      small.style.transform = 'translate3d(' + (x * 7).toFixed(2) + 'px,' + (y * 6).toFixed(2) + 'px,0) rotate(-7deg)';
      animation = 0;
    });
  });
  art.addEventListener('pointerleave', () => { small.style.transform = ''; });
})();
