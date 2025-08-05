// component-loader.js - Simple HTML component loading system
const ComponentLoader = (() => {
  'use strict';

  // Cache for loaded components
  const componentCache = new Map();

  // Base path configuration
  const config = {
    componentsPath: '/components/',
    pagesPath: '/pages/'
  };

  // Determine the base path based on current location
  const getBasePath = () => {
    const depth = (window.location.pathname.match(/\//g) || []).length - 1;
    return '../'.repeat(depth) || './';
  };

  // Load a component from HTML file
  const loadComponent = async (componentName) => {
    // Check cache first
    if (componentCache.has(componentName)) {
      return componentCache.get(componentName);
    }

    try {
      const basePath = getBasePath();
      const response = await fetch(`${basePath}components/${componentName}.html`);

      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }

      const html = await response.text();
      componentCache.set(componentName, html);
      return html;
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
      return '';
    }
  };

  // Replace component placeholders in the document
  const replaceComponent = async (placeholder, componentName) => {
    const content = await loadComponent(componentName);

    // Create a temporary container to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = content;

    // Replace the placeholder with the actual content
    const parent = placeholder.parentNode;
    while (temp.firstChild) {
      parent.insertBefore(temp.firstChild, placeholder);
    }
    parent.removeChild(placeholder);
  };

  // Process all component placeholders in the document
  const loadAllComponents = async () => {
    // Find all component placeholders
    const placeholders = document.querySelectorAll('[data-component]');

    // Load all components in parallel
    const promises = Array.from(placeholders).map(placeholder => {
      const componentName = placeholder.dataset.component;
      return replaceComponent(placeholder, componentName);
    });

    await Promise.all(promises);

    // Dispatch event when all components are loaded
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
  };

  // Initialize components and handle dynamic content
  const init = () => {
    // Load components when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadAllComponents);
    } else {
      loadAllComponents();
    }
  };

  // Update paths in loaded content based on current page depth
  const updatePaths = (html, depth = 0) => {
    const basePath = '../'.repeat(depth) || './';

    // Update various path types
    return html
      .replace(/href=["']\/(?!\/)/g, `href="${basePath}`)
      .replace(/src=["']\/(?!\/)/g, `src="${basePath}`)
      .replace(/url\(["']?\/(?!\/)/g, `url(${basePath}`);
  };

  // Public API
  return {
    init,
    loadComponent,
    updatePaths,
    getBasePath
  };
})();

// Auto-initialize
ComponentLoader.init();