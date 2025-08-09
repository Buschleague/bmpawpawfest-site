# Boston Mountain Pawpaw Festival Website

Official website for the annual Boston Mountain Pawpaw Festival in Chester, Arkansas. This site serves as the primary information hub for festival attendees, vendors, and pawpaw enthusiasts.

## About the Festival

The Boston Mountain Pawpaw Festival celebrates Arkansas's largest native fruit with a full day of:
- 🥧 Pawpaw desserts and treats
- 🎵 Live music performances
- 🌱 Growing workshops
- 👑 Pawpaw pageant
- 🎯 Family activities
- 🛍️ Local vendors

**2025 Festival Date:** September 20, 2025  
**Location:** Beard & Lady Inn, Chester, AR

## Project Structure

```
bmpawpawfest-site/
├── index.html              # Main landing page
├── components/             # Shared HTML partials (header, footer)
├── pages/                  # Standalone pages (about, vendors, etc.)
├── data/                   # JSON data sources
│   ├── festival-config.json
│   ├── schedule-2025.json
│   ├── gallery-2024.json
│   └── volunteer-roles.json
├── js/
│   ├── core/               # Component loader utilities
│   └── modules/            # Feature modules (countdown, navigation, schedule, gallery)
├── scss/                   # Source Sass files
├── css/                    # Compiled CSS output
├── assets/                 # Images and icons
└── package.json            # Project metadata and scripts
```

## Key Features

### Data-Driven Content
- Festival details, schedules, galleries, and volunteer roles loaded from JSON
- Content updates without touching markup or scripts

### Component-Based Pages
- Reusable header and footer loaded on every page
- Page templates kept in the `pages/` directory

### Gallery & Media
- Lightbox gallery with support for multiple years
- Lazy-loaded images and sponsor logos

### Countdown & Schedule
- Countdown timer to event day
- Filterable schedule timeline powered by JSON data

### Responsive & Accessible
- Mobile-first design with touch-friendly navigation
- Semantic HTML, ARIA landmarks, and keyboard support

### Continuous Integration
- GitHub Actions runs html-proofer tests on every push
- Automatic sitemap updates and GitHub Pages deployment

## Development

### Getting Started

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Build styles
   ```bash
   npm run build:sass # or npm run watch:sass
   ```
4. Serve the site locally
   ```bash
   # Using Python
   python -m http.server 8000

   # Or using Node.js
   npx http-server
   ```

### Customization

- **Styles**: Edit Sass files in `scss/` and recompile
- **Content**: Update JSON data in `data/`
- **Pages**: Modify HTML in `pages/` or `components/`

## Deployment

The site is deployed via GitHub Pages:

1. Push changes to `main` branch
2. GitHub Actions automatically updates the sitemap
3. Site is live at [pawpawfestar.org](https://pawpawfestar.org)

## Roadmap

Development progress and upcoming work are tracked in [development-roadmap.md](development-roadmap.md). Major next steps include:

- **Phase 2 – Style System Re-org**: migrate CSS to Sass, consolidate styles, and optimize with PostCSS
- **Phase 3 – Volunteer System**: dedicated volunteer page and Formspree-powered signup form
- **Phase 4 – News System**: Jekyll-powered news posts with RSS feed
- **Phase 5 – Build & Deploy Enhancements**: JS bundling, Lighthouse and accessibility audits, PWA improvements
- **Phase 6 – Documentation & Handoff**: expand docs for non-technical contributors

## Contributing

To contribute to the festival website:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Contact

- **Website**: [pawpawfestar.org](https://pawpawfestar.org)
- **Email**: info@pawpawfestar.org
- **Facebook**: [Boston Mountain Pawpaw Festival](https://facebook.com/bostonmountainpawpawfestival)
- **Instagram**: [@bmpawpawfest](https://instagram.com/bmpawpawfest)

## License

© 2025 Boston Mountain Pawpaw Festival. All rights reserved.

---

*Celebrating Arkansas's native treasure in the heart of the Ozarks* 🌿