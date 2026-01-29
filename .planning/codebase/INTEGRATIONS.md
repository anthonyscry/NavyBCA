# External Integrations

**Analysis Date:** 2026-01-28

## APIs & External Services

**Analytics:**
- Google Analytics 4 (GA4) - Site traffic tracking
  - ID: `G-7D2BBFK1WP`
  - Implementation: `gtag.js` in HTML head

**Monetization:**
- Google AdSense - Display advertising
  - Client ID: `ca-pub-4254899096040096`
  - Implementation: `adsbygoogle.js`

**Content Delivery:**
- unpkg.com - CDN for `pdf-lib` library

## Data Storage

**Databases:**
- None (Static site)

**Local Storage:**
- Browser `localStorage` - User preference and data persistence
  - Keys: `bcaData`, `settings`, etc.
  - Implemented in `shared-utils.js` / `security.js`

**File Storage:**
- CSV Files - Read-only lookup tables
  - `male_bca_table_FULL_NORMALIZED.csv`
  - `female_bca_table_FULL_NORMALIZED.csv`
  - Accessed via `fetch()` API

**Caching:**
- Service Worker (`sw.js`) - Offline caching for PWA functionality

## Authentication & Identity

**Auth Provider:**
- None (No user accounts)

## Monitoring & Observability

**Error Tracking:**
- None (Client-side console only)

**Logs:**
- Browser Console - Runtime logs

## CI/CD & Deployment

**Hosting:**
- Static Hosting (GitHub Pages / Netlify / Vercel / AWS S3)

**CI Pipeline:**
- GitHub Actions - CI workflow identified (`.github/workflows/ci.yml` referenced in README)
- Codecov - Coverage reporting

## Environment Configuration

**Required env vars:**
- None (Client-side only)

**Secrets location:**
- Public IDs (Analytics/AdSense) embedded in HTML
- No private secrets required

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: 2026-01-28*
