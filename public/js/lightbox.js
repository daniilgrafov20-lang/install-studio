// Lightbox Gallery Engine

export function initLightbox() {
  const lightbox = document.querySelector('[data-lightbox]');
  const closeBtn = document.querySelector('[data-close-lightbox]');
  const prevBtn = document.querySelector('[data-prev-image]');
  const nextBtn = document.querySelector('[data-next-image]');
  const image = document.querySelector('.lightbox-image');
  const currentCounter = document.querySelector('.lightbox-counter .current');
  const totalCounter = document.querySelector('.lightbox-counter .total');

  if (!lightbox) return;

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
  }

  // Navigate to image
  function goToImage(index) {
    if (!window.lightboxGallery) return;
    window.currentImageIndex = Math.max(0, Math.min(index, window.lightboxGallery.length - 1));
    image.src = window.lightboxGallery[window.currentImageIndex];
    currentCounter.textContent = window.currentImageIndex + 1;
    totalCounter.textContent = window.lightboxGallery.length;
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => goToImage(window.currentImageIndex - 1));
  nextBtn.addEventListener('click', () => goToImage(window.currentImageIndex + 1));

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToImage(window.currentImageIndex - 1);
    if (e.key === 'ArrowRight') goToImage(window.currentImageIndex + 1);
  });

  console.log('✅ Lightbox initialized');
}
