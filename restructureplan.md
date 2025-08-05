# Boston Mountain Pawpaw Festival - Phase 1 Restructure Plan

## Navigation Structure Update

### Current Navigation:
- Home
- About  
- Events
- Contact

### New Navigation Structure:
```
Primary Navigation:
- Home
- About
  - Festival History
  - What are Pawpaws?
  - Our Mission
- Festival Info
  - Schedule
  - Location & Parking
  - What to Bring
  - FAQ
- Gallery
  - 2024 Photos
  - Videos
- News & Updates
- Vendors & Sponsors
  - Become a Vendor
  - Sponsor Opportunities
  - Vendor List
- Contact

Sticky CTA: "Get Tickets" (floating button)
```

## Technical Debt Cleanup Tasks

### 1. **Remove Multi-Event Architecture**
- Delete/refactor `events.js` to focus on single festival activities/schedule
- Remove event grid system from `events.css`
- Transform event cards into activity/schedule cards
- Update data structure from multiple events to single festival with activities

### 2. **Update All Brand References**
Files to update:
- `index.html` - title, meta tags, headers, content
- `manifest.json` - app name and description
- `README.md` - project description
- `humans.txt` - team info
- All CSS files - remove "Ozark Events Hub" comments
- All JS files - console logs and comments
- `sitemap.xml` - update URLs and structure

### 3. **Domain & SEO Updates**
- `CNAME` - already set to pawpawfestar.org ✓
- Update all meta descriptions
- Change Open Graph tags
- Update structured data schemas
- Update robots.txt site reference

## Image Asset Requirements

### Icons & Favicon Set
All icons should feature a stylized pawpaw fruit or leaf design:

```
/assets/icons/
├── favicon.ico (multi-size favicon)
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png (180x180)
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
└── icon-512x512.png
```

### Primary Images

```
/assets/images/
├── hero-pawpaw-festival.jpg (1920x800)
│   └── Hero image: Festival atmosphere with pawpaws in foreground
├── og-image.jpg (1200x630)
│   └── Open Graph: Festival logo/date for social sharing
├── logo-primary.png (500x500)
│   └── Main festival logo with transparent background
├── logo-white.png (500x500)
│   └── White version for dark backgrounds
├── pawpaw-fruit.jpg (800x600)
│   └── Beautiful close-up of ripe pawpaws
├── festival-crowd.jpg (1200x800)
│   └── Previous year's festival atmosphere
├── ozark-mountains.jpg (1200x800)
│   └── Scenic backdrop of Boston Mountains
├── vendor-scene.jpg (1200x800)
│   └── Bustling vendor area from previous year
├── live-music.jpg (1200x800)
│   └── Performance stage with crowd
├── pawpaw-desserts.jpg (800x600)
│   └── Display of pawpaw treats and foods
├── workshop-scene.jpg (800x600)
│   └── People learning about pawpaw cultivation
└── pageant-winner.jpg (800x600)
    └── Previous year's Pawpaw Queen/King
```

### Gallery Thumbnails (Phase 2)
```
/assets/images/gallery/
├── thumbs/
│   └── (Multiple 400x300 thumbnails)
└── full/
    └── (Full resolution images)
```

### Screenshot Updates for PWA
```
/assets/images/
├── screenshot-desktop.png (1280x720)
│   └── Desktop view of new festival site
└── screenshot-mobile.png (375x667)
    └── Mobile view of new festival site
```

## Color Scheme Recommendations

Based on pawpaw theme:
```css
:root {
  /* Updated Pawpaw Festival Colors */
  --color-primary: #2d5016;        /* Deep pawpaw green */
  --color-primary-dark: #1a2f0d;   /* Darker green */
  --color-accent: #8cbf3f;         /* Keep bright green (pawpaw flesh) */
  --color-accent-hover: #7aa835;   /* Keep hover state */
  --color-secondary: #f4a460;      /* Sandy brown (ripe pawpaw) */
  --color-tertiary: #8b4513;       /* Saddle brown (tree bark) */
  
  /* Existing neutrals work well */
  --color-light: #f5f5f5;
  --color-white: #ffffff;
  --color-text: #333333;
  --color-text-light: #666666;
}
```

## File Structure After Phase 1

```
pawpaw-festival/
├── index.html              # Updated single-page layout
├── css/
│   ├── utilities/          # No changes needed
│   └── components/
│       ├── header.css      # Update for new nav
│       ├── hero.css        # New festival hero
│       ├── schedule.css    # Renamed from events.css
│       ├── activities.css  # New for festival activities
│       └── footer.css      # Update contact info
├── js/
│   ├── navigation.js       # Update for new nav items
│   ├── schedule.js         # Renamed from events.js
│   ├── countdown.js        # New countdown timer
│   └── main.js            # Update branding
├── data/
│   └── festival-2025.json  # New data structure
└── assets/
    └── (Updated images as listed above)
```

## Implementation Order

1. **Update CNAME and basic branding** ✓
2. **Clean up all "Ozark Events Hub" references**
3. **Update navigation structure in HTML**
4. **Refactor events system to schedule/activities**
5. **Update color scheme in variables.css**
6. **Replace hero image and update hero section**
7. **Update meta tags and SEO elements**
8. **Add countdown timer feature**
9. **Update footer with festival-specific info**
10. **Create new data structure for festival activities**

## Next Steps

After completing Phase 1:
- Set up basic page templates for new sections
- Implement sticky "Get Tickets" CTA
- Add countdown timer to hero
- Begin Phase 2 with Gallery and News systems