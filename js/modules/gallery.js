// gallery.js - Refactored Gallery Module
const GalleryModule = (() => {
  'use strict';

  // Gallery data (will be loaded from JSON)
  let galleryData = [];
  let currentImageIndex = 0;
  let currentFilter = 'all';
  let filteredImages = [];

  // Initialize gallery
  const init = async () => {
    // Load gallery data based on year
    const currentYear = new Date().getFullYear();
    const availableYears = [2024]; // Can be expanded as new galleries are added
    
    for (const year of availableYears) {
      try {
        const response = await fetch(`/data/gallery-${year}.json`);
        if (response.ok) {
          const data = await response.json();
          galleryData = galleryData.concat(data.images);
        }
      } catch (error) {
        console.error(`Failed to load gallery for ${year}:`, error);
      }
    }

    filteredImages = [...galleryData];
    
    renderGallery();
    setupEventListeners();
    setupKeyboardNavigation();
  };

  // Render gallery items
  const renderGallery = () => {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';

    filteredImages.forEach((item, index) => {
      const galleryItem = createGalleryItem(item, index);
      galleryGrid.appendChild(galleryItem);
    });

    // Update image paths with PathResolver if available
    if (typeof PathResolver !== 'undefined') {
      PathResolver.updatePaths(galleryGrid);
    }
  };

  // Create individual gallery item
  const createGalleryItem = (item, index) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.dataset.categories = item.category.join(' ');
    div.dataset.index = index;

    div.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" loading="lazy">
      <div class="gallery-caption">
        <h4>${item.title}</h4>
        <p>${item.caption}</p>
      </div>
    `;

    div.addEventListener('click', () => openLightbox(index));
    return div;
  };

  // Setup event listeners
  const setupEventListeners = () => {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        filterGallery(filter);
      });
    });

    // Lightbox background click
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }
  };

  // Filter gallery
  const filterGallery = (filter) => {
    currentFilter = filter;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    // Filter images
    if (filter === 'all') {
      filteredImages = [...galleryData];
    } else {
      filteredImages = galleryData.filter(item =>
        item.category.includes(filter)
      );
    }

    renderGallery();
  };

  // Lightbox functionality
  const openLightbox = (index) => {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    if (!lightbox || !lightboxImage) return;

    const image = filteredImages[index];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    // Update src with PathResolver if available
    if (typeof PathResolver !== 'undefined') {
      lightboxImage.src = PathResolver.resolve(image.src);
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  const navigateLightbox = (direction) => {
    currentImageIndex += direction;

    // Wrap around
    if (currentImageIndex < 0) {
      currentImageIndex = filteredImages.length - 1;
    } else if (currentImageIndex >= filteredImages.length) {
      currentImageIndex = 0;
    }

    const lightboxImage = document.getElementById('lightboxImage');
    if (lightboxImage && filteredImages[currentImageIndex]) {
      const image = filteredImages[currentImageIndex];
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;

      // Update src with PathResolver if available
      if (typeof PathResolver !== 'undefined') {
        lightboxImage.src = PathResolver.resolve(image.src);
      }
    }
  };

  // Keyboard navigation
  const setupKeyboardNavigation = () => {
    document.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('lightbox');
      if (lightbox && lightbox.classList.contains('active')) {
        switch(e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            navigateLightbox(-1);
            break;
          case 'ArrowRight':
            navigateLightbox(1);
            break;
        }
      }
    });
  };

  // Public API
  return {
    init,
    openLightbox,
    closeLightbox,
    navigateLightbox,
    filterGallery
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', GalleryModule.init);
} else {
  GalleryModule.init();
}
