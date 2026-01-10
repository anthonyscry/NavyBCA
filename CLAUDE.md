# CLAUDE.md - NavyBCA Project Guide

> A reference guide for Claude instances working on the Navy BCA Calculator project.

## Project Overview

**Navy BCA Calculator** is a free, client-side web application for U.S. Navy personnel to calculate Body Composition Assessment (BCA) scores and prepare for Physical Readiness Tests (PRT).

- **Type**: Static HTML/JavaScript website (no backend/build process)
- **Target Users**: Active-duty sailors, reserve personnel, military fitness trainers
- **Live Site**: https://navybca.com/
- **Repository**: https://github.com/anthonyscry/NavyBCA

## Key Features

| Feature | File | Description |
|---------|------|-------------|
| BCA Calculator | `index.html` | Main calculator - body fat %, waist-to-height ratio, pass/fail |
| PT Session Generator | `generator.html` | 60-minute workout sessions with 400+ exercises |
| PT Watchbill Generator | `watchbill.html` | Monthly PT schedules with CFL rotation |
| PRT Prep Guide | `prt-prep.html` | 8-week Physical Readiness Test preparation program |
| Exercise Library | `exercises.html` | Searchable exercise database with 400+ exercises |

## Directory Structure

```
NavyBCA/
├── Core Pages
│   ├── index.html              # Main BCA Calculator (primary entry point)
│   ├── generator.html          # PT Session Generator
│   ├── watchbill.html          # PT Watchbill Generator
│   ├── exercises.html          # Exercise Library
│   ├── prt-prep.html           # PRT Prep Guide
│   ├── references.html         # Official documents & sources
│   ├── about.html              # About page
│   ├── privacy.html            # Privacy policy
│   └── terms.html              # Terms of service
│
├── Shared JavaScript
│   ├── security.js             # Security utilities (sanitization, validation)
│   ├── shared-utils.js         # Common utilities (notifications, loading, etc.)
│   └── exercises-data.js       # Exercise database (400+ exercises)
│
├── Shared Styles
│   └── styles.css              # Design system with CSS variables
│
├── Data Files
│   ├── male_bca_table_FULL_NORMALIZED.csv      # Male BCA lookup table
│   └── female_bca_table_FULL_NORMALIZED.csv    # Female BCA lookup table
│
├── Offline Versions
│   ├── offline.html            # Offline BCA calculator (~553KB)
│   └── offline-embedded.html   # Alternative offline version (~601KB)
│
├── Official Documents
│   ├── Guide-4 Body Composition Assessment.pdf
│   └── Guide-5A Physical Readiness Test.pdf
│
├── SEO & Config
│   ├── sitemap.xml             # Search engine sitemap
│   ├── robots.txt              # Crawler directives
│   └── ads.txt                 # Google AdSense verification
│
└── Documentation
    ├── CLAUDE.md               # This file
    ├── README.md               # Project overview
    ├── MAINTENANCE.md          # Maintenance workflow & checklists
    ├── HOSTING-GUIDE.md        # Deployment & monetization guide
    ├── SECURITY_REVIEW.md      # Security audit (7.5/10 rating)
    └── SUGGESTED_IMPROVEMENTS.md # Development roadmap
```

## Technology Stack

- **HTML5** - Semantic markup with Schema.org structured data
- **CSS3** - CSS Variables, Flexbox, Grid, responsive design
- **JavaScript (ES6+)** - Vanilla JS, no frameworks or build tools
- **localStorage** - Client-side data persistence
- **CSV** - BCA lookup tables loaded client-side via fetch

**Third-party Services:**
- Google Analytics (GA4)
- Google AdSense

## Core JavaScript APIs

### Security Utilities (`security.js`)
```javascript
NavySecurity.escapeHtml(str)                              // HTML entity encoding
NavySecurity.sanitizeString(str)                          // Remove dangerous content
NavySecurity.sanitizeNumber(val, min, max, fallback)      // Numeric validation
NavySecurity.sanitizeUrl(url)                             // URL validation
NavySecurity.getValidatedLocalStorage(key, type)          // Safe localStorage retrieval
NavySecurity.protectForm(formId)                          // Real-time input protection
```

### Shared Utilities (`shared-utils.js`)
```javascript
NavyUtils.showNotification(message, type, title)  // Toast notifications (success/error/warning/info)
NavyUtils.showLoading(message)                    // Show loading overlay with spinner
NavyUtils.hideLoading()                           // Hide loading overlay
NavyUtils.escapeHtml(str)                         // HTML entity encoding
NavyUtils.debounce(func, wait)                    // Debounce function calls
NavyUtils.safeJsonParse(jsonString, defaultValue) // Safe JSON parsing
NavyUtils.formatDate(date)                        // Format date for display
NavyUtils.copyToClipboard(text)                   // Copy text to clipboard
NavyUtils.downloadFile(content, filename, mimeType) // Download content as file
```

### BCA Calculator (`index.html`)
- `calculateBCA()` - Main calculation engine
- `setGender()` - Gender selection handler
- `exportToCSV()` - CSV export functionality
- `loadBCATables()` - Loads CSV lookup data via fetch
- `loadSavedData()` - Restores from localStorage

## Design System

### CSS Variables (defined in `styles.css`)
```css
/* Colors */
--color-primary: #ffd700;          /* Navy Gold */
--color-primary-dark: #b8860b;     /* Dark Gold */
--color-background: #0a1628;       /* Navy Blue */
--color-background-alt: #1a2a4a;   /* Lighter Navy */
--color-text-primary: #e8eef5;     /* Off-white */
--color-success: #22c55e;          /* Green - pass */
--color-error: #ef4444;            /* Red - fail */

/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 20px;
--spacing-xl: 32px;

/* Border Radius */
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;

/* Transitions */
--transition-fast: 0.15s ease;
--transition-base: 0.3s ease;
```

### Typography
- Font: `Segoe UI, system-ui, -apple-system, sans-serif`
- Use `clamp()` for fluid typography

## Development Guidelines

### Local Development
```bash
# Start a local server (required for CSV loading)
python -m http.server 8000
# OR
npx serve

# Open in browser
open http://localhost:8000
```

### No Build Process
- Edit HTML/CSS/JS directly - no compilation needed
- Changes take effect immediately on page refresh
- Use browser DevTools for debugging

### Code Style
- Use semantic HTML elements
- Follow existing CSS variable patterns
- Sanitize all user inputs using `security.js`
- Escape HTML output to prevent XSS
- Use `addEventListener` instead of inline handlers when possible
- Use `rel="noopener noreferrer"` on all external links with `target="_blank"`

### Security Checklist
- [ ] Sanitize user inputs with `NavySecurity.sanitizeString()`
- [ ] Escape HTML output with `NavySecurity.escapeHtml()`
- [ ] Validate localStorage data with `NavySecurity.getValidatedLocalStorage()`
- [ ] Use `rel="noopener noreferrer"` on external links
- [ ] Validate numeric inputs with bounds checking

### Accessibility Requirements
- Add ARIA labels to interactive elements
- Maintain 2px gold focus indicators
- Support `prefers-reduced-motion`
- Ensure touch targets are minimum 44x44px
- Use semantic heading hierarchy
- Use `aria-live="polite"` for dynamic content updates

## Common Tasks

### Adding a New Calculator/Tool
1. Create new HTML file following existing structure
2. Include shared `styles.css`
3. Include `security.js` and `shared-utils.js` for utilities
4. Add page to `sitemap.xml`
5. Add navigation link to all pages

### Modifying BCA Calculations
1. BCA logic is in `index.html` within `<script>` tags
2. Lookup tables are in CSV files
3. Reference `Guide-4 Body Composition Assessment.pdf` for official standards
4. Test against official Navy calculator for accuracy

### Adding Exercises
1. Edit `exercises-data.js`
2. Follow existing object structure:
```javascript
{
  name: "Exercise Name",
  category: "warmup|workout|cooldown|stretching",
  description: "How to perform the exercise",
  duration: "30 seconds", // OR reps: 10
  tips: "Form tips and variations"
}
```

### Updating Styles
1. Prefer using existing CSS variables
2. Add new variables to `:root` in `styles.css`
3. Test responsive breakpoints (768px mobile/tablet)

## Testing

**No automated tests exist.** Manual testing recommended:

### Tools
- **Lighthouse** - Performance, accessibility, SEO, best practices
- **axe DevTools** - Accessibility audit
- **W3C Validators** - HTML/CSS validation

### Key Test Scenarios
- BCA calculation accuracy against official Navy tables
- localStorage persistence across sessions
- CSV export functionality
- Print layouts
- Offline page functionality
- Cross-browser: Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Android Chrome

### Monthly Functionality Checklist
See `MAINTENANCE.md` for detailed checklists for each page.

## Deployment

Deploy to any static hosting (no build step required):
- **GitHub Pages** - Free, automatic from repository
- **Netlify** (recommended) - Free tier with CDN
- **Vercel** - Free tier
- **AWS S3 + CloudFront** - Scalable

See `HOSTING-GUIDE.md` for detailed deployment instructions.

## Important Notes

1. **Offline versions** (`offline.html`, `offline-embedded.html`) have embedded data and are 500KB+ - avoid modifying unless necessary

2. **CSV files** contain official Navy BCA lookup tables - do not modify without verifying against official sources

3. **PDF guides** are official Navy documents - reference only, do not edit

4. **Google Analytics/AdSense** are configured in HTML head sections - update carefully

5. **Security score is 7.5/10** - see `SECURITY_REVIEW.md` for improvement roadmap

6. **Testing score is 0/10** - adding automated tests is a high priority improvement

## Quick Reference

| Task | Location |
|------|----------|
| Main calculator logic | `index.html` |
| Shared styles | `styles.css` |
| Security utilities | `security.js` |
| Shared utilities | `shared-utils.js` |
| Exercise data | `exercises-data.js` |
| BCA lookup tables | `*.csv` files |
| Deployment guide | `HOSTING-GUIDE.md` |
| Security audit | `SECURITY_REVIEW.md` |
| Maintenance workflow | `MAINTENANCE.md` |
| Improvement roadmap | `SUGGESTED_IMPROVEMENTS.md` |

## Current Project Health

| Category | Score | Notes |
|----------|-------|-------|
| Code Quality | 6/10 | Significant duplication across HTML files |
| Security | 7.5/10 | Good input sanitization, CSP in place |
| Testing | 0/10 | No automated tests (high priority) |
| Accessibility | 8/10 | Good ARIA usage, focus states |
| Documentation | 9/10 | Comprehensive docs |
| Maintainability | 4/10 | Inline scripts, duplicated code |

## Recent Development Focus

- Security hardening (input sanitization, external link security)
- Code quality improvements (shared utilities)
- SEO improvements (structured data, meta tags)
- Mobile compatibility fixes (Safari/iOS)
- Accessibility enhancements (ARIA, focus states)
- UI/UX polish (notifications, loading states)
