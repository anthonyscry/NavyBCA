# Coding Conventions

**Analysis Date:** 2026-01-28

## Naming Patterns

**Files:**
- kebab-case for all files
- Examples: `security.js`, `shared-utils.js`, `exercises-data.js`, `index.html`

**Functions:**
- camelCase
- Examples: `sanitizeString`, `showNotification`, `calculateBCA`

**Variables:**
- camelCase
- Examples: `warmupExercises`, `notification`, `allowedValues`
- Constants: UPPER_SNAKE_CASE (e.g., `HTML_ENTITIES`)

**Types/Classes/Namespaces:**
- PascalCase for IIFE modules
- Examples: `NavySecurity`, `NavyUtils`

## Code Style

**Formatting:**
- Indentation: 4 spaces
- Semicolons: Yes
- Quotes: Single quotes preferred for JavaScript
- Strict Mode: `'use strict';` used inside IIFE modules

**Modules:**
- IIFE (Immediately Invoked Function Expression) pattern used for encapsulation
- No ES modules (import/export) used in source files
- Globals exposed via `window` assignment

**CSS:**
- CSS Custom Properties (Variables) used extensively
- Pattern: `--property-name` (e.g., `--color-primary`, `--space-md`)
- BEM-like naming for some classes (e.g., `.notification-icon`, `.loading-overlay`)

## Import Organization

**HTML Imports:**
1. Meta tags / SEO
2. CSS (`styles.css`)
3. Third-party scripts (Google Analytics/AdSense)
4. Shared JS (`security.js`, `shared-utils.js`)
5. Data JS (`exercises-data.js`)
6. Page-specific logic (inline `<script>`)

## Error Handling

**Patterns:**
- **Defensive Programming:** Extensive null/undefined checks at function start
  ```javascript
  if (str === null || str === undefined) return '';
  ```
- **Fallbacks:** Functions return safe default values rather than throwing
  ```javascript
  if (isNaN(num)) return defaultValue;
  ```
- **Try/Catch:** Used for risky operations like JSON parsing or Clipboard API
  ```javascript
  try {
      return JSON.parse(jsonString);
  } catch (e) {
      console.warn('Failed to parse JSON:', e.message);
      return defaultValue;
  }
  ```

## Logging

**Framework:** Console

**Patterns:**
- `console.warn`: Non-critical errors (e.g., JSON parse failure)
- `console.error`: Critical failures (e.g., clipboard copy failed)
- User-facing: Custom `showNotification()` for UI feedback

## Comments

**JSDoc:**
- Comprehensive JSDoc blocks for all public functions
- Includes `@param`, `@returns`, and description
```javascript
/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} str - The string to escape
 * @returns {string} - The escaped string
 */
```

**File Headers:**
- Top of file description indicating purpose and contents

## Function Design

**Parameters:**
- Default parameters used extensively (`type = 'info'`)
- input validation at start of function

**Return Values:**
- Consistent return types
- Safe fallbacks (empty string, default number)

## Module Design

**Pattern:**
- Singleton/Namespace pattern via IIFE
```javascript
const NavyUtils = (function() {
    // private helpers
    return {
        // public API
    };
})();
```

---

*Convention analysis: 2026-01-28*
