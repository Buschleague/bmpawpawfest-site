// Navigation Module
const Navigation = (() => {
  'use strict';

  // DOM Elements
  let header, mobileMenuToggle, mainNav, navLinks, dropdownToggles;
  let mobileMenuOverlay;

  // Configuration
  const config = {
    scrollThreshold: 50,
    smoothScrollOffset: 60, // Reduced for mobile header
    mobileBreakpoint: 768
  };

  // State
  let isMenuOpen = false;

  // Initialize
  const init = () => {
    // Cache DOM elements
    header = document.getElementById('header');
    mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    mainNav = document.getElementById('main-nav');
    navLinks = document.querySelectorAll('.nav-link');

    if (!header || !mobileMenuToggle || !mainNav) return;

    // Create mobile overlay
    createMobileOverlay();

    // Setup mobile dropdown toggles
    setupMobileDropdowns();

    // Setup event listeners
    setupEventListeners();

    // Update active nav link
    updateActiveNavLink();
  };

  // Create mobile menu overlay
  const createMobileOverlay = () => {
    mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(mobileMenuOverlay);
  };

  // Setup mobile dropdown toggles
  const setupMobileDropdowns = () => {
    if (window.innerWidth >= config.mobileBreakpoint) return;

    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('.nav-link');
      const menu = dropdown.querySelector('.dropdown-menu');

      if (link && menu) {
        // Prevent navigation on dropdown parent click
        link.addEventListener('click', (e) => {
          if (window.innerWidth < config.mobileBreakpoint) {
            e.preventDefault();
            dropdown.classList.toggle('active');
          }
        });
      }
    });
  };

  // Setup Event Listeners
  const setupEventListeners = () => {
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Mobile overlay click
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Nav links click
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });

    // Scroll events
    window.addEventListener('scroll', throttle(handleScroll, 100));

    // Resize events
    window.addEventListener('resize', debounce(handleResize, 250));

    // Touch events for better mobile experience
    if ('ontouchstart' in window) {
      mainNav.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
      }
    });
  };

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  };

  // Open Mobile Menu
  const openMobileMenu = () => {
    isMenuOpen = true;
    mobileMenuToggle.classList.add('active');
    mainNav.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.classList.add('menu-open');

    // Focus first menu item for accessibility
    setTimeout(() => {
      const firstLink = mainNav.querySelector('.nav-link');
      if (firstLink) firstLink.focus();
    }, 300);
  };

  // Close Mobile Menu
  const closeMobileMenu = () => {
    isMenuOpen = false;
    mobileMenuToggle.classList.remove('active');
    mainNav.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');

    // Close all dropdowns
    const dropdowns = document.querySelectorAll('.nav-dropdown.active');
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
  };

  // Handle Navigation Link Click
  const handleNavLinkClick = (e) => {
    const href = e.currentTarget.getAttribute('href');

    // Don't close menu for dropdown parents on mobile
    if (window.innerWidth < config.mobileBreakpoint) {
      const isDropdownParent = e.currentTarget.parentElement.classList.contains('nav-dropdown');
      if (isDropdownParent) return;
    }

    // Close mobile menu
    if (isMenuOpen) {
      closeMobileMenu();
    }

    // Smooth scroll to section
    if (href && href.startsWith('#')) {
      e.preventDefault();
      smoothScrollToSection(href);
    }
  };

  // Smooth Scroll to Section
  const smoothScrollToSection = (selector) => {
    const target = document.querySelector(selector);
    if (!target) return;

    const offset = window.innerWidth < config.mobileBreakpoint ? 60 : config.smoothScrollOffset;
    const targetPosition = target.offsetTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  // Handle Scroll Events
  const handleScroll = () => {
    // Add/remove scrolled class
    if (window.scrollY > config.scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link
    updateActiveNavLink();
  };

  // Update Active Navigation Link
  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + config.smoothScrollOffset + 100;

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const section = document.querySelector(href);
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Handle Window Resize
  const handleResize = () => {
    // Close mobile menu on desktop resize
    if (window.innerWidth >= config.mobileBreakpoint && isMenuOpen) {
      closeMobileMenu();
    }

    // Re-setup mobile dropdowns if needed
    setupMobileDropdowns();
  };

  // Handle Touch Move (prevent overscroll on iOS)
  const handleTouchMove = (e) => {
    if (!isMenuOpen) return;

    const nav = e.currentTarget;
    const scrollTop = nav.scrollTop;
    const scrollHeight = nav.scrollHeight;
    const height = nav.clientHeight;

    if (scrollTop === 0 && e.touches[0].pageY > e.touches[0].clientY) {
      e.preventDefault();
    } else if (scrollHeight - scrollTop === height && e.touches[0].pageY < e.touches[0].clientY) {
      e.preventDefault();
    }
  };

  // Utility: Throttle Function
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Utility: Debounce Function
  const debounce = (func, delay) => {
    let timeoutId;
    return function() {
      const args = arguments;
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  };

  // Public API
  return {
    init,
    closeMobileMenu,
    isMenuOpen: () => isMenuOpen
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Navigation.init);
} else {
  Navigation.init();
}