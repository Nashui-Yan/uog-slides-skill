# Figure Layout Matrix

Deterministic layout selection by figure count, aspect ratio, and text load.

## Figure Classification

| Category | Aspect Ratio (w/h) |
|----------|-------------------|
| Wide | ≥1.5 |
| Near-square | 0.8–1.49 |
| Tall | <0.8 |

## Text Load

| Load | Words | Bullets |
|------|-------|---------|
| Light | 0–40 | 0–2 |
| Medium | 41–90 | 3–4 |
| Heavy | >90 | 5+ |

## Body Region (1920×1080 stage)

```
bodyTop = 300, bodyBottom = 900, bodyHeight = 600, bodyWidth ≈ 1760
```

## Layout Selection

### 1 Figure

| Aspect | Text Load | Layout | Panel Size |
|--------|----------|--------|------------|
| Wide | Light | `.layout-figure-top-interpretation` | 1200–1500 × 360–520px |
| Wide | Medium | `.layout-figure-top-interpretation` + compact bullets | 1200–1500 × 320–480px |
| Wide | Heavy | Split: figure slide + text slide | — |
| Near-square | Light | `.layout-single-figure` + caption | 900–1300 × 420–560px |
| Near-square | Medium | `.layout-figure-text-interpretation` | Figure: 650–780 × 420–560px |
| Near-square | Heavy | `.layout-figure-text-interpretation` or split | Figure: 650–780 × 360–500px |
| Tall | Light | `.layout-figure-text-interpretation` | Figure: 650–780 × 420–560px |
| Tall | Medium/Light | `.layout-figure-text-interpretation` | Figure: 650–780 × 400–540px |
| Tall | Heavy | Split | — |

### 2 Figures

| Relationship | Text Load | Layout | Panel Size (each) |
|-------------|----------|--------|-------------------|
| Comparable | Light | `.layout-two-figure-comparison-interpretation` | 620–760 × 280–420px |
| Comparable | Medium | `.layout-two-figure-two-caption` | 620–760 × 260–380px |
| Independent | Light/Medium | `.layout-two-figure-two-caption` | 620–760 × 280–420px |
| Sequential/stacked | Light/Medium | `.layout-stacked-figures-text` | 520–680 × 220–300px |
| Main + supporting | Any | Main dominant, supporting small; or split | — |
| Both complex | Any | Split | — |

### 3 Figures

Only on one slide if all figures are simple and readable at grid size (420–560 × 180–260px each). Otherwise split.

## Scale-to-Fit Rules

- All figures use `max-width: 100%; object-fit: contain`
- `max-height` set per layout panel size
- Never crop — always scale to fit
- If figure becomes too small in chosen panel, switch layout or split

## Minimum Readable Sizes

| Layout | Min Width | Min Height |
|--------|----------|-----------|
| Single figure | 700px | 280px |
| Two-figure (each) | 520px | — |
| Three-figure (each) | 420px | — |

If below thresholds: layout is wrong. Choose another layout or split.
