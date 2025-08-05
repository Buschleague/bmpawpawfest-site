// gallery.js - Refactored Gallery Module
const GalleryModule = (() => {
  'use strict';

  // Gallery data with all 2024 festival images - Load from JSON in the future
const galleryData = [
  // Entertainment
  {
    id: 1,
    src: '/assets/images/gallery/2024/entertainment/dreadfulday.jpeg',
    alt: 'Dreadful Day performing',
    caption: 'Dreadful Day rocking the main stage',
    category: ['2024', 'entertainment'],
    title: 'Live Music - Dreadful Day'
  },
  {
    id: 2,
    src: '/assets/images/gallery/2024/entertainment/dreadfulday2.jpeg',
    alt: 'Dreadful Day performance',
    caption: 'Another great shot of Dreadful Day performing',
    category: ['2024', 'entertainment'],
    title: 'Dreadful Day Performance'
  },
  {
    id: 3,
    src: '/assets/images/gallery/2024/entertainment/patioband.jpeg',
    alt: 'Patio band performance',
    caption: 'Live music on the patio stage',
    category: ['2024', 'entertainment'],
    title: 'Patio Stage Music'
  },
  {
    id: 4,
    src: '/assets/images/gallery/2024/entertainment/cornhole.jpeg',
    alt: 'Cornhole tournament',
    caption: 'Competitive cornhole tournament action',
    category: ['2024', 'activities'],
    title: 'Cornhole Tournament'
  },
  {
    id: 5,
    src: '/assets/images/gallery/2024/entertainment/pageantcontestants.jpeg',
    alt: 'Pawpaw pageant contestants',
    caption: '2024 Pawpaw Pageant contestants lined up',
    category: ['2024', 'entertainment'],
    title: 'Pageant Contestants'
  },
  {
    id: 6,
    src: '/assets/images/gallery/2024/entertainment/pawpawkingtrophy.jpeg',
    alt: 'Pawpaw King trophy',
    caption: 'The coveted Pawpaw King trophy',
    category: ['2024', 'entertainment'],
    title: 'Pawpaw King Trophy'
  },

  // Food & Desserts
  {
    id: 7,
    src: '/assets/images/gallery/2024/food/pawpawicecream.jpeg',
    alt: 'Pawpaw ice cream',
    caption: 'Delicious homemade pawpaw ice cream',
    category: ['2024', 'food'],
    title: 'Pawpaw Ice Cream'
  },
  {
    id: 8,
    src: '/assets/images/gallery/2024/food/pawpawicecream2.jpeg',
    alt: 'Pawpaw ice cream varieties',
    caption: 'Various flavors of pawpaw ice cream',
    category: ['2024', 'food'],
    title: 'Ice Cream Varieties'
  },
  {
    id: 9,
    src: '/assets/images/gallery/2024/food/pavillion.jpeg',
    alt: 'Food pavilion',
    caption: 'The main food pavilion bustling with activity',
    category: ['2024', 'food'],
    title: 'Food Pavilion'
  },
  {
    id: 10,
    src: '/assets/images/gallery/2024/food/pavillion2.jpeg',
    alt: 'Food pavilion vendors',
    caption: 'Vendors serving up pawpaw treats',
    category: ['2024', 'food'],
    title: 'Pavilion Vendors'
  },
  {
    id: 11,
    src: '/assets/images/gallery/2024/food/foodtrucks.jpeg',
    alt: 'Food trucks',
    caption: 'Food trucks offering festival favorites',
    category: ['2024', 'food'],
    title: 'Food Trucks'
  },
  {
    id: 12,
    src: '/assets/images/gallery/2024/food/hoboskitchen.jpeg',
    alt: 'Hobo\'s Kitchen food truck',
    caption: 'Hobo\'s Kitchen serving up delicious food',
    category: ['2024', 'food'],
    title: 'Hobo\'s Kitchen'
  },
  {
    id: 13,
    src: '/assets/images/gallery/2024/food/drinktrough.jpeg',
    alt: 'Drink station',
    caption: 'Festival drink station keeping everyone hydrated',
    category: ['2024', 'food'],
    title: 'Beverage Station'
  },

  // Workshops
  {
    id: 14,
    src: '/assets/images/gallery/2024/workshops/edenforage.jpeg',
    alt: 'Eden teaching foraging',
    caption: 'Eden Ellis teaching pawpaw foraging techniques',
    category: ['2024', 'activities'],
    title: 'Foraging Workshop'
  },
  {
    id: 15,
    src: '/assets/images/gallery/2024/workshops/edenforage2.jpeg',
    alt: 'Foraging workshop attendees',
    caption: 'Attendees learning about pawpaw identification',
    category: ['2024', 'activities'],
    title: 'Workshop Attendees'
  },
  {
    id: 16,
    src: '/assets/images/gallery/2024/workshops/edenforage3.jpeg',
    alt: 'Hands-on foraging lesson',
    caption: 'Hands-on learning in the foraging workshop',
    category: ['2024', 'activities'],
    title: 'Hands-on Learning'
  },
  {
    id: 17,
    src: '/assets/images/gallery/2024/workshops/moonshine.jpeg',
    alt: 'Moonshine demonstration',
    caption: 'Traditional moonshine making demonstration',
    category: ['2024', 'activities'],
    title: 'Moonshine Demo'
  },
  {
    id: 18,
    src: '/assets/images/gallery/2024/workshops/moonshine2.jpeg',
    alt: 'Moonshine workshop',
    caption: 'Learning about traditional Ozark crafts',
    category: ['2024', 'activities'],
    title: 'Traditional Crafts'
  },

  // Apothecary
  {
    id: 19,
    src: '/assets/images/gallery/2024/apothecary/frontcounter.jpeg',
    alt: 'Apothecary front counter',
    caption: 'The Beard & Lady Inn apothecary counter',
    category: ['2024', 'vendors'],
    title: 'Apothecary Counter'
  },
  {
    id: 20,
    src: '/assets/images/gallery/2024/apothecary/fullinterior.jpeg',
    alt: 'Apothecary interior',
    caption: 'Inside the historic apothecary',
    category: ['2024', 'vendors'],
    title: 'Apothecary Interior'
  },
  {
    id: 21,
    src: '/assets/images/gallery/2024/apothecary/tastingtable.jpeg',
    alt: 'Tasting table',
    caption: 'Pawpaw product tasting station',
    category: ['2024', 'vendors'],
    title: 'Tasting Station'
  },
  {
    id: 22,
    src: '/assets/images/gallery/2024/apothecary/front2back.jpeg',
    alt: 'Apothecary view',
    caption: 'Full view of the apothecary setup',
    category: ['2024', 'vendors'],
    title: 'Apothecary Setup'
  },

  // Vendors
  {
    id: 23,
    src: '/assets/images/gallery/2024/vendors/v1.jpeg',
    alt: 'Vendor booth',
    caption: 'Local artisan showcasing handmade goods',
    category: ['2024', 'vendors'],
    title: 'Artisan Vendor'
  },
  {
    id: 24,
    src: '/assets/images/gallery/2024/vendors/v2.jpeg',
    alt: 'Vendor display',
    caption: 'Beautiful vendor display of pawpaw products',
    category: ['2024', 'vendors'],
    title: 'Product Display'
  },
  {
    id: 25,
    src: '/assets/images/gallery/2024/vendors/v3.jpeg',
    alt: 'Vendor interaction',
    caption: 'Vendor explaining products to festival-goers',
    category: ['2024', 'vendors'],
    title: 'Vendor Interaction'
  },
  {
    id: 26,
    src: '/assets/images/gallery/2024/vendors/v4.jpeg',
    alt: 'Craft vendor',
    caption: 'Handcrafted items from local artisans',
    category: ['2024', 'vendors'],
    title: 'Local Crafts'
  },
  {
    id: 27,
    src: '/assets/images/gallery/2024/vendors/v5.jpeg',
    alt: 'Plant vendor',
    caption: 'Pawpaw seedlings and native plants for sale',
    category: ['2024', 'vendors'],
    title: 'Plant Sales'
  },
  {
    id: 28,
    src: '/assets/images/gallery/2024/vendors/v6.jpeg',
    alt: 'Food vendor',
    caption: 'Delicious pawpaw treats being prepared',
    category: ['2024', 'vendors'],
    title: 'Food Preparation'
  },
  {
    id: 29,
    src: '/assets/images/gallery/2024/vendors/v7.jpeg',
    alt: 'Vendor row',
    caption: 'Busy vendor row with festival attendees',
    category: ['2024', 'vendors'],
    title: 'Vendor Row'
  },
  {
    id: 30,
    src: '/assets/images/gallery/2024/vendors/v8.jpeg',
    alt: 'Vendor setup',
    caption: 'Vendors setting up for the day',
    category: ['2024', 'vendors'],
    title: 'Morning Setup'
  },

  // General
  {
    id: 31,
    src: '/assets/images/general/dailytrain.jpeg',
    alt: 'Daily train passing by',
    caption: 'The daily train passing by the festival grounds',
    category: ['2024', 'activities'],
    title: 'Chester Daily Train'
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