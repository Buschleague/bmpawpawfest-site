// Schedule Module for Boston Mountain Pawpaw Festival
const Schedule = (() => {
  'use strict';

  // Festival schedule data
  const scheduleData = [
    {
      id: 1,
      time: "9:00 AM",
      title: "Festival Gates Open",
      description: "Welcome to the 2nd Annual Boston Mountain Pawpaw Festival!",
      type: "opening",
      icon: "🎪"
    },
    {
      id: 2,
      time: "9:30 AM - 4:30 PM",
      title: "Pawpaw Dessert Vendors",
      description: "Sample and purchase amazing pawpaw ice cream, pies, breads, cookies, and more from local vendors",
      type: "food",
      icon: "🥧"
    },
    {
      id: 3,
      time: "10:00 AM",
      title: "Pawpaw Growing Workshop",
      description: "Learn how to cultivate your own pawpaw trees with expert growers",
      type: "workshop",
      duration: "45 minutes",
      icon: "🌱"
    },
    {
      id: 4,
      time: "11:00 AM - 4:00 PM",
      title: "Live Music: Dreadful Day",
      description: "Enjoy live performances throughout the day on the main stage",
      type: "entertainment",
      icon: "🎵"
    },
    {
      id: 5,
      time: "11:30 AM",
      title: "Cornhole Tournament",
      description: "Test your skills in our pawpaw-themed cornhole tournament. Prizes for winners!",
      type: "activity",
      duration: "90 minutes",
      icon: "🎯"
    },
    {
      id: 6,
      time: "1:00 PM",
      title: "Pawpaw Pageant",
      description: "Crown the 2025 Pawpaw King and Queen in this fun, family-friendly pageant",
      type: "featured",
      duration: "60 minutes",
      icon: "👑"
    },
    {
      id: 7,
      time: "2:30 PM",
      title: "Pawpaw Cooking Demo",
      description: "Watch local chefs demonstrate creative pawpaw recipes you can make at home",
      type: "workshop",
      duration: "30 minutes",
      icon: "👨‍🍳"
    },
    {
      id: 8,
      time: "3:30 PM",
      title: "Kids Pawpaw Activities",
      description: "Face painting, pawpaw crafts, and games for our youngest festival-goers",
      type: "activity",
      icon: "🎨"
    },
    {
      id: 9,
      time: "4:00 PM",
      title: "Final Pawpaw Growing Q&A",
      description: "Last chance to ask our experts your pawpaw cultivation questions",
      type: "workshop",
      duration: "30 minutes",
      icon: "❓"
    },
    {
      id: 10,
      time: "5:00 PM",
      title: "Festival Closes",
      description: "Thank you for celebrating with us! See you next year!",
      type: "closing",
      icon: "🌅"
    }
  ];

  // Activity types for filtering
  const activityTypes = {
    all: { name: "All Activities", color: "var(--color-primary)" },
    workshop: { name: "Workshops", color: "var(--color-leaf)" },
    food: { name: "Food & Vendors", color: "var(--color-secondary)" },
    entertainment: { name: "Entertainment", color: "var(--color-accent)" },
    activity: { name: "Activities", color: "var(--color-autumn)" },
    featured: { name: "Featured Events", color: "var(--color-tertiary)" }
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