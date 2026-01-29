# Architecture

**Analysis Date:** 2026-01-28

## Pattern Overview

**Overall:** Static Multi-Page Application (MPA)

**Key Characteristics:**
- **Zero-Build:** Pure HTML/CSS/JS without bundlers or compilation.
- **Client-Side Only:** All logic runs in the browser; no backend server.
- **Island Architecture:** Each HTML page is a self-contained entry point with its own inline logic, sharing common utilities.
- **Hybrid Logic:** Core calculation logic exists both inline (production) and extracted (testing).

## Layers

**Presentation (HTML):**
- Purpose: Structure, content, and page-specific logic.
- Location: `[root]/*.html` (e.g., `index.html`, `generator.html`)
- Contains: HTML5 markup, inline `<script>` blocks for page logic.
- Depends on: Shared Utilities, CSS, Data Files.

**Styling (CSS):**
- Purpose: Global design system and component styling.
- Location: `styles.css`
- Contains: CSS Variables (theming), utility classes, component styles.
- Used by: All HTML pages.

**Shared Logic (JS):**
- Purpose: Cross-cutting concerns like security, UI helpers, and data processing.
- Location: `security.js`, `shared-utils.js`
- Contains: `NavySecurity` and `NavyUtils` global namespaces.
- Used by: All HTML pages.

**Business Logic (Hybrid):**
- Purpose: Core domain logic (BCA calculations, exercise generation).
- Location:
    - Inline: Inside `<script>` tags in `index.html` (primary production path).
    - Extracted: `src/bca-calculations.js` (modern/testable path).
- Note: Logic is currently being migrated from inline to `src/` to support testing.

**Data Layer:**
- Purpose: Static data sources.
- Location:
    - CSV: `*_bca_table_FULL_NORMALIZED.csv` (BCA standards).
    - JS: `exercises-data.js` (Exercise library).
    - JSON: `prt-*.json` (PRT scoring standards).

## Data Flow

**BCA Calculation:**
1. **Input:** User enters data in `index.html` forms.
2. **Event:** `calculateBCA()` triggered by button click.
3. **Validation:** `NavySecurity.sanitizeNumber()` validates inputs.
4. **Lookup:** Logic fetches/reads CSV data (cached in memory variables).
5. **Calculation:** Inline logic (or `src/` logic) computes WHtR and Body Fat %.
6. **Persistence:** Inputs saved to `localStorage` via `saveData()`.
7. **Output:** DOM updated directly with results; class names changed for visual feedback.

**PDF Generation:**
1. **Trigger:** User clicks "Print/Save PDF".
2. **Library:** `pdf-lib.min.js` loaded.
3. **Template:** Fetches `printed version.pdf`.
4. **Overlay:** Coordinates calculated relative to PDF dimensions.
5. **Download:** Browser triggers file download.

## Key Abstractions

**`NavyUtils` (shared-utils.js):**
- Purpose: UI and utility helpers.
- Examples: `showNotification`, `showLoading`, `debounce`, `escapeHtml`.
- Pattern: Module pattern exposing a global object.

**`NavySecurity` (security.js):**
- Purpose: Input sanitization and validation.
- Examples: `sanitizeString`, `protectForm`.
- Pattern: Module pattern exposing a global object.

**`BCACalculations` (src/bca-calculations.js):**
- Purpose: Pure functional core logic for calculations.
- Examples: `calculateBCA`, `getMaleBF`.
- Pattern: Dual export (CommonJS for tests, Window for browser).

## Entry Points

**`index.html`:**
- Triggers: User navigation.
- Responsibilities: Main BCA Calculator, PDF Generation.

**`generator.html`:**
- Triggers: User navigation.
- Responsibilities: PT Session generation using `exercises-data.js`.

**`watchbill.html`:**
- Triggers: User navigation.
- Responsibilities: Schedule management.

## Error Handling

**Strategy:** Client-side validation and toast notifications.

**Patterns:**
- **Sanitization:** Inputs cleaned on entry via `security.js`.
- **Validation:** Bounds checking (e.g., height 48-96 inches).
- **Feedback:** `NavyUtils.showNotification(msg, 'error')` for user-facing errors.
- **Fallbacks:** BCA logic has fallback formulas if CSV lookup fails.

## Cross-Cutting Concerns

**Logging:** Minimal. `console.warn/error` used for development/debugging.
**Validation:** Centralized in `security.js`.
**Persistence:** `localStorage` used extensively to preserve user state between visits.
