# Rendered Geometry Skill Update

## Date: 2026-06-04

## Files Changed

| File | Action | Summary |
|------|--------|---------|
| `references/layout_region_planning.md` | **Created** | Body region coordinates, centring formula, offset thresholds, generator planning workflow |
| `scripts/check-rendered-layout.mjs` | **Created** | Playwright-based geometry checker — measures rendered bounding boxes, reports centre offset and overflow |
| `scripts/validate-deck.mjs` | **Updated** | `--render-check` flag added |
| `audit/rendered_geometry_skill_update.md` | **Created** | This file |

## Layout Region Planning Added ✅

Explicit body region coordinates for the 1920×1080 stage:
- `bodyTop = max(headerLowerEdge + 56, 280)`
- `bodyBottom = 900`
- `bodyCenterY = (bodyTop + bodyBottom) / 2`

## Rendered Geometry Checker Added ✅

`scripts/check-rendered-layout.mjs` — uses Playwright to render at 1920×1080 and measure bounding boxes of body content elements. Reports:
- Centre offset vs body region centre
- Content group overflow below safe zone
- Evidence-only slides (no interpretation elements detected)

## Centre Offset Thresholds

| Offset | Severity |
|--------|----------|
| ≤45px | ✅ Well-centred |
| 46–70px | P2 |
| 71–100px | P2 |
| >100px | **P1** |

## Overflow Thresholds

| Condition | Severity |
|-----------|----------|
| groupBottom >930 | **P1** — Content hidden by navigation |
| groupBottom 901–930 | P2 |

## Validator `--render-check` ✅

`node scripts/validate-deck.mjs <deck> --check-logos --render-check` — notes that rendered geometry analysis is available and provides the command to run it.

## Rendered Geometry Check Result

**Not executed** — Playwright browser dependencies (`libnspr4.so`) unavailable in this environment. Script installed and ready. To run:

```bash
npm install playwright
npx playwright install chromium
npx playwright install-deps chromium  # may require root
node scripts/check-rendered-layout.mjs <deck.html>
```

## Demo Validation

```
P0: 0  P1: 0  P2: 3 (non-blocking) ✅
```

## APR Deck Not Edited
