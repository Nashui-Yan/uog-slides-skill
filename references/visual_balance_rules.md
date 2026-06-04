# Visual Balance and Safe-Area Policy

Every slide must use the body area intentionally. Avoid large empty lower-half
whitespace. Content must stay within the safe area.

## Slide Geometry (1920×1080 stage)

| Zone | Y Range | Notes |
|------|---------|-------|
| Header | ~50–210px | Blue logo block + title/subtitle |
| Body start | ~290–320px | `.uog-slide-body` top |
| Preferred content bottom | ≤900px | Leave breathing room |
| Absolute max content bottom | ≤940px | Never place meaningful content below this |
| Navigation overlay | ~1020–1080px | Slide counter + controls |

Reserve at least 80px bottom breathing room.

## Content Structure Rules

Normal content slides should use one of these structures:
- Text-only structured list (`.layout-big-bullets`)
- KPI cards + bottom interpretation (`.layout-kpi-takeaway`)
- Figure + side explanation (`.layout-figure-left` / `.layout-figure-right`)
- Figure + bottom takeaway (`.layout-single-figure` with caption)
- Two figures + bottom takeaway (`.layout-two-figure-plus-takeaway`)
- Figure + compact bottom bullets (`.layout-figure-top-bullets-bottom`)
- Comparison columns (`.layout-comparison`)
- Single large figure + short caption/takeaway

## Anti-Patterns

- KPI-only slides with no interpretation
- Large figure followed by bullets approaching bottom safe area
- Figure between two paragraphs
- Unconstrained image height causing overflow
- Bottom takeaway placed at y > 950
- More than 3 bullets below a large figure
- Large empty lower-half whitespace on a content slide

> Do not solve a layout by pushing content downward. If content approaches
> the bottom safe area, reduce figure size, change to a side-column layout,
> or split the slide.

## Figure Scaling Limits

| Layout | Max Image Height |
|--------|-----------------|
| Single figure only (no caption) | 720px |
| Single figure + caption | 660px |
| Single figure + takeaway | 600px |
| Figure + compact bottom bullets | 540px |
| Two figures side by side | 400–460px each |
| Side-column figure | 540–620px |
| KPI cards (3 columns) | min-height: 190px per card |

All figures must use `object-fit: contain`. Never overflow the safe area.

## Underfilled Slide Rule

A slide is visually underfilled if:
- It has only KPI cards and no interpretation
- It has 1–2 figures and no explanatory text
- More than ~35% of the body area is blank

For underfilled slides, add a bottom takeaway/interpretation block.
Do not arbitrarily enlarge elements.

## KPI + Takeaway Rule

Slides with 2–4 KPI/stat cards MUST include a bottom interpretation block.
The bottom takeaway should:
- Explain what the numbers mean collectively
- Answer "so what?" or "what should I conclude?"
- Be ≤55 words
- Sit in the safe area (y ≈ 850–900), not at the page edge

## Figure + Bullets Rule

A figure plus more than 3 bullets should use side-by-side layout, not
figure-top/bullets-bottom. If bullets are 3 or fewer and compact, use
`.layout-figure-top-bullets-bottom` with constrained max-height on both
figure and bullet zone.
