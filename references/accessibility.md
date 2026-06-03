# Accessibility Reference

## Policy

All UoG slide decks must meet **WCAG 2.1 Level AA** as a minimum baseline.

## Colour Contrast

See `BRAND_TOKENS.md` for the full contrast ratio table. Summary:

### Approved Combinations (meet AA for normal text, ≥4.5:1)
- White text on University Blue — 18.5:1 ✅
- White text on any Secondary Dark colour — 6.9:1–9.9:1 ✅
- University Blue text on white/light grey — 18.5:1 ✅

### Conditional Combinations (meet AA for large text only, ≥3:1)
- University Blue text on Secondary Light colours — 4.5:1–6.4:1
  → Use for large text only (≥24px or ≥18.7px bold)
  → Light palette colours should be accents, not backgrounds, per brand rules

### Banned Combinations
- Non-white text on Secondary Dark backgrounds
- Non-University-Blue text on Secondary Light backgrounds
- Light palette text on light backgrounds
- Grey text on any background below 4.5:1 ratio

## Keyboard Navigation

All interactive elements must be reachable and operable via keyboard:

- Arrow keys for slide navigation
- Tab for focusable elements within slides
- Enter/Space for activation
- Escape for overview/menu dismissal

## Screen Reader Support

### Required
- All slides have `role="region"` and `aria-label` with slide number and title
- All images have meaningful `alt` text (not "image" or "screenshot")
- Decorative images use `alt=""` (empty)
- Complex diagrams have `aria-describedby` linking to a text description
- Slide counter announces current position
- Navigation announces "Slide N of M: [title]" on transition

### Implementation
```html
<section class="slide"
         role="region"
         aria-label="Slide 3 of 12: Methodology Overview"
         aria-roledescription="slide">
```

## Reduced Motion

The `viewport-base.css` includes:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.2s !important;
  }
}
```

This is MANDATORY. All generated decks must include it (it's in the base CSS
that every theme imports).

## Focus Management

- After slide transition, move focus to the new slide's heading
- Focus indicator must be visible (do not use `outline: none` without replacement)
- Focus ring colour: use `--accent` or `--uog-blue`

## Text Sizing

- Minimum body text size: 20px on the 1920×1080 stage
  (scales down proportionally on smaller viewports)
- Minimum caption/small text: 12px on the 1920×1080 stage
- All text must support 200% zoom without loss of content (browser zoom,
  not within-slide zoom)

## Semantic HTML

- Use `<h1>` through `<h4>` in order (don't skip levels)
- Use `<ul>` / `<ol>` for lists (not `<div>` with `·` prefixes)
- Use `<table>` with `<thead>`, `<tbody>`, `<th scope="...">` for data tables
- Use `<figure>` and `<figcaption>` for images with captions

## Print Accessibility

- Printed output must maintain logical reading order
- Print font size must be legible (≥10pt when printed at 1:1)
- Colour is not the sole differentiator in print (use patterns or labels too)

## Testing

- Run axe-core or Lighthouse accessibility audit on the generated HTML
- Test keyboard-only navigation through all slides
- Test with browser zoom at 200%
- Verify screen reader can navigate slides sequentially
- Check colour contrast with a contrast checker tool for any custom colour combinations

## TODO

- [ ] Extract official UoG accessibility policy if one exists
- [ ] Test with UoG-provided assistive technology configurations
- [ ] Create an accessibility conformance report template
