// Countdown Timer Module for Boston Mountain Pawpaw Festival
const Countdown = (() => {
  'use strict';

  // Festival configuration
  let FESTIVAL_DATE;
  let FESTIVAL_END_DATE;
  
  // DOM Elements
  let countdownElement;
  let daysElement;
  let hoursElement;
  let minutesElement;
  let secondsElement;
  let intervalId;

  // Initialize
  const init = async () => {
    // Load festival configuration
    try {
      const response = await fetch('/data/festival-config.json');
      const config = await response.json();
      FESTIVAL_DATE = new Date(config.festivalDate);
      FESTIVAL_END_DATE = new Date(config.festivalEndDate);
    } catch (error) {
      console.error('Failed to load festival config:', error);
      // Fallback to hardcoded date
      FESTIVAL_DATE = new Date('2025-09-20T09:00:00-05:00');
      FESTIVAL_END_DATE = new Date('2025-09-20T17:00:00-05:00');
    }

    // Find countdown elements
    countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    daysElement = document.getElementById('days');
    hoursElement = document.getElementById('hours');
    minutesElement = document.getElementById('minutes');
    secondsElement = document.getElementById('seconds');

    // Start the countdown
    startCountdown();

    // Check if festival has passed
    checkFestivalStatus();
  };

  // Rest of the functions remain the same...
  // (Copy the rest of the original countdown.js functions here)

  // Start countdown interval
  const startCountdown = () => {
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
  };

  const updateCountdown = () => {
    const now = new Date();
    const difference = FESTIVAL_DATE - now;

    if (difference <= 0) {
      clearInterval(intervalId);
      displayFestivalActive();
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysElement) daysElement.textContent = String(days).padStart(3, '0');
    if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
    if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
    if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');

    if (days < 7) {
      countdownElement.classList.add('countdown-urgent');
    }
    if (days < 1) {
      countdownElement.classList.add('countdown-final');
    }
  };

  const displayFestivalActive = () => {
    if (!countdownElement) return;

    const now = new Date();

    if (now < FESTIVAL_END_DATE) {
      countdownElement.innerHTML = `
        <div class="festival-active">
          <h3>🎉 The Festival is Happening Now! 🎉</h3>
          <p>Join us at Beard & Lady Inn until 5:00 PM</p>
        </div>
      `;
    } else {
      countdownElement.innerHTML = `
        <div class="festival-ended">
          <h3>Thank You for a Wonderful Festival!</h3>
          <p>See you next year for the 3rd Annual Boston Mountain Pawpaw Festival</p>
        </div>
      `;
    }
  };

  const checkFestivalStatus = () => {
    const now = new Date();
    const daysUntil = Math.floor((FESTIVAL_DATE - now) / (1000 * 60 * 60 * 24));

    if (daysUntil <= 0) {
      document.body.classList.add('festival-active');
    } else if (daysUntil <= 7) {
      document.body.classList.add('festival-week');
    } else if (daysUntil <= 30) {
      document.body.classList.add('festival-month');
    }
  };

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  // Public API
  return {
    init,
    stop,
    getFestivalDate: () => FESTIVAL_DATE,
    getFormattedDate: () => formatDate(FESTIVAL_DATE),
    getDaysRemaining: () => {
      const now = new Date();
      return Math.floor((FESTIVAL_DATE - now) / (1000 * 60 * 60 * 24));
    }
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Countdown.init);
} else {
  Countdown.init();
}
