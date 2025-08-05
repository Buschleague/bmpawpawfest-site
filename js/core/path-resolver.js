// path-resolver.js - Utility for handling paths across different page depths
const PathResolver = (() => {
  'use strict';

  // Get the current page depth relative to root
  const getPageDepth = () => {
    const pathname = window.location.pathname;
    const depth = (pathname.match(/\//g) || []).length - 1;
    return Math.max(0, depth);
  };

  // Get base path for current page
  const getBasePath = () => {
    const depth = getPageDepth();
    return depth === 0 ? './' : '../'.repeat(depth);
  };

  // Resolve a path relative to site root
  const resolve = (path) => {
    if (!path) return '';

    // If already absolute or external, return as-is
    if (path.startsWith('http') || path.startsWith('//')) {
      return path;
    }

    // If starts with /, make it relative to current page
    if (path.startsWith('/')) {
      return getBasePath() + path.substr(1);
    }

    // Already relative, return as-is
    return path;
  };

  // Update all paths in a given container
  const updatePaths = (container = document) => {
    // Update href attributes
    container.querySelectorAll('a[href^="/"]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href.startsWith('//')) {
        link.setAttribute('href', resolve(href));
      }
    });

    // Update src attributes
    container.querySelectorAll('[src^="/"]').forEach(element => {
      const src = element.getAttribute('src');
      if (!src.startsWith('//')) {
        element.setAttribute('src', resolve(src));
      }
    });

    // Update link stylesheet hrefs
    container.querySelectorAll('link[href^="/"]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href.startsWith('//')) {
        link.setAttribute('href', resolve(href));
      }
    });
  };

  // Get current page identifier
  const getCurrentPage = () => {
    const pathname = window.location.pathname;

    // Homepage
    if (pathname === '/' || pathname === '/index.html') {
      return 'home';
    }

    // Extract page name from path
    const matches = pathname.match(/\/pages\/([^\/]+)/);
    if (matches) {
      return matches[1];
    }

    // Fallback to pathname
    return pathname.replace(/\//g, '-').replace('.html', '');
  };

  // Mark active navigation items
  const markActiveNav = () => {
    const currentPage = getCurrentPage();

    // Remove all active classes
    document.querySelectorAll('.nav-link.active').forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to current page
    const activeLink = document.querySelector(`[data-page="${currentPage}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  };

  // Initialize path resolution
  const init = () => {
    // Update paths when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        updatePaths();
        markActiveNav();
      });
    } else {
      updatePaths();
      markActiveNav();
    }

    // Also update after components are loaded
    document.addEventListener('componentsLoaded', () => {
      updatePaths();
      markActiveNav();
    });
  };

  // Public API
  return {
    init,
    resolve,
    updatePaths,
    getBasePath,
    getPageDepth,
    getCurrentPage,
    markActiveNav
  };
})();

// Auto-initialize
PathResolver.init();