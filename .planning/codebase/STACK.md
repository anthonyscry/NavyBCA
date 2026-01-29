# Technology Stack

**Analysis Date:** 2026-01-28

## Languages

**Primary:**
- HTML5 - Structure and content (semantic markup)
- CSS3 - Styling (CSS Variables, Flexbox, Grid)
- JavaScript (ES6+) - Application logic (Vanilla JS, no frameworks)

**Secondary:**
- CSV - Data storage for BCA lookup tables
- JSON - Configuration and data (manifest, exercises)

## Runtime

**Environment:**
- Browser (Client-side only)
- No server-side runtime required

**Package Manager:**
- npm (dev dependencies only, if used locally)
- No `package.json` dependencies for production (CDN only)

## Frameworks

**Core:**
- None (Vanilla JavaScript) - `index.html`, `security.js`, `shared-utils.js`

**Testing:**
- Jest - Unit testing (configuration present: `jest.config.js`)
- Playwright - E2E testing (configuration present: `playwright.config.js`)

**Build/Dev:**
- Python `http.server` or `npx serve` - Local development server

## Key Dependencies

**Critical:**
- `pdf-lib` (via CDN) - PDF generation for NAVPERS 6110/10 forms

**Infrastructure:**
- None (Static hosting)

## Configuration

**Environment:**
- No environment variables (client-side only)
- Configuration embedded in HTML head (Analytics/AdSense IDs)

**Build:**
- `jest.config.js` - Test configuration
- `playwright.config.js` - E2E test configuration
- `codecov.yml` - Code coverage configuration

## Platform Requirements

**Development:**
- Web browser (Chrome, Firefox, Safari, Edge)
- Local HTTP server (Python or Node.js) for CSV fetching

**Production:**
- Any static file host (GitHub Pages, Netlify, Vercel, AWS S3)
- HTTPS required for Service Worker/PWA features

---

*Stack analysis: 2026-01-28*
