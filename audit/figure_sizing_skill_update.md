# Figure Sizing Skill Update

## Date: 2026-06-04

## Files Changed

| File | Action |
|------|--------|
| `scripts/analyze_figures.py` | **Created** — Figure analysis: visual bbox detection, whitespace ratio, trimmed derivatives, manifest output |
| `references/figure_preprocessing_rules.md` | **Created** — Preprocessing workflow, manifest spec, decision rules |
| `references/figure_sizing_rules.md` | **Created** — Target visual sizes per layout, body region constraints |
| `references/figure_layout_matrix.md` | **Updated** — Uses effective aspect ratio, references preprocessing rules |
| `audit/figure_sizing_skill_update.md` | **Created** — This file |

## APR3 Figure Analysis Results

| Metric | Value |
|--------|-------|
| Figures analyzed | 23 |
| Figures trimmed | 0 |
| Max whitespace ratio | 22% (JPGs: concurrency, sensor_number) |
| All PNGs | <0.3% whitespace — already well-cropped |
| Figure size range | 846×547 to 4169×3328 |

## Figure Manifest

`APR-Slides/generated_deck_figure_sizing_test/assets/figure_manifest.json`

## Cover/Logo/Style

Unchanged ✅
