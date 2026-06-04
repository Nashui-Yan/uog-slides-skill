# Figure Top-Alignment Policy Update

## Date: 2026-06-04

## Files Changed

| File | Action |
|------|--------|
| `references/alignment_policy_by_slide_type.md` | **Created** — Slide-type-dependent alignment: figure=top, text=centre, KPI=balanced |
| `slide-types.css` | **Updated** — `.uog-align-top`, `.uog-align-centre`, `.uog-composition--figure-text`, `.uog-composition--two-figures` |
| `scripts/check-rendered-layout.mjs` | **Updated** — Detects slide type, applies top-alignment checks to figure slides, centre checks to text slides |
| `audit/figure_top_alignment_policy_update.md` | **Created** |

## Policy

| Slide Type | Alignment | Check |
|-----------|-----------|-------|
| Text/list | `.uog-align-centre` | Group centre offset from body centre |
| KPI | `.uog-align-centre` | Group centre + safe area |
| Figure (any) | `.uog-align-top` | First body element y ≤360 |
| Figure + text | `.uog-align-top` | Columns top-align, same start y |
| Two figures | `.uog-align-top` | Both figures start at same y |

## Figure Slides: Top-Aligned ✅

Evidence begins just below title/subtitle. No large empty space above figures.

## Text-Only Slides: Centred ✅

Bullet lists remain vertically balanced.

## Rendered Checker: Slide-Type-Aware ✅

Detects figure vs text slides and applies appropriate alignment checks.

## Cover/Logo/Style: Unchanged ✅
