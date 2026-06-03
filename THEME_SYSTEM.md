# Theme System Architecture

## Overview

The `nashui-uog-slides-skill` theme system is built on CSS custom properties.
Each theme is a self-contained CSS file that defines `:root` variables and
optional slide-type overrides.

## Architecture

```
BRAND_TOKENS.md          ← Canonical UoG colour values (read-only reference)
       │
       ▼
themes/
  uog-research-blue.css  ← Theme 1: Formal academic
  uog-energy-noir.css    ← Theme 2: Dark premium technical
  uog-swiss-data.css     ← Theme 3: Swiss data-first
       │
       ▼
  Deck HTML              ← A single theme is @import-ed
```

Each theme CSS file:
1. `@import`s `viewport-base.css` (mandatory stage CSS)
2. Defines all `:root` custom properties
3. Optionally overrides slide-type-specific styles

## Token Categories

Every theme defines these token groups:

### Typography
- `--font-display`, `--font-body`, `--font-mono`
- `--title-size`, `--subtitle-size`, `--h2-size`, `--h3-size`
- `--body-size`, `--small-size`, `--caption-size`

### Spacing
- `--slide-padding`, `--content-gap`, `--section-gap`

### Brand (constant across all themes)
- `--uog-blue`, `--uog-blue-rgb`
- Full secondary palette (see BRAND_TOKENS.md)

### Theme-Specific
- `--slide-bg`, `--slide-bg-alt`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--border-color`, `--divider-color`

### Accent (theme-specific selection from UoG palette)
- `--accent`, `--accent-warm`, `--accent-cool`, `--highlight`

### Data Palette (theme-specific)
- `--data-1` through `--data-10` (or fewer, depending on theme)

### Decorative
- `--brand-stripe-color`, `--brand-stripe-width`
- `--logo-max-height`, `--footer-logo-max-height`

### Animation
- `--ease-out-expo`, `--ease-in-out`
- `--duration-fast`, `--duration-normal`, `--duration-slow`

### Border Radius
- `--radius-sm`, `--radius-md`, `--radius-lg`

## Theme 1: uog-research-blue

**Mood**: Formal academic, authoritative, warm-scholarly.

| Property | Value |
|----------|-------|
| Background | `#FAFAF8` (warm white) |
| Primary text | University Blue |
| Display font | Serif (Georgia fallback) |
| Accent | UoG Dark Blue |
| Data palette | Dark series from secondary palette |
| Shadows | Subtle, blue-tinted |
| Border radius | 2–8px (soft academic) |

**Best for**: PhD annual progress reviews, academic conferences, research
seminars, lecture slides.

**Slide rhythm**: Primarily light-background slides. Section dividers use
solid University Blue. Title slide: full University Blue with white text.

## Theme 2: uog-energy-noir

**Mood**: Dark, premium, technical, glowing.

| Property | Value |
|----------|-------|
| Background | `#0A0B0F` (near-black) |
| Primary text | `#E8E9EC` (soft white) |
| Display font | Serif (Georgia fallback) |
| Accent | UoG Light Blue (glows on dark) |
| Data palette | Light series from secondary palette |
| Shadows | Inverted (dark glows) |
| Border radius | 2–8px |

**Best for**: Digital twin, CPS, energy systems, IoT, cyber-physical
infrastructure, industry showcases.

**Slide rhythm**: Primarily dark-background slides. Title slide: gradient
from University Blue to near-black. Section dividers: solid University Blue.

## Theme 3: uog-swiss-data

**Mood**: Minimal, precise, data-first, neutral ground.

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` (pure white) |
| Primary text | `#1A1C20` (near-black) |
| Display font | Sans-serif (Helvetica Neue / Inter) |
| Accent | University Blue (singular anchor) |
| Data palette | Full 10-colour ordered categorical |
| Shadows | Minimal (none on cards) |
| Border radius | 0–4px (near-zero) |

**Best for**: Benchmark results, data tables, KPI dashboards, methods slides,
quantitative research.

**Slide rhythm**: Alternating white and `#F5F4F2` (subtle warm grey) slides.
Title slide: white with University Blue bottom stripe.

## Adding a New Theme

1. Copy an existing theme CSS file.
2. Redefine the `:root` block with new colour, typography, and spacing tokens.
3. Use ONLY colours from the UoG brand palette (`BRAND_TOKENS.md`).
4. Update the theme table in `SKILL.md` and `README.md`.
5. Add a contrast audit section to `BRAND_TOKENS.md`.

## Future: SRS-Driven Theme Templates

A planned feature: the user provides a Structured Requirements Specification
(SRS) document, and the skill generates a custom theme CSS file from it.

The SRS will specify:
- Palette selection (subset of UoG colours)
- Typography preferences
- Spacing density
- Animation style
- Special component requirements

This will be implemented after the three core themes are validated with real
presentations.

## Logo Defaults by Theme

Each theme selects specific logo variants from `assets/logos/main-uog-logo-artwork/`.
See `logo-manifest.json` for the full inventory.

| Theme | Title Slide | Footer | Section Divider |
|-------|------------|--------|-----------------|
| `uog-research-blue` | `SVG/Unboxed colour logo blue text.svg` | `SVG/Unboxed mono logo blue.svg` | `SVG/Unboxed mono logo white.svg` |
| `uog-energy-noir` | `SVG/Unboxed colour logo white text.svg` | `SVG/Unboxed mono logo white.svg` | `SVG/Unboxed mono logo white.svg` |
| `uog-swiss-data` | `SVG/Unboxed colour logo blue text.svg` | `SVG/Unboxed mono logo blue.svg` | `SVG/Unboxed mono logo white.svg` |

### Why mono for footers?

The full-colour crest has 9 colours with fine detail. At footer sizes
(28–48px height), the crest loses legibility. The mono variants have a
single colour (University Blue or white) and work cleanly at small sizes.

### Why full-colour for title slides?

Title slides display the logo at larger sizes (60–80px height), where the
9-colour crest is legible and visually impactful. The full-colour crest is
the most recognizable UoG brand element.

### Why white variants for section dividers?

Section dividers use a solid University Blue background. The white logo
variant (full-colour crest + white wordmark for titles, mono white for
footers) provides the correct contrast on dark backgrounds.

### SVG Usage: `<img>` Only

All UoG SVG logo files use generic CSS class names (`.st0`–`.st3`). Never
embed them inline in HTML — always use `<img src="...">` tags. This isolates
the SVG's internal styles from the slide deck's CSS. See `LOGO_USAGE.md` for
the full explanation and correct/incorrect code examples.

## Design Constraints

These are enforced by the skill, not by CSS:

1. **No colour invention**: Every hex value must trace back to `BRAND_TOKENS.md`.
2. **No AI defaults**: `#3b82f6`, `#6366f1`, `#8b5cf6`, Indigo, purple gradients are banned.
3. **Accessibility floor**: All text/background combinations must meet WCAG AA (4.5:1 for normal text, 3:1 for large text).
4. **Print fidelity**: `@media print` must produce legible, branded output.
5. **Reduced motion**: `@media (prefers-reduced-motion)` must disable all non-essential animation.
6. **UoG logo presence**: The UoG primary logo must appear on every title slide and section divider.
