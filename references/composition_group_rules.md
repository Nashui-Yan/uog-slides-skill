# Composition Group Rules

> Every normal content slide must use a centred composition group. The entire
> body group is vertically centred between the subtitle lower edge and the
> bottom safe margin. Individual elements must not be manually pushed down
> with margins.

## Body Region (1920×1080 stage)

| Boundary | Y | Notes |
|----------|---|-------|
| Header/subtitle lower edge | ~210–250px | Varies with subtitle length |
| Body top | ~300px | Subtitle lower edge + 56px |
| Bottom safe margin | 900–920px | No meaningful content below |
| Navigation overlay | ~1020–1080px | Slide counter bar |
| Body available height | ~600px | 900 − 300 |

**Formula:**
```
bodyTop = 300
bodyBottom = 900
bodyHeight = 600
groupTop = bodyTop + (bodyHeight − groupHeight) / 2
```

If groupHeight > bodyHeight: reduce figure, shorten text, change layout, or split.

## Required Composition Wrapper

Every normal slide body MUST contain a composition wrapper:

```html
<div class="uog-slide-body">
  <div class="uog-composition">
    <!-- all body content goes here -->
  </div>
</div>
```

**Never** place raw elements directly into `.uog-slide-body`.
**Never** use arbitrary margin-top to position body content.
**Always** instantiate a recognised layout pattern.

## No Figure-Only Slides

> Normal content slides must not be figure-only. Every figure-only candidate
> must include at least one meaning layer.

**Allowed meaning layers:**
1. `.uog-figure-caption` — what the figure is (8–20 words)
2. `.uog-figure-description` — what it means (20–45 words)
3. `.uog-bottom-takeaway` — key implication (25–55 words)
4. `.uog-compact-bottom-bullets` — 2–3 explanatory bullets
5. `.uog-side-explanation` — side-column text
6. `.uog-kpi-row` — KPI metric cards
7. `.uog-mini-table` — compact data table

**Forbidden:**
- Slide with only image(s)
- Slide with only image(s) and a tiny one-line caption
- Caption positioned like a footer at y > 920
- Large chart images with no interpretation

## No KPI-Only Slides

> KPI cards are evidence, not explanation. A KPI slide must include a short
> interpretation paragraph or key implication block.

Required: `.layout-kpi-takeaway` with KPI row + interpretation paragraph.
Takeaway must be 25–55 words, centred with the KPI row as one group.

## Caption + Description Pattern

```html
<figure class="uog-figure-block">
  <img src="..." alt="...">
  <figcaption class="uog-figure-caption">What the figure shows. (8–20 words)</figcaption>
  <p class="uog-figure-description">What it means and why it matters. (20–45 words)</p>
</figure>
```

- Caption = factual label
- Description = implication
- Both stay attached to the figure inside `.uog-figure-block`
- Description must not drift to the bottom of the slide

## Composition Layout Classes

| Layout Class | Content Shape |
|-------------|--------------|
| `.layout-large-figure-with-description` | One complex diagram/framework + explanation |
| `.layout-figure-top-description` | One wide figure + caption + description |
| `.layout-two-figure-plus-description` | Two comparable figures + shared description |
| `.layout-stacked-figures-text` | Two stacked figures + text column |
| `.layout-figure-left` | Figure left + explanation right |
| `.layout-figure-right` | Explanation left + figure right |
| `.layout-kpi-takeaway` | KPI cards + interpretation paragraph |
| `.layout-text-list-centred` | Bullet list, vertically centred |
| `.layout-two-figure-plus-takeaway` | Two figures + bottom takeaway |
| `.layout-figure-top-bullets-bottom` | Figure above + ≤3 compact bullets |

All composition layouts must:
- Have `height: 100%; min-height: 0`
- Use `align-content: center` or `align-items: center`
- Never rely on margin-top for vertical placement
- Keep images constrained with max-height + object-fit: contain

## CSS Primitives

```css
.uog-composition {
  height: 100%; max-height: 100%;
  display: grid; align-content: center;
  gap: 28px; min-height: 0;
}
.uog-composition--two-column {
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center; gap: 56px;
  height: 100%; min-height: 0;
}
.uog-composition--figure-text {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  align-items: center; gap: 56px;
  height: 100%; min-height: 0;
}
```

## Generation Rule

> Never create a normal slide by placing raw elements directly into the body.
> Always instantiate a recognised layout pattern from this document or
> `references/figure_layout_matrix.md`.
