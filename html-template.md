# HTML Template Architecture

## Overview

Every UoG slide deck follows this HTML architecture. The skill generates
an HTML file by populating `.slide` elements within this structure.

## Minimal Skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentation Title</title>
  <link rel="stylesheet" href="viewport-base.css">
  <link rel="stylesheet" href="themes/uog-research-blue.css">
</head>
<body>
  <div class="deck-viewport">
    <div class="deck-stage" id="deck-stage">
      <!-- Slides go here -->
    </div>
  </div>

  <div class="deck-controls">
    <span class="slide-count">1 / 12</span>
    <span class="shortcut-hint">← → to navigate</span>
  </div>

  <script>
    // Navigation script (inline)
  </script>
</body>
</html>
```

## Slide Structure

Each slide is a `<section class="slide">` with:

```html
<section class="slide" data-slide-index="1" data-background="light">
  <div class="slide-content">
    <!-- Slide content -->
  </div>
</section>
```

### Required Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-slide-index` | integer (0-based) | Slide position in deck |
| `data-background` | `light` \| `dark` \| `hero-light` \| `hero-dark` | Background tone for logo variant selection and rhythm tracking |

### Optional Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-layout` | `cover` \| `split` \| `metrics` \| `timeline` \| `comparison` \| `bento` \| `close` | Layout class |
| `data-transition` | `fast` \| `normal` \| `slow` \| `none` | Transition speed |
| `data-animate` | animation recipe name | Entrance animation (see animation-patterns.md) |

## Layout Classes

Apply to the `section.slide` element:

| Class | Description | Grid |
|-------|-------------|------|
| `.layout-cover` | Title slide — centered content, logo bar at bottom | grid, centered |
| `.layout-close` | Closing slide — same as cover | grid, centered |
| `.layout-split` | Two-column: text + visual | `grid-template-columns: 1fr 1fr` |
| `.layout-split-wide` | Two-column, wider left | `1.2fr 0.8fr` |
| `.layout-metrics` | KPI grid — 3-4 big numbers | grid, auto-fit, min 280px |
| `.layout-bento` | Dense card grid | grid, 3-col, gap 28px |
| `.layout-timeline` | Vertical/horizontal timeline | grid, gap 28px |
| `.layout-comparison` | Side-by-side comparison | grid, 2-col |
| `.layout-stack` | Vertical stack of items | grid, 1-col |
| `.layout-data-table` | Full-width data table | grid, 1-col |
| `.layout-partner-row` | Partner logo row | flex, centered |

## Navigation Script

The inline `<script>` must implement:

### Navigation Methods
- **Keyboard**: Left/Right arrows, Space (advance), PageUp/PageDown, Home, End
- **Touch**: Swipe left/right (50px threshold), tap left/right third for prev/next
- **Mouse wheel**: Vertical scroll triggers advance (debounced, 300ms)
- **Hash routing**: URL hash `#3` navigates to slide 3

### State Management
- Track `currentIndex` (0-based)
- Update `.slide.active` class on slide transition
- Update `.slide-count` text content
- Set `history.replaceState` with current hash

### Scaling
```javascript
function resize() {
  const scale = Math.min(
    window.innerWidth / 1920,
    window.innerHeight / 1080
  );
  const x = (window.innerWidth - 1920 * scale) / 2;
  const y = (window.innerHeight - 1080 * scale) / 2;
  document.querySelector('.deck-stage').style.transform =
    `translate(${x}px, ${y}px) scale(${scale})`;
}
window.addEventListener('resize', resize);
resize();
```

### Inline Editing (optional)
- Hotzone in top-left corner (20×20px, invisible)
- `E` key toggles `contenteditable` on all `.slide-content` elements
- Auto-save to `localStorage` with 400ms debounce

## Logo Placement

Logo elements follow the placement rules from `LOGO_USAGE.md`:

```html
<!-- Title slide: bottom bar with all logos -->
<div class="logo-bar">
  <img class="logo uog-logo" src="assets/logos/uog-primary-light.svg" alt="University of Glasgow">
  <span class="logo-divider"></span>
  <img class="logo school-logo" src="assets/logos/uog-school-light.svg" alt="School of Engineering">
</div>

<!-- Content slide: bottom-right UoG logo only -->
<img class="logo footer-logo" src="assets/logos/uog-primary-light.svg" alt="University of Glasgow">
```

## Print CSS

Every deck must include (in the theme CSS or inline):
```css
@media print {
  .slide { break-after: page; visibility: visible; opacity: 1; }
  .deck-controls { display: none; }
}
```

The mandatory `viewport-base.css` already includes basic print rules.
Theme files can augment them.

## Reduced Motion

Every deck must include (in the theme CSS or inline):
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.2s !important; }
}
```

The mandatory `viewport-base.css` already includes this.

## Do NOT

- Use `display: none` to hide inactive slides (breaks layout class display values)
- Allow content to overflow the 1920×1080 slide bounds
- Use `vw`/`vh` units inside `.slide` elements (stage is 1920×1080 — use px or clamp)
- Hardcode logo paths without checking `logo-manifest.json`
- Add scrollbars inside slides (auto or otherwise)
- Use JavaScript frameworks (no React, Vue, jQuery — vanilla JS only)
