// Schedule Module for Boston Mountain Pawpaw Festival
const Schedule = (() => {
  'use strict';

// Festival schedule data with multiple locations
const scheduleData = [
  // Farmer's Market Events (120 S. Wright Street)
  {
    id: 1,
    time: "8:00 AM - 11:00 AM",
    title: "Chester Farmer's Market",
    description: "Browse local produce, crafts, and goods at the Chester Farmer's Market",
    type: "market",
    location: "Farmer's Market - 120 S. Wright Street",
    icon: "🛍️"
  },
  {
    id: 2,
    time: "9:00 AM",
    title: "Fall Foraging with Eden",
    description: "Eden Ellis speaks about fall foraging techniques and identifying wild edibles",
    type: "workshop",
    duration: "45 minutes",
    location: "Apothecary Stage - Beard & Lady Inn",
    icon: "🌿"
  },
  {
    id: 3,
    time: "9:00 AM - 12:00 PM",
    title: "Cornhole Tournament",
    description: "Competitive cornhole tournament - Registration required",
    type: "activity",
    location: "Farmer's Market - 120 S. Wright Street",
    icon: "🎯",
    requiresRegistration: true
  },
  {
    id: 4,
    time: "9:30 AM - 12:00 PM",
    title: "Dreadful Day Live",
    description: "Live music performance by Dreadful Day on the main stage",
    type: "entertainment",
    location: "Main Stage - Farmer's Market",
    icon: "🎵"
  },
  {
    id: 5,
    time: "10:00 AM",
    title: "Pawpaw Mead Making Demo",
    description: "Cyrus Mason with Still'n The Clear demonstrates pawpaw mead making",
    type: "workshop",
    duration: "45 minutes",
    location: "Apothecary Stage - Beard & Lady Inn",
    icon: "🍯"
  },
  {
    id: 6,
    time: "11:30 AM - 2:00 PM",
    title: "Hobo's Kitchen Lunch",
    description: "Donation-based lunch featuring venison chili and cornbread",
    type: "food",
    location: "Beard & Lady Inn",
    icon: "🍲"
  },
  {
    id: 7,
    time: "1:00 PM - 2:00 PM",
    title: "Pawpaw Pageant",
    description: "Crown the 2025 Pawpaw King - Registration required",
    type: "featured",
    location: "Main Stage - Farmer's Market",
    icon: "👑",
    requiresRegistration: true
  },
  {
    id: 8,
    time: "1:00 PM",
    title: "Growing & Raising Pawpaws",
    description: "Guy King Ames from Ames Orchard speaks on pawpaw cultivation",
    type: "workshop",
    duration: "45 minutes",
    location: "Apothecary Stage - Beard & Lady Inn",
    icon: "🌱"
  },
  {
    id: 9,
    time: "2:00 PM - 5:00 PM",
    title: "Jesse Dean Live Music",
    description: "Live music performance by Jesse Dean",
    type: "entertainment",
    location: "Beard & Lady Inn",
    icon: "🎸"
  }
];

// Activity types for filtering
const activityTypes = {
  all: { name: "All Activities", color: "var(--color-primary)" },
  workshop: { name: "Workshops", color: "var(--color-leaf)" },
  food: { name: "Food & Dining", color: "var(--color-secondary)" },
  entertainment: { name: "Entertainment", color: "var(--color-accent)" },
  activity: { name: "Activities", color: "var(--color-autumn)" },
  featured: { name: "Featured Events", color: "var(--color-tertiary)" },
  market: { name: "Market", color: "var(--color-earth)" }
};

  // DOM Elements
  let scheduleTimeline;
  let filterButtons;
  let currentFilter = 'all';

  // Initialize
  const init = () => {
    scheduleTimeline = document.getElementById('schedule-timeline');
    if (!scheduleTimeline) return;

    createFilterButtons();
    loadSchedule();
    setupEventListeners();
  };

  // Create filter buttons
  const createFilterButtons = () => {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'schedule-filters';

    Object.keys(activityTypes).forEach(type => {
      const button = document.createElement('button');
      button.className = 'filter-btn';
      button.dataset.type = type;
      button.textContent = activityTypes[type].name;
      if (type === 'all') button.classList.add('active');
      filterContainer.appendChild(button);
    });

    scheduleTimeline.parentNode.insertBefore(filterContainer, scheduleTimeline);
    filterButtons = filterContainer.querySelectorAll('.filter-btn');
  };

  // Setup event listeners
  const setupEventListeners = () => {
    if (!filterButtons) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        filterSchedule(type);
      });
    });
  };

  // Load and display schedule
  const loadSchedule = () => {
    renderSchedule(scheduleData);
  };

  // Render schedule items
  const renderSchedule = (items) => {
    scheduleTimeline.innerHTML = '';

    if (items.length === 0) {
      scheduleTimeline.innerHTML = '<p class="no-results">No activities found for this filter.</p>';
      return;
    }

    items.forEach((item, index) => {
      const scheduleItem = createScheduleItem(item, index);
      scheduleTimeline.appendChild(scheduleItem);
    });
  };

 // Create individual schedule item
const createScheduleItem = (item, index) => {
  const itemElement = document.createElement('div');
  itemElement.className = `schedule-item schedule-${item.type}`;
  itemElement.style.animationDelay = `${index * 0.1}s`;

  const typeColor = activityTypes[item.type]?.color || 'var(--color-primary)';

  itemElement.innerHTML = `
    <div class="schedule-time">
      <span class="time-text">${escapeHtml(item.time)}</span>
      ${item.duration ? `<span class="duration">${escapeHtml(item.duration)}</span>` : ''}
    </div>
    <div class="schedule-content">
      <div class="schedule-icon" style="background-color: ${typeColor}">
        ${item.icon}
      </div>
      <div class="schedule-details">
        <h3 class="schedule-title">${escapeHtml(item.title)}</h3>
        <p class="schedule-description">${escapeHtml(item.description)}</p>
        <div class="schedule-meta">
          <span class="schedule-location">📍 ${escapeHtml(item.location)}</span>
          ${item.requiresRegistration ? '<span class="registration-required">🎟️ Registration Required</span>' : ''}
        </div>
        <span class="schedule-type" style="color: ${typeColor}">${activityTypes[item.type].name}</span>
      </div>
    </div>
  `;

  // Add featured class for special events
  if (item.type === 'featured') {
    itemElement.classList.add('featured-event');
  }

  return itemElement;
};

  // Filter schedule by type
  const filterSchedule = (type) => {
    currentFilter = type;

    // Update active button
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });

    // Filter items
    const filteredItems = type === 'all'
      ? scheduleData
      : scheduleData.filter(item => item.type === type);

    renderSchedule(filteredItems);
  };

  // Utility: Escape HTML
  const escapeHtml = (text) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  };

  // Get next upcoming event
  const getNextEvent = () => {
    // This would compare with current time in production
    return scheduleData[0];
  };

  // Public API
  return {
    init,
    getSchedule: () => scheduleData,
    getActivityTypes: () => activityTypes,
    getNextEvent,
    filterByType: (type) => filterSchedule(type)
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Schedule.init);
} else {
  Schedule.init();
}