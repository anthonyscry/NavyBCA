# Codebase Structure

**Analysis Date:** 2026-01-28

## Directory Layout

```
[project-root]/
├── src/                # Modern/Refactored JS logic (Testable)
├── tests/              # Automated tests (Unit & E2E)
├── icons/              # PWA and UI icons
├── index.html          # Core Application Entry (BCA Calculator)
├── styles.css          # Global Design System
├── shared-utils.js     # Shared UI/Helper Utilities
├── security.js         # Security & Sanitization Utilities
├── exercises-data.js   # Static Data for Exercises
├── [page].html         # Other Feature Pages (generator, watchbill, etc.)
└── *.csv               # Official BCA Lookup Tables
```

## Directory Purposes

**Root (`/`):**
- Purpose: Main application files. Web server root.
- Contains: HTML entry points, shared assets, config files.
- Key files: `index.html`, `styles.css`.

**`src/`:**
- Purpose: Extracted business logic, separated from HTML for testing.
- Contains: Pure JavaScript modules.
- Key files: `src/bca-calculations.js`.

**`tests/`:**
- Purpose: Automated verification.
- Contains: `unit/` (Jest) and `e2e/` (Playwright) tests.
- Key files: `tests/unit/*.test.js`, `playwright.config.js`.

**`icons/`:**
- Purpose: Static image assets.
- Contains: PNG/SVG icons for UI and PWA manifest.

## Key File Locations

**Entry Points:**
- `index.html`: Main BCA Calculator.
- `generator.html`: PT Session Generator.
- `watchbill.html`: Watchbill Generator.
- `prt-prep.html`: PRT Preparation Guide.

**Configuration:**
- `styles.css`: Global CSS variables and styles.
- `sitemap.xml`: SEO configuration.
- `robots.txt`: Crawler configuration.

**Core Logic:**
- `index.html` (Inline): Current production BCA logic.
- `src/bca-calculations.js`: Refactored/Testable BCA logic.
- `security.js`: Input protection logic.
- `shared-utils.js`: Common helper functions.

**Testing:**
- `tests/unit/`: Logic verification.
- `tests/e2e/`: Browser interaction verification.

## Naming Conventions

**Files:**
- HTML: Kebab-case (e.g., `prt-prep.html`, `offline-embedded.html`).
- JS (Shared): Kebab-case (e.g., `shared-utils.js`, `exercises-data.js`).
- JS (Modules): Kebab-case (e.g., `bca-calculations.js`).
- CSV: Descriptive snake_case/kebab-case mixture (e.g., `male_bca_table_FULL_NORMALIZED.csv`).

**Variables/Functions:**
- JS: CamelCase (e.g., `calculateBCA`, `showNotification`).
- CSS Variables: Kebab-case with prefix (e.g., `--color-primary`, `--spacing-md`).

**Classes/Namespaces:**
- PascalCase (e.g., `NavyUtils`, `NavySecurity`).

## Where to Add New Code

**New Feature (Page):**
- Create `[feature-name].html` in root.
- Include `styles.css`, `security.js`, `shared-utils.js`.

**New Logic (Complex):**
- Implementation: Create module in `src/[module-name].js`.
- Tests: Create `tests/unit/[module-name].test.js`.
- Usage: Import in HTML or migrate HTML logic to use it.

**New Logic (Simple/UI):**
- Add to `shared-utils.js` if reusable.
- Or keep inline in specific HTML file if page-specific.

**New Data:**
- Static Data: Add to `[feature]-data.js` or JSON file.
- Tables: Add CSV to root.

## Special Directories

**`Offline Versions/` (Logical grouping only, physically in root):**
- `offline.html` & `offline-embedded.html`: Specialized single-file distributions.
- **Warning**: Do not modify heavily without understanding embedding requirements.
