# Figure Panel Sizing Update

## Date: 2026-06-04

## Files Changed

| File | Action |
|------|--------|
| `references/figure_layout_matrix.md` | **Rewritten** — Classification by count/ratio/load, panel sizes, readable thresholds |
| `references/figure_sizing_rules.md` | **Updated** — 5 panel size tables, scale-to-fit rules, minimum readable thresholds |
| `audit/figure_panel_sizing_update.md` | **Created** |

## Classification Rules

- **Aspect ratio**: wide (≥1.5), near-square (0.8–1.49), tall (<0.8)
- **Text load**: light (0–40 words), medium (41–90), heavy (>90 or 5+ bullets)
- **Figure count**: 1, 2, or 3

## Layout Selection by Count/Ratio/Load

Matrix entries for 1-figure (9 combos), 2-figure (5 combos), 3-figure (simple only).

## Panel Sizes

5 panel size tables (A–E) with target width/height ranges and CSS max-height.

## Readable Thresholds

| Layout | Min Width | Min Height |
|--------|----------|-----------|
| Single figure | 700px | 280px |
| Two-figure (each) | 520px | — |
| Three-figure (each) | 420px | — |

Below threshold → switch layout or split.

## Cover/Logo/Style

Unchanged ✅
