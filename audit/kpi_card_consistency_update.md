# KPI Card Consistency Update

## Date: 2026-06-04

## Files Changed

| File | Action |
|------|--------|
| `slide-types.css` | `.uog-kpi-row`, `.uog-kpi-card`, `.uog-kpi-value`, `.uog-kpi-label` CSS |
| `audit/kpi_card_consistency_update.md` | **Created** |

## KPI Card Rule

When a slide contains 2+ important numeric metrics (percentages, monetary values, multipliers, RMSE, etc.), those metrics must be presented as KPI cards — not as tiny plain text or inline paragraph text.

## Bad Slide Fixed

"Phantom Load Mitigation — Quantified Impact" — converted from tiny plain-text metrics above a commentary block to proper KPI cards (40.14%, 82.39%, >£9k) with operational impact commentary.

## Deck

`/workspace/slides/APR-Slides/generated_deck_topalign_kpi_fixed/index.html` — 29 slides, 11 KPI card instances

## Validation

```
Class: P0=0, P1=0 ✅
Rendered geometry: 0 P1, 0 P2 ✅
```
