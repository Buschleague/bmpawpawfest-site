// Schedule Module for Boston Mountain Pawpaw Festival
const Schedule = (() => {
  'use strict';

  // Schedule data (will be loaded from JSON)
  let scheduleData = [];
  let activityTypes = {};

  // DOM Elements
  let scheduleTimeline;
  let filterButtons;
  let currentFilter = 'all';

  // Initialize
  const init = async () => {
    scheduleTimeline = document.getElementById('schedule-timeline');
    if (!scheduleTimeline) return;

    // Load schedule data
    try {
      const response = await fetch('/data/schedule-2025.json');
      const data = await response.json();
      scheduleData = data.events;
      activityTypes = data.activityTypes;
    } catch (error) {
      console.error('Failed to load schedule:', error);
      scheduleTimeline.innerHTML = '<p class="error">Failed to load schedule. Please try again later.</p>';
      return;
    }

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

    if (item.type === 'featured') {
      itemElement.classList.add('featured-event');
    }

    return itemElement;
  };

  // Filter schedule by type
  const filterSchedule = (type) => {
    currentFilter = type;

    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });

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
