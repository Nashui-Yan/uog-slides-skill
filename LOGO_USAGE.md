# Logo Usage Guidelines

> Applies to: `nashui-uog-slides-skill`
> Control file: `assets/logos/logo-manifest.json`

## Purpose

This document defines how logos are placed, sized, and protected across all slide types in the UoG slides system. The skill reads `logo-manifest.json` at generation time and applies these rules automatically.

## Logo Files — Actual Assets

The skill ships with official University of Glasgow logo artwork in:
`assets/logos/main-uog-logo-artwork/`

### Selected Defaults

| Role | Theme Background | File | Format | Variant |
|------|-----------------|------|--------|---------|
| Title slide | Light | `SVG/Unboxed colour logo blue text.svg` | SVG | Full-colour crest, blue wordmark |
| Title slide | Dark | `SVG/Unboxed colour logo white text.svg` | SVG | Full-colour crest, white wordmark |
| Footer | Light | `SVG/Unboxed mono logo blue.svg` | SVG | Single-colour University Blue (#011451) |
| Footer | Dark | `SVG/Unboxed mono logo white.svg` | SVG | Single-colour white |
| Partner row | Light | `SVG/Unboxed colour logo blue text.svg` | SVG | Full-colour, same as title_light |
| Section divider | Dark | `SVG/Unboxed mono logo white.svg` | SVG | White monochrome on UoG Blue |

**SVGs are pure vector** — no font dependencies, no raster embedding.
Crest is rendered as paths. Wordmark is rendered as paths. This ensures
consistent rendering across all browsers and operating systems.

### Normal Slides: Logo on Blue Brand Block

On every normal light slide, the UoG logo is placed on a University Blue
brand block left of the title, using a **derived cropped SVG** asset:

```html
<div class="uog-logo-blue-block">
  <img src="...(uog-white-text-cropped-for-header.svg)..." alt="University of Glasgow">
</div>
```

**Why a derived asset**: The official UoG SVG has large internal whitespace
(only ~66%×38% of the file contains visible pixels). The derived cropped SVG
(`uog-white-text-cropped-for-header.svg`) removes this whitespace via
bbox-based detection, so the visible logo naturally fills the blue block
without CSS hacks. The original official SVG is never modified.

**Derivation script**: `scripts/derive_uog_header_logo.py`
**Source asset**: `Unboxed colour logo white text.svg` (untouched)
**Derived asset**: `uog-white-text-cropped-for-header.svg` (header display only)

### Cover Slides: Logo in Bottom-Left Row

On cover slides (dark blue background), the logo sits in a bottom-left
logo row (`.uog-cover-logo-row`), not beside the title:

```html
<div class="uog-cover-logo-row">
  <img class="uog-cover-footer-logo" src="...(white text logo)" alt="University of Glasgow">
  <!-- Partner logos can be added here -->
</div>
```

- Logo size: 300px wide, 110px max-height — medium, not dominating
- Leaves room for partner logos to the right (40px gap)
- Position: left 96px, bottom 76px

### Fallback PNGs

If SVG rendering is unavailable (e.g., PDF export via Playwright), use:
`PNG/Unboxed colour logo blue text.png` (984×533 RGBA) and equivalents.
See `logo-manifest.json` for the full fallback table.

### Files NOT to Use

- **EPS files** — Print-only format, not web-compatible
- **Boxed variants** — The crest-in-a-box layout constrains slide designs
- **Black monochrome** — Reserved for print/grayscale only; no University Blue presence
- **Stationery PNG** — 651×202px, too small for the 1920×1080 slide stage

The system supports four logo categories:

| Category | ID | Required | Description |
|----------|-----|----------|-------------|
| Primary UoG | `uog-primary` | Yes | University of Glasgow primary logo |
| School/College | `uog-school` | Optional | Your school or college sub-brand logo |
| Project | `project` | Optional | Research project or lab logo |
| Partners | `partners[]` | Optional | Funder, collaborator, or industry partner logos |

Each logo can have three variants:
- **Light** (`light`): Full-colour version for white/light backgrounds
- **Dark** (`dark`): Reversed/white version for dark backgrounds
- **Monochrome** (`mono`): Single-colour version for print

## Placement Rules

### Title Slide

```
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│              TITLE CONTENT                  │
│                                             │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ UoG Logo  │  School Logo  │  Proj Logo  │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
  Default: bottom-bar, all logos left-to-right
```

**Rules:**
- UoG primary logo always appears on the title slide
- School and project logos appear alongside, separated by a divider or gap
- All logos in the bar share equal vertical alignment
- Maximum combined height: 80px for the logo row
- The UoG logo is always first (leftmost)

### Content Slides

```
┌─────────────────────────────────────────────┐
│                                             │
│  Content area                               │
│                                             │
│                                             │
│                                ┌──────────┐ │
│                                │ UoG Logo │ │
│                                └──────────┘ │
└─────────────────────────────────────────────┘
  Default: bottom-right, UoG primary only
```

**Rules:**
- UoG primary logo in the bottom-right corner
- Clearspace from slide edge: minimum `var(--slide-padding)`
- Maximum height: `var(--footer-logo-max-height)` (defined per theme)
- No partner or project logos on content slides (avoids clutter)
- Exception: School logo may be added to the bottom-left corner

### Section Divider

```
┌─────────────────────────────────────────────┐
│                                             │
│           SECTION TITLE                     │
│                                             │
│                                             │
│                  ┌──────────┐               │
│                  │ UoG Logo │               │
│                  └──────────┘               │
└─────────────────────────────────────────────┘
  Default: bottom-center, UoG primary only
```

**Rules:**
- Centered at bottom of the slide
- UoG primary logo only
- Monochrome variant preferred on coloured backgrounds
- Logo size: 60–80% of standard size for visual weight balance

### Partner Logo Row

```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│  │ Ptnr │ │ Ptnr │ │ Ptnr │ │ Ptnr │      │
│  │  1   │ │  2   │ │  3   │ │  4   │      │
│  └──────┘ └──────┘ └──────┘ └──────┘      │
│                                             │
└─────────────────────────────────────────────┘
  Max 5 logos per row, equal height
```

**Rules:**
- Dedicated slide (or bottom section of title/close slides)
- Maximum 5 logos per row
- Equal height: all logos scaled to the same vertical size
- Maximum logo height: 60px (configurable in manifest)
- Centered horizontally with even spacing

## Clearspace

Clearspace is the minimum empty space around a logo that must remain free of text, graphics, or slide edges.

| Logo Type | Clearspace |
|-----------|-----------|
| UoG Primary | **TODO: Extract from official brand toolkit** → Default: 50% of logo height |
| School/College | Same as primary, or per school guidelines |
| Project | 25% of logo height (less strict) |
| Partner | Per partner agreement |

**TODO**: The official UoG logo clearspace should be verified at:
https://www.gla.ac.uk/myglasgow/staff/brandtoolkit/logos/

## Minimum Display Sizes

| Logo Type | Digital (px height) | Print (mm height) |
|-----------|--------------------|--------------------|
| UoG Primary | 30px | 15mm |
| School/College | 24px | 12mm |
| Project | 20px | 10mm |
| Partner | 24px | 12mm |

## Theme-Specific Logo Selection

The skill automatically selects the correct logo variant based on the active theme:

| Theme | Title Slide | Footer | Section Divider |
|-------|------------|--------|-----------------|
| `uog-research-blue` | `SVG/Unboxed colour logo blue text.svg` | `SVG/Unboxed mono logo blue.svg` | `SVG/Unboxed mono logo white.svg` |
| `uog-energy-noir` | `SVG/Unboxed colour logo white text.svg` | `SVG/Unboxed mono logo white.svg` | `SVG/Unboxed mono logo white.svg` |
| `uog-swiss-data` | `SVG/Unboxed colour logo blue text.svg` | `SVG/Unboxed mono logo blue.svg` | `SVG/Unboxed mono logo white.svg` |

### Selection Logic

```
Is the slide background dark? (#011451, #0A0B0F, near-black)
  ├── Yes → Use white/reversed logo variant
  │   ├── Title slide → full-colour crest + white wordmark
  │   └── Footer → mono white (cleaner at small sizes)
  │
  └── No → Use blue logo variant
      ├── Title slide → full-colour crest + blue wordmark
      └── Footer → mono blue (cleaner at small sizes)
```

The full-colour crest is identical in both blue-text and white-text variants.
Only the "University of Glasgow" wordmark changes colour to match the background.

## How to Add Logos Later

1. Obtain official logo files from the UoG brand toolkit (SVG format preferred).
2. Place them in `assets/logos/` using the naming convention: `<id>-<variant>.<format>`.
3. Update `assets/logos/logo-manifest.json` with the file metadata.
4. Update the `placement` section to configure slide-type-specific logo positions.
5. Run `node scripts/validate-deck.mjs --check-logos` to verify.

## SVG Usage Rule: `<img>` Only, Never Inline

The UoG SVG logo files use generic CSS class names (`.st0`, `.st1`, `.st2`, `.st3`)
that would conflict with slide CSS if embedded inline via `<svg>` tags.

**Always use `<img>` tags, never inline `<svg>`:**

```html
<!-- ✅ CORRECT — <img> tag references the SVG file -->
<img class="uog-logo" src="assets/logos/main-uog-logo-artwork/SVG/Unboxed%20colour%20logo%20blue%20text.svg" alt="University of Glasgow" style="height: 60px;">

<!-- ❌ WRONG — inline SVG pollutes the CSS class namespace -->
<svg class="uog-logo" viewBox="0 0 235.28 126.98">...</svg>
```

**Why:**
1. The SVGs define CSS classes `.st0 { fill: none; }`, `.st1 { fill: #fff; }`, etc.
2. If inlined into an HTML page, these classes apply globally and will override or
   be overridden by slide CSS using the same generic class names.
3. `<img>` tags isolate the SVG's internal styles from the page CSS.
4. `<img>` tags are simpler, faster, and cacheable by the browser.
5. There is no need for CSS-styling the logo internals — the correct colour
   variant should be chosen from the manifest instead.

**Path URL-encoding:** Logo file paths contain spaces. Always URL-encode spaces
as `%20` in `src` attributes. The validator will warn if unencoded spaces are
detected in logo paths.

## What NOT to Do

- ❌ Do not stretch, squash, or distort any logo — always preserve aspect ratio
- ❌ Do not change logo colours — use the correct variant (blue text, white text, or mono) instead
- ❌ Do not apply shadows, glows, or visual effects (including `drop-shadow`, `box-shadow`, `filter`)
- ❌ Do not change logo opacity — always display at 100% opacity
- ❌ Do not rotate, skew, or apply CSS transforms to logos
- ❌ Do not place logos on complex or textured backgrounds
- ❌ Do not crop or clip the logo — the full crest + wordmark must be visible
- ❌ Do not use the crest alone without the wordmark (unless an official crest-only variant is provided)
- ❌ Do not use low-resolution raster logos — always use SVG; fall back to PNG only when SVG is unsupported
- ❌ Do not embed SVGs inline (use `<img src="...">`) — the SVG CSS classes (`.st0`-`.st3`) would conflict with slide CSS
- ❌ Do not omit the UoG primary logo from any title slide
- ❌ Do not place partner logos without permission
- ❌ Do not use EPS files — they are print-only and not web-compatible
- ❌ Do not use the boxed variant — the frame constrains layout flexibility
- ❌ Do not use the stationery PNG — too small (651×202) for the 1920×1080 slide stage
