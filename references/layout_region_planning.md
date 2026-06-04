# Layout Region Planning

Explicit slide geometry for normal content slides on the 1920×1080 stage.

## Fixed Regions

| Region | Y Range | Contents |
|--------|---------|----------|
| Header zone | 0–250px | Logo block, title, subtitle |
| Body region | 280–900px | All meaningful content |
| Safe zone | 900–940px | Breathing room only |
| Nav zone | 940–1080px | Slide counter, navigation overlay |

## Body Region Coordinates

```
headerLowerEdge = max(bottom of title, bottom of subtitle, bottom of logo block)
bodyTop = max(headerLowerEdge + 56, 280)
bodyBottom = 900
bodyCenterY = (bodyTop + bodyBottom) / 2
```

## Content Group Centring

The content group is the union bounding box of all visible body elements
(figures, captions, descriptions, KPI cards, bullets, tables, takeaway blocks).

```
groupCenterY = (groupTop + groupBottom) / 2
offset = abs(groupCenterY - bodyCenterY)
```

## Acceptable Thresholds

| Offset | Severity |
|--------|----------|
| ≤45px | ✅ Well-centred |
| 46–70px | P2 — Acceptable but could improve |
| 71–100px | P2 — Noticeably off-centre |
| >100px | P1 — Visibly off-centre, must fix |

## Containment Rules

| Condition | Severity |
|-----------|----------|
| groupBottom ≤ bodyBottom (900) | ✅ |
| groupBottom 901–930 | P2 — Slightly low |
| groupBottom >930 | P1 — Content enters safe/nav zone |
| groupTop < bodyTop − 20 | P2 — Content too high |

## Generator Planning Workflow

For every normal slide:

1. Classify slide type (text, KPI, figure, etc.)
2. Select layout from `figure_layout_matrix.md`
3. Define `bodyTop` and `bodyBottom`
4. Estimate content group height before writing HTML
5. If estimated height > available height: reduce figure, shorten text, change layout, or split
6. Render and measure actual geometry
7. Verify centre offset and containment
8. Only accept if checks pass

> Layout is not complete until the rendered bounding boxes pass the region and centring checks.
