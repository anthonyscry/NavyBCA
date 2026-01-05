# Navy BCA Calculator - Style Guide

## Typography Standards

All pages should use consistent font sizes to maintain uniformity across the site.

### Font Sizes (Always use px, not rem or em)

- **h1**: `32px` - Main page heading
- **h2**: `20px` - Section headings
- **h3**: `16px` - Subsection headings
- **p**: `14px` - Body text
- **li**: `14px` - List items
- **Small text** (labels, notes): `12-13px`
- **Button text**: `14-18px` depending on button size

### Line Height

- **Body text**: `1.6`
- **Headings**: Default (no line-height needed)

### Font Family

```css
font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
```

## Colors

### Primary Colors

- **Gold (Primary accent)**: `#ffd700`
- **Dark gold**: `#b8860b`
- **Light text**: `#e8eef5`
- **Medium gray text**: `#8fa3bf`
- **Dark gray text**: `#6b7c94`

### Background Colors

- **Main gradient**:
  ```css
  background: linear-gradient(135deg, #0a1628 0%, #1a2a4a 50%, #0d1829 100%);
  ```
- **Card background**: `rgba(20, 35, 60, 0.8)`
- **Secondary card**: `rgba(30, 50, 80, 0.5)`

### Status Colors

- **Success/Pass**: `#22c55e`
- **Error/Fail**: `#ef4444`
- **Info**: `#4a90e2`

## Layout

### Container

```css
max-width: 900px;
margin: 0 auto;
padding: 20px;
```

### Content Cards

```css
background: rgba(20, 35, 60, 0.8);
border-radius: 16px;
border: 1px solid rgba(100, 130, 180, 0.3);
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
padding: 40px;
```

## Using the Template

### For New Pages:

1. **Copy the template file**:
   ```bash
   cp template.html new-page.html
   ```

2. **Replace placeholders**:
   - `PAGE_TITLE` - The page title for browser tab
   - `PAGE_DESCRIPTION` - Meta description for SEO
   - `PAGE_HEADING` - Main heading displayed on page
   - `PAGE_SUBTITLE` - Subtitle text below heading

3. **Add content** in the `<main>` section

4. **Add page-specific styles** in the `<style>` block (keep them minimal)

### For Existing Pages:

1. **Link to base.css**:
   ```html
   <link rel="stylesheet" href="css/base.css">
   ```

2. **Remove duplicate styles** that are now in base.css

3. **Keep only page-specific styles** in the inline `<style>` block

## Best Practices

### DO:
✅ Use `px` for all font sizes (not `rem` or `em`)
✅ Use the base.css file for common styles
✅ Keep line-height at 1.6 for body text
✅ Test on mobile (max-width: 600px)
✅ Use semantic HTML (`<header>`, `<main>`, `<footer>`)

### DON'T:
❌ Use relative units (rem, em, %) for font sizes
❌ Duplicate styles that exist in base.css
❌ Use inline styles unless absolutely necessary
❌ Create new color schemes - stick to the palette
❌ Use different container widths

## Components

### Back Button

```html
<a href="index.html" class="btn-back">← Back to Calculator</a>
```

### Highlight Box

```html
<div class="highlight-box">
    <p><strong>Important:</strong> Your important message here.</p>
</div>
```

### Ad Container

```html
<div class="ad-container">
    <span class="ad-label">Advertisement</span>
</div>

<!-- Large variant -->
<div class="ad-container large">
    <span class="ad-label">Advertisement</span>
</div>
```

### Standard Footer

Always use the same footer navigation across all pages. See `template.html` for the complete footer code.

## Responsive Design

Mobile breakpoint: `600px`

```css
@media (max-width: 600px) {
    /* Adjust for mobile */
}
```

## Testing Checklist

Before publishing a new page:

- [ ] Font sizes match the style guide (use browser inspector)
- [ ] Page loads correctly on desktop
- [ ] Page loads correctly on mobile
- [ ] All links work
- [ ] Footer navigation is complete and correct
- [ ] Google Analytics is included
- [ ] AdSense code is included
- [ ] Favicon displays correctly

## Questions?

Contact: administrator@navybca.com
