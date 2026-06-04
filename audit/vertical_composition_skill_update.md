# Vertical Composition Skill Update

## Date: 2026-06-04

## Files Changed

| File | Action | Summary |
|------|--------|---------|
| `references/vertical_composition_rules.md` | **Created** | Body centring formula, caption+description pattern, vertical alignment by page type |
| `SKILL.md` | **Updated** | Vertical composition section: centred group rule |
| `slide-types.css` | **Updated** | Body bottom: 120px, `.uog-body-center`, `.uog-body-grid-center`, `.uog-body-composition`, `.uog-figure-block`, `.uog-figure-caption`, `.uog-figure-description` |
| `examples/.../index.html` | **Updated** | Same CSS primitives |
| `scripts/validate-deck.mjs` | **Updated** | `checkVerticalComposition` — 5 new P2 checks |
| `audit/vertical_composition_skill_update.md` | **Created** | This file |

## Body Composition Region Rule

Body content is now a **centred composition group** between the header/subtitle lower edge (~240px) and the bottom safe margin (920px). The layout class owns vertical alignment.

## Caption + Description Pattern

Figures now support a two-level text pattern:
1. `.uog-figure-caption` — short factual label (8–18 words)
2. `.uog-figure-description` — descriptive paragraph (20–45 words)

Both stay attached to the figure inside `.uog-figure-block`.

## Large Figure with Description

`.uog-figure-block` inside centred `.uog-slide-body` — figure + caption + description as one centred group.

## Two Figures + Description

Two figures side by side with shared description paragraph below — whole group centred.

## KPI Vertical Alignment

KPI cards + takeaway centred as one composition group, not anchored to bottom.

## Validator Checks Added

| Check | Priority | Detects |
|-------|----------|---------|
| Figure+text without centering wrapper | P2 | Content may drift toward bottom |
| Bottom takeaway without safe-area layout | P2 | Takeaway may render too low |
| Figcaption without `.uog-figure-block` | P2 | Caption detached from figure |
| Description >55 words | P2 | Risk of overflow or drift |
| Figures without vertical centering | P2 | Content stacking downward from top |

## Demo Validation

```
P0: 0  P1: 0  P2: 3 (non-blocking) ✅
```

## APR Deck Not Edited

`APR-Slides/generated_deck/` was not modified.
