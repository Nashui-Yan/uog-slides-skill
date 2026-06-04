# Vertical Composition Rules

> Normal slide body content is a centred composition group. The group should
> be vertically centred between the header/subtitle lower edge and the bottom
> safe margin. Do not let captions, takeaways, or bullets drift into the
> bottom navigation/counter area.

## Body Composition Region (1920×1080 stage)

| Zone | Y Range | Notes |
|------|---------|-------|
| Header + title/subtitle | ~44–240px | Varies slightly with subtitle length |
| Body top | ~275–310px | Subtitle lower edge + ~56px |
| Bottom safe margin start | 920px | No meaningful content below |
| Absolute max content bottom | 940px | Navigation overlay above this |
| Body available height | ~610–645px | 920 − body_top |

## Centring Formula

```
h_body_top = subtitle_lower_edge + 56px
h_safe_bottom = 920px
h_available = h_safe_bottom - h_body_top
h_group = actual height of figure/caption/text group
h_group_top = h_body_top + (h_available - h_group) / 2
```

**The body content group must be centred between body_top and h_safe_bottom.**

If the group is too tall for the available height:
1. Reduce figure size (lower max-height)
2. Shorten description text
3. Change to side-column layout
4. Split the slide

Never: overflow downward, push text into the navigation zone, or use arbitrary
large top margins to position content.

## Body Centring CSS Primitives

```css
.uog-slide-body {
  position: absolute;
  left: var(--uog-body-left, 92px);
  right: var(--uog-body-right, 92px);
  top: var(--uog-body-top, 300px);
  bottom: var(--uog-body-bottom, 120px);
  min-height: 0;
}

.uog-body-center {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}

.uog-body-grid-center {
  height: 100%;
  display: grid;
  align-content: center;
  min-height: 0;
}

.uog-body-composition {
  width: 100%;
  max-height: 100%;
  display: grid;
  gap: 28px;
  align-content: center;
  min-height: 0;
}
```

**Rules:**
- Use body-centering wrappers for figure, KPI, comparison, and diagram pages
- Do not use arbitrary large top margins to position body content
- Do not anchor figure/caption groups to the bottom
- Bottom takeaway blocks must remain inside the composition group

## Caption + Description Pattern

A figure block may include both a caption label AND a descriptive paragraph:

```html
<figure class="uog-figure-block">
  <img src="..." alt="...">
  <figcaption class="uog-figure-caption">
    Short factual caption. (8–18 words)
  </figcaption>
  <p class="uog-figure-description">
    One concise descriptive paragraph explaining the implication. (20–45 words)
  </p>
</figure>
```

**Do not:**
- Put caption/description near the slide footer
- Use only a one-line label as "caption" when more explanation is needed
- Separate caption text far from the figure
- Place description at y > 920

**If description > 45 words:** Convert to side-column layout or split slide.

## Large Figure with Description Layout

For one large diagram, framework, Gantt chart, or architecture chart:

```
.layout-large-figure-with-description .uog-slide-body {
  height: 100%;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 18px;
  min-height: 0;
}
.layout-large-figure-with-description .uog-figure-block img {
  max-height: 560px;
  max-width: 86%;
  object-fit: contain;
}
.layout-large-figure-with-description .uog-figure-description {
  max-width: 1300px;
}
```

## Two Figures + Description Layout

```
.layout-two-figure-plus-description .uog-slide-body {
  height: 100%;
  display: grid;
  align-content: center;
  min-height: 0;
}
.layout-two-figure-plus-description .uog-body-composition {
  display: grid;
  gap: 28px;
  align-content: center;
}
```

## Vertical Alignment by Page Type

| Page Type | Vertical Rule |
|-----------|--------------|
| Single large figure | Centre figure+caption+description group in body |
| One wide figure + paragraph | Figure top, description below, whole group centred |
| One near-square/tall figure + text | Side columns, both centred as one group |
| Two figures + text | Two figures above, text below, whole group centred |
| KPI cards + takeaway | Cards + takeaway centred as one group |
| Dense bullet list | Centre list if short; split if > available height |
| Gantt / framework / pipeline | Treat as large figure with description, centre group |

> The layout class owns vertical alignment. Content should not manually push
> itself downward with margins.
