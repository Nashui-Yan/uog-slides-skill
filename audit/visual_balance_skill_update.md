# Visual Balance Skill Update

## Date: 2026-06-03

## Files Changed

| File | Action | Summary |
|------|--------|---------|
| `references/visual_balance_rules.md` | **Created** | Safe-area geometry, content structure rules, figure scaling limits, underfilled slide rule |
| `references/figure_layout_decision_rules.md` | **Updated** | Concrete max-height limits per layout type (8 rows) |
| `SKILL.md` | **Updated** | Visual balance and safe area section |
| `slide-types.css` | **Updated** | `.layout-kpi-takeaway`, `.uog-kpi-card`, `.layout-figure-top-bullets-bottom`, `.uog-compact-bottom-bullets` |
| `examples/.../index.html` | **Updated** | Same layout CSS in demo |
| `scripts/validate-deck.mjs` | **Updated** | `checkVisualBalance` — 5 new P2 checks |
| `audit/visual_balance_skill_update.md` | **Created** | This file |

## New Layout Classes Added

| Class | Purpose |
|-------|---------|
| `.layout-kpi-takeaway` | KPI cards + bottom interpretation band — safe-area controlled grid |
| `.uog-kpi-card` | Individual KPI stat card with value + label |
| `.uog-kpi-row-cards` | 3-column KPI card row |
| `.layout-figure-top-bullets-bottom` | Figure above + ≤3 compact bullets below |
| `.uog-compact-bottom-bullets` | Compact bullet list with accent left border |

## Policies Added

### KPI + Takeaway
- KPI-only slides MUST include bottom interpretation block
- `.layout-kpi-takeaway` uses `grid-template-rows: 1fr auto` to keep takeaway in safe area
- Takeaway max 55 words, positioned around y=850-900, not at page edge

### Figure + Bullets
- Figure + >3 bullets → side-column layout, not figure-top/bullets-bottom
- `.layout-figure-top-bullets-bottom` for ≤3 compact bullets
- Image max-height: 500px, bullets max-height: 180px

### Large Figure Scaling
- Concrete max-height limits per layout (720px down to 400px)
- All figures: `object-fit: contain`
- Scale-to-fit before splitting

### Side-Column Fallback
- 1 figure + 4-5 bullets → figure-left/text-right or text-left/figure-right
- Figure max-height: 540-620px in side column

### Underfilled Slide Repair
- KPI-only → add `.layout-kpi-takeaway`
- Two figures only → add `.layout-two-figure-plus-takeaway`
- Single figure → add caption/takeaway

## Validator Checks Added

| Check | Priority | Detects |
|-------|----------|---------|
| KPI cards without takeaway | P2 | KPI-only underfilled slides |
| Figure + many bullets | P2 | Potential safe-area overflow |
| Images without object-fit/max-height | P2 | Unconstrained figures |
| Two figures without captions/takeaway | P2 | Underfilled figure slides |
| Takeaway without safe-area layout | P2 | Takeaway may render too low |

## Demo Validation

Pending — run after all changes applied.

## APR Deck Not Edited

`APR-Slides/generated_deck/` was not modified.
