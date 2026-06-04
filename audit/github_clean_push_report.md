# GitHub Clean Push Report

## Date: 2026-06-03

## Repo Root

`/workspace/slides/nashui-uog-slides-skill/`

## Remote URL

`git@github.com:Nashui-Yan/uog-slides-skill.git`

## Commit

```
d47a0b5 — Strengthen canonical UoG slide template rules
9 files changed, 879 insertions(+), 1 deletion(-)
```

## Files Changed

| File | Status |
|------|--------|
| `SKILL.md` | Modified — canonical template lock section, figure layout rules |
| `LOGO_USAGE.md` | Modified — strict logo policy |
| `examples/uog-institutional-large-demo/index.html` | Modified — new layout CSS |
| `slide-types.css` | Modified — new layout classes |
| `scripts/validate-deck.mjs` | Modified — canonical + figure layout checks |
| `references/canonical_templates.md` | Created |
| `references/figure_layout_decision_rules.md` | Created |
| `references/layout_quality_rules.md` | Created |
| `audit/skill_template_lock_update.md` | Created |

## Cleanup Actions

- Removed SSH key files accidentally in repo root (`Ysl123456`, `id_ed25519`)
- Removed `.DS_Store` files
- No temporary or cache files found

## Compliance Checks

| Check | Result |
|-------|--------|
| `/workspace` absolute paths | 0 ✅ |
| `Main UofG logo artwork` old paths | 0 ✅ |
| Inline SVG in examples | 0 ✅ |
| AGPL/GPL code | 0 ✅ (doc/license mentions only) |
| `motion.min.js` / `template-swiss` / `validate-swiss-deck` | 0 ✅ |

## Validator Result

```
validate-deck --check-logos: P0=0, P1=0, P2=3 (non-blocking) ✅
```

## Push Status

**Commit succeeded.** Push requires SSH passphrase — pending manual push.

## Manual Push Command

```bash
cd /workspace/slides/nashui-uog-slides-skill
git push -u origin main
```

You'll be prompted for your SSH key passphrase. After entering it, the push should succeed.
