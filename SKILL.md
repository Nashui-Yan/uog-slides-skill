---
name: nashui-uog-slides-skill
description: >
  Generate University of Glasgow branded HTML slide decks for academic,
  technical, and research presentations. Supports formal academic (research
  blue), dark premium technical (energy noir), and Swiss data-first themes.
  Logo manifest system for UoG, school, project, and partner branding.
  SRS-driven theme template generation.
version: 0.1.0
author: Nashui
license: MIT
---

# nashui-uog-slides-skill

A Claude Code skill for generating HTML slide decks with University of Glasgow
visual identity. Designed for academic, technical, and research presentations.

## Quick Start

The skill generates self-contained, single-file HTML slide decks. No build
tools, no dependencies.

```
User: /nashui-uog-slides-skill
      I need a 12-slide PhD annual progress review presentation.
      Title: "Digital Twin Calibration for Cyber-Physical Energy Systems"
      Theme: uog-research-blue
```

## Workflow

### Phase 0 — Intake

Determine what the user needs:
- **Mode A: New Deck** — User provides a title and content brief. Proceed to Phase 1.
- **Mode B: SRS-Driven** — User provides a structured SRS document. Read it, then proceed to Phase 1.
- **Mode C: Content File** — User provides a .pptx, .md, or .docx file. Extract content, then proceed to Phase 1.

### Phase 1 — Content Discovery

Ask (all together, not one-by-one):
1. Presentation purpose: lecture / conference / APR / PhD viva / research seminar / industry showcase / other?
2. Expected duration: 10min / 20min / 30min / 45min / 60min?
3. Content status: have all content, have outline, need help structuring?
4. Density preference: speaker-led (low, 1-3 bullets) or reading-first (high, structured grids)?
5. Any existing images, charts, or diagrams to include?
6. Any required sections? (e.g., Acknowledgements, References, Partner logos)
7. Any accessibility requirements beyond WCAG AA?

### Phase 2 — Style Selection

Present the three core themes (show, don't tell — generate a small visual preview
if possible):

1. **uog-research-blue** — Formal academic. University Blue dominant, white/light
   slate background. Clean serif headings. For PhD, APR, conference slides.

2. **uog-energy-noir** — Dark premium technical. University Blue plus glowing
   data accents on near-black. For digital twin, CPS, energy, IoT systems.

3. **uog-swiss-data** — Strict grid, data-first. All-sans-serif, neutral ground,
   University Blue as the singular anchor colour. For benchmarks, tables, KPIs,
   methods slides.

### Phase 3 — Slide Plan

Generate a slide-by-slide plan before writing any HTML. The plan must include:

- Slide number and type (title, content, section-divider, data, quote, image, close)
- Slide purpose (one sentence)
- Content shape (what fills this slide? bullet list, big number, table, comparison, diagram placeholder)
- Theme setting (light / dark / hero — for rhythm planning)
- Transition hint (fast / normal / slow)

No more than 2 consecutive slides of the same background tone. For decks of 8+
slides, include at least one dark-section and one light-section divider.

Share the slide plan with the user for approval before proceeding.

### Phase 4 — Generate HTML Deck

Build a single-file HTML document that includes:

1. **Required structural elements** (from `viewport-base.css`):
   - `.deck-viewport` (fixed, fills viewport)
   - `.deck-stage` (1920×1080, scaled via transform)
   - `.slide` elements (absolute, stacked)
   - Print CSS marker: `@media print` block
   - Reduced-motion marker: `@media (prefers-reduced-motion)` block

2. **Navigation script** (inline `<script>`):
   - Keyboard: arrows, Space, PageUp/Down, Home, End
   - Touch: swipe left/right, tap zones on left/right thirds
   - Mouse wheel: vertical scroll → slide advance
   - Slide counter display: "N / M"
   - Hash routing: `#1`, `#2`, etc.

3. **Brand elements**:
   - Read `BRAND_TOKENS.md` — use ONLY the colour values listed there
   - Read `LOGO_USAGE.md` — place logo placeholders per the placement rules
   - Read the selected theme CSS file from `themes/`
   - Do NOT invent colours not in the brand token file
   - Do NOT use AI-default colours (#3b82f6, #6366f1, purple gradients)

4. **Content slides**:
   - Use semantic class names for layout (e.g., `.layout-cover`, `.layout-split`, `.layout-metrics`)
   - Respect the density mode from Phase 1
   - No text overflow, no overlapping panels

5. **Accessibility**:
   - All images have `alt` text
   - Colour contrast meets WCAG AA minimum (see `BRAND_TOKENS.md` contrast table)
   - Slide content is in a logical DOM order
   - Interactive elements are keyboard accessible

### Phase 5 — Validate

Run `scripts/validate-deck.mjs` on the generated HTML file:
```
node scripts/validate-deck.mjs path/to/deck.html
```

Fix all P0 (blocking) and P1 (should-fix) issues. P2 (nice-to-have) issues
may be deferred.

### Phase 6 — Deliver

1. Save the HTML file to the user's working directory.
2. Report the file path.
3. Provide navigation instructions: "Use arrow keys or swipe to navigate.
   Press Home/End for first/last slide. Press F for fullscreen."
4. Offer to iterate: "I can adjust any slide, change the theme, or regenerate
   specific sections. Just tell me what to change."

## Authoring Contracts

When generating HTML, follow these constraints:

### Must Include
- [ ] `.deck-viewport` wrapper
- [ ] `.deck-stage` container (1920×1080)
- [ ] Each slide as `<section class="slide">` with `data-slide-index` attribute
- [ ] Navigation script with keyboard, touch, wheel support
- [ ] `@media print { ... }` block
- [ ] `@media (prefers-reduced-motion: reduce) { ... }` block
- [ ] Slide count indicator
- [ ] Logo placeholder in footer (per active theme)
- [ ] University Blue must appear on every slide (as text, accent, or stripe)

### Must NOT Include
- [ ] Any colour not in `BRAND_TOKENS.md` UoG palette
- [ ] AI-default colours (#3b82f6, #6366f1, #8b5cf6, Indigo, purple gradients)
- [ ] Inter, Roboto, or Arial as display font (TODO: replace with official UoG typeface; Swiss Data theme excepted — it uses Helvetica Neue as display, Inter as body only)
- [ ] `border-radius` > 4px on Swiss Data theme
- [ ] `box-shadow` on Swiss Data theme
- [ ] Emoji as icons (use text labels or SVG placeholders)
- [ ] UoG SVGs embedded inline (always use `<img src="...">` — the SVG files use generic `.st0`-`.st3` CSS classes that would conflict with slide CSS if inlined)
- [ ] CSS `display: none` for slide switching (use visibility/opacity)
- [ ] Scrolling within slides (content must fit 1920×1080)
- [ ] Logo paths with unencoded spaces in HTML (use `%20` for spaces, e.g., `assets/logos/main-uog-logo-artwork/SVG/Unboxed%20colour%20logo%20blue%20text.svg`)

## Visual Style Requirements

Read `VISUAL_STYLE_BRIEF.md` for the full specification. Key rules:

### Typography
- Main title: 60–76px, weight 700–800, University Blue
- Subtitle: 28–36px, one line preferred
- Bullets: 38–52px, 3–4 max per slide
- No text below 22px on the 1920×1080 stage

### Colour
- White background by default
- University Blue dominant on every slide
- No decorative gradients (exception: energy-noir title slide)
- No AI-default colours

### Layout Selection Rules

Choose layout based on **content shape**, not personal preference. No single
layout is the default. Every slide must have a title and subtitle (unless it
is a pure section divider or closing slide).

| Content Shape | Layout CSS Class |
|--------------|-----------------|
| One central claim or big statement | `.layout-big-statement` |
| 3–4 key points or findings | `.layout-big-bullets` |
| Explanation + visual (diagram / chart / photo) | `.layout-two-column` |
| Before vs after / Method A vs Method B | `.layout-comparison` |
| Metrics / results / KPIs | `.layout-kpi` |
| Many themes / research areas / programmes / teams | `.layout-image-card-grid` |
| 4 cards / concepts / pillars | `.layout-card-grid` |
| Step-by-step method or process | `.layout-process` |
| Time-based plan / roadmap / milestones | `.layout-timeline` |
| Dense evidence / reference data | `.layout-appendix-table` |

### Layout Variety Rule
- Do not use the same layout class for more than 2 consecutive slides.
- A deck of 8+ slides must use at least 3 different layout classes.
- The image-card grid (`.layout-image-card-grid`) is one option among many —
  it is not the default for all slides. Only use it when content naturally
  fits that shape (multiple themes, areas, programmes).

### Image-Card Pattern (Optional)
When using image cards: image on top, solid colour caption band below in
University Blue or approved secondary dark, caption text white, large and
short (2-4 words, 38–52px). No tiny captions.

### Density
- One main idea per slide
- 3 bullets maximum, 4 in exceptional cases
- Avoid paragraphs — use bullets or single statements
- Content must fit 1920×1080 without scrolling

## Theme Selection Logic

| User Context | Recommended Theme |
|-------------|-------------------|
| PhD review, APR, academic conference | `uog-research-blue` |
| Technical systems, digital twin, IoT, energy, CPS | `uog-energy-noir` |
| Benchmarks, tables, KPIs, methods, data-heavy | `uog-swiss-data` |
| Mixed audience, industry showcase | `uog-research-blue` or `uog-energy-noir` |

## SRS-Driven Generation

The skill supports SRS-driven generation. When the user provides an SRS document,
read it fully before starting Phase 1.

### 15 SRS Slide Types Available

| # | Slide Type | CSS Class | Best For |
|---|-----------|-----------|----------|
| 1 | Cover | `.title-slide` | Title, author, event, logo |
| 2 | Section Divider | `.section-divider` | Section transitions |
| 3 | Research Question | `.research-question` | Central question, motivation |
| 4 | Problem Framing | `.problem-framing` | Problem + why it matters |
| 5 | System Architecture | `.system-architecture` | Component diagram |
| 6 | Pipeline / DAG | `.pipeline-dag` | Process flow, data pipeline |
| 7 | Method / Algorithm | `.method-algorithm` | Numbered steps, pseudocode |
| 8 | Dataset Summary | `.dataset-summary` | Dataset statistics |
| 9 | Experimental Setup | `.experimental-setup` | Parameters, environment |
| 10 | Benchmark / KPI | `.benchmark-kpi` | Hero metric, KPI grid |
| 11 | Comparison / Ablation | `.comparison-ablation` | Side-by-side, ablation |
| 12 | Timeline / Roadmap | `.timeline-roadmap` | Past→Present→Future |
| 13 | Limitation / Risk | `.limitation-risk` | Risks with mitigations |
| 14 | Closing / Takeaway | `.closing-takeaway` | Summary, contact, logo |
| 15 | Appendix Table | `.appendix-table` | Dense reference data |

Full specification: `references/srs-slide-types.md`
Layout→type mapping: `references/layouts.md`

### SRS File Format

An SRS document should specify:
- Colour constraints (subset of UoG palette from `BRAND_TOKENS.md`)
- Required slide types from the 15 above
- Logo placement overrides (see `LOGO_USAGE.md`)
- Typography preferences (within available font stacks)
- Accessibility targets (WCAG AA minimum)
- Custom layout requirements

See `examples/` for a full 16-slide SRS-compliant deck.

## File Structure Reference

```
nashui-uog-slides-skill/
  SKILL.md                  ← This file
  README.md                 ← Installation and usage
  BRAND_TOKENS.md           ← UoG colour palette (CSS custom properties)
  THEME_SYSTEM.md           ← Theme architecture documentation
  STYLE_PRESETS.md          ← Visual preset quick-reference
  LOGO_USAGE.md             ← Logo placement and sizing rules
  viewport-base.css         ← Mandatory stage CSS (include in every deck)
  html-template.md          ← HTML architecture reference
  animation-patterns.md     ← Animation recipe catalog
  assets/logos/             ← Logo files + manifest
  themes/                   ← Theme CSS files
  references/               ← Layout, accessibility, image-prompt references
  scripts/                  ← Validation and extraction scripts
  examples/                 ← Example decks
```

## Credits

- University of Glasgow brand colours from https://www.gla.ac.uk/myglasgow/staff/brandtoolkit/colour/
- Skill architecture informed by open-source HTML slides skills (see `../audit/` for license audit)
- All code is original — no AGPL-3.0 covered code incorporated
