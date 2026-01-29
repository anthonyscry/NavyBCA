# Testing Patterns

**Analysis Date:** 2026-01-28

## Test Framework

**Runner:**
- Jest (Unit Tests)
- Playwright (E2E Tests)
- Config: `package.json` defines scripts, `jest.config.js`, `playwright.config.js`

**Assertion Library:**
- Jest `expect`

**Run Commands:**
```bash
npm test                  # Run all tests (Jest)
npm run test:unit         # Run unit tests only
npm run test:e2e          # Run E2E tests
npm run test:coverage     # Run with coverage
```

## Test File Organization

**Location:**
- Separate `tests/` directory (not co-located)

**Structure:**
```
tests/
├── unit/
│   ├── security.test.js
│   ├── shared-utils.test.js
│   └── ...
└── e2e/
    └── bca-calculator.spec.js
```

**Naming:**
- Unit tests: `*.test.js`
- E2E tests: `*.spec.js`

## Test Structure

**Unit Test Loading Pattern:**
Since source files are vanilla JS with IIFEs (not CommonJS modules), tests use `fs` and `eval` to load code:
```javascript
const fs = require('fs');
const path = require('path');
const securityCode = fs.readFileSync(path.join(__dirname, '../../security.js'), 'utf8');
eval(securityCode);
const { escapeHtml } = NavySecurity;
```

**Suite Organization:**
```javascript
describe('NavySecurity', () => {
    describe('escapeHtml', () => {
        it('should escape & character', () => {
            expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
        });
    });
});
```

## Mocking

**Environment:** `jsdom` (via `jest-environment-jsdom`)

**Browser Globals:**
- `localStorage` is available in jsdom environment
- Tests clear/reset state:
```javascript
beforeEach(() => {
    localStorage.clear();
});
```

## Coverage

**Requirements:**
- Coverage script available: `npm run test:coverage`
- High coverage observed for utility modules (`security.js`)

## Test Types

**Unit Tests:**
- Focus: Logic in `security.js`, `shared-utils.js`
- Style: Extensive edge-case testing (nulls, undefined, invalid types)
- Security testing: Explicit XSS payload tests

**E2E Tests:**
- Focus: Critical user flows (Calculator functionality)
- Tool: Playwright

## Common Patterns

**Security Testing:**
Explicit testing of attack vectors:
```javascript
const xssPayloads = ['<script>alert("XSS")</script>', ...];
xssPayloads.forEach(payload => {
    it(`should sanitize XSS payload`, () => { ... });
});
```

**Input Validation:**
Tests verify boundaries and type safety:
```javascript
it('should clamp to minimum', () => {
    expect(sanitizeNumber(-5, 0, 100)).toBe(0);
});
```

---

*Testing analysis: 2026-01-28*
