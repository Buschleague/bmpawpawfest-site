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
pawpaw-festival/
├── index.html              # Main HTML file
├── css/                    # Stylesheets
│   ├── utilities/          # Utility styles
│   │   ├── variables.css   # CSS custom properties (pawpaw theme colors)
│   │   ├── reset.css       # Modern CSS reset
│   │   ├── base.css        # Base typography and elements
│   │   └── responsive.css  # Responsive utilities
│   └── components/         # Component-specific styles
│       ├── header.css      # Header and navigation with dropdowns
│       ├── hero.css        # Hero section with countdown
│       ├── schedule.css    # Festival schedule timeline
│       ├── activities.css  # Quick info cards and features
│       └── footer.css      # Footer and contact
├── js/                     # JavaScript modules
│   ├── navigation.js       # Navigation and mobile menu
│   ├── schedule.js         # Schedule display and filtering
│   ├── countdown.js        # Countdown timer to festival
│   └── main.js             # Main app initialization
├── data/                   # Data files
│   └── festival-2025.json  # Festival information and schedule
└── assets/                 # Static assets
    ├── images/             # Image files
    │   ├── hero-*.jpg      # Hero and feature images
    │   ├── gallery/        # Photo gallery (coming soon)
    │   └── sponsors/       # Sponsor logos
    └── icons/              # Favicon and app icons
```

## Key Features

### 1. **Festival Information Hub**
- Comprehensive schedule with filtering by activity type
- Vendor directory and application information
- Interactive location/parking details
- FAQ section for common questions

### 2. **Countdown Timer**
- Dynamic countdown to festival date
- Special states for final week/day
- Automatic display updates during festival

### 3. **Responsive Design**
- Mobile-first approach
- Touch-friendly navigation
- Optimized for all devices

### 4. **Accessibility**
- Semantic HTML structure
- ARIA labels and landmarks
- Keyboard navigation support
- Screen reader optimized

### 5. **Performance Optimized**
- Modular CSS/JS architecture
- Lazy loading for images
- Progressive enhancement
- PWA-ready structure

## Development

### Getting Started

1. Clone the repository
2. Open `index.html` in a web browser
3. No build process required for basic development

### Local Development

```bash
# Serve files locally (using Python)
python -m http.server 8000

# Or using Node.js
npx http-server
```

### Customization

- **Colors**: Edit CSS variables in `css/utilities/variables.css`
- **Schedule**: Update events in `data/festival-2025.json`
- **Content**: Modify section content in `index.html`

## Deployment

The site is deployed via GitHub Pages:

1. Push changes to `main` branch
2. GitHub Actions automatically updates the sitemap
3. Site is live at [pawpawfestar.org](https://pawpawfestar.org)

## Future Enhancements

- [ ] Photo gallery from previous festivals
- [ ] News/blog system for updates
- [ ] Online vendor applications
- [ ] Ticket sales integration
- [ ] Interactive festival map
- [ ] Email newsletter signup
- [ ] Social media feed integration

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