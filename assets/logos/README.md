# Logo Assets

This directory holds logo files for the `nashui-uog-slides-skill`.

## Directory Status

**Official UoG logo artwork is present** in `main-uog-logo-artwork/`.

19 files across 3 formats (SVG, PNG, EPS). SVGs are pure vector with no font
dependencies. See `logo-manifest.json` for the full inventory and
`../../audit/logo_asset_audit.md` for the detailed audit report.

## Quick Reference — Which Logo to Use

### For HTML Slide Decks (primary use case)

| What | Which File | Why |
|------|-----------|-----|
| Title slide, light bg | `main-uog-logo-artwork/SVG/Unboxed colour logo blue text.svg` | Full-colour crest + blue wordmark |
| Title slide, dark bg | `main-uog-logo-artwork/SVG/Unboxed colour logo white text.svg` | Full-colour crest + white wordmark |
| Footer, light bg | `main-uog-logo-artwork/SVG/Unboxed mono logo blue.svg` | Single-colour UoG Blue, clean at small sizes |
| Footer, dark bg | `main-uog-logo-artwork/SVG/Unboxed mono logo white.svg` | Single-colour white, clean at small sizes |
| Partner logo row | `main-uog-logo-artwork/SVG/Unboxed colour logo blue text.svg` | Full colour, sized at max 60px height |

### For Print / Stationery

| What | Which File |
|------|-----------|
| Print materials | `main-uog-logo-artwork/EPS/` directory |
| Grayscale print | `main-uog-logo-artwork/SVG/Unboxed mono logo black.svg` |

### DO NOT USE

| File | Why |
|------|-----|
| All EPS files | Print-only, not web-compatible |
| Boxed variants (SVG/PNG) | Crest-in-a-box constrains layout |
| Black mono variants | No UoG Blue brand presence on screen |
| `stationery.png` | 651×202 — too small for 1920×1080 stage |

## Logo Variant Details

### SVG Variants (all 235.28×126.98 viewBox, pure vector)

**Full-colour (blue text)**: 9-colour crest including University Blue `#011451`.
Crest colours: greens, blues, reds, yellows, golds. The wordmark "University
of Glasgow" is in University Blue. Best for white/light backgrounds.

**Full-colour (white text)**: Same 9-colour crest. The wordmark is white.
Best for dark/University Blue backgrounds.

**Mono blue**: Entire logo (crest + wordmark) in University Blue `#011451`
with white details. Clean single-colour for subtle footer placement.

**Mono white**: Entire logo in white with light-blue accent details.
For dark backgrounds and section dividers.

**Mono black**: Entire logo in black with white reversed details.
For grayscale print only. Not for on-screen use.

### PNG Variants (all 984×533 RGBA, transparent)

Raster equivalents of each SVG. Use only as fallback when SVG rendering
is unavailable (e.g., PDF export via Playwright that rasterises SVGs).

### Path Convention

All SVG paths are relative to this directory. In generated HTML, reference as:
```html
<img src="assets/logos/Main%20UofG%20logo%20artwork/SVG/Unboxed%20colour%20logo%20blue%20text.svg"
     alt="University of Glasgow"
     style="height: 60px;">
```

**Important**: Paths contain spaces. Always URL-encode when embedding in HTML
(`%20` for spaces), or rename the directory to use hyphens.

## Format Requirements

- **Preferred**: SVG (vector, scalable, small file size)
- **Accepted**: PNG (at least 2x display resolution, transparent background)
- **Rejected**: EPS (print-only, not web-compatible), JPG (no transparency)

## How to Add More Logos

1. Obtain official logo files in SVG format.
2. Place them in this directory or a subdirectory.
3. Update `logo-manifest.json` with the new file entries.
4. Run `node scripts/validate-deck.mjs --check-logos` to verify manifest consistency.

## Logo Sources

- University of Glasgow logo: https://www.gla.ac.uk/myglasgow/staff/brandtoolkit/logos/
- School/college logos: Check with your college communications office.
- Project logos: Provide your own.
- Partner logos: Obtain from partners with usage permission.

## Clearspace

The UoG logo requires a minimum clearspace around all sides.

**TODO**: Extract exact clearspace from:
https://www.gla.ac.uk/myglasgow/staff/brandtoolkit/logos/

Until then, a safe default is:
- Clearspace = 50% of logo height on all sides
- Minimum display size: 30px height for digital, 15mm for print

## Do Not

- ❌ Stretch, squash, or distort — always preserve aspect ratio
- ❌ Recolour any part of the logo — use the correct variant instead
- ❌ Apply CSS effects: `filter`, `box-shadow`, `drop-shadow`, `opacity < 1`
- ❌ Rotate, skew, or apply `transform` to official logos
- ❌ Crop or clip — the full crest + wordmark must be visible
- ❌ Use the crest alone without the wordmark (unless an official crest-only variant is provided)
- ❌ Embed SVGs inline — always use `<img src="...">` to avoid CSS class conflicts
- ❌ Place logos on busy/low-contrast backgrounds that reduce legibility
- ❌ Use logos smaller than minimum display size
- ❌ Use EPS files for web/screen output
- ❌ Omit the UoG logo from any title slide
