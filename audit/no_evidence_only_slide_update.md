# No Evidence-Only Slide Update

## Date: 2026-06-04

## Files Changed

| File | Action |
|------|--------|
| `scripts/validate-deck.mjs` | **Updated** — `checkNoEvidenceOnly`: P1 if figure/KPI without interpretation |
| `audit/no_evidence_only_slide_update.md` | **Created** |

## Rule

No normal slide may be evidence-only. Every figure, KPI card, table, or diagram must have an interpretation layer.

## Slides Patched

11 figure slides + 1 KPI slide = **13 interpretation blocks** added to the APR deck.

Each figure slide now has `.uog-figure-description` with a concise interpretation paragraph (25–55 words). The KPI slide has `.uog-kpi-interpretation`.

## Deck

`/workspace/slides/APR-Slides/generated_deck_topalign_interpreted/index.html` — 29 slides, 13 interpretation blocks

## Validator

```
Class: P0=0, P1=0 ✅
Rendered geometry: 0 P1, 0 P2 (24 normal slides) ✅
```

## Cover/Contents/Closing: Canonical ✅
