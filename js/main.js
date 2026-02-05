/**
 * Guardian Roofing & Siding - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileNav();
  initStickyHeader();
  initScrollReveal();
  initFaqAccordion();
  initSmoothScroll();
  initFormValidation();
  initGalleryLightbox();
  initProcessTimeline();
  initGraceWidget();
});

/**
 * Grace Inline Widget
 */
function initGraceWidget() {
  // Don't inject on grace.html page
  if (document.body.classList.contains('grace-page')) return;
  
  // Create widget HTML
  const widget = document.createElement('div');
  widget.className = 'grace-widget';
  widget.innerHTML = `
    <button class="grace-widget-trigger" aria-label="Chat with Grace">
      <img src="images/avatar-grace.webp" alt="Grace AI" class="grace-widget-avatar" onerror="this.src='images/avatar-grace.jpg'">
      <span class="grace-widget-text">Ask Grace</span>
      <span class="grace-widget-status"></span>
    </button>
    
    <div class="grace-panel">
      <div class="grace-panel-header">
        <img src="images/avatar-grace.webp" alt="Grace AI" class="grace-panel-avatar" onerror="this.src='images/avatar-grace.jpg'">
        <div class="grace-panel-info">
          <h4>Grace</h4>
          <span>Your Insurance Claims Assistant</span>
        </div>
        <div class="grace-panel-actions">
          <a href="grace.html" class="grace-panel-link">Full page</a>
          <button class="grace-panel-close" aria-label="Close chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="grace-panel-body">
        <div class="grace-message">
          Hi! I'm Grace, your virtual assistant. I can help you understand the insurance claims process, schedule inspections, or answer questions about our roofing and siding services. How can I help you today?
        </div>

        <div class="grace-quick-actions">
          <button class="grace-quick-btn" data-action="inspection">Schedule Inspection</button>
          <button class="grace-quick-btn" data-action="claims">Insurance Claims Help</button>
          <button class="grace-quick-btn" data-action="quote">Get a Quote</button>
          <button class="grace-quick-btn" data-action="services">Our Services</button>
        </div>
      </div>
      
      <div class="grace-panel-footer">
        <input type="text" class="grace-input" placeholder="Type your message..." aria-label="Type your message">
        <button class="grace-send">Send</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(widget);
  
  // Widget interactions
  const trigger = widget.querySelector('.grace-widget-trigger');
  const closeBtn = widget.querySelector('.grace-panel-close');
  const input = widget.querySelector('.grace-input');
  const sendBtn = widget.querySelector('.grace-send');
  const quickBtns = widget.querySelectorAll('.grace-quick-btn');
  const panelBody = widget.querySelector('.grace-panel-body');
  
  // Conversation history for API context
  let conversationHistory = [];
  
  // Demo responses (fallback when API is not available)
  const demoResponses = {
    'storm': "Storm damage isn't always visible from the ground—hail can crack shingles and wind can loosen flashing. I'd recommend scheduling a free inspection so one of our experts can give you a thorough assessment. Would you like to schedule one?",
    'insurance': "Great question! Your homeowner's insurance typically covers sudden storm damage. When you file a claim, an adjuster assesses the damage and approves repairs minus your deductible. Guardian handles everything FOR you—we document the damage, file the paperwork, and meet with the adjuster.",
    'pay': "Most of our customers pay only their deductible—typically between $500 and $2,500. Insurance covers the full cost of repairs minus that amount. We never ask for payment until your claim is approved!",
    'schedule': "I'd be happy to help! You can call us at 855-424-5911 or visit our contact page to schedule a free inspection. We're available Monday through Saturday.",
    'quote': "I'd be happy to help you get a quote! For the most accurate estimate, I recommend scheduling a free inspection. You can call us at 855-424-5911 or fill out the form on our contact page.",
    'services': "Guardian offers comprehensive exterior services: roof replacement and repairs, vinyl and fiber cement siding, gutters and downspouts, and storm damage restoration. We're certified by GAF and CertainTeed, and we specialize in helping homeowners navigate insurance claims.",
    'default': "That's a great question! To give you the most accurate answer, I'd recommend scheduling a free inspection or calling us at 855-424-5911. Is there anything specific about the claims process I can help clarify?"
  };
  
  function getDemoResponse(message) {
    const lower = message.toLowerCase();
    if (lower.includes('storm') || lower.includes('damage')) return demoResponses['storm'];
    if (lower.includes('insurance') || lower.includes('claim')) return demoResponses['insurance'];
    if (lower.includes('pay') || lower.includes('cost') || lower.includes('price') || lower.includes('deductible')) return demoResponses['pay'];
    if (lower.includes('schedule') || lower.includes('inspection') || lower.includes('appointment')) return demoResponses['schedule'];
    if (lower.includes('quote') || lower.includes('estimate')) return demoResponses['quote'];
    if (lower.includes('service') || lower.includes('offer') || lower.includes('do you do')) return demoResponses['services'];
    return demoResponses['default'];
  }
  
  trigger.addEventListener('click', () => {
    widget.classList.toggle('active');
    if (widget.classList.contains('active')) {
      input.focus();
    }
  });
  
  closeBtn.addEventListener('click', () => {
    widget.classList.remove('active');
  });
  
  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('active')) {
      widget.classList.remove('active');
    }
  });
  
  // Quick action buttons
  const quickActions = {
    inspection: "I'd like to schedule a free roof inspection.",
    claims: "Can you explain how the insurance claims process works?",
    quote: "I'd like to get a quote for roofing/siding work.",
    services: "What services does Guardian offer?"
  };
  
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      sendMessage(quickActions[action] || btn.textContent);
    });
  });
  
  // Send message
  sendBtn.addEventListener('click', () => sendMessage(input.value));
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage(input.value);
  });
  
  async function sendMessage(message) {
    if (!message.trim()) return;
    
    // Add user message to UI
    const userMsg = document.createElement('div');
    userMsg.className = 'grace-message';
    userMsg.style.background = 'var(--accent)';
    userMsg.style.color = 'var(--white)';
    userMsg.style.marginLeft = 'auto';
    userMsg.style.maxWidth = '85%';
    userMsg.textContent = message;
    panelBody.appendChild(userMsg);
    
    // Add to conversation history
    conversationHistory.push({ role: 'user', content: message });
    
    // Clear input
    input.value = '';
    
    // Hide quick actions after first message
    const quickActionsEl = panelBody.querySelector('.grace-quick-actions');
    if (quickActionsEl) quickActionsEl.style.display = 'none';
    
    // Scroll to bottom
    panelBody.scrollTop = panelBody.scrollHeight;
    
    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'grace-message';
    typing.innerHTML = '<em>Grace is typing...</em>';
    panelBody.appendChild(typing);
    panelBody.scrollTop = panelBody.scrollHeight;
    
    try {
      // Call the chat API with conversation history
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory })
      });
      
      if (!response.ok) {
        throw new Error('API error');
      }
      
      const data = await response.json();
      
      // Remove typing indicator
      typing.remove();
      
      // Get response text
      const responseText = data.response || data.message || getDemoResponse(message);
      
      // Add to conversation history
      conversationHistory.push({ role: 'assistant', content: responseText });
      
      // Add Grace's response to UI
      const graceMsg = document.createElement('div');
      graceMsg.className = 'grace-message';
      graceMsg.textContent = responseText;
      panelBody.appendChild(graceMsg);
      panelBody.scrollTop = panelBody.scrollHeight;
      
    } catch (error) {
      // Remove typing indicator
      typing.remove();
      
      // Fall back to demo responses
      const fallbackResponse = getDemoResponse(message);
      conversationHistory.push({ role: 'assistant', content: fallbackResponse });
      
      const graceMsg = document.createElement('div');
      graceMsg.className = 'grace-message';
      graceMsg.textContent = fallbackResponse;
      panelBody.appendChild(graceMsg);
      panelBody.scrollTop = panelBody.scrollHeight;
    }
  }
}

/**
 * Animated Process Timeline
 */
function initProcessTimeline() {
  const timeline = document.querySelector('.process-timeline');
  if (!timeline) return;
  
  const progress = timeline.querySelector('.timeline-progress');
  const steps = timeline.querySelectorAll('.timeline-step');
  
  if (!progress || steps.length === 0) return;
  
  function updateTimeline() {
    const timelineRect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how much of the timeline is in view
    const timelineTop = timelineRect.top;
    const timelineHeight = timelineRect.height;
    
    // Start animating when timeline enters viewport
    if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
      // Calculate scroll progress through the timeline
      const scrollStart = windowHeight * 0.7; // Start when 70% in view
      const scrollEnd = windowHeight * 0.3; // End when 30% from top
      
      const scrollProgress = Math.max(0, Math.min(1, 
        (scrollStart - timelineTop) / (scrollStart - scrollEnd + timelineHeight * 0.8)
      ));
      
      // Update progress bar height
      progress.style.height = `${scrollProgress * 100}%`;
      
      // Update step states
      steps.forEach((step, index) => {
        const stepThreshold = (index + 0.5) / steps.length;
        if (scrollProgress >= stepThreshold) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    }
  }
  
  // Initial check
  updateTimeline();
  
  // Update on scroll
  window.addEventListener('scroll', updateTimeline, { passive: true });
  window.addEventListener('resize', updateTimeline, { passive: true });
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
