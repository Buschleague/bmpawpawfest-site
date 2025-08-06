# Boston Mountain Pawpaw Festival - Development Roadmap

## ✅ Completed Phases (August 2025)

### Phase 1: Core Restructure ✅
**Completed: August 4, 2025**
- Removed multi-event architecture
- Updated all brand references  
- Domain & SEO updates
- Created countdown timer
- Built schedule system with filtering
- Implemented gallery with lightbox
- Updated hero section
- Created pawpaw-themed design system

### Phase 2: Mobile-First Responsive ✅
**Completed: August 5, 2025**
- Fixed hero section viewport issues
- Implemented slide-from-right mobile menu
- Added touch-friendly tap targets (44x44px min)
- Fixed all horizontal scroll issues
- Optimized font sizes for mobile readability
- Added mobile breakpoints for all components

### Phase 0: Foundation & Safety Nets ✅
**Completed: August 6, 2025**
- Created `refactor-sitewide` branch
- Setup GitHub Actions CI with html-proofer
- Automated HTML regression testing
- Link and image validation in place

### Phase 1: Content Decoupling ✅
**Completed: August 6, 2025**
- Created `data/festival-config.json` with dates, locations, registration links
- Extracted schedule to `data/schedule-2025.json`
- Extracted gallery to `data/gallery-2024.json`
- Updated `countdown.js` to read from config
- Updated `schedule.js` to load from JSON
- Updated `gallery.js` to support year-based loading
- All hardcoded data removed from JavaScript

## 🚀 Refactoring Roadmap (August 2025 - Forward)

### Legend
- **P0** = Must complete before anything else (blocking)
- **P1** = High-impact early work (critical path)
- **P2** = Nice-to-have / can run in parallel
- **Deliverable** = Tangible outcome of each step

---

## Phase 2: Style System Re-org 🔴 NEXT UP

| Priority | Task | Key Steps | Deliverable |
|----------|------|-----------|-------------|
| **P1** | Introduce Sass build | • Move existing CSS into `scss/` partials<br>• Add GitHub Action to compile to `/css` on push<br>• Setup source maps for development<br>• Create `_variables.scss`, `_mixins.scss` | Compiled CSS + CI pipeline |
| **P1** | Consolidate duplicated rules | • DRY up `.filter-btn`, hero banners, etc.<br>• Standardize spacing via CSS vars + Sass mixins<br>• Create component library<br>• Extract common patterns | Single-source component styles |
| **P2** | Performance pass | • PostCSS autoprefixer + cssnano in build<br>• Inline critical CSS (~2KB) if CLS matters<br>• Lazy-load non-critical styles<br>• Bundle and minify | Smaller payload, faster FCP |

**Timeline**: 3-4 days  
**Dependencies**: None (can start immediately)  
**Risk**: Low (progressive enhancement)

---

## Phase 3: New Features - Volunteer System

| Priority | Task | Key Steps | Deliverable |
|----------|------|-----------|-------------|
| **P1** | Volunteer page & form | • Create `pages/volunteer/index.html` with hero + info<br>• Add Formspree form with validation<br>• Dropdown populated from `data/volunteer-roles.json`<br>• JS success message | Live signup page |
| **P1** | Nav + CTA updates | • Add "Volunteer" to navbar & footer<br>• Add homepage banner/button<br>• Update mobile menu | Improved discoverability |
| **P2** | Role analytics (optional) | • Log submission JSON to Supabase/Airtable<br>• Create webhook from Formspree<br>• Basic dashboard | Lightweight analytics |

**Timeline**: 2-3 days  
**Dependencies**: None  
**Risk**: Low (new feature)

---

## Phase 4: News System

| Priority | Task | Key Steps | Deliverable |
|----------|------|-----------|-------------|
| **P1** | Enable Jekyll | • Add `_config.yml` with `collections: news`<br>• Create `_news/2025-08-06-sample.md` markdown<br>• Configure permalink structure | Auto-built `/news/` pages & RSS |
| **P1** | News landing template | • Liquid loop over `site.news` to build list<br>• Add pagination (Jekyll-paginate)<br>• Style article cards | `/news/index.html` |
| **P2** | Homepage integration | • Fetch first 3 posts via Jekyll include<br>• Create "Latest News" widget<br>• Add to homepage | Dynamic news snippet |

**Timeline**: 4-5 days  
**Dependencies**: None  
**Risk**: Medium (Jekyll integration)

---

## Phase 5: Build & Deploy Enhancements

| Priority | Task | Key Steps | Deliverable |
|----------|------|-----------|-------------|
| **P2** | Bundle & cache-bust JS | • Add esbuild step in GitHub Actions<br>• Minify & hash `main.[hash].js`<br>• Update script tags dynamically | Smaller JS, long-term caching |
| **P2** | Lighthouse & a11y audit | • Fix contrast issues<br>• Add missing alt-text<br>• Improve form labels | >90 Lighthouse scores |
| **P2** | PWA enhancements | • Update service worker<br>• Add offline fallback page<br>• Cache strategy for images | Offline support |

**Timeline**: 2-3 days  
**Dependencies**: Phase 2  
**Risk**: Low

---

## Phase 6: Documentation & Handoff

| Priority | Task | Deliverable |
|----------|------|-----------|-------------|
| **P1** | `CONTRIBUTING.md` authoring guide | Steps for adding schedule items, gallery photos, news posts, volunteer roles |
| **P1** | Data management guide | Document JSON structure and update process |
| **P1** | Admin walkthrough video (optional) | 5-min Loom video for non-dev staff |

**Timeline**: 1-2 days  
**Dependencies**: All phases  
**Risk**: None

---

## Current Status (August 6, 2025)

### ✅ Completed
- Core restructure and architecture (100%)
- Mobile-first responsive design (100%)
- Foundation: CI/CD pipeline with automated testing (100%)
- Content decoupling: All data in JSON files (100%)

### 🚀 Ready to Start
- **Phase 2**: Style System Re-org (P1 - NEXT)
- **Immediate Priority**: Sass build system and style consolidation

### 📊 Success Metrics
- ✅ Hero doesn't block mobile viewport
- ✅ No horizontal scrolling
- ✅ All CTAs are tappable (44x44px minimum)
- ✅ Navigation works smoothly
- ✅ Content is readable without zooming
- ✅ Mobile-friendly throughout
- ✅ Automated testing pipeline (html-proofer)
- ✅ Content managed via JSON (festival-config, schedule, gallery)
- ⏳ Sass-based style system (Phase 2)
- ⏳ Volunteer recruitment system (Phase 3)
- ⏳ Dynamic news system (Phase 4)
- ⏳ Optimized build pipeline (Phase 5)

### 🎯 Sprint Goals (Next Week)
1. **Days 1-3**: Complete Phase 2 (Sass & Style System)
2. **Days 4-5**: Complete Phase 3 (Volunteer System)
3. **Days 6-7**: Begin Phase 4 (News System)

## Technical Stack Evolution

### Current Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Data**: JSON files (festival-config, schedule-2025, gallery-2024)
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions with html-proofer
- **Architecture**: Component-based with dynamic data loading

### Target Stack (Post-Refactor)
- **Frontend**: HTML/Sass/Modern JavaScript
- **Static Site Generator**: Jekyll
- **Build Pipeline**: GitHub Actions (Sass, JS bundling, optimization)
- **Content Management**: JSON files + Markdown (for news)
- **Forms**: Formspree
- **CI/CD**: GitHub Actions with testing and deployment

## Implementation Notes

### Phase 2 (Sass Setup)
```yaml
# .github/workflows/build.yml
name: Build and Deploy
on:
  push:
    branches: [ main, refactor-sitewide ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build Sass
        run: npm run build:sass
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Phase 3 (Volunteer Form)
```html
<!-- Formspree integration -->
<form action="https://formspree.io/f/{YOUR_FORM_ID}" method="POST">
  <select name="role" required>
    <!-- Populated from volunteer-roles.json -->
  </select>
  <button type="submit">Sign Up to Volunteer</button>
</form>
```

### Phase 4 (Jekyll Config)
```yaml
# _config.yml
title: Boston Mountain Pawpaw Festival
url: https://pawpawfestar.org
collections:
  news:
    output: true
    permalink: /news/:year/:month/:title/
plugins:
  - jekyll-paginate
  - jekyll-sitemap
  - jekyll-feed
```

## Risk Mitigation

1. **Progressive Enhancement**: Each phase can deploy independently
2. **Feature Flags**: Use data attributes to toggle new features
3. **Rollback Strategy**: Git tags at each phase completion
4. **Testing**: Automated tests prevent regressions
5. **Documentation**: Update README.md with each phase

## Success Criteria

- [x] All content is data-driven (no hardcoded dates/info)
- [x] CI/CD pipeline with automated testing
- [ ] Build process is automated via CI/CD (Phase 2)
- [ ] Non-technical users can update content (Phase 6)
- [ ] Lighthouse scores > 90 across all metrics (Phase 5)
- [ ] Volunteer signups are functional (Phase 3)
- [ ] News system is live with RSS feed (Phase 4)
- [ ] Documentation enables self-service updates (Phase 6)

## Recent Achievements 🎉

### August 6, 2025
- **Automated Testing**: GitHub Actions CI with html-proofer prevents broken links/images
- **Data Liberation**: All festival data moved to JSON files for easy updates
- **Dynamic Loading**: JavaScript modules now fetch data asynchronously
- **Future-Proofing**: Gallery system supports multiple years automatically
- **Developer Experience**: Clean separation of concerns, better maintainability

## Next Actions

1. **Immediate (Today)**: 
   - Set up npm/package.json for Sass build
   - Create `scss/` directory structure
   - Move first CSS file to Sass

2. **Tomorrow**:
   - Complete Sass migration
   - Set up GitHub Action for Sass compilation
   - Create mixins for common patterns

3. **This Week**:
   - Complete Phase 2 (Style System)
   - Start Phase 3 (Volunteer System)

---

**Last Updated:** August 6, 2025  
**Current Phase:** Phase 2 - Style System Re-org  
**Status:** Ready to begin Sass implementation  
**Next Action:** Install Sass and create build pipeline