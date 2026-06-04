# Figure Sizing Rules

## Body Region (1920×1080 stage)

```
bodyTop = 300, bodyBottom = 900, bodyHeight = 600, bodyWidth ≈ 1760
```

## Panel Sizes by Layout

### A — Full-Width Single Figure

| Metric | Range |
|--------|-------|
| Panel width | 1200–1500px |
| Panel height | 360–520px |
| CSS max-height | 460–520px |

Use: `.layout-figure-top-interpretation`

### B — Two-Column Figure/Text

| Metric | Range |
|--------|-------|
| Figure panel width | 650–780px |
| Figure panel height | 420–560px |
| CSS max-height | 540–620px |

Use: `.layout-figure-text-interpretation`

### C — Two Comparable Figures

| Metric | Range |
|--------|-------|
| Each panel width | 620–760px |
| Each panel height | 280–420px |
| CSS max-height each | 380–460px |

Use: `.layout-two-figure-comparison-interpretation`

### D — Stacked Figures + Text

| Metric | Range |
|--------|-------|
| Each stacked figure width | 520–680px |
| Each stacked figure height | 220–300px |
| CSS max-height each | 260–320px |

Use: `.layout-stacked-figures-text`

### E — Three Figures

| Metric | Range |
|--------|-------|
| Each figure width | 420–560px |
| Each figure height | 180–260px |

Only for simple, readable figures.

## Scale-to-Fit

- `max-width: 100%` on all figures
- `object-fit: contain` on all figures
- `max-height` set per layout panel
- Never crop — always scale to fit
- If figure becomes too small in chosen panel: switch layout or split

## Minimum Readable Thresholds

| Layout | Min Width | Min Height |
|--------|----------|-----------|
| Single figure | 700px | 280px |
| Two-figure (each) | 520px | — |
| Three-figure (each) | 420px | — |

Below thresholds → layout is wrong → choose another layout or split.
