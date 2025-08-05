// Countdown Timer Module for Boston Mountain Pawpaw Festival
const Countdown = (() => {
  'use strict';

  // Festival date: September 20, 2025, 9:00 AM CST
  const FESTIVAL_DATE = new Date('2025-09-20T09:00:00-05:00');

  // DOM Elements
  let countdownElement;
  let daysElement;
  let hoursElement;
  let minutesElement;
  let secondsElement;
  let intervalId;

  // Initialize
  const init = () => {
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

  // Start countdown interval
  const startCountdown = () => {
    // Update immediately
    updateCountdown();

    // Update every second
    intervalId = setInterval(updateCountdown, 1000);
  };

  // Update countdown display
  const updateCountdown = () => {
    const now = new Date();
    const difference = FESTIVAL_DATE - now;

    // If festival has passed
    if (difference <= 0) {
      clearInterval(intervalId);
      displayFestivalActive();
      return;
    }

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update display
    if (daysElement) daysElement.textContent = String(days).padStart(3, '0');
    if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
    if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
    if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');

    // Add urgency classes
    if (days < 7) {
      countdownElement.classList.add('countdown-urgent');
    }
    if (days < 1) {
      countdownElement.classList.add('countdown-final');
    }
  };

  // Display when festival is active
  const displayFestivalActive = () => {
    if (!countdownElement) return;

    const festivalEndDate = new Date('2025-09-20T17:00:00-05:00');
    const now = new Date();

    if (now < festivalEndDate) {
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

  // Check festival status on page load
  const checkFestivalStatus = () => {
    const now = new Date();
    const daysUntil = Math.floor((FESTIVAL_DATE - now) / (1000 * 60 * 60 * 24));

    // Add appropriate body classes for styling
    if (daysUntil <= 0) {
      document.body.classList.add('festival-active');
    } else if (daysUntil <= 7) {
      document.body.classList.add('festival-week');
    } else if (daysUntil <= 30) {
      document.body.classList.add('festival-month');
    }
  };

  // Format date for display
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

  // Stop countdown (cleanup)
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