# Image Prompt Reference

## Policy

When the LLM needs to suggest or generate images for UoG slides:

1. **Never embed AI-generated images directly** — Use image placeholders with
   descriptive prompts. The user generates or sources images separately.
2. **Generated images must not include** — headers, footers, page numbers,
   logos, borders, or slide chrome. Those belong in the HTML.
3. **Image aspect ratios must be specified** — So the layout can accommodate
   them correctly.

## Image Slots

Each layout that accepts images defines an image slot:

| Layout | Slot Name | Recommended Ratio | Description |
|--------|-----------|-------------------|-------------|
| `layout-split` | `split-visual` | 16:9 or 4:3 | Diagram, chart, or photo |
| `layout-metrics` | N/A | N/A | KPI numbers, no images |
| `layout-bento` | `card-image` | 16:9 | Card header image (optional) |
| `layout-comparison` | `compare-left`, `compare-right` | 16:9 or 1:1 | Before/after comparison images |
| `layout-cover` | `cover-bg` | 16:9 | Background image (subtle, behind text) |
| `layout-data-table` | N/A | N/A | Tables, no images |

## Prompt Templates

### Academic Diagram / Figure

```
A clean academic diagram showing [concept]. Use muted colours.
No text labels in the image — labels will be added in HTML.
Style: flat vector, consistent line weight.
Background: transparent or white.
Aspect ratio: 16:9.
```

### Research Photo / Laboratory

```
A professional documentary-style photograph of [subject].
Style: natural lighting, shallow depth of field.
No text overlays, logos, or watermarks.
Aspect ratio: 16:9.
```

### Data Visualization Placeholder

```
[Chart type] showing [data description].
Style: clean, minimal, colour palette restricted to [list UoG colours].
No title, axis labels, or legends — those will be added in HTML.
Aspect ratio: 16:9.
Background: transparent or white.
```

### System Architecture / Flow Diagram

```
A system architecture diagram showing [components and connections].
Style: flat boxes, consistent line weight, muted professional colours.
No text labels — annotate in HTML.
Aspect ratio: 16:9.
Background: transparent.
```

### Comparison Image Pair

```
Two side-by-side images showing [before] vs [after].
Style: consistent framing, lighting, and angle between both shots.
No text overlays or labels.
Combined aspect ratio: 16:9.
```

## Image Generation Guidelines

1. **Respect UoG brand**: Images should use the UoG colour palette if colour is
   needed. Avoid clashing colour schemes.
2. **No text in images**: Charts have no titles/axis labels; diagrams have no
   annotations. All text goes in HTML for accessibility and editability.
3. **Consistent style**: All images in a deck should share a consistent visual
   style (same illustration style, photo treatment, or chart aesthetic).
4. **Accessibility**: Every image must have a meaningful `alt` attribute.
   Complex diagrams need a text description in speaker notes.
5. **Resolution**: Images should be at least 1920×1080 for full-slide use,
   proportionally scaled for partial-slide slots.
