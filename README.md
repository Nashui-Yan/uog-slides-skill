# Nashui UoG Slides Skill

A Claude Code skill for generating University of Glasgow branded HTML slide
decks. Designed for academic, technical, and research presentations.

## Purpose

Generates self-contained, single-file HTML slide decks with UoG institutional
visual identity. Zero dependencies — open in any browser.

## Features

- **UoG institutional visual system**: University Blue dominant, white
  backgrounds, blue brand blocks, large whitespace
- **8 built-in layout types**: Big bullets, two-column, image-card grid, KPI,
  comparison, timeline, process, appendix table
- **15 SRS slide types**: Cover, section divider, research question, problem
  framing, system architecture, pipeline/DAG, method/algorithm, dataset
  summary, experimental setup, benchmark/KPI, comparison/ablation,
  timeline/roadmap, limitation/risk, closing/takeaway, appendix table
- **Derived cropped logo system**: Bbox-based whitespace removal for
  perfect logo placement in header brand blocks
- **Fixed 1920×1080 stage**: Scales to fit any viewport, no scrolling
- **Print CSS**: Per-slide page breaks, white backgrounds
- **Reduced motion support**: `prefers-reduced-motion` throughout
- **WCAG AAA contrast**: All UoG brand colour combinations pass AAA
- **Zero dependencies**: Pure HTML/CSS/JS — no npm, no frameworks

## Visual System

- **University Blue** `#011451` dominant on every slide
- **White background** by default
- **Blue brand block** with white-text logo left of title on every normal slide
- **Cover/closing**: White background, full-width blue band, bottom-left logo row
- **Typography**: Georgia/serif display, system-ui body, 60–76px titles
- **Big-font, low-density**: 3 bullets max, no paragraphs, no tiny text

Full specification: `VISUAL_STYLE_BRIEF.md`

## Installation

```bash
mkdir -p ~/.claude/skills
cp -R nashui-uog-slides-skill ~/.claude/skills/nashui-uog-slides-skill
```

Then invoke in Claude Code:
```
/nashui-uog-slides-skill
```

## Usage

Create a deck without an SRS:
```
/nashui-uog-slides-skill
Create an 8-slide UoG research presentation on [topic].
Use big-font mode, white background, and UoG institutional header.
```

With an SRS:
```
/nashui-uog-slides-skill --srs path/to/srs.md
```

## Demo

Open the 8-slide institutional demo:
```bash
open examples/uog-institutional-large-demo/index.html
# or
xdg-open examples/uog-institutional-large-demo/index.html
```

Navigate with ← → arrow keys, Space, mouse wheel, or click.

## Validation

```bash
node scripts/validate-deck.mjs examples/uog-institutional-large-demo/index.html --check-logos
```

Validates: slide structure, brand colours, logo placement, animations,
accessibility, print CSS, reduced motion, header system, and more.

## Logo and Brand Asset Notice

University of Glasgow logo files under `assets/logos/main-uog-logo-artwork/`
are official UoG brand artwork subject to the University's brand usage rules.

- **If using this repository privately** (University-affiliated / internal /
  academic use): You may keep and use the provided logo files.
- **If publishing this repository publicly**: Verify permissions with the
  University of Glasgow brand toolkit, or replace logo files with placeholders.
  See `LOGO_USAGE.md` and `assets/logos/README.md`.

The derived cropped header SVG (`uog-white-text-cropped-for-header.svg`) is
generated from the official asset via `scripts/derive_uog_header_logo.py`.
It inherits the same usage restrictions as the source asset.

The MIT license applies to original code and documentation only. Logo assets
are excluded from the MIT license.

## License and Third-Party References

- **Original code**: MIT License (see `LICENSE`)
- **UoG brand assets**: Excluded from MIT. Subject to University of Glasgow
  brand usage rules.
- **Reference repos** (used for architecture research only, not included):
  - DAMNCOOL-slides-skill (MIT) — architectural patterns
  - frontend-slides (MIT) — architectural patterns
  - guizang-ppt-skill (AGPL-3.0) — concept-only, no code incorporated
- **UoG brand colours**: https://www.gla.ac.uk/myglasgow/staff/brandtoolkit/colour/

See `../audit/license_notes.md` and `../audit/reference_analysis.md` in the
workspace for the full license audit.

## Repository Structure

```
nashui-uog-slides-skill/
  SKILL.md                    ← Master skill definition
  README.md                   ← This file
  LICENSE                     ← MIT (code only, excludes brand assets)
  VISUAL_STYLE_BRIEF.md       ← Visual identity specification
  BRAND_TOKENS.md             ← UoG colour palette as CSS tokens
  THEME_SYSTEM.md             ← Theme architecture
  STYLE_PRESETS.md            ← Quick-reference presets
  LOGO_USAGE.md               ← Logo placement rules
  viewport-base.css           ← Fixed-stage base CSS
  grid-system.css             ← 12-column grid
  animations.css              ← Entrance animations
  slide-types.css             ← 15 slide types + layouts + components
  html-template.md            ← HTML architecture reference
  animation-patterns.md       ← Animation recipes
  .gitignore
  themes/                     ← 3 theme CSS files
  assets/logos/               ← Logo files + manifest
  scripts/                    ← Validators + derivation + extraction
  examples/                   ← Demo decks
  references/                 ← Layouts, checklist, accessibility docs
```

## Development Notes

- **Derived logo script**: `python3 scripts/derive_uog_header_logo.py`
  Requires Pillow and cairosvg (`pip3 install Pillow cairosvg`).
- **All code is original** — no AGPL, GPL, or LGPL code incorporated.
- **Fixed 1920×1080 stage**: Design at 1920×1080; the viewport scales automatically.
- **CSS custom properties**: All visual values use CSS variables defined in theme files.
