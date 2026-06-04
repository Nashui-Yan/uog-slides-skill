# Evidence + Interpretation Rules

> Every normal content slide must present a complete argument: claim, evidence,
> and interpretation. The title/subtitle provide the claim; figures, KPI cards,
> tables, or diagrams provide evidence; and every evidence block must be
> accompanied by an interpretation layer.

## The Three-Layer Contract

| Layer | Source | Example |
|-------|--------|---------|
| **Claim** | Title + subtitle | "Sensor–ROM Discrepancy analysis shows heterogeneous errors" |
| **Evidence** | Figure, chart, table, KPI cards, diagram | Heatmap of spatial error distribution |
| **Interpretation** | Caption + description, key observation, takeaway | "Global bias correction is insufficient because errors cluster near boundary regions" |

A slide with only Claim + Evidence is **incomplete**. It must have Claim + Evidence + Interpretation.

> Captions identify evidence; descriptions interpret evidence. A caption
> alone is not enough for a figure-dominant slide.

## Pattern A — One Wide Figure + Interpretation

**Use for:** Wide plots, architecture diagrams, Gantt charts, pipelines, frameworks.

```
.layout-figure-top-interpretation

[figure — max-height 500px]
[caption — 8–18 words]
[interpretation paragraph — 25–50 words]
[all vertically centred as one group]
```

## Pattern B — One Near-Square/Tall Figure + Side Explanation

**Use for:** Non-wide figures, diagrams readable in one column, charts with 3–5 bullets.

```
.layout-figure-text-interpretation

[figure column] | [text column: heading + 3–5 bullets or paragraph]
[columns vertically centred as one group]
```

## Pattern C — Two Comparable Figures + Shared Comparison Insight

**Use for:** Baseline vs method, before/after, parity/error plots.

```
.layout-two-figure-comparison-interpretation

[figure A + caption] | [figure B + caption]
[shared comparison insight paragraph — 25–55 words]
[whole group centred]
```

**Required:** Each figure must have a caption. The shared insight must explicitly compare the two figures. Never: two figures alone, captions only, or insight placed at bottom edge.

## Pattern D — Two Figures + Substantial Explanation

**Use for:** One figure is evidence, one is supporting mechanism; explanation is more important than figure area.

```
.layout-stacked-figures-text

[two stacked figures] | [explanation: 3–5 bullets or paragraph + key observation]
```

## Pattern E — KPI Cards + Interpretation

**Use for:** Key findings, quantitative summary, mitigation results, comparative metrics.

```
.layout-kpi-interpretation

[KPI cards row]
[interpretation paragraph — 25–55 words]
[group centred]
```

**Never:** KPI-only slide. KPI cards are evidence, not explanation.

## Pattern F — Text/List Slide

Text-only list pages can remain as is if visually balanced. But if a list summarises evidence, consider adding KPI or mini-table.

## Interpretation Layer Classes

| Class | Role | Length |
|-------|------|--------|
| `.uog-figure-caption` | Identifies what the figure shows | 8–20 words |
| `.uog-figure-description` | Explains what the figure means | 20–50 words |
| `.uog-key-observation` | Single key takeaway from evidence | 15–35 words |
| `.uog-comparison-insight` | Shared insight comparing two figures | 25–55 words |
| `.uog-kpi-interpretation` | Explains what KPI numbers mean collectively | 25–55 words |
| `.uog-bottom-takeaway` | General implication block | 25–55 words |
| `.uog-compact-bottom-bullets` | 2–3 explanatory bullets | ≤3 bullets |

## Forbidden Patterns

| Pattern | Fix |
|---------|-----|
| Figure only | Add caption + description |
| Figure + tiny caption only | Add description paragraph |
| Two figures with captions only | Add shared comparison insight |
| KPI cards only | Add interpretation paragraph |
| Diagram only | Add caption + key observation |
| Table only | Add interpretation or takeaway |
| Caption used as footer sentence | Attach to figure block inside composition |
| Paragraph at bottom outside composition | Move into centred group |

## Vertical Centring Rule

> Vertical centring applies to the complete evidence + interpretation group,
> not to the evidence alone.

Centre the combined group (figure + caption + description) between the subtitle
lower edge and the bottom safe margin. Do not centre the figure alone and place
interpretation as an afterthought.
