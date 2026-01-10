# Claude.md - NavyBCA Project Guide

> A reference guide for Claude instances working on the Navy BCA Calculator project.

## Project Overview

**Navy BCA Calculator** is a free, client-side web application for U.S. Navy personnel to calculate Body Composition Assessment (BCA) scores and prepare for Physical Readiness Tests (PRT).

- **Type**: Static HTML/JavaScript website (no backend)
- **Target Users**: Active-duty sailors, reserve personnel, military fitness trainers
- **Live Site**: https://navybca.com/

## Key Features

| Feature | File | Description |
|---------|------|-------------|
| BCA Calculator | `index.html` | Main calculator - body fat %, waist-to-height ratio, pass/fail |
| PT Session Generator | `generator.html` | 60-minute workout sessions with 400+ exercises |
| PT Watchbill Generator | `watchbill.html` | Monthly PT schedules with CFL rotation |
| PRT Prep Guide | `prt-prep.html` | Physical Readiness Test preparation |
| Exercise Library | `exercises.html` | Searchable exercise database with video demos |

## Directory Structure

```
NavyBCA/
├── index.html              # Main BCA Calculator (primary entry point)
├── generator.html          # PT Session Generator
├── watchbill.html          # PT Watchbill Generator
├── exercises.html          # Exercise Library
├── prt-prep.html           # PRT Prep Guide
├── about.html              # About page
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── references.html         # Sources and references
├── offline.html            # Offline version (embedded data)
├── offline-embedded.html   # Alternative offline version
│
├── styles.css              # Shared stylesheet (CSS variables, design system)
├── security.js             # Security utilities (sanitization, validation)
├── exercises-data.js       # Exercise database
│
├── male_bca_table_FULL_NORMALIZED.csv      # Male BCA lookup table
├── female_bca_table_FULL_NORMALIZED.csv     # Female BCA lookup table
│
├── Guide-4 Body Composition Assessment.pdf  # Official Navy guide
├── Guide-5A Physical Readiness Test.pdf     # Official Navy guide
│
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine rules
├── ads.txt                 # Google AdSense verification
│
├── HOSTING-GUIDE.md        # Deployment & monetization guide
├── IMPROVEMENTS_SUMMARY.md # UI/UX improvements documentation
├── SECURITY_REVIEW.md      # Security audit (7.5/10 rating)
├── UI_REVIEW_AND_IMPROVEMENTS.md # UI analysis
└── claude.md               # This file
```

## Technology Stack

- **HTML5** - Semantic markup with Schema.org structured data
- **CSS3** - CSS Variables, Flexbox, Grid, responsive design
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **localStorage** - Client-side data persistence
- **CSV** - BCA lookup tables loaded client-side

**Third-party Services:**
- Google Analytics (GA4)
- Google AdSense
- Google Search Console

## Core JavaScript Functions

### BCA Calculator (`index.html`)
- `calculateBCA()` - Main calculation engine
- `setGender()` - Gender selection handler
- `exportToCSV()` - CSV export functionality
- `loadBCATables()` - Loads CSV lookup data via fetch
- `loadSavedData()` - Restores from localStorage

### PT Generator (`generator.html`)
- `generateSession()` - Creates workout sessions
- Exercise filtering and selection logic

### Shared (`security.js`)
```javascript
NavySecurity.escapeHtml(str)           // HTML entity encoding
NavySecurity.sanitizeString(str)       // Remove dangerous content
NavySecurity.sanitizeNumber(val, min, max, fallback)  // Numeric validation
NavySecurity.sanitizeUrl(url)          // URL validation
NavySecurity.getValidatedLocalStorage(key, type)      // Safe localStorage
NavySecurity.protectForm(formId)       // Real-time input protection
```

## Design System

### CSS Variables (defined in `styles.css`)
```css
/* Colors */
--color-primary: #ffd700;          /* Navy Gold */
--color-primary-dark: #b8860b;     /* Dark Gold */
--color-background: #0a1628;       /* Navy Blue */
--color-background-alt: #1a2a4a;   /* Lighter Navy */
--color-text-primary: #e8eef5;     /* Off-white */
--color-success: #22c55e;          /* Green */
--color-error: #ef4444;            /* Red */

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

### No Build Process
- Edit HTML/CSS/JS directly - no compilation needed
- Open `index.html` in browser to test
- Use browser DevTools for debugging

### Code Style
- Use semantic HTML elements
- Follow existing CSS variable patterns
- Sanitize all user inputs using `security.js`
- Escape HTML output to prevent XSS
- Use `addEventListener` instead of inline handlers when possible

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

## Common Tasks

### Adding a New Calculator/Tool
1. Create new HTML file following existing structure
2. Include shared `styles.css`
3. Include `security.js` for input handling
4. Add page to `sitemap.xml`
5. Add navigation link to all pages

### Modifying BCA Calculations
1. BCA logic is in `index.html` within `<script>` tags
2. Lookup tables are in CSV files
3. Reference `Guide-4 Body Composition Assessment.pdf` for official standards

### Adding Exercises
1. Edit `exercises-data.js`
2. Follow existing object structure with category, name, description, equipment

### Updating Styles
1. Prefer using existing CSS variables
2. Add new variables to `:root` in `styles.css`
3. Test responsive breakpoints (768px mobile/tablet)

## Testing Approach

No automated tests exist. Manual testing recommended:

1. **Lighthouse** - Performance, accessibility, SEO, best practices
2. **axe DevTools** - Accessibility audit
3. **OWASP ZAP** - Security scanning
4. **Cross-browser** - Chrome, Firefox, Safari, Edge
5. **Mobile devices** - iOS Safari, Android Chrome

### Key Test Scenarios
- BCA calculation accuracy against official Navy tables
- localStorage persistence across sessions
- CSV export functionality
- Print layouts
- Offline page functionality

## Deployment

Deploy to any static hosting:
- **Netlify** (recommended) - Free tier available
- **GitHub Pages**
- **Vercel**
- **S3 + CloudFront**

No build step required - push files directly.

## Important Notes

1. **Offline versions** (`offline.html`, `offline-embedded.html`) have embedded data and are ~25k lines - avoid modifying unless necessary

2. **CSV files** contain official Navy BCA lookup tables - do not modify without verifying against official sources

3. **PDF guides** are official Navy documents - reference only, do not edit

4. **Google Analytics/AdSense** are configured in HTML head sections - update carefully

5. **Security score is 7.5/10** - see `SECURITY_REVIEW.md` for improvement roadmap

## Quick Reference

| Task | Location |
|------|----------|
| Main calculator logic | `index.html` lines 200-800 |
| Shared styles | `styles.css` |
| Security utilities | `security.js` |
| Exercise data | `exercises-data.js` |
| BCA lookup tables | `*.csv` files |
| Deployment guide | `HOSTING-GUIDE.md` |
| Security audit | `SECURITY_REVIEW.md` |
| UI improvements | `IMPROVEMENTS_SUMMARY.md` |

## Recent Development Focus

- Security hardening (input sanitization, CSP)
- SEO improvements (structured data, meta tags)
- Mobile compatibility fixes (Safari/iOS)
- Accessibility enhancements (ARIA, focus states)
- UI/UX polish (notifications, loading states)
