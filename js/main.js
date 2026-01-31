/**
 * Guardian Roofing & Siding - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initThemeToggle();
  initMobileNav();
  initStickyHeader();
  initScrollReveal();
  initFaqAccordion();
  initSmoothScroll();
  initFormValidation();
  initGalleryLightbox();
});

/**
 * Theme Toggle (Dark/Light Mode)
 */
function initThemeToggle() {
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
  
  // Handle toggle clicks
  const toggleButtons = document.querySelectorAll('.theme-toggle');
  toggleButtons.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Announce change for accessibility
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Switched to ${newTheme} mode`;
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
    });
  });
}

// Helper to get current theme
function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navOverlay = document.querySelector('.nav-overlay');
  
  if (!navToggle || !mainNav) return;
  
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    navOverlay?.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
  });
  
  navOverlay?.addEventListener('click', () => {
    mainNav.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Close menu when clicking a link
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      navOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Sticky Header with Shadow on Scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for shadow effect
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length === 0) return;
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 100;
      
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('revealed');
      }
    });
  };
  
  // Initial check
  revealOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', revealOnScroll, { passive: true });
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Form Validation
 */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        // Remove previous error
        field.classList.remove('error');
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
        
        // Check if empty
        if (!field.value.trim()) {
          isValid = false;
          showError(field, 'This field is required');
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            isValid = false;
            showError(field, 'Please enter a valid email');
          }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value.trim()) {
          const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
          if (!phoneRegex.test(field.value)) {
            isValid = false;
            showError(field, 'Please enter a valid phone number');
          }
        }
      });
      
      if (isValid) {
        // Submit form via AJAX if it has an action URL
        const formAction = form.getAttribute('action');
        if (formAction && formAction.includes('formspree.io')) {
          submitFormspree(form, formAction);
        } else {
          showFormSuccess(form);
        }
      }
    });
  });

  async function submitFormspree(form, action) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const formData = new FormData(form);
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showFormSuccess(form);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      alert('There was a problem sending your message. Please call us at 855-424-5911 or try again later.');
    }
  }

  function showError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 0.25rem;';
    field.parentNode.appendChild(errorDiv);
  }
  
  function showFormSuccess(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" style="margin-bottom: 1rem;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
        <h3 style="color: #28a745; margin-bottom: 0.5rem;">Thank You!</h3>
        <p style="color: #6c757d;">We've received your message and will contact you within 24 hours.</p>
      </div>
    `;
    
    form.style.display = 'none';
    form.parentNode.insertBefore(successDiv, form.nextSibling);
  }
}

/**
 * Gallery Lightbox
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox]');
  if (galleryItems.length === 0) return;
  
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-prev">&#8249;</button>
      <button class="lightbox-next">&#8250;</button>
      <img src="" alt="">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);
  
  // Add lightbox styles
  const styles = document.createElement('style');
  styles.textContent = `
    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .lightbox.active {
      display: flex;
    }
    .lightbox-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.9);
    }
    .lightbox-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
    }
    .lightbox-content img {
      max-width: 100%;
      max-height: 85vh;
      border-radius: 4px;
    }
    .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
    }
    .lightbox-prev,
    .lightbox-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      font-size: 2rem;
      padding: 1rem;
      cursor: pointer;
      border-radius: 4px;
    }
    .lightbox-prev { left: -60px; }
    .lightbox-next { right: -60px; }
    .lightbox-caption {
      color: white;
      text-align: center;
      padding: 1rem;
    }
    @media (max-width: 768px) {
      .lightbox-prev { left: 10px; }
      .lightbox-next { right: 10px; }
    }
  `;
  document.head.appendChild(styles);
  
  let currentIndex = 0;
  const images = Array.from(galleryItems);
  
  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const overlay = lightbox.querySelector('.lightbox-overlay');
  
  function showImage(index) {
    const item = images[index];
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxCaption.textContent = item.dataset.caption || '';
    currentIndex = index;
  }
  
  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }
  
  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }
  
  // Event listeners
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
  
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}

/**
 * Phone Number Formatting
 */
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.length > 0) {
    if (value.length <= 3) {
      value = `(${value}`;
    } else if (value.length <= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    }
  }
  input.value = value;
}

// Attach phone formatter to phone inputs
document.querySelectorAll('input[type="tel"]').forEach(input => {
  input.addEventListener('input', () => formatPhoneNumber(input));
});

/**
 * Counter Animation for Stats
 */
function animateCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.counter);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// Initialize counter animation
animateCounters();

/**
 * Video Testimonial Players
 */
function initVideoTestimonials() {
  const videoContainers = document.querySelectorAll('.video-testimonial');
  if (videoContainers.length === 0) return;

  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.video-play-btn');
    const wrapper = container.querySelector('.video-wrapper');

    if (!video || !playBtn) return;

    // Play on button click
    playBtn.addEventListener('click', () => {
      video.controls = true;
      video.play();
      container.classList.add('playing');
    });

    // Also play when clicking the video wrapper (before playing)
    wrapper?.addEventListener('click', (e) => {
      if (e.target === wrapper || e.target === video) {
        if (!container.classList.contains('playing')) {
          video.controls = true;
          video.play();
          container.classList.add('playing');
        }
      }
    });

    // Reset when video ends
    video.addEventListener('ended', () => {
      video.controls = false;
      video.currentTime = 0;
      container.classList.remove('playing');
    });
  });
}

initVideoTestimonials();

/**
 * Testimonial Carousel (if needed)
 */
function initTestimonialCarousel() {
  const carousel = document.querySelector('.testimonial-carousel');
  if (!carousel) return;
  
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.testimonial-card');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const dots = carousel.querySelector('.carousel-dots');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    dots?.appendChild(dot);
  });
  
  function updateSlide() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots?.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }
  
  function goToSlide(index) {
    currentSlide = index;
    updateSlide();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
  }
  
  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);
  
  // Auto-advance every 5 seconds
  setInterval(nextSlide, 5000);
}

initTestimonialCarousel();
