# Layout Quality Rules

Hard rules enforced by the skill. These are non-negotiable unless the user
explicitly overrides them.

## Rule 1 — Canonical Cover Page (LOCKED)

The cover page MUST use the accepted canonical style:
- White background
- Full-width University Blue horizontal band for title/subtitle/meta
- Title/subtitle text inside the blue band in white
- Author/institution block below the band on white background in University Blue
- Bottom-left logo row only (blue-text logo on white background)
- Optional partner logos only in the bottom-left logo row

**Prohibited cover styles:**
- Dark full-slide backgrounds
- Bottom-right logos
- Footer logos
- Duplicate logos
- Source-document-derived cover layouts

Cover style is canonical and locked. Source documents provide content but
must not override the cover layout.

## Rule 2 — Canonical Closing Page (LOCKED)

The closing page MUST use the accepted canonical style:
- White background
- Full-width University Blue horizontal band
- Closing title/subtitle/meta inside the band in white
- Bottom-left logo row only (blue-text logo on white background)
- Optional partner logos only in the bottom-left logo row

**Prohibited closing styles:**
- Dark full-slide backgrounds
- Bottom-right logos
- Footer logos
- Per-slide source logos

Closing style is canonical and locked. Do not infer closing layout from
source documents or LaTeX.

## Rule 3 — No Logos on Normal Content Slides

Normal content slides MUST only contain the UoG logo inside the fixed
top-left header blue block (`.uog-logo-blue-block`).

**Prohibited on normal slides:**
- Bottom-right UoG logos
- Footer logos of any kind
- Partner logos
- Source-document logos
- Repeated institutional marks
- Tiny corner logos
- Slide number + logo combo footers

Exception: Partner logos may appear only on cover and closing pages, and
only if the user explicitly requests partner logos.

If the LaTeX/PDF/source contains footer logos, ignore them as source artifacts.

## Rule 4 — Safe Area and Bottom Margin

Every slide must respect a visual safe area:
- No meaningful content below y = 1000px on the 1080px stage
- Minimum bottom margin: 64px
- Preferred bottom margin: 80px
- Body content stays within the main content area

**Validator thresholds:**
- Warn if content containers may overflow bottom safe area
- Warn if more than 5 bullet points plus a figure appear on one slide
- Warn if figure/caption blocks exceed safe height

## Rule 5 — Auto Density Control

When a slide is too dense, apply in this order:

| Step | Action | Constraint |
|------|--------|-----------|
| 1 | Reduce font 1–2pt | Never below readable minimum |
| 2 | Tighten spacing slightly | Preserve readability |
| 3 | Split into 2+ slides | Quality > slide count |

**Split thresholds:**
- Body text >85-100 words + figure → split
- Body text >140-160 words without figure → split
- >5 bullets with figure → split
- >7 bullets without figure → split
- Figure needs <35% slide width → split or move to figure-focused slide
- 2 figures + >3 bullets → split (unless comparison layout)

**Never solve density by:**
- Making text very small
- Pushing content into bottom margin
- Overlapping figure and text
- Hiding overflow
- Using tiny captions
- Placing figures between paragraphs

## Rule 6 — Figure Placement

Figures must be placed as proper layout blocks.

**Allowed figure layouts:**
1. Figure-left / text-right (`.layout-figure-left`)
2. Text-left / figure-right (`.layout-figure-right`)
3. Full-width figure with short caption
4. Two-column figure comparison
5. Figure grid with minimal labels
6. Single centered figure slide

**Forbidden:**
- Paragraph → figure → paragraph sandwich
- Tiny figure embedded in text flow
- Figure squeezed below long bullets
- Figure overlapping footer/counter
- Figure used as decoration
- Source LaTeX placement copied directly

**Single-figure slide rule**: Center the figure vertically within the body
area. Use reasonable width/height. Add only a short caption or takeaway.
Do not leave the figure floating awkwardly.

**Mixed figure + text rule**: Use a deliberate two-column layout. Figure in
one column, text in the other. Caption stays with figure.

## Rule 7 — Source Document Visual Artifacts Are Ignored

When converting from LaTeX/PDF/source:

**Use source for:** content, titles, figures, section order, equations, captions.

**Do NOT use source for:** footer logos, theme colours, page geometry, source
margins, repeated logos, old template artifacts, random figure placement,
exact font sizes, old title page design.

> Source decks/reports are content sources, not visual authorities. The UoG
  skill owns the visual system.

## Rule 8 — Partner Logo Policy

Partner logos:
- Are disabled by default
- May appear only when the user explicitly asks
- May appear only on cover and closing pages
- Must be placed in the bottom-left logo row
- Must not appear on normal content slides
- Must not appear as small footer/corner marks

## Rule 9 — Slide Splitting Policy

Split slides when:
- The slide cannot maintain 64px minimum bottom margin
- Content requires body font below acceptable size
- Figure and paragraph content compete for space
- The slide contains multiple independent claims
- One figure deserves its own explanation
- A comparison needs separation

## Rule 10 — Visual Review Checklist

Before delivery, inspect each slide:
- Cover uses canonical white + blue band style
- Closing uses canonical white + blue band style
- No bottom-right logos on normal slides
- No content below safe area (y > 1000px)
- No figure between paragraphs
- No tiny charts
- No dense paragraph blocks
- Figure is centered or column-aligned
- Slide title/subtitle do not collide with header logo
- Bottom counter does not overlap content
- All pages have enough breathing room
