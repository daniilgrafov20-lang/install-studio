// init.js — lightweight module for:
// - smooth internal scroll on rAF (no external lib)
// - hero parallax (rAF, lerp) — smooth, no jank
// - progress bar smoothing
// - header scrolled state
// - mobile menu toggle
(() => {
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));

  const header = qs('[data-header]');
  const progress = qs('.progress-bar');
  const menuToggle = qs('.menu-toggle');
  const mobileMenu = qs('[data-mobile-menu]');
  const links = qsa('[data-scroll-to]');

  // PARAMETERS
  const state = {
    scrollY: window.scrollY || 0,
    targetY: window.scrollY || 0,
    lerp: 0.12, // smoothness for visuals
  };

  // Smooth scroll for internal anchors (rAF-driven)
  function smoothScrollTo(targetY, duration = 650) {
    const start = window.scrollY;
    const delta = targetY - start;
    const startTime = performance.now();
    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      window.scrollTo(0, Math.round(start + delta * eased));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Intercept internal link clicks
  links.forEach(a => {
    a.addEventListener('click', (e) => {
      const selector = a.getAttribute('data-scroll-to') || a.getAttribute('href');
      if (!selector || !selector.startsWith('#')) return;
      e.preventDefault();
      // close mobile menu if open
      toggleMobile(false);
      const target = qs(selector);
      if (!target) return;
      // ensure section does not hide under header by using scroll-margin-top in CSS
      // compute final position manually to be safer
      const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 76;
      const rect = target.getBoundingClientRect();
      const offset = window.scrollY + rect.top - headerHeight - 8; // small gap
      smoothScrollTo(offset);
    });
  });

  // Mobile menu toggle
  function toggleMobile(open) {
    const isOpen = mobileMenu.classList.contains('open');
    const shouldOpen = (typeof open === 'boolean') ? open : !isOpen;
    mobileMenu.classList.toggle('open', shouldOpen);
    menuToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  }
  if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleMobile());
  }

  // Parallax and progress: use rAF and lerp for smoothing
  let lastScroll = window.scrollY;
  function onScroll() {
    state.targetY = window.scrollY;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  const heroBg = qs('.hero-bg');
  const headlightL = qs('.headlight-left');
  const headlightR = qs('.headlight-right');

  function lerp(a,b,t){ return a + (b-a)*t; }

  function rafLoop() {
    // smooth scroll value
    state.scrollY = lerp(state.scrollY, state.targetY, state.lerp);

    // header scrolled class (instant threshold)
    if (state.targetY > 40) header.classList.add('scrolled'); else header.classList.remove('scrolled');

    // progress bar (compute from raw targetY for responsiveness but animate width)
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (state.targetY / docH) : 0;
    progress.style.width = `${(pct*100).toFixed(3)}%`;

    // hero parallax: gentle movement proportional to scroll, clamped
    if (heroBg) {
      const max = 40; // max px translate
      const translate = Math.max(-max, Math.min(max, -state.scrollY * 0.12));
      heroBg.style.transform = `translateY(${translate}px)`;
    }
    // headlights subtle opposite movement to create depth
    if (headlightL) headlightL.style.transform = `translateX(${Math.max(-40, Math.min(40, state.scrollY * 0.05))}px)`;
    if (headlightR) headlightR.style.transform = `translateX(${Math.max(-40, Math.min(40, -state.scrollY * 0.05))}px)`;

    requestAnimationFrame(rafLoop);
  }
  requestAnimationFrame(rafLoop);

  // Resize: ensure CSS variable for header-height set on :root for dynamic header heights
  function syncHeaderHeight() {
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', `${Math.ceil(h)}px`);
    // apply scroll-margin-top for all sections (safety for browsers)
    document.querySelectorAll('section[id]').forEach(s => s.style.scrollMarginTop = `calc(var(--header-height) + 8px)`);
  }
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('load', syncHeaderHeight);
  syncHeaderHeight();

  // Accessibility: close mobile menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMobile(false);
  });

  // initial log
  console.log('init.js ready — smooth scrolling, hero parallax and progress bar initialized');
})();
