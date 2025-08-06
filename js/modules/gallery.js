
const GalleryModule = (() => {
  'use strict';

  // Gallery data
  let galleryData = [];
  let currentImageIndex = 0;
  let currentFilter = 'all';
  let filteredImages = [];
  let imagesLoaded = 0;
  let totalImages = 0;

  // Initialize gallery
  const init = async () => {
    try {
      // Load gallery data
      const response = await fetch('/data/gallery-2024.json');
      if (response.ok) {
        const data = await response.json();
        galleryData = data.images;
        totalImages = data.images.length;

        // Add metadata to each image
        galleryData.forEach((img, index) => {
          img.id = `gallery-img-${index}`;
          img.loaded = false;
        });

        console.log(`Gallery initialized with ${totalImages} images`);
      } else {
        throw new Error('Failed to load gallery data');
      }
    } catch (error) {
      console.error('Failed to load gallery:', error);
      showErrorMessage();
      return;
    }

    filteredImages = [...galleryData];

    renderGallery();
    setupEventListeners();
    setupKeyboardNavigation();
    setupLazyLoading();
    updateLoadProgress();
  };

  // Show error message if gallery fails to load
  const showErrorMessage = () => {
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
      galleryGrid.innerHTML = `
        <div class="gallery-error">
          <p>Unable to load gallery images. Please try refreshing the page.</p>
          <button onclick="location.reload()" class="btn btn-primary">Refresh Page</button>
        </div>
      `;
    }
  };

  // Render gallery items with improved layout
  const renderGallery = () => {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Show loading indicator
    if (filteredImages.length === 0) {
      galleryGrid.innerHTML = '<div class="no-results">No images found for this filter.</div>';
      return;
    }

    galleryGrid.innerHTML = '';

    // Create gallery items
    filteredImages.forEach((item, index) => {
      const galleryItem = createGalleryItem(item, index);
      galleryGrid.appendChild(galleryItem);
    });

    // Update image count
    updateImageCount();

    // Initialize lazy loading for new items
    setupLazyLoading();
  };

  // Create individual gallery item with proper attribution
  const createGalleryItem = (item, index) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.dataset.categories = item.category.join(' ');
    div.dataset.index = index;
    div.dataset.imageId = item.id;

    // Use placeholder while loading
    const imageSrc = item.loaded ? item.src : '/assets/images/placeholder.jpg';

    div.innerHTML = `
      <div class="gallery-image-wrapper">
        <img 
          data-src="${item.src}" 
          src="${imageSrc}"
          alt="${escapeHtml(item.alt)}" 
          loading="lazy"
          class="gallery-image ${!item.loaded ? 'loading' : ''}"
        >
        <div class="gallery-loading-spinner" style="${item.loaded ? 'display:none' : ''}">
          <div class="spinner"></div>
        </div>
      </div>
      <div class="gallery-caption">
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.caption)}</p>
        ${item.photographer ? `<small class="photo-credit">Photo: ${escapeHtml(item.photographer)}</small>` : ''}
      </div>
      <div class="gallery-overlay">
        <button class="gallery-view-btn" aria-label="View ${escapeHtml(item.title)}">
          <span>View Full Size</span>
        </button>
      </div>
    `;

    // Add click handler
    const viewBtn = div.querySelector('.gallery-view-btn');
    viewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(index);
    });

    div.addEventListener('click', () => openLightbox(index));

    return div;
  };

  // Setup lazy loading for images
  const setupLazyLoading = () => {
    const images = document.querySelectorAll('.gallery-image[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;

            // Create new image to preload
            const newImg = new Image();
            newImg.onload = () => {
              img.src = src;
              img.classList.remove('loading');
              img.removeAttribute('data-src');

              // Hide spinner
              const wrapper = img.closest('.gallery-image-wrapper');
              const spinner = wrapper.querySelector('.gallery-loading-spinner');
              if (spinner) spinner.style.display = 'none';

              // Update loaded count
              imagesLoaded++;
              updateLoadProgress();

              // Mark as loaded in data
              const imageId = img.closest('.gallery-item').dataset.imageId;
              const imageData = galleryData.find(item => item.id === imageId);
              if (imageData) imageData.loaded = true;
            };

            newImg.onerror = () => {
              img.src = '/assets/images/image-not-found.jpg';
              img.classList.remove('loading');
              img.classList.add('error');
            };

            newImg.src = src;
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  };

  // Update image count display
  const updateImageCount = () => {
    const countElement = document.querySelector('.gallery-count');
    if (countElement) {
      countElement.textContent = `Showing ${filteredImages.length} of ${galleryData.length} images`;
    }
  };

  // Update load progress
  const updateLoadProgress = () => {
    const progressElement = document.querySelector('.gallery-progress');
    if (progressElement && totalImages > 0) {
      const percentage = Math.round((imagesLoaded / totalImages) * 100);
      progressElement.style.width = `${percentage}%`;
    }
  };

  // Setup event listeners
  const setupEventListeners = () => {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        filterGallery(filter);

        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('filter', filter);
        window.history.pushState({}, '', url);
      });
    });

    // Lightbox controls
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      // Close button
      const closeBtn = lightbox.querySelector('.lightbox-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
      }

      // Background click
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      // Navigation buttons
      const prevBtn = lightbox.querySelector('.lightbox-prev');
      const nextBtn = lightbox.querySelector('.lightbox-next');
      if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
      if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));
    }

    // Check URL for filter parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
    if (urlFilter) {
      filterGallery(urlFilter);
    }
  };

  // Filter gallery with animation
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

    // Animate transition
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
      galleryGrid.style.opacity = '0';
      setTimeout(() => {
        renderGallery();
        galleryGrid.style.opacity = '1';
      }, 300);
    }
  };

  // Enhanced Lightbox functionality
  const openLightbox = (index) => {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const image = filteredImages[index];
    if (!image) return;

    // Update lightbox content
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    if (lightboxContent) {
      lightboxContent.innerHTML = `
        <button class="lightbox-close" aria-label="Close gallery">&times;</button>
        <button class="lightbox-nav lightbox-prev" aria-label="Previous image">‹</button>
        <button class="lightbox-nav lightbox-next" aria-label="Next image">›</button>
        <figure class="lightbox-figure">
          <img 
            id="lightboxImage" 
            src="${image.src}" 
            alt="${escapeHtml(image.alt)}"
          >
          <figcaption class="lightbox-caption">
            <h3>${escapeHtml(image.title)}</h3>
            <p>${escapeHtml(image.caption)}</p>
            ${image.photographer ? `<small>Photo: ${escapeHtml(image.photographer)}</small>` : ''}
            <div class="lightbox-counter">${index + 1} / ${filteredImages.length}</div>
          </figcaption>
        </figure>
      `;

      // Re-attach event listeners
      setupLightboxListeners(lightboxContent);
    }

    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Preload adjacent images
    preloadAdjacentImages(index);
  };

  // Setup lightbox event listeners
  const setupLightboxListeners = (container) => {
    const closeBtn = container.querySelector('.lightbox-close');
    const prevBtn = container.querySelector('.lightbox-prev');
    const nextBtn = container.querySelector('.lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));
  };

  // Preload adjacent images for smooth navigation
  const preloadAdjacentImages = (index) => {
    const prevIndex = index > 0 ? index - 1 : filteredImages.length - 1;
    const nextIndex = index < filteredImages.length - 1 ? index + 1 : 0;

    // Preload previous and next images
    [prevIndex, nextIndex].forEach(i => {
      if (filteredImages[i] && !filteredImages[i].preloaded) {
        const img = new Image();
        img.src = filteredImages[i].src;
        filteredImages[i].preloaded = true;
      }
    });
  };

  // Close lightbox
  const closeLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Navigate lightbox with animation
  const navigateLightbox = (direction) => {
    currentImageIndex += direction;

    // Wrap around
    if (currentImageIndex < 0) {
      currentImageIndex = filteredImages.length - 1;
    } else if (currentImageIndex >= filteredImages.length) {
      currentImageIndex = 0;
    }

    const image = filteredImages[currentImageIndex];
    if (!image) return;

    // Animate transition
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.querySelector('.lightbox-caption');

    if (lightboxImage) {
      lightboxImage.style.opacity = '0';
      setTimeout(() => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxImage.style.opacity = '1';
      }, 200);
    }

    if (lightboxCaption) {
      lightboxCaption.innerHTML = `
        <h3>${escapeHtml(image.title)}</h3>
        <p>${escapeHtml(image.caption)}</p>
        ${image.photographer ? `<small>Photo: ${escapeHtml(image.photographer)}</small>` : ''}
        <div class="lightbox-counter">${currentImageIndex + 1} / ${filteredImages.length}</div>
      `;
    }

    // Preload adjacent images
    preloadAdjacentImages(currentImageIndex);
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

  // Utility: Escape HTML
  const escapeHtml = (text) => {
    if (!text) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  };

  // Public API
  return {
    init,
    openLightbox,
    closeLightbox,
    navigateLightbox,
    filterGallery,
    getImageCount: () => galleryData.length,
    getFilteredCount: () => filteredImages.length
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', GalleryModule.init);
} else {
  GalleryModule.init();
}