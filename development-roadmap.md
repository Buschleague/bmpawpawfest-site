# Boston Mountain Pawpaw Festival - Development Roadmap

## ✅ Completed Phases (August 2025)

### Phase 1: Core Restructure ✅
- Removed multi-event architecture
- Updated all brand references  
- Domain & SEO updates
- Created countdown timer
- Built schedule system with filtering
- Implemented gallery with lightbox
- Updated hero section
- Created pawpaw-themed design system

### Phase 2: Mobile-First Responsive ✅
- Fixed hero section viewport issues
- Implemented slide-from-right mobile menu
- Added touch-friendly tap targets (44x44px min)
- Fixed all horizontal scroll issues
- Optimized font sizes for mobile readability
- Added mobile breakpoints for all components

## 🚀 Refactoring Roadmap (August 2025 - Forward)

### Legend
- **P0** = Must complete before anything else (blocking)
- **P1** = High-impact early work (critical path)
- **P2** = Nice-to-have / can run in parallel
- **Deliverable** = Tangible outcome of each step

---

## Phase 0: Foundation & Safety Nets 🔴 NEXT UP

| Priority | Task | Key Steps | Deliverable |
|----------|------|-----------|-------------|
| **P0** | Create refactor branch | • Create `refactor` branch<br>• Enable GitHub Actions in repo<br>• Setup PR protection rules | Branch + basic CI skeleton |
| **P0** | Automated HTML regression test | • Add `html-proofer` or equivalent to CI<br>• Configure to fail on broken links/images<br>• Test against current site | CI check preventing regressions |

**Timeline**: 1-2 days  
**Dependencies**: None  
**Risk**: Low

---

## Phase 1: Content Decoupling

| Priority | Task | Key Steps | Deliverable |
|----------|------|-----------|-------------|
| **P1** | Global data directory & config file | • Create `data/festival.json` with year, dates, locations<br>• Refactor countdown script to read from config<br>• Update all hardcoded 2025 references | Central JSON + updated `main.js` |
| **P1** | Schedule extraction | • Move hard-coded array to `data/schedule-2025.json`<br>• Replace in `schedule.js` with `fetch()` loader<br>• Update rendering logic to accept data param | Dynamic schedule system |
| **P1** | Gallery modularization | • Create `data/gallery-2024.json` (use current items)<br>• Update `gallery.js` to load `[year].json` automatically<br>• Generate filter buttons from JSON categories | Year-switched gallery |

**Timeline**: 3-4 days  
**Dependencies**: Phase 0  
**Risk**: Medium (data migration)

---

## Phase 2: Style System Re-org

| Priority | Task | Key Steps | Deliverable |
|----------|------|-----------|-------------|
| **P1** | Introduce Sass build | • Move existing CSS into `scss/` partials<br>• Add GitHub Action to compile to `/css` on push<br>• Setup source maps for development | Compiled CSS + CI pipeline |
| **P1** | Consolidate duplicated rules | • DRY up `.filter-btn`, hero banners, etc.<br>• Standardize spacing via CSS vars + Sass mixins<br>• Create component library | Single-source component styles |
| **P2** | Performance pass | • PostCSS autoprefixer + cssnano in build<br>• Inline critical CSS (~2KB) if CLS matters<br>• Lazy-load non-critical styles | Smaller payload, faster FCP |

**Timeline**: 3-4 days  
**Dependencies**: Phase 0  
**Risk**: Low (progressive enhancement)

---

## Phase 3: New Features - Volunteer System

| Priority | Task | Key Steps | Deliverable |
|----------|------|-----------|-------------|
| **P1** | Volunteer page & form | • Create `pages/volunteer/index.html` with hero + info<br>• Add Formspree form with validation<br>• Dropdown populated from `data/volunteer-roles.json`<br>• JS success message | Live signup page |
| **P1** | Nav + CTA updates | • Add "Volunteer" to navbar & footer<br>• Add homepage banner/button<br>• Update mobile menu | Improved discoverability |
| **P2** | Role analytics (optional) | • Log submission JSON to Supabase/Airtable<br>• Create webhook from Formspree<br>• Basic dashboard | Lightweight analytics |

**Timeline**: 2-3 days  
**Dependencies**: Phase 1  
**Risk**: Low (new feature)

---

## Phase 4: News System

| Priority | Task | Key Steps | Deliverable |
|----------|------|-----------|-------------|
| **P1** | Enable Jekyll | • Add `_config.yml` with `collections: news`<br>• Create `_news/2025-08-06-sample.md` markdown<br>• Configure permalink structure | Auto-built `/news/` pages & RSS |
| **P1** | News landing template | • Liquid loop over `site.news` to build list<br>• Add pagination (Jekyll-paginate)<br>• Style article cards | `/news/index.html` |
| **P2** | Homepage integration | • Fetch first 3 posts via JS or Jekyll include<br>• Create "Latest News" widget<br>• Add to homepage | Dynamic news snippet |

**Timeline**: 4-5 days  
**Dependencies**: Phase 1  
**Risk**: Medium (Jekyll integration)

---

## Phase 5: Build & Deploy Enhancements

| Priority | Task | Key Steps | Deliverable |
|----------|------|-----------|-------------|
| **P2** | Bundle & cache-bust JS | • Add esbuild step in GitHub Actions<br>• Minify & hash `main.[hash].js`<br>• Inject hash via Jekyll include | Smaller JS, long-term caching |
| **P2** | Lighthouse & a11y audit | • Fix contrast issues<br>• Add missing alt-text<br>• Improve form labels | >90 Lighthouse scores |

**Timeline**: 2-3 days  
**Dependencies**: Phase 4  
**Risk**: Low

---

## Phase 6: Documentation & Handoff

| Priority | Task | Deliverable |
|----------|------|-------------|
| **P1** | `CONTRIBUTING.md` authoring guide | Steps for adding schedule items, gallery photos, news posts, volunteer roles |
| **P1** | Admin walkthrough video (optional) | 5-min Loom video for non-dev staff |

**Timeline**: 1-2 days  
**Dependencies**: All phases  
**Risk**: None

---

## Current Status (August 6, 2025)

### ✅ Completed
- Core restructure and architecture (100%)
- Mobile-first responsive design (100%)
- Foundation: Single festival focus, component system, mobile optimization

### 🚀 Ready to Start
- **Phase 0**: Foundation & Safety Nets (P0 - BLOCKING)
- **Immediate Priority**: Setup CI/CD pipeline and testing

### 📊 Success Metrics
- ✅ Hero doesn't block mobile viewport
- ✅ No horizontal scrolling
- ✅ All CTAs are tappable (44x44px minimum)
- ✅ Navigation works smoothly
- ✅ Content is readable without zooming
- ✅ Mobile-friendly throughout
- ⏳ Automated testing pipeline (Phase 0)
- ⏳ Content managed via JSON (Phase 1)
- ⏳ Sass-based style system (Phase 2)
- ⏳ Volunteer recruitment system (Phase 3)
- ⏳ Dynamic news system (Phase 4)

### 🎯 Sprint Goals (Next 2 Weeks)
1. **Week 1**: Complete Phase 0 & 1 (Foundation + Content Decoupling)
2. **Week 2**: Complete Phase 2 & 3 (Styles + Volunteer System)

## Technical Stack Evolution

### Current Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Hosting**: GitHub Pages
- **Architecture**: Component-based with dynamic loading

### Target Stack (Post-Refactor)
- **Frontend**: HTML/Sass/Modern JavaScript
- **Static Site Generator**: Jekyll
- **Build Pipeline**: GitHub Actions
- **Content Management**: JSON files + Markdown
- **Forms**: Formspree
- **CI/CD**: GitHub Actions with testing

## Implementation Notes

### Phase 0 (Foundation)
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: HTML Proofer
        uses: chabad360/htmlproofer@master
        with:
          directory: "."
          arguments: --assume-extension --disable-external
```

### Phase 1 (Content Decoupling)
```json
// data/festival.json
{
  "year": 2025,
  "date": "2025-09-20",
  "registration": {
    "vendor": "https://www.beardandlady.com/...",
    "cornhole": "https://thegardenofeden1999.com/...",
    "pageant": "https://thegardenofeden1999.com/..."
  }
}
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

## Risk Mitigation

1. **Progressive Enhancement**: Each phase can deploy independently
2. **Feature Flags**: Use data attributes to toggle new features
3. **Rollback Strategy**: Git tags at each phase completion
4. **Testing**: Automated tests prevent regressions
5. **Documentation**: Update README.md with each phase

## Success Criteria

- [ ] All content is data-driven (no hardcoded dates/info)
- [ ] Build process is automated via CI/CD
- [ ] Non-technical users can update content
- [ ] Lighthouse scores > 90 across all metrics
- [ ] Volunteer signups are functional
- [ ] News system is live with RSS feed
- [ ] Documentation enables self-service updates

---

**Last Updated:** August 6, 2025  
**Current Phase:** Phase 0 - Foundation & Safety Nets  
**Status:** Planning complete, ready for implementation  
**Next Action:** Create refactor branch and setup CI pipeline