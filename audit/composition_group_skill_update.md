# Composition Group Skill Update

## Date: 2026-06-04

## Files Changed

| File | Action | Summary |
|------|--------|---------|
| `references/composition_group_rules.md` | **Created** | Centred composition group rule, no-figure-only, no-KPI-only, caption+description, layout classes, CSS primitives |
| `SKILL.md` | **Updated** | Composition group rule, no-figure-only, no-KPI-only, caption+description required |
| `scripts/validate-deck.mjs` | **Updated** | `checkCompositionGroup` — 5 new checks (3 P1, 2 P2) |
| `audit/composition_group_skill_update.md` | **Created** | This file |

## Rules Added

| Rule | Enforcement |
|------|------------|
| Every normal slide must use a centred composition group | P2 — warns if no composition wrapper |
| No figure-only slides — every figure needs a meaning layer | P1 — fails if images without recognised layout |
| No KPI-only slides — KPIs need interpretation paragraph | P1 — fails if KPI cards without takeaway |
| Figure without caption/description | P1 — fails if images without figcaption/description |
| Caption/description must stay in `.uog-figure-block` | P2 — warns if figcaption used outside block |

## Validator Checks

| Check | Priority |
|-------|----------|
| Figure image(s) without composition/layout class | P1 |
| KPI cards without interpretation | P1 |
| Figure image(s) without caption/description | P1 |
| Figcaption outside `.uog-figure-block` | P2 |
| Normal slide without centred composition | P2 |

## Demo Validation

```
P0: 0  P1: 0  P2: 3 (non-blocking) ✅
```

## APR Deck Not Edited

`APR-Slides/generated_deck/` was not modified.
