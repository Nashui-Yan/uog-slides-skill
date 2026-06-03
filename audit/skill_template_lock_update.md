# Skill Template Lock Update

## Date: 2026-06-03

## Files Changed

| File | Action | Summary |
|------|--------|---------|
| `references/canonical_templates.md` | **Created** | Exact spec for cover, closing, contents, normal header — locked canonical templates |
| `references/figure_layout_decision_rules.md` | **Created** | Decision table + 7 figure layouts + scaling rules + three-card findings rule |
| `SKILL.md` | **Updated** | Added canonical template lock section, figure layout decision rules reference |
| `LOGO_USAGE.md` | **Updated** | Added strict logo policy: one header logo only, no footer/corner logos |
| `slide-types.css` | **Updated** | Added `.layout-single-figure`, `.layout-two-figure-plus-takeaway`, `.uog-two-figure-row`, `.uog-figure-panel`, `.uog-bottom-takeaway` |
| `examples/.../index.html` | **Updated** | Same layout CSS added to demo inline styles |
| `scripts/validate-deck.mjs` | **Updated** | Added `checkCanonicalTemplates`, `checkFigureLayouts` |
| `audit/skill_template_lock_update.md` | **Created** | This file |

## Exact New Hard Rules

### Cover/Contents/Closing Lock
- Cover, closing, and contents slides are canonical templates — NOT adaptive layouts
- Generator may replace text only, never visual structure
- Source documents are content sources, not visual authorities
- Exact HTML structures specified in `references/canonical_templates.md`

### Logo Policy
- Normal slides: exactly one logo — the header logo in `.uog-logo-blue-block`
- Footer/corner/source logos forbidden on normal slides
- Partner logos: disabled by default, cover/closing only, user opt-in required

### Figure Layouts
- 7 layout types available via decision table in `references/figure_layout_decision_rules.md`
- `.layout-two-figure-plus-takeaway` — two figures above + full-width interpretation band below
- `.layout-single-figure` — centered, scaled to safe area, object-fit: contain
- Three-card finding slides MUST have bottom interpretation band
- Large figures: scale to fit, never overflow, never crop unless requested

### Empty Slide Prevention
- Underfilled slides (>35% blank) must add short takeaway
- No filler text — takeaway must be content-derived

## Validator Checks Added

| Check | Priority | Detects |
|-------|----------|---------|
| `checkCanonicalTemplates` | P1 | Cover missing band/logo-row, dark cover bg, closing missing band/logo-row |
| `checkCanonicalTemplates` | P2 | Contents without agenda list |
| `checkFigureLayouts` | P2 | Two figures without takeaway, figure-between-paragraphs, missing object-fit, three-card without interpretation |

## Demo Validation Result

```
validate-deck --check-logos: pending
```

## Confirmation

APR generated deck (`APR-Slides/generated_deck/index.html`) was NOT edited in this run.
