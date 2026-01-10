# Maintenance Guide for Navy BCA Calculator

This document outlines procedures and workflows for keeping the Navy BCA Calculator site up-to-date, secure, and functioning properly.

---

## Table of Contents

1. [Maintenance Schedule](#maintenance-schedule)
2. [Regular Checks](#regular-checks)
3. [Content Updates](#content-updates)
4. [Technical Maintenance](#technical-maintenance)
5. [Security Maintenance](#security-maintenance)
6. [Performance Monitoring](#performance-monitoring)
7. [Troubleshooting Guide](#troubleshooting-guide)
8. [Emergency Procedures](#emergency-procedures)

---

## Maintenance Schedule

### Weekly Tasks
- [ ] Check Google Analytics for unusual traffic patterns
- [ ] Review any user-reported issues
- [ ] Verify all pages load correctly

### Monthly Tasks
- [ ] Full site functionality test (see checklist below)
- [ ] Check for broken links
- [ ] Review and clear browser console errors
- [ ] Backup current working version
- [ ] Review AdSense performance

### Quarterly Tasks
- [ ] Check for Navy Guide updates (Guide-4, Guide-5A)
- [ ] Security review of dependencies
- [ ] Performance audit (page load times)
- [ ] Review and update documentation
- [ ] Test offline versions

### Annual Tasks
- [ ] Full accessibility audit
- [ ] Comprehensive security review
- [ ] Review and update privacy policy
- [ ] Update copyright year
- [ ] Review hosting costs and alternatives

---

## Regular Checks

### Monthly Functionality Checklist

#### BCA Calculator (`index.html`)
```
[ ] Page loads without errors
[ ] CSV data loads successfully
[ ] Male calculation works correctly
[ ] Female calculation works correctly
[ ] WHtR Step 1 calculation accurate
[ ] Body fat Step 2 calculation accurate
[ ] "Path to Standards" displays correctly
[ ] localStorage saves/loads inputs
[ ] Export to CSV works
[ ] Print/PDF export works
[ ] Mobile responsive layout correct
```

#### PT Generator (`generator.html`)
```
[ ] Page loads without errors
[ ] Exercise database loads
[ ] Random workout generation works
[ ] All exercise categories populate
[ ] Print functionality works
[ ] Workout cards display correctly
```

#### Watchbill Generator (`watchbill.html`)
```
[ ] Calendar displays correctly
[ ] CFL rotation works
[ ] Holiday blocking functions
[ ] Print layout correct
[ ] Month navigation works
```

#### Exercise Library (`exercises.html`)
```
[ ] All exercises display
[ ] Search functionality works
[ ] Category filters work
[ ] Exercise details show correctly
```

#### PRT Prep (`prt-prep.html`)
```
[ ] All weeks display
[ ] Workout details visible
[ ] Navigation between weeks works
```

#### Offline Versions
```
[ ] offline.html loads independently
[ ] Calculations work without internet
[ ] All data embedded correctly
```

---

## Content Updates

### When Navy Standards Change

The Navy periodically updates fitness standards. When this happens:

1. **Obtain Official Documents**
   - Download new Guide-4 (BCA) and/or Guide-5A (PRT)
   - Save to project root, replacing old versions

2. **Review Changes**
   - Compare old vs new standards
   - Note any changes to:
     - Maximum body fat percentages
     - Measurement procedures
     - Calculation formulas
     - Age group brackets

3. **Update BCA Tables (if needed)**
   ```
   Files to update:
   - male_bca_table_FULL_NORMALIZED.csv
   - female_bca_table_FULL_NORMALIZED.csv
   ```
   - Regenerate from new Navy tables if formulas change
   - Verify data integrity after updates

4. **Update Calculator Logic (if needed)**
   ```
   Files that may need updates:
   - index.html (main calculator)
   - offline.html (offline version)
   - offline-embedded.html (embedded version)
   ```
   - Update any hardcoded thresholds
   - Modify calculation functions if formulas change

5. **Update Documentation**
   - Update references to guide version/date
   - Update any screenshots or examples
   - Note changes in changelog

6. **Test Thoroughly**
   - Run through multiple test cases
   - Compare results against official Navy calculator
   - Test edge cases (minimum/maximum values)

### Updating Exercise Database

To add or modify exercises:

1. **Edit `exercises-data.js`**
   ```javascript
   // Exercise format:
   {
     name: "Exercise Name",
     category: "warmup|workout|cooldown|stretching",
     description: "How to perform the exercise",
     duration: "30 seconds" or reps: 10,
     tips: "Form tips and variations"
   }
   ```

2. **Update Categories**
   - Ensure new exercises match existing category structure
   - Update `exercises.html` if adding new categories

3. **Regenerate Offline Versions**
   - Update embedded data in `offline.html`
   - Test exercise generation

---

## Technical Maintenance

### File Organization

Keep files organized according to this structure:
```
NavyBCA/
├── *.html          # Page files
├── *.css           # Stylesheets
├── *.js            # JavaScript files
├── *.csv           # Data files
├── *.pdf           # Official documents
├── *.md            # Documentation
└── *.txt/xml       # Config files
```

### Code Quality Checks

Before any deployment:

1. **Validate HTML**
   - Use W3C Validator: https://validator.w3.org/
   - Fix any errors or warnings

2. **Validate CSS**
   - Use W3C CSS Validator: https://jigsaw.w3.org/css-validator/
   - Check for browser compatibility issues

3. **Check JavaScript**
   - Open browser console, verify no errors
   - Test all interactive features
   - Verify localStorage operations

4. **Test Responsive Design**
   - Check at 320px (mobile)
   - Check at 768px (tablet)
   - Check at 1024px+ (desktop)
   - Use browser dev tools device emulation

### Updating Shared Resources

When modifying shared files:

| File | Used By | Notes |
|------|---------|-------|
| `styles.css` | All pages | Test all pages after changes |
| `security.js` | All pages with forms | Verify input handling |
| `shared-utils.js` | Multiple pages | Check notification system |
| `exercises-data.js` | generator, exercises | Test both pages |

---

## Security Maintenance

### Regular Security Tasks

1. **Review Input Handling**
   ```javascript
   // Ensure all user inputs use security.js functions:
   NavySecurity.escapeHTML(userInput)
   NavySecurity.sanitizeInput(userInput)
   ```

2. **Check External Resources**
   - Verify Google Analytics/AdSense scripts are current
   - Check for any deprecated APIs

3. **Monitor for Vulnerabilities**
   - Watch for XSS attack patterns in logs
   - Review any unusual form submissions

### Security Checklist

```
[ ] All user inputs sanitized
[ ] No sensitive data in localStorage
[ ] HTTPS enforced (hosting level)
[ ] No inline event handlers with user data
[ ] External links use rel="noopener"
[ ] Forms don't accept dangerous input
```

---

## Performance Monitoring

### Key Metrics to Track

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Time to Interactive | < 3.5s | Lighthouse |
| Total Page Size | < 1MB | DevTools |
| CSV Load Time | < 500ms | Console timing |

### Performance Optimization

1. **Check CSV Loading**
   ```javascript
   // Monitor in browser console:
   console.time('CSV Load');
   // ... load CSV
   console.timeEnd('CSV Load');
   ```

2. **Image Optimization**
   - Compress any images added
   - Use appropriate formats (WebP where supported)

3. **Code Minification** (for production)
   - Consider minifying CSS/JS for production
   - Keep unminified versions for development

---

## Troubleshooting Guide

### Common Issues

#### BCA Calculator Not Loading
```
Symptoms: Blank page or loading spinner stuck
Causes:
  - CSV file not found
  - Network error loading data
  - JavaScript error

Solutions:
  1. Check browser console for errors
  2. Verify CSV files exist and are accessible
  3. Test with local server (not file://)
  4. Clear browser cache
```

#### Calculations Seem Wrong
```
Symptoms: Results don't match official calculator
Causes:
  - CSV data corruption
  - Rounding differences
  - Formula changes in new Navy guide

Solutions:
  1. Verify against official Navy calculator
  2. Check CSV data integrity
  3. Review latest Guide-4 for formula changes
  4. Compare step-by-step calculation
```

#### localStorage Not Working
```
Symptoms: Inputs don't save between sessions
Causes:
  - Private browsing mode
  - Storage quota exceeded
  - Browser restrictions

Solutions:
  1. Check if private/incognito mode
  2. Clear old localStorage data
  3. Verify localStorage is enabled
```

#### Mobile Layout Broken
```
Symptoms: Elements overlapping or off-screen
Causes:
  - CSS specificity issues
  - Missing media queries
  - Viewport not set

Solutions:
  1. Check viewport meta tag exists
  2. Test with browser device emulation
  3. Review CSS media queries
```

### Debug Mode

Add to browser console for debugging:
```javascript
// Enable verbose logging
localStorage.setItem('debug', 'true');

// Check current data state
console.log('Male BCA Data:', maleData?.size || 'Not loaded');
console.log('Female BCA Data:', femaleData?.size || 'Not loaded');

// Test calculation
console.log(calculateBCA(70, 180, 35, 'male'));
```

---

## Emergency Procedures

### Site Down

1. **Immediate Actions**
   - Check hosting provider status
   - Verify DNS settings
   - Check for expired SSL certificate

2. **Quick Recovery**
   - Deploy from last known good backup
   - Use offline.html as temporary solution
   - Communicate status to users

### Data Corruption

1. **Identify Corrupted Files**
   - Compare against git history
   - Check file sizes for anomalies

2. **Restore**
   ```bash
   # Restore single file from git
   git checkout HEAD~1 -- filename.csv

   # Restore from backup
   cp backup/filename.csv ./
   ```

### Critical Bug in Production

1. **Immediate Mitigation**
   - If calculation error: add warning banner
   - If security issue: take affected page offline

2. **Fix Process**
   ```bash
   # Create hotfix branch
   git checkout -b hotfix/issue-description

   # Make minimal fix
   # Test thoroughly
   # Deploy immediately
   ```

---

## Backup Procedures

### What to Backup

| Priority | Files | Frequency |
|----------|-------|-----------|
| Critical | CSV data files | Before any changes |
| High | All HTML/JS/CSS | Monthly |
| Medium | Documentation | Quarterly |
| Low | PDF guides | When updated |

### Backup Commands

```bash
# Create dated backup
tar -czf backup_$(date +%Y%m%d).tar.gz \
  *.html *.css *.js *.csv *.md

# Verify backup
tar -tzf backup_*.tar.gz
```

### Git Best Practices

```bash
# Tag stable releases
git tag -a v1.0.0 -m "Stable release with Guide-4 Dec 2025"

# Push tags
git push origin --tags

# Create backup branch
git checkout -b backup/$(date +%Y%m%d)
```

---

## Monitoring Checklist

### Daily (Automated if possible)
- [ ] Site responds to requests
- [ ] No critical console errors

### Weekly (Manual)
- [ ] Review Analytics for anomalies
- [ ] Check user feedback channels
- [ ] Verify key features work

### Monthly (Scheduled)
- [ ] Run full functionality checklist
- [ ] Performance audit
- [ ] Security scan
- [ ] Update documentation

---

## Version History

Track significant changes:

| Date | Version | Changes |
|------|---------|---------|
| 2025-12 | 1.0 | Initial Guide-4 Dec 2025 implementation |

---

## Contact & Resources

### Official Navy Resources
- [Navy PFA Website](https://www.mynavyhr.navy.mil/Support-Services/21st-Century-Sailor/Physical-Readiness/)
- Guide-4: Body Composition Assessment
- Guide-5A: Physical Readiness Test

### Technical Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3C Validators](https://validator.w3.org/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

*Last Updated: January 2026*
