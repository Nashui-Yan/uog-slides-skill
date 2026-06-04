# Global Top-Alignment Update

## Date: 2026-06-04 (final — all normal slides top-aligned, no exceptions)

## Files Changed

| File | Action |
|------|--------|
| `references/global_top_alignment_policy.md` | **Created** — Universal top-alignment policy |
| `SKILL.md` | **Updated** — Replaced vertical composition section with global top alignment |
| `scripts/check-rendered-layout.mjs` | **Updated** — All normal slides checked for top alignment + safe area only |
| `audit/global_top_alignment_update.md` | **Created** |

## Policy

ALL normal content slides now use top alignment. No ordinary content slide uses body-level vertical centring.

Cover, contents, closing, and section dividers remain canonical and unchanged.

## Real APR3 Regeneration Test

`/workspace/slides/APR-Slides/generated_deck_topalign_realtest/index.html` — **29 slides**

## Validation

| Check | Result |
|-------|--------|
| Class validator (P0) | 0 ✅ |
| Class validator (P1) | 0 ✅ |
| Rendered geometry (P1) | 0 ✅ |
| Rendered geometry (P2) | 0 ✅ |
| All normal slides top-aligned | ✅ |
| Cover canonical | ✅ |
| Contents canonical | ✅ |
| Closing canonical | ✅ |
| Section dividers canonical | ✅ |
| No raw HTML extraction | ✅ |
| No nested .uog-slide-body | ✅ |
| No figure-only/KPI-only | ✅ |
| Fixed 1920×1080 design | ✅ |
