# Alignment Policy by Slide Type

> Do not use one vertical alignment rule for all slides. Text-only, KPI, and
> figure/evidence slides have different alignment behaviours.

## Slide Types and Alignment

| Slide Type | Alignment | Rationale |
|-----------|-----------|-----------|
| Text/list | `.uog-align-centre` | Bullet lists look best vertically balanced |
| KPI | `.uog-align-centre` or `.uog-align-balanced` | KPI row + interpretation as one balanced group |
| Figure (any) | `.uog-align-top` | Evidence should begin just below title/subtitle |
| Figure + text | `.uog-align-top` | Columns must top-align; figure and text start at same y |
| Wide figure | `.uog-align-top` | Figure, caption, description flow downward naturally |
| Two figures | `.uog-align-top` | Both figures top-align; captions below; shared insight below |
| Contents | `.uog-align-centre` (canonical) | Agenda rows balanced |

> Figure slides should not be vertically centred by default. They should be
> top-aligned inside the body region so the visual evidence begins just below
> the title/subtitle.

## Body Region

```
bodyTop = 300, bodyBottom = 900, bodyHeight = 600
```

## Top-Alignment Rules for Figure Slides

| Check | Preferred | P2 | P1 |
|-------|-----------|----|----|
| First body element y | 300–360 | >390 | >430 |
| Group bottom | ≤900 | 901–920 | >930 |
| Figure/text column top diff | ≤40px | 41–70px | >100px |
| Caption below y=900 | No | — | Yes |

## Centred-Alignment Rules for Text Slides

| Check | Preferred | P2 | P1 |
|-------|-----------|----|----|
| Group centre offset | ≤45px | 46–100px | >100px |
| Group bottom | ≤900 | 901–920 | >930 |

## CSS Primitives

```css
.uog-composition {
  height: 100%; min-height: 0;
  display: grid; gap: 24px;
}
.uog-align-top { align-content: start; }
.uog-align-centre { align-content: center; }
.uog-align-balanced { align-content: center; }

.uog-composition--figure-text {
  height: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 56px; align-items: start;
}

.uog-composition--two-figures {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 44px; align-items: start;
}
```

## Figure Sizing Under Top Alignment

Since figure slides are top-aligned, reserve space below for caption/description:

| Layout | Image max-height | Total group must finish by |
|--------|-----------------|---------------------------|
| Wide figure + cap + desc | 430–500px | y=850–880 |
| Figure + side text | 500–560px | body region |
| Two figures + shared insight | 340–420px each | y=850 |
| Stacked figures + text | 230–280px each | body region |
