// path-resolver.js - Environment-aware path resolution
const PathResolver = (() => {
  'use strict';

  // Detect the current environment
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

    const environment = detectEnvironment();

    // For local server, absolute paths work correctly - don't modify them
    if (environment === 'localserver' && path.startsWith('/')) {
      return path;
    }

    // For file:// protocol or production subdirectories, convert to relative
    if (path.startsWith('/')) {
      // Only convert if we're not at the root in production
      if (environment === 'production') {
        const pathname = window.location.pathname;
        if (pathname === '/' || pathname === '/index.html') {
          // At root in production, absolute paths are fine
          return path;
        }
      }

      // Convert absolute to relative
      return getBasePath() + path.substr(1);
    }

    // Already relative, return as-is
    return path;
  };

  // Update all paths in a given container
  const updatePaths = (container = document) => {
    const environment = detectEnvironment();

    // Skip path updates for local server - absolute paths work fine there
    if (environment === 'localserver') {
      console.log('PathResolver: Skipping path updates for local server environment');
      return;
    }

    // Update href attributes
    container.querySelectorAll('a[href^="/"]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href.startsWith('//')) {
        const resolved = resolve(href);
        if (resolved !== href) {
          link.setAttribute('href', resolved);
          console.log(`PathResolver: Updated link ${href} -> ${resolved}`);
        }
      }
    });

    // Update src attributes
    container.querySelectorAll('[src^="/"]').forEach(element => {
      const src = element.getAttribute('src');
      if (!src.startsWith('//')) {
        const resolved = resolve(src);
        if (resolved !== src) {
          element.setAttribute('src', resolved);
          console.log(`PathResolver: Updated src ${src} -> ${resolved}`);
        }
      }
    });

    // Update link stylesheet hrefs
    container.querySelectorAll('link[href^="/"]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href.startsWith('//')) {
        const resolved = resolve(href);
        if (resolved !== href) {
          link.setAttribute('href', resolved);
          console.log(`PathResolver: Updated stylesheet ${href} -> ${resolved}`);
        }
      }
    });
  };

  // Get current page identifier
  const getCurrentPage = () => {
    const pathname = window.location.pathname;

    // Homepage
    if (pathname === '/' || pathname === '/index.html' || pathname.endsWith('/')) {
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
    const environment = detectEnvironment();
    console.log('PathResolver initialized. Environment:', environment);

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
    markActiveNav,
    detectEnvironment,
    getEnvironment: detectEnvironment // alias for consistency
  };
})();

// Auto-initialize
PathResolver.init();