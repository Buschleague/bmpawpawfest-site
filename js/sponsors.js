
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

  // Sponsor data (can be expanded with URLs and descriptions)
  const sponsorData = [
    {
      name: 'Beard & Lady Inn',
      image: '/assets/images/sponsors/beard.jpg',
      url: 'https://beardandladyinn.com/',
      description: 'Historic inn and event venue in Chester, AR'
    },
    {
      name: 'The Garden of Eden',
      image: '/assets/images/sponsors/garden.png',
      url: 'https://www.instagram.com/thegardenofeden1999/',
      description: 'Community garden and sustainable living'
    },
    {
      name: 'Gemini Capital Group',
      image: '/assets/images/sponsors/GeminiCG.png',
      url: null, // No website yet
      description: 'Investment and capital management'
    }
  ];

  // Initialize
  const init = () => {
    // Get DOM elements
    carousel = document.getElementById('sponsors-carousel');
    prevBtn = document.getElementById('sponsors-prev');
    nextBtn = document.getElementById('sponsors-next');

    if (!carousel) return;

    slides = carousel.querySelectorAll('.sponsor-slide');
    indicators = document.querySelectorAll('.carousel-indicators .indicator');

    // Setup event listeners
    setupEventListeners();

    // Start autoplay
    startAutoPlay();

    // Set ARIA labels
    updateAriaLabels();
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
    getSponsorData: () => sponsorData
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', SponsorsCarousel.init);
} else {
  SponsorsCarousel.init();
}