# Navy BCA Calculator & PT Generator

## What This Is

A modern, offline-capable progressive web application (PWA) for U.S. Navy personnel. It combines official Body Composition Assessment (BCA) calculations with a smart Physical Training (PT) generator, designed to run reliably on personal devices or disconnected government computers via a single file.

## Core Value

Zero-dependency reliability: The entire app must be downloadable as a single file and function 100% offline for sailors deployed at sea.

## Requirements

### Validated

- ✓ BCA Calculator Logic (Verified against Guide-4) — existing
- ✓ Exercise Database (400+ exercises) — existing
- ✓ PDF Form Generation (NAVPERS 6110/10) — existing

### Active

- [ ] **Modern Tech Stack**: Rewrite in React + Vite + Tailwind CSS
- [ ] **Offline Architecture**: Automated build pipeline to generate single-file HTML (assets inlined)
- [ ] **Smart PT Generator**: Algorithm to prevent consecutive same-muscle-group exercises
- [ ] **Offline Media**: Replace video links with bundled/optimized GIFs for exercise demonstrations
- [ ] **UI/UX Overhaul**: Modern, accessible, mobile-first design using Navy Blue & Gold palette

### Out of Scope

- **Backend Database**: Client-side only to ensure offline portability.
- **User Accounts**: Privacy focus; data stored in localStorage only.
- **Video Streaming**: Incompatible with offline-first "sneakernet" requirement.

## Context

- **Environment**: Users often access this on restricted government networks or personal devices with intermittent connectivity. "Sneakernet" (USB transfer) is a critical use case.
- **Existing Codebase**: Functional vanilla JS, but scattered logic and "Geocities-era" styling.
- **Assets**: Current CSV tables and icons need to be bundled. New GIF assets will increase bundle size, requiring optimization strategies.

## Constraints

- **Single File Output**: Must produce a standalone `index.html` that runs without a local server.
- **Bundle Size**: While "large" is okay for download, it must be reasonable for a browser to load from disk (<5-10MB target).
- **Browser Compatibility**: Must work on potentially older government browsers (Edge/Chrome).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| **React + Vite** | Component modularity and robust ecosystem for bundling assets. | — Pending |
| **Inline Assets** | Necessary for "drag-and-drop" offline use on restricted machines. | — Pending |
| **GIFs over Video** | Videos are too large/complex to bundle reliably in a single file. | — Pending |

---
*Last updated: 2026-01-28 after initialization*
