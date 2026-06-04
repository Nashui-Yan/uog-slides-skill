# Figure Layout Matrix Skill Update

## Date: 2026-06-04

## Files Changed

| File | Action | Summary |
|------|--------|---------|
| `references/template_invariants.md` | **Created** | Exact canonical HTML snippets for cover, closing, contents, normal header — with invariants |
| `references/figure_layout_matrix.md` | **Created** | Deterministic layout selection: aspect-ratio + figure count + text load → layout class |
| `SKILL.md` | **Updated** | Template instantiation rule, cross-project consistency rule, matrix reference |
| `slide-types.css` | **Updated** | 4 new layout classes |
| `examples/.../index.html` | **Updated** | Same CSS in demo |
| `scripts/validate-deck.mjs` | **Updated** | `checkTemplateInvariants` + `checkFigureLayoutMatrix` |
| `audit/figure_layout_matrix_skill_update.md` | **Created** | This file |

## Canonical Template Invariants Added

Cover, closing and contents are now **template-instantiation tasks**, not layout-generation tasks. Exact HTML snippets with invariants documented in `references/template_invariants.md`.

- Cover logo deck: `.uog-cover-logo-row` — locked, must not be replaced with tiny/corner/right logo
- Closing logo deck: `.uog-cover-logo-row` — locked
- Contents: `.uog-agenda-list` with `.uog-agenda-number` + `.uog-agenda-text` — locked

## Figure Layout Matrix

Deterministic selection based on:
- Aspect ratio classification (very wide, wide, near-square, tall, very tall)
- Text load (none/light/medium/heavy)
- Figure count (1–4+)
- Figure relationship (similar, independent, stacked, main+supporting)

10 layout classes mapped to specific conditions.

## New Layout Classes Added

| Class | For |
|-------|-----|
| `.layout-figure-top-takeaway` | Wide/very wide figure + bottom takeaway |
| `.layout-two-figure-two-caption` | Two independent figures, each with caption + description |
| `.layout-stacked-figures-text` | Two stacked figures + text column |
| `.layout-large-figure-with-caption` | Complex figure, maximal size, minimal text |

## Validator Checks Added

| Check | Priority | Detects |
|-------|----------|---------|
| Cover missing logo row | P1 | Non-canonical cover logo |
| Cover with normal header | P1 | Wrong header type on cover |
| Cover dark background | P1 | Non-canonical cover style |
| Closing missing logo row | P1 | Non-canonical closing |
| Closing missing band | P1 | Non-canonical closing |
| Contents missing agenda | P1 | Non-canonical contents |
| Figure without layout class | P2 | Unstructured figure placement |
| Two figures without two-figure layout | P2 | Missing two-figure layout |
| One figure + >3 bullets, no side-column | P2 | Stacking when side-by-side is better |

## Demo Validation

Pending.

## APR Deck Not Edited

`APR-Slides/generated_deck/` was not modified.
