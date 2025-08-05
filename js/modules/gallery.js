// gallery.js - Refactored Gallery Module
const GalleryModule = (() => {
  'use strict';

  // Gallery data - in production, this could be loaded from JSON
  const galleryData = [
    {
      id: 1,
      src: '/assets/images/pawpaw-desserts.jpg',
      alt: 'Pawpaw desserts display',
      caption: 'Amazing array of pawpaw treats from local vendors',
      category: ['2024', 'food'],
      title: 'Pawpaw Desserts'
    },
    {
      id: 2,
      src: '/assets/images/live-music.jpg',
      alt: 'Live music performance',
      caption: 'Dreadful Day performing on the main stage',
      category: ['2024', 'entertainment'],
      title: 'Live Music'
    },
    {
      id: 3,
      src: '/assets/images/pageant-winner.jpg',
      alt: 'Pawpaw pageant winners',
      caption: '2024 Pawpaw King and Queen crowned',
      category: ['2024', 'activities'],
      title: 'Pawpaw Royalty'
    },
    {
      id: 4,
      src: '/assets/images/festival-crowd.jpg',
      alt: 'Festival atmosphere',
      caption: 'Crowds enjoying the beautiful day at Beard & Lady Inn',
      category: ['2024', 'activities'],
      title: 'Festival Atmosphere'
    },
    {
      id: 5,
      src: '/assets/images/vendor-scene.jpg',
      alt: 'Vendor booths',
      caption: 'Local artisans and pawpaw product vendors',
      category: ['2024', 'vendors'],
      title: 'Vendor Village'
    },
    {
      id: 6,
      src: '/assets/images/workshop-scene.jpg',
      alt: 'Pawpaw growing workshop',
      caption: 'Learning about pawpaw cultivation from experts',
      category: ['2024', 'activities'],
      title: 'Growing Workshop'
    },
    {
      id: 7,
      src: '/assets/images/pawpaw-fruit.jpg',
      alt: 'Fresh pawpaw fruit',
      caption: 'Beautiful ripe pawpaws ready for tasting',
      category: ['2024', 'food'],
      title: 'Fresh Pawpaws'
    },
    {
      id: 8,
      src: '/assets/images/ozark-mountains.jpg',
      alt: 'Ozark mountain scenery',
      caption: 'The beautiful Ozark backdrop for our festival',
      category: ['2024', 'activities'],
      title: 'Boston Mountains'
    }
  ];

  let currentImageIndex = 0;
  let currentFilter = 'all';
  let filteredImages = [...galleryData];

  // Initialize gallery
  const init = () => {
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