
const SponsorsCarousel = (() => {
  'use strict';

  // Configuration
  const config = {
    autoPlayInterval: 5000, // 5 seconds
    transitionDuration: 300,
    touchThreshold: 50
  };

  // State
  let currentSlide = 0;
  let autoPlayTimer = null;
  let isTransitioning = false;
  let touchStartX = 0;
  let touchEndX = 0;

  // DOM Elements
  let carousel, slides, indicators, prevBtn, nextBtn;

  // Detect environment
  const detectEnvironment = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    if (protocol === 'file:') {
      return 'file';
    } else if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168')) {
      return 'localserver';
    } else if (hostname.includes('github.io') || hostname === 'pawpawfestar.org') {
      return 'production';
    }
    return 'unknown';
  };

  // Initialize
  const init = () => {
    // Get DOM elements
    carousel = document.getElementById('sponsors-carousel');
    prevBtn = document.getElementById('sponsors-prev');
    nextBtn = document.getElementById('sponsors-next');

    if (!carousel) return;

    slides = carousel.querySelectorAll('.sponsor-slide');
    indicators = document.querySelectorAll('.carousel-indicators .indicator');

    // Fix image paths ONLY if needed
    const environment = detectEnvironment();
    console.log('Sponsors carousel environment:', environment);

    if (environment === 'file' || environment === 'production') {
      fixSponsorImagePaths();
    }
    // For local server, absolute paths should work as-is

    // Setup event listeners
    setupEventListeners();

    // Start autoplay
    startAutoPlay();

    // Set ARIA labels
    updateAriaLabels();
  };

  // Fix sponsor image paths (only when needed)
  const fixSponsorImagePaths = () => {
    const sponsorImages = carousel.querySelectorAll('.sponsor-logo');
    const environment = detectEnvironment();

    sponsorImages.forEach(img => {
      const originalSrc = img.getAttribute('src');

      if (!originalSrc) return;

      // Skip if already a full URL
      if (originalSrc.startsWith('http://') || originalSrc.startsWith('https://')) {
        return;
      }

      // Only fix absolute paths starting with /
      if (originalSrc.startsWith('/')) {
        let newSrc = originalSrc;

        if (environment === 'file') {
          // For file:// protocol, convert to relative path
          const depth = (window.location.pathname.match(/\//g) || []).length - 1;
          const basePath = depth === 0 ? '.' : '../'.repeat(depth);
          newSrc = basePath + originalSrc.substr(1);
        } else if (environment === 'production') {
          // For production (GitHub Pages or custom domain)
          // Check if we're in a subdirectory
          const pathname = window.location.pathname;
          if (pathname !== '/' && pathname !== '/index.html') {
            // We're in a subdirectory, need to adjust path
            if (typeof PathResolver !== 'undefined' && PathResolver.resolve) {
              newSrc = PathResolver.resolve(originalSrc);
            } else {
              // Fallback calculation
              const depth = (pathname.match(/\//g) || []).length - 1;
              const basePath = depth === 0 ? '.' : '../'.repeat(depth);
              newSrc = basePath + originalSrc.substr(1);
            }
          }
          // If at root, leave absolute paths as-is
        }

        if (newSrc !== originalSrc) {
          console.log(`Updating sponsor image path: ${originalSrc} -> ${newSrc}`);
          img.src = newSrc;
        }
      }

      // Add error handler to debug missing images
      img.onerror = function() {
        console.error('Failed to load sponsor image:', this.src);
        console.error('Original src attribute:', originalSrc);
        console.error('Environment:', environment);

        // Show a placeholder message
        const placeholder = document.createElement('div');
        placeholder.className = 'sponsor-placeholder';
        placeholder.innerHTML = `
          <div style="padding: 2rem; text-align: center; color: #999;">
            <p>Image not found</p>
            <small style="font-size: 0.8em; font-family: monospace;">${originalSrc}</small>
          </div>
        `;
        this.style.display = 'none';
        this.parentNode.appendChild(placeholder);
      };

      // Add load success handler for debugging
      img.onload = function() {
        console.log('Successfully loaded sponsor image:', this.src);
      };
    });
  };

  // Setup Event Listeners
  const setupEventListeners = () => {
    // Navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', () => navigateSlide('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateSlide('next'));

    // Indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => goToSlide(index));
    });

    // Touch support for mobile
    if (carousel) {
      carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
      carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    // Pause on hover
    if (carousel) {
      carousel.addEventListener('mouseenter', pauseAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);

    // Pause when page is not visible
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Re-check paths if components are reloaded
    document.addEventListener('componentsLoaded', () => {
      const environment = detectEnvironment();
      if (environment === 'file' || environment === 'production') {
        fixSponsorImagePaths();
      }
    });
  };

  // Navigate Slide
  const navigateSlide = (direction) => {
    if (isTransitioning) return;

    pauseAutoPlay();

    if (direction === 'next') {
      currentSlide = (currentSlide + 1) % slides.length;
    } else {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }

    updateSlide();
    startAutoPlay();
  };

  // Go to Specific Slide
  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;

    pauseAutoPlay();
    currentSlide = index;
    updateSlide();
    startAutoPlay();
  };

  // Update Slide Display
  const updateSlide = () => {
    isTransitioning = true;

    // Update slide classes
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev');

      if (index === currentSlide) {
        slide.classList.add('active');
      } else if (index < currentSlide) {
        slide.classList.add('prev');
      }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });

    // Update ARIA labels
    updateAriaLabels();

    // Reset transition flag
    setTimeout(() => {
      isTransitioning = false;
    }, config.transitionDuration);
  };

  // Auto Play Functions
  const startAutoPlay = () => {
    pauseAutoPlay();
    autoPlayTimer = setInterval(() => {
      navigateSlide('next');
    }, config.autoPlayInterval);
  };

  const pauseAutoPlay = () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  };

  // Touch Handlers
  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > config.touchThreshold) {
      if (swipeDistance > 0) {
        navigateSlide('next');
      } else {
        navigateSlide('prev');
      }
    }
  };

  // Keyboard Navigation
  const handleKeyboard = (e) => {
    // Only handle if carousel is in viewport
    if (!isElementInViewport(carousel)) return;

    switch (e.key) {
      case 'ArrowLeft':
        navigateSlide('prev');
        break;
      case 'ArrowRight':
        navigateSlide('next');
        break;
    }
  };

  // Visibility Change Handler
  const handleVisibilityChange = () => {
    if (document.hidden) {
      pauseAutoPlay();
    } else {
      startAutoPlay();
    }
  };

  // Update ARIA Labels
  const updateAriaLabels = () => {
    slides.forEach((slide, index) => {
      const isActive = index === currentSlide;
      slide.setAttribute('aria-hidden', !isActive);

      const link = slide.querySelector('.sponsor-link');
      if (link) {
        link.tabIndex = isActive ? 0 : -1;
      }
    });
  };

  // Utility: Check if element is in viewport
  const isElementInViewport = (element) => {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Public API
  return {
    init,
    pause: pauseAutoPlay,
    play: startAutoPlay,
    next: () => navigateSlide('next'),
    prev: () => navigateSlide('prev'),
    goTo: goToSlide,
    getEnvironment: detectEnvironment
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', SponsorsCarousel.init);
} else {
  SponsorsCarousel.init();
}