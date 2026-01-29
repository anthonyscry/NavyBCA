# Codebase Concerns

**Analysis Date:** 2026-01-28

## Tech Debt

**Code Duplication:**
- Issue: Significant duplication of CSS variables, Google Analytics code, navigation markup, and meta tags across all HTML files.
- Files: `index.html`, `generator.html`, `watchbill.html`, `exercises.html`, `prt-prep.html`, `references.html`, `about.html`, `privacy.html`, `terms.html`
- Impact: Updates require modifying 11+ files, increasing risk of inconsistency and maintenance burden.
- Fix approach: Extract shared components into `shared/` directory (nav, meta, analytics) and use a simple build step or runtime injection.

**Inline Code:**
- Issue: Heavy use of inline JavaScript (>500 lines per page) and CSS styles.
- Files: `index.html`, `generator.html`, `watchbill.html`, `exercises.html`
- Impact: Blocks Content Security Policy (CSP) implementation, prevents caching, and makes code hard to read/maintain.
- Fix approach: Move page-specific logic to external `.js` files (e.g., `bca-calculator.js`) and styles to `styles.css`.

**No Build System:**
- Issue: No automated build process for minification, bundling, or testing.
- Files: `package.json` (scripts missing build steps)
- Impact: Large file sizes in production, manual error-prone deployment.
- Fix approach: Implement a lightweight build system (Vite or npm scripts) to minify assets and bundle resources.

## Known Bugs

**Accessibility - Zoom Lock:**
- Symptoms: Users cannot zoom in on mobile devices.
- Files: `index.html`, `generator.html` (and others)
- Trigger: `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">`
- Workaround: None for user.
- Fix approach: Remove `maximum-scale=1.0` from viewport meta tag.

## Security Considerations

**XSS Vulnerabilities:**
- Risk: Potential for Cross-Site Scripting if user input (or malicious localStorage data) is rendered without sanitization.
- Files: `generator.html` (`renderItem`), `faq.html`, `shared-utils.js` (innerHTML usage)
- Current mitigation: `security.js` exists but isn't applied universally; some inline `innerHTML` usage remains.
- Recommendations: Enforce use of `NavySecurity.escapeHtml()` or `textContent` everywhere. Implement CSP.

**Content Security Policy (CSP):**
- Risk: Missing CSP headers/meta tags allows execution of malicious scripts if injected.
- Files: All HTML files.
- Current mitigation: None.
- Recommendations: Add strict CSP meta tags allowing only specific sources (self, GA, AdSense).

**LocalStorage Data Injection:**
- Risk: Data loaded from `localStorage` is passed directly to form inputs without validation.
- Files: `index.html` (`loadSavedData`), `watchbill.html`
- Current mitigation: Basic `JSON.parse` try-catch.
- Recommendations: Validate all data retrieved from storage against expected types and ranges before use.

## Performance Bottlenecks

**CSV Data Loading:**
- Problem: Both Male and Female BCA tables (~106KB each) are loaded on every page load, regardless of need.
- Files: `index.html`, `offline.html`
- Cause: Unconditional fetch of CSV files.
- Improvement path: Lazy load CSVs only when needed, or convert to compressed JSON chunks.

**Large Offline Files (Intentional Design):**
- Observation: `offline.html` and `offline-embedded.html` are large (>500KB) due to embedded assets.
- Context: Explicit requirement for "at sea/deployment" usage where initial connectivity for Service Workers cannot be guaranteed.
- Improvement path: Optimize asset compression within the single-file constraint, but maintain standalone capability.

**Exercise List Rendering:**
- Problem: `exercises.html` renders all 400+ exercises immediately.
- Files: `exercises.html`
- Cause: No virtualization or pagination.
- Improvement path: Implement virtual scrolling or pagination (load 20 at a time).

## Fragile Areas

**PDF Generation Coordinates:**
- Files: `index.html` (`generateNavpersForm`)
- Why fragile: Uses hardcoded X/Y coordinates to overlay text on `printed version.pdf`. Any change to the PDF template breaks alignment.
- Safe modification: define field coordinates in a configuration object/JSON, separate from logic.
- Test coverage: None.

**Hardcoded Magic Numbers:**
- Files: `index.html`, `src/bca-calculations.js`
- Why fragile: Weight limits (61, 400), height limits (48, 96), and BCA constants are hardcoded.
- Safe modification: Move all constants to a shared configuration file reflecting official Navy standards.

## Test Coverage Gaps

**BCA Calculations:**
- What's not tested: Core business logic for body fat percentage and pass/fail determination.
- Files: `index.html` (logic embedded), `src/bca-calculations.js`
- Risk: Incorrect calculations could lead to Sailors failing PRT/BCA invalidly.
- Priority: **High**

**Integration/E2E:**
- What's not tested: Full user flow from input -> calculation -> save -> PDF export.
- Files: `tests/` (existing directory appears to have minimal or placeholder tests based on file counts).
- Risk: Critical user flows breaking silently.
- Priority: High

**Security Utilities:**
- What's not tested: Sanitization functions in `security.js`.
- Files: `security.js`
- Risk: False sense of security if sanitization is bypassable.
- Priority: Medium

---

*Concerns audit: 2026-01-28*
