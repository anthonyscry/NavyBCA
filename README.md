# Navy BCA Calculator

A free, unofficial web application designed to help U.S. Navy personnel prepare for and understand Body Composition Assessment (BCA) requirements and Physical Readiness Tests (PRT).

**Live Site:** [navybca.com](https://navybca.com)

---

## About

Built by a retired Sailor who served multiple tours as a Command Fitness Leader (CFL), this site provides quick, accurate fitness tools without subscriptions, logins, or paywalls. The mission is simple: help Navy personnel succeed in their fitness assessments using current official standards (Guide-4, December 2025).

---

## Features

### BCA Calculator (`index.html`)
The core tool for calculating body composition assessment results.

- **Two-Step Calculation** per Navy standards:
  - Step 1: Waist-to-Height Ratio (pass if WHtR ≤ 0.5499)
  - Step 2: Body Fat Percentage calculation if Step 1 fails
- **Smart Rounding**: Height rounds up, waist rounds down per Navy regulations
- **Path to Standards**: Shows 3 ways to reach passing standards:
  - Reduce waist only
  - Reduce weight only
  - Balanced approach
- **Data Persistence**: Saves inputs to localStorage for convenience
- **Export Options**: Download results as CSV or print to PDF

### PT Session Generator (`generator.html`)
Creates randomized 60-minute Command PT sessions.

- **Structured Workouts**: Warmup → Workout → Cooldown format
- **400+ Exercises**: Draws from comprehensive exercise database
- **Rep/Duration Suggestions**: Appropriate difficulty levels
- **Downloadable**: Print-ready workout cards
- **Customizable**: Filter by category and equipment

### PT Watchbill Generator (`watchbill.html`)
Automates monthly PT schedule creation.

- **Monthly Calendar View**: Visual schedule layout
- **Auto-Rotating CFL Assignments**: Fair distribution of duties
- **Holiday Blocking**: Mark days as unavailable
- **CFL/ACFL Tracking**: Manage multiple fitness leaders
- **Print-Ready**: Clean formatting for posting

### Exercise Library (`exercises.html`)
Searchable database of 400+ exercises.

- **Categories**: Warmups, strength, cardio, cooldown, stretching
- **Detailed Entries**: Descriptions, tips, and proper form
- **Search & Filter**: Find exercises by name or category
- **Mobile-Friendly**: Browse on any device

### PRT Prep Program (`prt-prep.html`)
8-week training plan for PRT success.

- **Structured Program**: Progressive difficulty over 8 weeks
- **Three Focus Areas**: Pushups, planks, and running
- **Daily Workouts**: Clear instructions for each session
- **Tracking**: Monitor your progress

### Offline Mode (`offline.html`)
Complete functionality without internet.

- **Self-Contained**: All data embedded in single file
- **No Dependencies**: Works anywhere, anytime
- **Full Features**: BCA calculator with complete lookup tables
- **Downloadable**: Save to your device

### References (`references.html`)
Quick access to official Navy documents.

- **Guide-4**: Body Composition Assessment (December 2025)
- **Guide-5A**: Physical Readiness Test
- **Direct Downloads**: PDF links to official publications

---

## Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Data Storage** | localStorage API, CSV lookup tables |
| **Styling** | CSS Variables, Flexbox, Grid, Responsive Design |
| **SEO** | Schema.org structured data, XML sitemap |
| **Analytics** | Google Analytics (GA4) |

### No Backend Required
This is a fully static site that can be hosted anywhere. All calculations happen client-side in the browser.

---

## Project Structure

```
NavyBCA/
├── Core Pages
│   ├── index.html              # BCA Calculator
│   ├── generator.html          # PT Session Generator
│   ├── watchbill.html          # PT Watchbill Generator
│   ├── exercises.html          # Exercise Library
│   ├── prt-prep.html           # PRT Prep Program
│   ├── references.html         # Official Documents
│   ├── about.html              # About Page
│   ├── privacy.html            # Privacy Policy
│   └── terms.html              # Terms of Service
│
├── Shared Assets
│   ├── styles.css              # Design system & components
│   ├── security.js             # Input sanitization & XSS prevention
│   ├── shared-utils.js         # Common utilities
│   └── exercises-data.js       # Exercise database (400+ exercises)
│
├── Data Files
│   ├── male_bca_table_FULL_NORMALIZED.csv      # Male BCA lookup
│   └── female_bca_table_FULL_NORMALIZED.csv    # Female BCA lookup
│
├── Offline Versions
│   ├── offline.html            # Offline BCA calculator
│   └── offline-embedded.html   # Alternative offline version
│
├── Official Documents
│   ├── Guide-4 Body Composition Assessment.pdf
│   └── Guide-5A Physical Readiness Test.pdf
│
├── SEO & Config
│   ├── sitemap.xml             # Search engine sitemap
│   ├── robots.txt              # Crawler directives
│   └── ads.txt                 # AdSense verification
│
└── Documentation
    ├── README.md               # This file
    ├── MAINTENANCE.md          # Maintenance workflow
    ├── claude.md               # Developer reference
    ├── HOSTING-GUIDE.md        # Deployment guide
    └── SECURITY_REVIEW.md      # Security audit
```

---

## Design System

### Color Palette
| Variable | Value | Usage |
|----------|-------|-------|
| `--color-primary` | `#ffd700` | Navy Gold - buttons, highlights |
| `--color-dark` | `#0a1628` | Navy Blue - backgrounds |
| `--color-success` | `#22c55e` | Pass indicators |
| `--color-error` | `#ef4444` | Fail indicators |
| `--color-text` | `#e8eef5` | Primary text |

### Components
- Buttons (primary, secondary, various sizes)
- Form inputs with validation states
- Cards and metric displays
- Notification system (success/error/warning/info)
- Loading overlay with spinner
- Responsive grid layouts

---

## BCA Calculation Method

The calculator follows the official Navy two-step process from Guide-4 (December 2025):

### Step 1: Waist-to-Height Ratio
```
WHtR = Waist (inches) / Height (inches)
Pass if WHtR ≤ 0.5499
```

### Step 2: Body Fat Percentage
If Step 1 fails, body fat is calculated using Navy circumference measurements and compared against maximum allowable percentages:
- **Male**: 26% maximum
- **Female**: 36% maximum

The lookup tables (`*_bca_table_FULL_NORMALIZED.csv`) provide accurate body fat percentages based on height, weight, and circumference measurements.

---

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/anthonyscry/NavyBCA.git
   cd NavyBCA
   ```

2. **Start a local server**
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx serve
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### No build process required
All files are ready to serve as-is. No compilation, bundling, or transpilation needed.

---

## Deployment

This is a static site that can be hosted on any platform:

- **GitHub Pages**: Free, automatic from repository
- **Netlify**: Free tier with CDN
- **Vercel**: Free tier with excellent performance
- **AWS S3 + CloudFront**: Scalable, low-cost
- **Any static host**: Just upload the files

See `HOSTING-GUIDE.md` for detailed deployment instructions.

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (especially BCA calculations)
5. Submit a pull request

### Priority Areas
- Automated testing for BCA calculations
- Performance optimization
- Accessibility improvements
- Mobile experience enhancements

---

## Security

The site implements several security measures:
- Input sanitization via `security.js`
- XSS prevention with HTML escaping
- No sensitive data collection
- Client-side only processing

See `SECURITY_REVIEW.md` for the full security audit.

---

## Documentation

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview (this file) |
| `MAINTENANCE.md` | Keeping the site updated |
| `claude.md` | Developer reference guide |
| `HOSTING-GUIDE.md` | Deployment instructions |
| `SECURITY_REVIEW.md` | Security audit report |
| `SUGGESTED_IMPROVEMENTS.md` | Development roadmap |

---

## Disclaimer

This is an **unofficial** tool created by a veteran to help fellow service members. It is not affiliated with, endorsed by, or connected to the U.S. Navy or Department of Defense.

Always verify calculations against official Navy publications and consult your Command Fitness Leader for official assessments.

---

## License

This project is provided for educational and personal use by U.S. Navy personnel and fitness enthusiasts.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/anthonyscry/NavyBCA/issues)
- **Questions**: Open a discussion on GitHub

---

*Built with respect for those who serve.*
