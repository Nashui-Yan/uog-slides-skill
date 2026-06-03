# Figure Layout Decision Rules

Automatic layout decision rules for slides containing figures. The generator
must select a layout based on figure count and content shape, not randomly.

## Available Figure Layouts

| Layout Class | Use When |
|-------------|---------|
| `.layout-single-figure` | One large figure, minimal text |
| `.layout-figure-left` | Figure + explanatory text |
| `.layout-figure-right` | Explanatory text + figure |
| `.layout-two-figure-comparison` | Two related figures side by side |
| `.layout-two-figure-plus-takeaway` | Two figures PLUS bottom interpretation band |
| `.layout-figure-grid` | 3+ small figures in grid |
| `.layout-large-figure-with-caption` | One figure, needs caption/takeaway |

## Decision Table

| Figures | Text Load | Layout |
|---------|----------|--------|
| 0 | Any | Standard content layout (bullets, cards, KPI) |
| 1 | < 50 words | `.layout-single-figure` — center figure, minimal caption |
| 1 | 50–120 words | `.layout-figure-left` or `.layout-figure-right` |
| 1 | > 120 words | Split into figure slide + text slide |
| 2 | < 60 words | `.layout-two-figure-plus-takeaway` — add interpretation band |
| 2 | 60–120 words | `.layout-two-figure-comparison` |
| 2 | > 120 words | Split: one slide per figure or reduce text |
| 3+ | Any | `.layout-figure-grid` |

## Layout 1 — Single Figure

```
<body>
  <figure>
    <img>  (centered, max-height: 660–720px, object-fit: contain)
    <figcaption>  (optional short caption)
  </figure>
</body>
```

**Rules:**
- Center figure in body area
- Scale down to fit safe area (max-height: ~660px with caption, ~720px without)
- Maintain aspect ratio — never stretch
- If figure becomes unreadable when scaled, add explanatory text
- No figure touching title, header, logo, or slide edge

## Layout 2 — Figure Left / Text Right

```
<body class="grid-layout-2col">
  <figure class="grid-area-left">
    <img>  (max-height: 560px, object-fit: contain)
    <figcaption>
  </figure>
  <div class="grid-area-right">
    <ul> bullets... </ul>
  </div>
</body>
```

## Layout 3 — Figure Right / Text Left

Same as Layout 2, swapped columns.

## Layout 4 — Two Figures Above + Takeaway Below

```
<body class="layout-two-figure-plus-takeaway">
  <div class="uog-two-figure-row">
    <figure class="uog-figure-panel">
      <img>  (max-height: 430px, object-fit: contain)
      <figcaption>
    </figure>
    <figure class="uog-figure-panel">
      <img>
      <figcaption>
    </figure>
  </div>
  <div class="uog-bottom-takeaway">
    <strong>Key implication:</strong> Short interpretation (≤45 words).
  </div>
</body>
```

**Decision rule**: Use when exactly two figures exist and slide would
otherwise look empty. The bottom takeaway explains the paired implication.

**Do NOT use when**: Either figure needs >50% of slide width, labels
become unreadable, or the takeaway would exceed 45 words.

## Empty Slide Rule

A slide is **visually underfilled** if:
- It has only 1–2 figures and no explanatory text
- More than ~35% of the body area is blank
- The slide does not communicate the implication

For underfilled slides, add:
- A short bottom takeaway (`.uog-bottom-takeaway`)
- A "What this shows" sentence
- A compact key implication band

Do NOT add filler paragraphs. The takeaway must be content-derived.

## Large Figure Scaling Rule

> Large figures MUST be scaled to fit the body safe area. Never overflow.
> Never crop unless explicitly requested. Use `object-fit: contain`.

- Single figure: max-height ~660–720px, centered
- With takeaway below: max-height ~580–640px
- Two figures side by side: max-height ~400–450px each
- Two figures with takeaway: max-height ~380–430px each
- If labels become unreadable after scaling → split the slide
- If figure is too small to read after scaling → use a dedicated figure slide with zoom

## Three-Card Findings Slides

For slides with three metric/statistic cards:

```
<body>
  <div class="kpi-row">  (three cards)
    <div class="metric">...</div>
    <div class="metric">...</div>
    <div class="metric">...</div>
  </div>
  <div class="uog-bottom-takeaway">
    <strong>What this means:</strong> Short interpretation of the three findings (≤45 words).
  </div>
</body>
```

**Required**: The bottom takeaway band MUST be present. It explains the
collective implication, answers "so what?", or notes a limitation.

## CSS Tokens

All layouts use these theme tokens:
- `--uog-blue` for accent colours
- `--accent` (#005398) for takeaway border
- Standard text tokens from the active theme
- `object-fit: contain` on all figure images
- `max-height` constraints per layout type
