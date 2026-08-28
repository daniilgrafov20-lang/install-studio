// Before/After Interactive Slider

export function initBeforeAfter() {
  const sliders = document.querySelectorAll('[data-slider]');
  
  sliders.forEach(slider => {
    const wrapper = slider.querySelector('.before-after-wrapper');
    const afterOverlay = slider.querySelector('.after-overlay');
    const handle = slider.querySelector('[data-handle]');
    let isActive = false;

    function updateSlider(e) {
      if (!isActive && e.type !== 'click' && e.type !== 'touchstart') return;

      const rect = wrapper.getBoundingClientRect();
      let x;

      if (e.type.startsWith('touch')) {
        x = e.touches[0].clientX - rect.left;
      } else {
        x = e.clientX - rect.left;
      }

      x = Math.max(0, Math.min(x, rect.width));
      const percentage = (x / rect.width) * 100;

      afterOverlay.style.width = percentage + '%';
      handle.style.left = percentage + '%';
    }

    // Mouse events
    handle.addEventListener('mousedown', () => {
      isActive = true;
    });

    document.addEventListener('mousemove', (e) => {
      if (isActive) updateSlider(e);
    });

    document.addEventListener('mouseup', () => {
      isActive = false;
    });

    // Touch events
    handle.addEventListener('touchstart', () => {
      isActive = true;
    });

    document.addEventListener('touchmove', (e) => {
      if (isActive) updateSlider(e);
    });

    document.addEventListener('touchend', () => {
      isActive = false;
    });

    // Click anywhere on slider
    wrapper.addEventListener('click', updateSlider);

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        const current = parseFloat(afterOverlay.style.width) || 50;
        afterOverlay.style.width = Math.max(0, current - 5) + '%';
        handle.style.left = Math.max(0, current - 5) + '%';
      }
      if (e.key === 'ArrowRight') {
        const current = parseFloat(afterOverlay.style.width) || 50;
        afterOverlay.style.width = Math.min(100, current + 5) + '%';
        handle.style.left = Math.min(100, current + 5) + '%';
      }
    });
  });

  console.log('✅ Before/After slider initialized');
}
