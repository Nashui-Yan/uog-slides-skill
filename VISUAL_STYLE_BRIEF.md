# Visual Style Brief — nashui-uog-slides-skill

## Identity

University of Glasgow institutional style for academic, technical, and research
presentations. The visual system is built on University Blue dominance, white
backgrounds, large whitespace, and clean academic restraint.

## Core Principles

1. **University Blue dominant** — `#011451` must be the most-used colour on
   every slide (as text, accent stripe, logo, or table header). Secondary
   colours are accents only.

2. **White background by default** — Light backgrounds (`#FAFAF8`, `#FFFFFF`)
   with University Blue text. Dark backgrounds reserved for section dividers
   and title slides (research-blue, energy-noir themes).

3. **Large whitespace** — `--slide-padding` at 80–96px on the 1920×1080 stage.
   Content should breathe. Slide edges should not feel crowded.

4. **No decorative gradients** — Solid backgrounds only (exception: energy-noir
   title slide uses a subtle University Blue → near-black gradient).

5. **No generic AI startup style** — No purple-to-indigo gradients, no
   Inter/Roboto as display fonts, no glassmorphism, no gratuitous shadows,
   no emoji as icons.

6. **No tiny text** — Minimum readable size enforced. Footer text at 22–26px,
   body text at 30–52px, titles at 60–76px on the 1920×1080 stage.

## Typography Scale

All sizes on the 1920×1080 design stage. These scale proportionally when the
viewport is smaller than 1920×1080.

| Role | Size | Weight | Use |
|------|------|--------|-----|
| Main title | 60–76px | 700–800 | Slide titles, cover title |
| Subtitle / context | 28–36px | 400–600 | Below title, one line preferred |
| Main bullets | 38–52px | 400–600 | Bullet list items (3–4 max) |
| Supporting text | 30–40px | 400 | Explanatory text, descriptions |
| Figure captions | 24–30px | 400–500 | Image/table captions |
| Footer / meta | 22–26px | 400 | Slide number, date, URL |
| KPI values | 72–160px | 700 | Big number metrics |
| Section number | 80–160px | 700 | Decorative section numbering |

### CSS Token Reference

```css
--title-size:       clamp(60px, 3.5vw, 76px);   /* Main titles */
--subtitle-size:    clamp(28px, 1.7vw, 36px);   /* Subtitle / context */
--bullet-size:      clamp(38px, 2.3vw, 52px);   /* Big bullet text */
--supporting-size:  clamp(30px, 1.8vw, 40px);   /* Supporting paragraphs */
--caption-size:     clamp(24px, 1.4vw, 30px);   /* Figure/table captions */
--footer-size:      clamp(20px, 1.2vw, 26px);   /* Footer, meta, dates */
--h2-size:          clamp(48px, 2.8vw, 64px);   /* Second-level headings */
--h3-size:          clamp(36px, 2.1vw, 48px);   /* Third-level headings */
--small-size:       clamp(18px, 1vw, 24px);     /* Small UI / badges */
```

## Colour Rules

| Context | Background | Text | Accent |
|---------|-----------|------|--------|
| Default slide | White / `#FAFAF8` | University Blue `#011451` | Dark Blue `#005398` |
| Title slide | University Blue `#011451` | White | Light Yellow `#F2D25C` |
| Section divider | University Blue `#011451` | White | None |
| Dark theme slide | Near-black `#0A0B0F` | `#E8E9EC` | Light Blue `#4DBBC6` |
| Callout / highlight | `#F0EEE8` | `#011451` | Dark Blue accent bar |
| Image-card caption | University Blue or Dark colours | White | None |

- **Never** use light secondary palette colours as full-slide backgrounds.
- **Never** use purple, indigo, or non-UoG colours.
- **Always** verify contrast against `BRAND_TOKENS.md`.

## Layout Selection Rules

The agent must choose a layout based on **content shape**, not reuse the same
layout repeatedly. No single layout (including image-card grids) is the default.

### Content Shape → Layout Choice

| Content Shape | Layout CSS Class | Example Use |
|--------------|-----------------|-------------|
| One central claim or big statement | `.layout-big-statement` | Key research finding, thesis statement |
| 3–4 key points or findings | `.layout-big-bullets` | Takeaway points, contributions |
| Explanation + visual (diagram/chart/photo) | `.layout-two-column` | System diagram, method overview, photo |
| Before vs after / Method A vs Method B | `.layout-comparison` | Ablation study, baseline vs proposed |
| Metrics / results / KPIs | `.layout-kpi` | Accuracy, latency, throughput |
| Many themes / research areas / programmes / teams | `.layout-image-card-grid` | Research themes, partner projects |
| 4 cards / concepts / pillars | `.layout-card-grid` | Design principles, approach pillars |
| Step-by-step method or process | `.layout-process` | Training pipeline, data flow |
| Time-based plan / roadmap / milestones | `.layout-timeline` | PhD timeline, project phases |
| Dense evidence / reference data | `.layout-appendix-table` | Full benchmark table |

### Layout Variety Rule

- No more than 2 consecutive slides with the same layout class.
- A deck of 8+ slides must use at least 3 different layout classes.
- Image-card grids (`.layout-image-card-grid`) are one option among many —
  they are **not** the default and should only be used when content naturally
  fits that shape (multiple themes, areas, programmes).

### Slide Header System

Every normal light slide uses a fixed header with a UoG Blue brand block:

```html
<header class="uog-slide-header">
  <div class="uog-logo-block">
    <img class="uog-header-logo" src="...(white-text logo)..." alt="University of Glasgow">
  </div>
  <div class="uog-header-text">
    <h2 class="uog-slide-title">Slide title</h2>
    <p class="uog-slide-subtitle">Slide subtitle</p>
  </div>
</header>
```

- `.uog-logo-block` — University Blue `#011451` rectangle (320×150px) anchoring the logo area
- White-text UoG logo inside the blue block for correct contrast
- Title and subtitle on white background to the right
- Header top: 64px, height: 200px, gap: 56px, body starts at 296px
- Title: 60–76px, University Blue, weight 700
- Subtitle: 28–36px, dark neutral, one line

### Cover Logo Row

Cover slides (dark University Blue background) use a bottom-left logo row:

```html
<div class="uog-cover-logo-row">
  <img class="uog-cover-footer-logo" src="...(white-text logo)" alt="University of Glasgow">
  <!-- Partner logos can be added here -->
</div>
```

- Logo width: 300px, max-height: 110px — medium size, not huge
- Position: left 96px, bottom 76px
- Leaves room for future partner logos to the right (40px gap)
- Title remains centered-left without logo competition

## Image-Card Pattern (Optional)

When the content naturally suggests an image-card grid (research themes,
programmes, partner projects):

- Image is placed on **top** of the card.
- A solid-colour caption band sits **below** the image.
- Caption band uses **University Blue** or an approved secondary dark colour.
- Caption **text is white**.
- Caption text is **large and short** (2–4 words, 38–52px).
- No tiny captions. No paragraphs in caption bands.

This pattern is **one tool** in the layout system — not the default for all slides.

## Title and Subtitle Are Required

Every normal slide must have:
- A **clear title** (University Blue, 60–76px, 700–800 weight, short wording).
- A **short subtitle or context line** (dark neutral or University Blue at lower
  emphasis, 28–36px, one line preferred, two lines maximum).

Exceptions: pure section dividers and closing slides may omit the subtitle.

## Density Rules

- **Low density is mandatory.** One main idea per slide.
- Main slides: 3 bullets maximum, 4 in exceptional cases.
- Avoid paragraphs — use bullet lists or single statements.
- No text below 22px on the 1920×1080 stage.
- Content must fit without scrolling or overflow.

## Anti-Patterns (Banned)

- Purple-to-indigo gradients
- Inter / Roboto / Arial as display fonts
- Glassmorphism (frosted glass backgrounds)
- Gratuitous shadows on data slides
- Emoji as icons
- Non-UoG brand colours
- Tiny captions (below 22px)
- Dense paragraphs on slides
- Same layout used for every slide
- 2×3 image-card grid forced onto content that doesn't fit it
