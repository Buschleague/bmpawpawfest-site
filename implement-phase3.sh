#!/bin/bash

# Phase 3: Volunteer System Implementation
# Boston Mountain Pawpaw Festival
# Timeline: 2-3 days
# Priority: P1

echo "🚀 Starting Phase 3: Volunteer System Implementation"
echo "=================================================="

# 1. Create volunteer roles data file
echo "📊 Creating volunteer-roles.json..."
cat > data/volunteer-roles.json << 'EOF'
{
  "lastUpdated": "2025-08-06",
  "volunteerCoordinator": {
    "name": "Eden Ellis",
    "email": "eden@thegardenofeden1999.com",
    "phone": "(479) 555-0123"
  },
  "shifts": [
    {
      "id": "setup",
      "name": "Festival Setup",
      "date": "2025-09-19",
      "time": "2:00 PM - 6:00 PM",
      "description": "Help set up vendor booths, signage, and festival areas",
      "spotsAvailable": 15,
      "requirements": "Ability to lift 25 lbs"
    },
    {
      "id": "morning",
      "name": "Morning Shift",
      "date": "2025-09-20",
      "time": "8:00 AM - 12:00 PM",
      "description": "Assist with vendor check-in, parking, and morning activities",
      "spotsAvailable": 10,
      "requirements": "None"
    },
    {
      "id": "afternoon",
      "name": "Afternoon Shift",
      "date": "2025-09-20",
      "time": "12:00 PM - 5:00 PM",
      "description": "Help with activities, crowd management, and vendor support",
      "spotsAvailable": 10,
      "requirements": "None"
    },
    {
      "id": "cleanup",
      "name": "Festival Cleanup",
      "date": "2025-09-20",
      "time": "5:00 PM - 8:00 PM",
      "description": "Help tear down and clean up after the festival",
      "spotsAvailable": 15,
      "requirements": "Ability to lift 25 lbs"
    }
  ],
  "roles": [
    {
      "id": "parking",
      "name": "Parking Assistant",
      "description": "Direct vehicles to parking areas and assist with traffic flow",
      "icon": "🚗",
      "skills": ["Standing for extended periods", "Clear communication"]
    },
    {
      "id": "info_booth",
      "name": "Information Booth",
      "description": "Answer questions, provide directions, and share festival information",
      "icon": "ℹ️",
      "skills": ["Friendly demeanor", "Knowledge of festival layout"]
    },
    {
      "id": "vendor_support",
      "name": "Vendor Support",
      "description": "Assist vendors with setup, supplies, and customer flow",
      "icon": "🛍️",
      "skills": ["Customer service", "Problem solving"]
    },
    {
      "id": "activity_helper",
      "name": "Activity Helper",
      "description": "Support cornhole tournament, pageant, and workshop activities",
      "icon": "🎯",
      "skills": ["Enthusiasm", "Following instructions"]
    },
    {
      "id": "setup_crew",
      "name": "Setup/Cleanup Crew",
      "description": "Help with physical setup and teardown of festival infrastructure",
      "icon": "🔨",
      "skills": ["Physical fitness", "Teamwork"]
    },
    {
      "id": "green_team",
      "name": "Green Team",
      "description": "Manage recycling stations and help keep the festival grounds clean",
      "icon": "♻️",
      "skills": ["Environmental awareness", "Attention to detail"]
    },
    {
      "id": "photography",
      "name": "Event Photography",
      "description": "Capture festival moments for social media and archives",
      "icon": "📸",
      "skills": ["Photography skills", "Own camera/phone"]
    },
    {
      "id": "first_aid",
      "name": "First Aid Support",
      "description": "Assist medical personnel if needed (certification required)",
      "icon": "🏥",
      "skills": ["First Aid/CPR certification", "Calm under pressure"]
    }
  ],
  "benefits": [
    "Free festival t-shirt",
    "Complimentary lunch during your shift",
    "First access to pawpaw treats",
    "Community service hours available",
    "Invitation to volunteer appreciation party"
  ],
  "requirements": {
    "minimum_age": 14,
    "age_note": "Volunteers under 16 must be accompanied by an adult",
    "orientation": "Brief orientation 30 minutes before shift",
    "dress_code": "Comfortable clothes and closed-toe shoes"
  }
}
EOF

# 2. Create the volunteer page
echo "📄 Creating volunteer page..."
cat > pages/volunteer/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Volunteer - Boston Mountain Pawpaw Festival</title>
  <meta name="description" content="Join our volunteer team for the Boston Mountain Pawpaw Festival! Help make the 2025 festival amazing while earning perks and community service hours.">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://pawpawfestar.org/pages/volunteer/">

  <!-- Open Graph -->
  <meta property="og:title" content="Volunteer at the Boston Mountain Pawpaw Festival">
  <meta property="og:description" content="Be part of the magic! Volunteer at the 2025 Pawpaw Festival and help celebrate Arkansas's native fruit.">
  <meta property="og:image" content="https://pawpawfestar.org/assets/images/volunteer-hero.jpg">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Merriweather:wght@700&display=swap" rel="stylesheet">

  <!-- CSS Files -->
  <link rel="stylesheet" href="/css/utilities/variables.css">
  <link rel="stylesheet" href="/css/utilities/reset.css">
  <link rel="stylesheet" href="/css/utilities/base.css">
  <link rel="stylesheet" href="/css/components/header.css">
  <link rel="stylesheet" href="/css/components/footer.css">
  <link rel="stylesheet" href="/css/utilities/responsive.css">

  <style>
    /* Volunteer Page Styles */
    .volunteer-hero {
      background: linear-gradient(135deg, #2d5016 0%, #8cbf3f 100%);
      color: white;
      padding: 120px 0 60px;
      text-align: center;
      margin-top: 80px;
      position: relative;
      overflow: hidden;
    }

    .volunteer-hero::before {
      content: '🤝';
      position: absolute;
      font-size: 300px;
      opacity: 0.1;
      right: -50px;
      top: 50%;
      transform: translateY(-50%);
    }

    .volunteer-hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-family: var(--font-decorative);
      position: relative;
      z-index: 1;
    }

    .volunteer-hero p {
      font-size: 1.25rem;
      opacity: 0.95;
      max-width: 600px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .volunteer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 1rem;
    }

    /* Benefits Section */
    .benefits-section {
      background: var(--color-light);
      padding: 3rem 2rem;
      border-radius: 12px;
      margin-bottom: 3rem;
    }

    .benefits-section h2 {
      color: var(--color-primary);
      text-align: center;
      margin-bottom: 2rem;
      font-family: var(--font-decorative);
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .benefit-item {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease;
    }

    .benefit-item:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-hover);
    }

    .benefit-icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .benefit-item h3 {
      color: var(--color-primary);
      margin-bottom: 0.5rem;
      font-size: 1.125rem;
    }

    .benefit-item p {
      color: var(--color-text-light);
      font-size: 0.875rem;
    }

    /* Roles Section */
    .roles-section {
      margin-bottom: 3rem;
    }

    .roles-section h2 {
      color: var(--color-primary);
      text-align: center;
      margin-bottom: 2rem;
      font-family: var(--font-decorative);
    }

    .roles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .role-card {
      background: white;
      border: 2px solid var(--color-light);
      padding: 1.5rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .role-card:hover {
      border-color: var(--color-accent);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .role-card.selected {
      border-color: var(--color-accent);
      background: linear-gradient(135deg, white 0%, rgba(140, 191, 63, 0.05) 100%);
    }

    .role-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }

    .role-icon {
      font-size: 2rem;
    }

    .role-title {
      color: var(--color-primary);
      font-weight: var(--font-weight-bold);
      font-size: 1.125rem;
    }

    .role-description {
      color: var(--color-text);
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }

    .role-skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .skill-tag {
      background: var(--color-light);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      color: var(--color-text-light);
    }

    /* Volunteer Form */
    .volunteer-form-section {
      background: white;
      padding: 3rem 2rem;
      border-radius: 12px;
      box-shadow: var(--shadow-lg);
      max-width: 700px;
      margin: 0 auto 3rem;
    }

    .volunteer-form-section h2 {
      color: var(--color-primary);
      text-align: center;
      margin-bottom: 2rem;
      font-family: var(--font-decorative);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      color: var(--color-primary);
      font-weight: var(--font-weight-medium);
      margin-bottom: 0.5rem;
    }

    .form-group label .required {
      color: var(--color-secondary);
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid var(--color-light);
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .form-control:focus {
      border-color: var(--color-accent);
      outline: none;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .checkbox-item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .checkbox-item label {
      margin: 0;
      cursor: pointer;
    }

    .shift-selector {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .shift-option {
      background: var(--color-light);
      padding: 1rem;
      border-radius: 8px;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .shift-option:hover {
      border-color: var(--color-accent);
    }

    .shift-option.selected {
      border-color: var(--color-accent);
      background: white;
    }

    .shift-time {
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin-bottom: 0.25rem;
    }

    .shift-spots {
      font-size: 0.875rem;
      color: var(--color-text-light);
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }

    .btn-submit {
      background: var(--color-accent);
      color: white;
      padding: 0.875rem 2rem;
      border: none;
      border-radius: 4px;
      font-size: 1.125rem;
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-submit:hover {
      background: var(--color-accent-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .form-message {
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
      text-align: center;
      display: none;
    }

    .form-message.success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
      display: block;
    }

    .form-message.error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      display: block;
    }

    /* Requirements Section */
    .requirements-section {
      background: linear-gradient(135deg, var(--color-light) 0%, rgba(244, 164, 96, 0.05) 100%);
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 3rem;
      border: 2px solid var(--color-secondary);
    }

    .requirements-section h3 {
      color: var(--color-secondary);
      margin-bottom: 1rem;
    }

    .requirements-list {
      list-style: none;
      padding: 0;
    }

    .requirements-list li {
      padding: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;
    }

    .requirements-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: var(--color-accent);
      font-weight: bold;
    }

    /* Contact Section */
    .contact-section {
      background: var(--color-primary);
      color: white;
      padding: 3rem 2rem;
      border-radius: 12px;
      text-align: center;
      margin-top: 3rem;
    }

    .contact-section h2 {
      margin-bottom: 1rem;
    }

    .contact-section p {
      font-size: 1.125rem;
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    .contact-info {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      margin-top: 1.5rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .contact-item a {
      color: var(--color-accent);
      text-decoration: none;
    }

    .contact-item a:hover {
      text-decoration: underline;
    }

    /* Mobile Adjustments */
    @media (max-width: 768px) {
      .volunteer-hero h1 {
        font-size: 2rem;
      }

      .volunteer-hero p {
        font-size: 1rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .shift-selector {
        grid-template-columns: 1fr;
      }

      .roles-grid {
        grid-template-columns: 1fr;
      }

      .benefits-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body class="page-volunteer">
  <!-- Header Component -->
  <div data-component="header"></div>

  <!-- Volunteer Hero -->
  <section class="volunteer-hero">
    <div class="container">
      <h1>Join Our Volunteer Team!</h1>
      <p>Help make the 2025 Boston Mountain Pawpaw Festival an amazing experience for everyone</p>
    </div>
  </section>

  <!-- Main Content -->
  <main class="volunteer-container">
    <!-- Benefits Section -->
    <section class="benefits-section">
      <h2>Why Volunteer?</h2>
      <div class="benefits-grid">
        <div class="benefit-item">
          <div class="benefit-icon">👕</div>
          <h3>Free Festival T-Shirt</h3>
          <p>Get an exclusive volunteer t-shirt to remember your experience</p>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">🍽️</div>
          <h3>Complimentary Lunch</h3>
          <p>Enjoy a free meal during your volunteer shift</p>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">🥧</div>
          <h3>First Dibs on Pawpaws</h3>
          <p>Get early access to pawpaw treats and desserts</p>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">📜</div>
          <h3>Service Hours</h3>
          <p>Earn community service hours for school or organizations</p>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">🎉</div>
          <h3>Appreciation Party</h3>
          <p>Join us for an exclusive volunteer celebration after the festival</p>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">🤝</div>
          <h3>Meet New People</h3>
          <p>Connect with fellow pawpaw enthusiasts and community members</p>
        </div>
      </div>
    </section>

    <!-- Available Roles -->
    <section class="roles-section">
      <h2>Choose Your Role</h2>
      <div class="roles-grid" id="rolesGrid">
        <!-- Roles will be dynamically loaded here -->
      </div>
    </section>

    <!-- Requirements -->
    <div class="requirements-section">
      <h3>📋 Volunteer Requirements</h3>
      <ul class="requirements-list">
        <li>Minimum age: 14 years old</li>
        <li>Volunteers under 16 must be accompanied by an adult</li>
        <li>Attend brief orientation 30 minutes before your shift</li>
        <li>Wear comfortable clothes and closed-toe shoes</li>
        <li>Bring a positive attitude and willingness to help!</li>
      </ul>
    </div>

    <!-- Volunteer Form -->
    <section class="volunteer-form-section">
      <h2>Sign Up to Volunteer</h2>
      <form id="volunteerForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
        <!-- Personal Information -->
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name <span class="required">*</span></label>
            <input type="text" id="firstName" name="firstName" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name <span class="required">*</span></label>
            <input type="text" id="lastName" name="lastName" class="form-control" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Email <span class="required">*</span></label>
            <input type="email" id="email" name="email" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="phone">Phone <span class="required">*</span></label>
            <input type="tel" id="phone" name="phone" class="form-control" required>
          </div>
        </div>

        <!-- Age Verification -->
        <div class="form-group">
          <label for="age">Age <span class="required">*</span></label>
          <select id="age" name="age" class="form-control" required>
            <option value="">Select age range</option>
            <option value="14-15">14-15 (adult supervision required)</option>
            <option value="16-17">16-17</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-50">36-50</option>
            <option value="51-65">51-65</option>
            <option value="65+">65+</option>
          </select>
        </div>

        <!-- Role Selection -->
        <div class="form-group">
          <label for="role">Preferred Role <span class="required">*</span></label>
          <select id="role" name="role" class="form-control" required>
            <option value="">Select a role</option>
            <!-- Options will be populated by JavaScript -->
          </select>
        </div>

        <!-- Shift Selection -->
        <div class="form-group">
          <label>Available Shifts <span class="required">*</span></label>
          <div class="shift-selector" id="shiftSelector">
            <!-- Shifts will be populated by JavaScript -->
          </div>
        </div>

        <!-- Emergency Contact -->
        <div class="form-group">
          <label for="emergencyContact">Emergency Contact Name & Phone <span class="required">*</span></label>
          <input type="text" id="emergencyContact" name="emergencyContact" class="form-control"
                 placeholder="John Doe - (555) 123-4567" required>
        </div>

        <!-- Special Skills or Notes -->
        <div class="form-group">
          <label for="specialSkills">Special Skills or Notes (Optional)</label>
          <textarea id="specialSkills" name="specialSkills" class="form-control" rows="3"
                    placeholder="Tell us about any special skills, certifications, or accommodations needed"></textarea>
        </div>

        <!-- Agreement -->
        <div class="form-group">
          <div class="checkbox-item">
            <input type="checkbox" id="agreement" name="agreement" required>
            <label for="agreement">
              I understand the volunteer requirements and commit to fulfilling my selected shift(s) <span class="required">*</span>
            </label>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="submit" class="btn-submit">Submit Application</button>
        </div>

        <!-- Success/Error Messages -->
        <div id="formMessage" class="form-message"></div>
      </form>
    </section>

    <!-- Contact Section -->
    <div class="contact-section">
      <h2>Questions?</h2>
      <p>Contact our Volunteer Coordinator</p>
      <div class="contact-info">
        <div class="contact-item">
          <span>📧</span>
          <a href="mailto:eden@thegardenofeden1999.com">eden@thegardenofeden1999.com</a>
        </div>
        <div class="contact-item">
          <span>📱</span>
          <span>Follow us on social media for updates!</span>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer Component -->
  <div data-component="footer"></div>

  <!-- JavaScript -->
  <script src="/js/core/component-loader.js"></script>
  <script src="/js/core/path-resolver.js"></script>
  <script src="/js/modules/navigation.js"></script>

  <script>
    // Volunteer Form Handler
    const VolunteerForm = (() => {
      'use strict';

      let volunteerData = null;
      let selectedRole = null;
      let selectedShifts = [];

      const init = async () => {
        // Load volunteer data
        try {
          const response = await fetch('/data/volunteer-roles.json');
          volunteerData = await response.json();

          populateRoles();
          populateRoleDropdown();
          populateShifts();
          setupEventListeners();
        } catch (error) {
          console.error('Failed to load volunteer data:', error);
        }
      };

      const populateRoles = () => {
        const rolesGrid = document.getElementById('rolesGrid');
        if (!rolesGrid || !volunteerData) return;

        rolesGrid.innerHTML = volunteerData.roles.map(role => `
          <div class="role-card" data-role-id="${role.id}">
            <div class="role-header">
              <span class="role-icon">${role.icon}</span>
              <h3 class="role-title">${role.name}</h3>
            </div>
            <p class="role-description">${role.description}</p>
            <div class="role-skills">
              ${role.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>
        `).join('');

        // Add click handlers
        document.querySelectorAll('.role-card').forEach(card => {
          card.addEventListener('click', () => selectRole(card.dataset.roleId));
        });
      };

      const populateRoleDropdown = () => {
        const roleSelect = document.getElementById('role');
        if (!roleSelect || !volunteerData) return;

        const options = volunteerData.roles.map(role =>
          `<option value="${role.id}">${role.name}</option>`
        ).join('');

        roleSelect.innerHTML = '<option value="">Select a role</option>' + options;
      };

      const populateShifts = () => {
        const shiftSelector = document.getElementById('shiftSelector');
        if (!shiftSelector || !volunteerData) return;

        shiftSelector.innerHTML = volunteerData.shifts.map(shift => `
          <div class="shift-option" data-shift-id="${shift.id}">
            <input type="checkbox" id="shift-${shift.id}" name="shifts" value="${shift.id}">
            <label for="shift-${shift.id}">
              <div class="shift-time">${shift.name}</div>
              <div>${shift.date} - ${shift.time}</div>
              <div class="shift-spots">${shift.spotsAvailable} spots available</div>
            </label>
          </div>
        `).join('');

        // Add change handlers
        document.querySelectorAll('.shift-option input').forEach(checkbox => {
          checkbox.addEventListener('change', (e) => {
            const shiftOption = e.target.closest('.shift-option');
            if (e.target.checked) {
              shiftOption.classList.add('selected');
              selectedShifts.push(e.target.value);
            } else {
              shiftOption.classList.remove('selected');
              selectedShifts = selectedShifts.filter(id => id !== e.target.value);
            }
          });
        });
      };

      const selectRole = (roleId) => {
        // Update visual selection
        document.querySelectorAll('.role-card').forEach(card => {
          card.classList.toggle('selected', card.dataset.roleId === roleId);
        });

        // Update dropdown
        document.getElementById('role').value = roleId;
        selectedRole = roleId;
      };

      const setupEventListeners = () => {
        const form = document.getElementById('volunteerForm');
        const roleSelect = document.getElementById('role');

        if (roleSelect) {
          roleSelect.addEventListener('change', (e) => selectRole(e.target.value));
        }

        if (form) {
          form.addEventListener('submit', handleSubmit);
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const submitBtn = e.target.querySelector('.btn-submit');
        const messageDiv = document.getElementById('formMessage');

        // Validate at least one shift is selected
        if (selectedShifts.length === 0) {
          showMessage('Please select at least one shift', 'error');
          return;
        }

        // Add selected shifts to form data
        formData.append('shifts', selectedShifts.join(', '));

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
          const response = await fetch(e.target.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            showMessage(
              '🎉 Thank you for volunteering! We\'ll contact you soon with more details.',
              'success'
            );
            e.target.reset();
            selectedShifts = [];
            document.querySelectorAll('.role-card').forEach(card => card.classList.remove('selected'));
            document.querySelectorAll('.shift-option').forEach(opt => opt.classList.remove('selected'));
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          showMessage(
            'Oops! Something went wrong. Please try again or contact us directly.',
            'error'
          );
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Application';
        }
      };

      const showMessage = (message, type) => {
        const messageDiv = document.getElementById('formMessage');
        if (!messageDiv) return;

        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (type === 'success') {
          setTimeout(() => {
            messageDiv.className = 'form-message';
          }, 10000);
        }
      };

      return { init };
    })();

    // Initialize when DOM is ready
    document.addEventListener('componentsLoaded', () => {
      PathResolver.updatePaths();
      if (typeof Navigation !== 'undefined') {
        Navigation.init();
      }
      VolunteerForm.init();
    });
  </script>
</body>
</html>
EOF

# 3. Update header.html to include Volunteer link
echo "🔧 Updating navigation header..."
sed -i '/<li><a href="\/pages\/news\/" class="nav-link" data-page="news">News<\/a><\/li>/a\
          <li><a href="/pages/volunteer/" class="nav-link" data-page="volunteer">Volunteer</a></li>' components/header.html

# 4. Update footer.html to include Volunteer link
echo "🔧 Updating footer..."
sed -i '/<li><a href="\/#registration">Event Registration<\/a><\/li>/a\
          <li><a href="/pages/volunteer/">Volunteer</a></li>' components/footer.html

# 5. Add Volunteer CTA section to homepage
echo "🏠 Adding volunteer CTA to homepage..."
cat > volunteer-homepage-section.html << 'EOF'
<!-- Volunteer CTA Section - Add this after the Registration section in index.html -->
<section id="volunteer-cta" class="section section-volunteer-cta" aria-labelledby="volunteer-title">
  <div class="container">
    <div class="volunteer-cta-content">
      <div class="volunteer-cta-text">
        <h2 id="volunteer-title">🤝 Be Part of the Magic!</h2>
        <p class="volunteer-subtitle">Join our amazing volunteer team and help make the 2025 festival unforgettable</p>
        <div class="volunteer-perks">
          <span class="perk-item">✓ Free T-Shirt</span>
          <span class="perk-item">✓ Complimentary Lunch</span>
          <span class="perk-item">✓ Service Hours</span>
          <span class="perk-item">✓ First Access to Treats</span>
        </div>
        <p class="volunteer-note">Perfect for students needing service hours or anyone who loves community events!</p>
        <a href="/pages/volunteer/" class="btn btn-primary btn-lg">Become a Volunteer</a>
      </div>
      <div class="volunteer-cta-image">
        <div class="volunteer-stats">
          <div class="stat-item">
            <span class="stat-number">50+</span>
            <span class="stat-label">Volunteers Needed</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">8</span>
            <span class="stat-label">Different Roles</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">4</span>
            <span class="stat-label">Flexible Shifts</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
/* Volunteer CTA Section Styles */
.section-volunteer-cta {
  background: linear-gradient(135deg, var(--color-light) 0%, rgba(140, 191, 63, 0.1) 100%);
  padding: var(--spacing-section) 0;
  position: relative;
  overflow: hidden;
}

.section-volunteer-cta::before {
  content: '🤝';
  position: absolute;
  font-size: 400px;
  opacity: 0.03;
  right: -100px;
  top: 50%;
  transform: translateY(-50%) rotate(-15deg);
}

.volunteer-cta-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;
  position: relative;
  z-index: 1;
}

.volunteer-cta-text h2 {
  color: var(--color-primary);
  font-family: var(--font-decorative);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.volunteer-subtitle {
  font-size: 1.25rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.volunteer-perks {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.perk-item {
  display: inline-flex;
  align-items: center;
  color: var(--color-accent);
  font-weight: var(--font-weight-medium);
  font-size: 1rem;
}

.volunteer-note {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--color-secondary);
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.volunteer-cta-text .btn-lg {
  font-size: 1.125rem;
  padding: 0.875rem 2rem;
  display: inline-block;
}

.volunteer-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
  font-family: var(--font-decorative);
  margin-bottom: 0.5rem;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .volunteer-cta-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .volunteer-cta-text h2 {
    font-size: 2rem;
  }

  .volunteer-subtitle {
    font-size: 1.125rem;
  }

  .volunteer-perks {
    justify-content: center;
  }

  .volunteer-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 1.5rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .volunteer-perks {
    flex-direction: column;
    gap: 0.75rem;
  }

  .perk-item {
    justify-content: center;
  }
}
</style>
EOF

# 6. Update Formspree form ID
echo "⚠️  IMPORTANT: Update Formspree Form ID"
echo "============================================"
echo "1. Go to https://formspree.io and sign up/login"
echo "2. Create a new form for 'Pawpaw Festival Volunteers'"
echo "3. Get your form ID (looks like: f/xyzabc123)"
echo "4. Replace YOUR_FORM_ID in pages/volunteer/index.html"
echo ""

# 7. Create a test file
echo "🧪 Creating test file..."
cat > test-volunteer.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Volunteer System Test</title>
  <style>
    body { font-family: system-ui; padding: 2rem; max-width: 800px; margin: 0 auto; }
    .test { margin: 1rem 0; padding: 1rem; border: 1px solid #ccc; border-radius: 4px; }
    .success { background: #d4edda; border-color: #c3e6cb; color: #155724; }
    .error { background: #f8d7da; border-color: #f5c6cb; color: #721c24; }
    .info { background: #d1ecf1; border-color: #bee5eb; color: #0c5460; }
    h1 { color: #2d5016; }
  </style>
</head>
<body>
  <h1>🧪 Volunteer System Test</h1>

  <div id="test-results"></div>

  <script>
    async function runTests() {
      const results = document.getElementById('test-results');

      // Test 1: Volunteer Roles Data
      try {
        const response = await fetch('/data/volunteer-roles.json');
        const data = await response.json();
        results.innerHTML += `
          <div class="test success">
            ✅ Volunteer roles data loaded successfully<br>
            - ${data.roles.length} roles available<br>
            - ${data.shifts.length} shifts configured<br>
            - Coordinator: ${data.volunteerCoordinator.name}
          </div>
        `;
      } catch (e) {
        results.innerHTML += `<div class="test error">❌ Volunteer roles data failed: ${e.message}</div>`;
      }

      // Test 2: Check page exists
      try {
        const response = await fetch('/pages/volunteer/');
        if (response.ok) {
          results.innerHTML += `<div class="test success">✅ Volunteer page loads successfully</div>`;
        } else {
          throw new Error('Page not found');
        }
      } catch (e) {
        results.innerHTML += `<div class="test error">❌ Volunteer page failed: ${e.message}</div>`;
      }

      // Test 3: Navigation update check
      try {
        const response = await fetch('/components/header.html');
        const html = await response.text();
        if (html.includes('Volunteer')) {
          results.innerHTML += `<div class="test success">✅ Navigation includes Volunteer link</div>`;
        } else {
          throw new Error('Volunteer link not found in navigation');
        }
      } catch (e) {
        results.innerHTML += `<div class="test error">❌ Navigation update failed: ${e.message}</div>`;
      }

      // Test 4: Footer update check
      try {
        const response = await fetch('/components/footer.html');
        const html = await response.text();
        if (html.includes('Volunteer')) {
          results.innerHTML += `<div class="test success">✅ Footer includes Volunteer link</div>`;
        } else {
          throw new Error('Volunteer link not found in footer');
        }
      } catch (e) {
        results.innerHTML += `<div class="test error">❌ Footer update failed: ${e.message}</div>`;
      }

      // Info message
      results.innerHTML += `
        <div class="test info">
          ℹ️ <strong>Next Steps:</strong><br>
          1. Replace YOUR_FORM_ID with your Formspree ID in /pages/volunteer/index.html<br>
          2. Add volunteer CTA section to index.html (see volunteer-homepage-section.html)<br>
          3. Test the form submission<br>
          4. Commit changes to git
        </div>
      `;

      // Links to test
      results.innerHTML += `
        <div class="test info">
          🔗 <strong>Quick Links:</strong><br>
          <a href="/pages/volunteer/" target="_blank">View Volunteer Page</a> |
          <a href="/data/volunteer-roles.json" target="_blank">View Roles Data</a> |
          <a href="/" target="_blank">View Homepage</a>
        </div>
      `;
    }

    runTests();
  </script>
</body>
</html>
EOF

# 8. Create directory structure if needed
echo "📁 Ensuring directory structure..."
mkdir -p pages/volunteer

# 9. Summary
echo ""
echo "✅ Phase 3: Volunteer System Implementation Complete!"
echo "====================================================="
echo ""
echo "📋 What was created:"
echo "  • /data/volunteer-roles.json - Volunteer data structure"
echo "  • /pages/volunteer/index.html - Complete volunteer page"
echo "  • Updated navigation in header.html"
echo "  • Updated footer with volunteer link"
echo "  • volunteer-homepage-section.html - CTA section for homepage"
echo "  • test-volunteer.html - Test suite"
echo ""
echo "⚠️  MANUAL STEPS REQUIRED:"
echo "  1. Get Formspree Form ID:"
echo "     - Go to https://formspree.io"
echo "     - Create form: 'Pawpaw Festival Volunteers'"
echo "     - Replace YOUR_FORM_ID in pages/volunteer/index.html"
echo ""
echo "  2. Add volunteer CTA to homepage:"
echo "     - Open index.html"
echo "     - Find the Registration section"
echo "     - Add content from volunteer-homepage-section.html after it"
echo ""
echo "  3. Test the system:"
echo "     - Open test-volunteer.html in browser"
echo "     - Visit /pages/volunteer/ to test the page"
echo "     - Submit a test form"
echo ""
echo "  4. Commit changes:"
echo "     git add -A"
echo "     git commit -m 'feat: Phase 3 - Volunteer System Implementation'"
echo ""
echo "📊 Phase 3 Deliverables:"
echo "  ✅ Volunteer page with form"
echo "  ✅ Roles & shifts data structure"
echo "  ✅ Navigation updates"
echo "  ✅ Formspree integration ready"
echo "  ✅ Mobile-responsive design"
echo "  ✅ Accessibility features"
echo ""
echo "🚀 Next Phase: Phase 4 - News System (Jekyll integration)"
EOF

# Done!
echo "Script created successfully! Run it with: ./implement-phase3.sh"