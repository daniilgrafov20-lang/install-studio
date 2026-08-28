// GSAP ScrollTrigger Animations

export function initGsapAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // ============ HERO TITLE REVEAL ============
  const heroLines = document.querySelectorAll('.hero-line');
  heroLines.forEach((line, index) => {
    gsap.from(line, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power3.out'
    });
  });

  // ============ HERO SUBTITLE & CTA ============
  gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out'
  });

  gsap.from('.hero-cta', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.6,
    ease: 'power3.out'
  });

  // ============ SCROLL INDICATOR ANIMATION ============
  gsap.to('.scroll-line', {
    y: 10,
    opacity: 0,
    duration: 1,
    repeat: -1,
    ease: 'power2.inOut'
  });

  // ============ INTRO SECTION ============
  gsap.from('.intro-content', {
    scrollTrigger: {
      trigger: '.intro',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -50,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.intro-image', {
    scrollTrigger: {
      trigger: '.intro',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 50,
    duration: 0.8,
    ease: 'power3.out'
  });

  // ============ BEFORE/AFTER PARALLAX ============
  gsap.to('.before-img', {
    scrollTrigger: {
      trigger: '.before-after-section',
      start: 'top center',
      scrub: 1
    },
    yPercent: -5,
    ease: 'power1.inOut'
  });

  gsap.to('.after-img', {
    scrollTrigger: {
      trigger: '.before-after-section',
      start: 'top center',
      scrub: 1
    },
    yPercent: 5,
    ease: 'power1.inOut'
  });

  // ============ PROJECT CARDS STAGGER ============
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out'
  });

  // ============ REVIEWS STAGGER ============
  gsap.from('.review-card', {
    scrollTrigger: {
      trigger: '.reviews-grid',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out'
  });

  // ============ SERVICES ACCORDION REVEAL ============
  gsap.from('.accordion-item', {
    scrollTrigger: {
      trigger: '.services-accordion',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -30,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power3.out'
  });

  // ============ CONTACT SECTION ============
  gsap.from('.contact-title', {
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.lead-form', {
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.1,
    ease: 'power3.out'
  });

  gsap.from('.contact-info', {
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 30,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
  });

  console.log('✅ GSAP animations initialized');
}
