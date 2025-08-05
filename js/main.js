// Main Application Module for Boston Mountain Pawpaw Festival
const App = (() => {
  'use strict';

  // Configuration
  const config = {
    animationObserverThreshold: 0.1,
    lazyLoadOffset: 50,
    festivalYear: 2025
  };

  // Initialize Application
  const init = () => {
    console.log('🌿 Boston Mountain Pawpaw Festival site initialized');

    // Setup features
    setupIntersectionObserver();
    setupLazyLoading();
    setupAccessibility();
    setupPerformanceOptimizations();
    addFestivalInteractions();

    // Log performance metrics in development
    if (window.location.hostname === 'localhost') {
      logPerformanceMetrics();
    }
  };

  // Setup Intersection Observer for animations
  const setupIntersectionObserver = () => {
    if (!('IntersectionObserver' in window)) return;

    const animatedElements = document.querySelectorAll('.section, .hero-content, .info-card, .feature');

    const observerOptions = {
      threshold: config.animationObserverThreshold,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  };

  // Setup Lazy Loading for images
  const setupLazyLoading = () => {
    if (!('IntersectionObserver' in window)) return;

    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: `${config.lazyLoadOffset}px`
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  };

  // Setup Accessibility Features
  const setupAccessibility = () => {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#schedule';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to festival schedule';
    skipLink.innerHTML = '<span class="sr-only">Skip to festival schedule</span>';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.id = 'announcer';
    document.body.appendChild(announcer);

    // Keyboard navigation improvements
    document.addEventListener('keydown', (e) => {
      // Press '/' to focus search (when implemented)
      if (e.key === '/' && !isInputFocused()) {
        e.preventDefault();
        // Focus search input when implemented
      }

      // Press 'Escape' to close mobile menu
      if (e.key === 'Escape') {
        const mobileNav = document.getElementById('main-nav');
        if (mobileNav && mobileNav.classList.contains('active')) {
          document.getElementById('mobile-menu-toggle').click();
        }
      }

      // Press 'T' to jump to tickets
      if (e.key === 't' && !isInputFocused()) {
        e.preventDefault();
        document.querySelector('.sticky-cta')?.click();
      }
    });
  };

  // Add Festival-specific interactions
  const addFestivalInteractions = () => {
    // Add hover effect to pawpaw icons
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.info-icon');
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
      });

      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.info-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });

    // Add seasonal decorations based on date
    addSeasonalDecorations();
  };

  // Add seasonal decorations
  const addSeasonalDecorations = () => {
    const now = new Date();
    const festivalDate = new Date('2025-09-20');
    const daysUntil = Math.floor((festivalDate - now) / (1000 * 60 * 60 * 24));

    // Add fall leaves animation if close to festival
    if (daysUntil <= 30 && daysUntil > 0) {
      createFallingLeaves();
    }
  };

  // Create falling leaves animation
  const createFallingLeaves = () => {
    const leafContainer = document.createElement('div');
    leafContainer.className = 'falling-leaves';
    leafContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(leafContainer);

    const leaves = ['🍂', '🍁', '🌿'];
    const numberOfLeaves = 5;

    for (let i = 0; i < numberOfLeaves; i++) {
      setTimeout(() => {
        const leaf = document.createElement('span');
        leaf.className = 'leaf';
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.animationDuration = (Math.random() * 10 + 10) + 's';
        leaf.style.animationDelay = Math.random() * 5 + 's';
        leafContainer.appendChild(leaf);
      }, i * 2000);
    }
  };

  // Setup Performance Optimizations
  const setupPerformanceOptimizations = () => {
    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = '/assets/images/hero-pawpaw-festival.jpg';
    document.head.appendChild(preloadLink);

    // Prefetch vendor sites on hover
    document.addEventListener('mouseover', (e) => {
      const link = e.target.closest('a[href^="http"]');
      if (link && !link.dataset.prefetched) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
        link.dataset.prefetched = 'true';
      }
    });

    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--transition-fast', '0.01ms');
      document.documentElement.style.setProperty('--transition-medium', '0.01ms');
      document.documentElement.style.setProperty('--transition-slow', '0.01ms');
    }
  };

  // Utility: Check if input is focused
  const isInputFocused = () => {
    const activeElement = document.activeElement;
    return activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.tagName === 'SELECT'
    );
  };

  // Log Performance Metrics (Development)
  const logPerformanceMetrics = () => {
    if (!window.performance || !window.performance.getEntriesByType) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.getEntriesByType('navigation')[0];
        if (perfData) {
          console.log('⚡ Performance Metrics:');
          console.log(`  DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`);
          console.log(`  Page Load: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
          console.log(`  Total Time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }
      }, 0);
    });
  };

  // Public API
  return {
    init,
    announce: (message) => {
      const announcer = document.getElementById('announcer');
      if (announcer) {
        announcer.textContent = message;
      }
    },
    getFestivalYear: () => config.festivalYear
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}

// Service Worker Registration (for PWA support)
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, app will still work normally
    });
  });
}