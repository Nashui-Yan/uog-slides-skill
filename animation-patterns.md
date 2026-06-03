# Animation Patterns

## Design Philosophy

Animations in UoG slides serve content, not decoration. Every animation must:
1. Match the semantic type of content being revealed
2. Respect `prefers-reduced-motion`
3. Complete within 150-700ms (fast, functional)
4. Not distract from the academic content

## Mechanism

Animations use CSS transitions triggered by the `.visible` parent class.
No JavaScript animation libraries are required.

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-normal) var(--ease-out-expo),
              transform var(--duration-normal) var(--ease-out-expo);
}

.slide.active .reveal,
.slide.visible .reveal {
  opacity: 1;
  transform: translateY(0);
}
```

## Entrance Recipes

### reveal — Fade + Slide Up
Best for: bullet points, paragraphs, general content.
```css
.reveal { opacity: 0; transform: translateY(20px); }
.slide.active .reveal { opacity: 1; transform: translateY(0); }
```
Duration: 400ms. Stagger: 75ms per child.

### reveal-scale — Scale In
Best for: KPI big numbers, key statistics.
```css
.reveal-scale { opacity: 0; transform: scale(0.9); }
.slide.active .reveal-scale { opacity: 1; transform: scale(1); }
```
Duration: 500ms. No stagger needed.

### reveal-left — Slide from Left
Best for: timeline events, process steps, sequential items.
```css
.reveal-left { opacity: 0; transform: translateX(-30px); }
.slide.active .reveal-left { opacity: 1; transform: translateX(0); }
```
Duration: 400ms. Stagger: 100ms per child.

### reveal-blur — Unblur
Best for: hero images, title slides, dramatic reveals.
```css
.reveal-blur { opacity: 0; filter: blur(8px); }
.slide.active .reveal-blur { opacity: 1; filter: blur(0); }
```
Duration: 700ms. Use sparingly.

### reveal-none — Immediate
Best for: content slides where animation would distract.
```css
.reveal-none { opacity: 1; transform: none; }
```
No transition. Use for data-heavy slides.

## Staggered Children

Add staggered delays using `nth-child`:

```css
.slide.active .reveal:nth-child(1) { transition-delay: 0ms; }
.slide.active .reveal:nth-child(2) { transition-delay: 75ms; }
.slide.active .reveal:nth-child(3) { transition-delay: 150ms; }
.slide.active .reveal:nth-child(4) { transition-delay: 225ms; }
.slide.active .reveal:nth-child(5) { transition-delay: 300ms; }
.slide.active .reveal:nth-child(6) { transition-delay: 375ms; }
```

## Slide Transitions

Between-slide transitions are controlled by the navigation script. CSS
transition on `.deck-stage` transform provides a smooth horizontal slide:

```css
.deck-stage {
  transition: transform var(--duration-normal) var(--ease-out-expo);
}
```

Transition speed can be varied per slide via `data-transition`:
- `fast` → `--duration-fast` (200ms)
- `normal` → `--duration-normal` (400ms)
- `slow` → `--duration-slow` (700ms)

## Theme-Specific Guidelines

### uog-research-blue
- Subtle, academic-appropriate animations
- Prefer `reveal` for bullet lists, `reveal-scale` for key findings
- Avoid dramatic transitions on content slides
- Section dividers: no animation (immediate)

### uog-energy-noir
- Slightly more dramatic entrance animations
- `reveal-blur` on hero slides, `reveal-scale` on KPI values
- Glow-pulse accent animations for emphasis (max 1 per slide)
- Dark-to-dark slide transitions with brief University Blue flash

### uog-swiss-data
- Minimal animation — data doesn't need drama
- Prefer `reveal-none` or very fast `reveal` (200ms)
- No stagger on data tables (all rows appear together)
- KPI values: `reveal-scale` at 300ms only

## Reduced Motion

All animations must be wrapped in:

```css
@media (prefers-reduced-motion: no-preference) {
  .reveal { /* animation styles */ }
}
```

The `viewport-base.css` already includes a global reduced-motion override.
Individual animation declarations should use `prefers-reduced-motion: no-preference`
to scope their effects.

## What NOT to Do

- ❌ No bounce/spring/bouncy easing (too playful for academic)
- ❌ No infinite-loop animations (distracting)
- ❌ No all-slides-same-fade-up (semantic pairing required)
- ❌ No animation on data tables (data appears immediately)
- ❌ No animation on section dividers (they should be immediate)
- ❌ No scroll-triggered animations (slides are stacked, not scrolled)
- ❌ No animation library dependency (Motion One, GSAP — pure CSS)
