# Quality Checklist

Run this checklist before delivering any generated deck.

## P0 — Blocking (must fix before delivery)

- [ ] **HTML file opens in browser without errors** — Open in Chrome/Firefox/Safari
- [ ] **All slides visible** — Navigate through every slide with arrow keys
- [ ] **No text overflow** — No content is clipped or hidden at 1920×1080
- [ ] **Navigation works** — Keyboard arrows, Space, Home/End, PageUp/Down all function
- [ ] **Touch navigation works** — Swipe left/right on mobile/tablet
- [ ] **Stage scaling** — Deck fills viewport at 16:9 without distortion. Resize browser window to confirm
- [ ] **Slide counter displays correctly** — Shows "N / M" for every slide position
- [ ] **Print CSS present** — `@media print` block exists and each slide gets a page break
- [ ] **Reduced motion CSS present** — `@media (prefers-reduced-motion)` block exists
- [ ] **Viewport base CSS included** — `.deck-viewport`, `.deck-stage` classes present
- [ ] **No JavaScript errors** — Check browser console for errors

## P1 — Should Fix (quality issues)

- [ ] **All brand colours from BRAND_TOKENS.md** — No hex values outside the UoG palette. Grep for `#[0-9a-fA-F]{6}` and verify each against the token list
- [ ] **No AI-default colours** — `#3b82f6`, `#6366f1`, `#8b5cf6`, `indigo`, purple gradients absent
- [ ] **University Blue appears on every slide** — As text colour, accent, stripe, or logo
- [ ] **Contrast meets WCAG AA** — See BRAND_TOKENS.md contrast table for approved combinations
- [ ] **No light palette colours as backgrounds** — Light green/pink/yellow/purple/blue used only as accents
- [ ] **No `display: none` for slide switching** — Uses `visibility` + `opacity`
- [ ] **No scrolling within slides** — All content fits within 1920×1080
- [ ] **Logo placeholders present** — Title slide has logo bar; content slides have footer logo
- [ ] **Animation respects content type** — Semantic recipes used (not all-same-fade-up)
- [ ] **Slide rhythm alternates** — No more than 2 consecutive slides with same background tone
- [ ] **Font stacks declared** — `--font-display`, `--font-body`, `--font-mono` set
- [ ] **All images have alt text** — Every `<img>` has an `alt` attribute

## P2 — Nice to Have (improvements)

- [ ] **Hash routing works** — URL `#3` navigates to slide 3
- [ ] **Inline editing available** — `E` key toggles contenteditable mode
- [ ] **Keyboard shortcut hint visible** — "← → to navigate" shown in controls
- [ ] **Touch tap zones** — Left third = prev, right third = next on mobile
- [ ] **Fullscreen support** — `F` key for fullscreen mode
- [ ] **Low-power mode** — `B` key disables animations (useful for long sessions)
- [ ] **Speaker notes** — Hidden notes in `<script id="speaker-notes">` if needed
- [ ] **LocalStorage auto-save** — Edits persist across page reloads
- [ ] **PDF export** — Print-to-PDF produces correctly formatted output

## P3 — Future (not required now)

- [ ] **Official UoG typeface** — Replace system font fallbacks with official UoG font
- [ ] **Logo manifest validated** — `--check-logos` passes
- [ ] **Accessibility audit** — Screen reader testing, focus order verification
- [ ] **Cross-browser screenshot testing** — Chrome, Firefox, Safari, Edge
- [ ] **Mobile portrait mode** — Degrade gracefully (stacked, scrollable)

## Self-Check Commands

```bash
# Check for non-UoG colours in generated HTML
grep -oP '#[0-9a-fA-F]{6}' deck.html | sort -u | while read hex; do
  echo "$hex — verify against BRAND_TOKENS.md"
done

# Check for banned AI-default colours
grep -n '#3b82f6\|#6366f1\|#8b5cf6' deck.html && echo "❌ AI-default colours found!" || echo "✅ No AI defaults"

# Check for display:none slide hiding
grep -n 'display:\s*none' deck.html && echo "⚠️  display:none found — verify not used for slide switching"

# Check required CSS markers
grep -q '@media print' deck.html && echo "✅ Print CSS" || echo "❌ Missing print CSS"
grep -q 'prefers-reduced-motion' deck.html && echo "✅ Reduced motion" || echo "❌ Missing reduced motion"
grep -q 'deck-viewport\|deck-stage' deck.html && echo "✅ Viewport structure" || echo "❌ Missing viewport structure"

# Check slide count
grep -c 'class="slide' deck.html
```

## Run the Validator

```bash
node scripts/validate-deck.mjs path/to/deck.html
```
