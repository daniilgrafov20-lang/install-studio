// Main app.js - Core functionality

import { initGsapAnimations } from './gsap-animations.js';
import { initBeforeAfter } from './before-after.js';
import { initLightbox } from './lightbox.js';

// ============ PROGRESS BAR ============
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector('.progress-bar').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateProgressBar);

// ============ HEADER BLUR ON SCROLL ============
function handleHeaderScroll() {
  const header = document.querySelector('[data-header]');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll);

// ============ SMOOTH SCROLL TO SECTION ============
document.querySelectorAll('[data-scroll-to]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.target.getAttribute('data-scroll-to');
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============ LOAD PROJECTS ============
async function loadProjects() {
  try {
    const response = await fetch('/api/data/projects');
    const projects = await response.json();
    renderProjects(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

function renderProjects(projects) {
  const grid = document.querySelector('[data-projects-grid]');
  if (!grid) return;

  grid.innerHTML = projects.map((project, index) => {
    const isFullWidth = index === 0;
    const isColSpan = index === 1;
    
    return `
      <div class="project-card ${isFullWidth ? 'full-width' : ''} ${isColSpan ? 'col-2' : ''}" data-project-id="${project.id}" data-gallery='${JSON.stringify(project.gallery)}'>
        <img class="project-image" src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="project-overlay">
          <p class="project-category">${project.category}</p>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
        </div>
      </div>
    `;
  }).join('');

  // Add click handlers to open lightbox
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const gallery = JSON.parse(card.getAttribute('data-gallery'));
      window.lightboxGallery = gallery;
      window.currentImageIndex = 0;
      openLightbox();
    });
  });
}

// ============ LOAD SERVICES ============
async function loadServices() {
  try {
    const response = await fetch('/api/data/services');
    const services = await response.json();
    renderServices(services);
  } catch (error) {
    console.error('Error loading services:', error);
  }
}

function renderServices(services) {
  const accordion = document.querySelector('[data-accordion]');
  if (!accordion) return;

  accordion.innerHTML = services.map((service) => `
    <div class="accordion-item" data-service-id="${service.id}">
      <div class="accordion-header">
        <div class="accordion-title">
          <span class="accordion-icon">${service.icon}</span>
          <span>${service.name}</span>
        </div>
        <span class="accordion-toggle">▼</span>
      </div>
      <div class="accordion-body">
        <div class="accordion-content">
          <div class="accordion-subsection">
            <h4>ПРО ПОСЛУГУ</h4>
            <p>${service.about}</p>
          </div>
          <div class="accordion-subsection">
            <h4>КОМУ ПІДХОДИТЬ</h4>
            <p>${service.target}</p>
          </div>
          <div class="accordion-subsection">
            <h4>РЕЗУЛЬТАТ</h4>
            <p>${service.result}</p>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Add accordion toggle handlers
  accordion.querySelectorAll('.accordion-item').forEach(item => {
    item.querySelector('.accordion-header').addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordion.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

// ============ LOAD REVIEWS ============
async function loadReviews() {
  try {
    const response = await fetch('/api/data/reviews');
    const reviews = await response.json();
    renderReviews(reviews);
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
}

function renderReviews(reviews) {
  const grid = document.querySelector('[data-reviews]');
  if (!grid) return;

  grid.innerHTML = reviews.map(review => `
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(review.rating)}</div>
      <p class="review-text">"${review.text}"</p>
      <p class="review-author">${review.name}</p>
      <p class="review-car">${review.car}</p>
    </div>
  `).join('');
}

// ============ FORM HANDLING ============
function initFormHandler() {
  const form = document.querySelector('[data-form]');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    const isValid = validateForm();
    if (!isValid) return;

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        showMessage(result.message, 'success');
        form.reset();
        clearErrors();
      } else {
        showMessage('Помилка при надіслані запиту. Спробуйте ще раз.', 'error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showMessage('Помилка. Спробуйте пізніше.', 'error');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

function validateForm() {
  clearErrors();
  const inputs = document.querySelectorAll('[data-input]');
  let isValid = true;

  inputs.forEach(input => {
    const value = input.value.trim();
    const name = input.getAttribute('name');
    const errorEl = document.querySelector(`[data-error="${name}"]`);

    if (name === 'name') {
      if (value.length < 2) {
        showError(input, 'Ім\'я повинно мати мінімум 2 символи');
        isValid = false;
      }
    }

    if (name === 'phone') {
      const phoneRegex = /^\+?380\d{9}$/;
      if (!phoneRegex.test(value.replace(/\D/g, ''))) {
        showError(input, 'Невірний номер телефону');
        isValid = false;
      }
    }

    if (name === 'service') {
      if (!value) {
        showError(input, 'Виберіть послугу');
        isValid = false;
      }
    }
  });

  return isValid;
}

function showError(input, message) {
  input.parentElement.classList.add('error');
  const errorEl = input.parentElement.querySelector('.form-error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
  }
}

function clearErrors() {
  document.querySelectorAll('.form-group.error').forEach(group => {
    group.classList.remove('error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) {
      errorEl.classList.remove('show');
      errorEl.textContent = '';
    }
  });
}

function showMessage(message, type) {
  const messageEl = document.querySelector('[data-message]');
  if (!messageEl) return;
  messageEl.textContent = message;
  messageEl.className = `form-message ${type}`;
  setTimeout(() => {
    messageEl.textContent = '';
    messageEl.className = 'form-message';
  }, 5000);
}

// ============ PHONE MASK ============
function initPhoneMask() {
  const phoneInput = document.querySelector('input[name="phone"]');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('380')) {
      value = value.substring(2);
    }
    if (value.length > 9) {
      value = value.substring(0, 9);
    }
    if (value.length > 0) {
      e.target.value = '+380 (' + value.substring(0, 2) + ') ' + value.substring(2, 5) + '-' + value.substring(5, 7) + '-' + value.substring(7);
    }
  });
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 InStall Studio - Loading...');
  
  // Load data
  loadProjects();
  loadServices();
  loadReviews();
  
  // Initialize components
  initFormHandler();
  initPhoneMask();
  initGsapAnimations();
  initBeforeAfter();
  initLightbox();
  
  console.log('✅ All components loaded');
});

// Export for lightbox
window.openLightbox = () => {
  document.querySelector('[data-lightbox]').classList.add('active');
  document.body.classList.add('lightbox-open');
};
