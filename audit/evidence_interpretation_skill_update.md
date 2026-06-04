# Evidence + Interpretation Skill Update

## Date: 2026-06-04

## Files Changed

| File | Action | Summary |
|------|--------|---------|
| `references/evidence_interpretation_rules.md` | **Created** | Claim+evidence+interpretation contract, 6 patterns A–F, interpretation classes, forbidden patterns |
| `SKILL.md` | **Updated** | Evidence + interpretation contract, no-figure-only, no-KPI-only, two-figure shared insight, centred group rule |
| `scripts/validate-deck.mjs` | **Updated** | `checkEvidenceInterpretation` — 5 checks (3 P1 + 2 P2) |
| `audit/evidence_interpretation_skill_update.md` | **Created** | This file |

## Claim/Evidence/Interpretation Contract Added ✅

Every normal slide must have: Claim (title) + Evidence (figure/KPI/table) + Interpretation (description/insight/takeaway).

## No Figure-Only Rule Enforced ✅

P1 if figure images present without any interpretation class.

## No KPI-Only Rule Enforced ✅

P1 if KPI cards present without interpretation/takeaway.

## Two-Figure Shared Interpretation Rule Added ✅

P1 if two figures present without shared comparison insight or description.

## Validator Checks

| Check | Priority |
|-------|----------|
| Figure evidence without interpretation | **P1** |
| Two-figure comparison without shared insight | **P1** |
| KPI evidence without interpretation | **P1** |
| Footer-like interpretation outside composition | P2 |
| Caption only without description for figure-dominant slide | P2 |

## Demo Validation

```
P0: 0  P1: 0  P2: 3 (non-blocking) ✅
```

## APR Deck Not Edited
