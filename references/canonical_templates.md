# Canonical Templates

These slide types are **LOCKED** and must not be redesigned by the generator.
The generator may replace text content, but must not change visual structure.

Source documents (LaTeX/PDF/reports) are content sources only. They must
never override the visual style of canonical templates.

## 1 — Canonical Cover Page

**Source of truth**: `examples/uog-institutional-large-demo/index.html` slide 1

The cover page MUST exactly follow this structure:

```
<section class="slide title-slide" data-slide-type="cover">
  <div class="uog-cover-band">
    <div class="uog-cover-text">
      <h1>TITLE</h1>
      <p class="subtitle">SUBTITLE</p>
      <p class="meta">META LINE</p>
    </div>
  </div>
  <div class="uog-cover-author-block">
    <p class="uog-cover-author">AUTHOR NAME</p>
    <p class="uog-cover-institution">INSTITUTION</p>
  </div>
  <div class="uog-cover-logo-row">
    <img class="uog-cover-footer-logo" src="...(blue-text logo)..." alt="University of Glasgow">
  </div>
</section>
```

**Locked properties:**
- White slide background
- Full-width University Blue horizontal band (`uog-cover-band`)
- Large white title text inside band
- White subtitle/meta inside band
- Author/institution block below band on white background in University Blue
- Bottom-left logo row only, blue-text UoG logo on white background
- No dark full-slide background
- No bottom-right or footer logos
- No source-LaTeX title page style

**Allowed changes:** Replace title, subtitle, meta, author, institution text only.

## 2 — Canonical Contents Page

**Source of truth**: `examples/uog-institutional-large-demo/index.html` slide 2

The contents page MUST exactly follow this structure:

```
<section class="slide" data-slide-type="contents">
  <header class="uog-slide-header">
    <div class="uog-logo-anchor">
      <div class="uog-logo-blue-block">
        <img class="uog-header-logo uog-header-logo--on-blue-block"
             src="...(derived cropped white logo)..." alt="University of Glasgow">
      </div>
    </div>
    <div class="uog-header-text">
      <h2 class="uog-slide-title">Contents</h2>
      <p class="uog-slide-subtitle">SUBTITLE</p>
    </div>
  </header>
  <div class="uog-slide-body">
    <ol class="uog-agenda-list">
      <li><span class="uog-agenda-number">01</span><span class="uog-agenda-text">ITEM</span></li>
      ...
    </ol>
  </div>
</section>
```

**Locked properties:**
- Normal page header with blue logo block
- White background
- Structured agenda rows (`.uog-agenda-list`)
- Numbered items with `.uog-agenda-number` + `.uog-agenda-text`
- Single-column vertical list, not scattered two-column text
- No decorative cards
- No dark full-width band
- No source-LaTeX contents style

**Allowed changes:** Replace subtitle, agenda item text, and item count (≤8 items).

## 3 — Canonical Closing Page

**Source of truth**: `examples/uog-institutional-large-demo/index.html` last slide

The closing page MUST exactly follow this structure:

```
<section class="slide closing-takeaway" data-slide-type="closing">
  <div class="uog-closing-band">
    <div class="uog-closing-text">
      <h2 class="uog-closing-title">TITLE</h2>
      <p class="uog-closing-subtitle">SUBTITLE</p>
      <p class="uog-closing-meta">META</p>
    </div>
  </div>
  <div class="uog-cover-logo-row">
    <img class="uog-cover-footer-logo" src="...(blue-text logo)..." alt="University of Glasgow">
  </div>
</section>
```

**Locked properties:**
- White slide background
- Full-width University Blue horizontal closing band
- Large white title inside band
- White subtitle/meta inside band
- Bottom-left logo row only, blue-text UoG logo on white background
- No dark full-slide background
- No bottom-right or footer logos
- No source-LaTeX closing style

**Allowed changes:** Replace title, subtitle, meta text only.

## 4 — Canonical Normal Header

**Source of truth**: `examples/uog-institutional-large-demo/index.html` slides 2–6

Every normal content slide MUST use this header:

```
<header class="uog-slide-header">
  <div class="uog-logo-anchor">
    <div class="uog-logo-blue-block">
      <img class="uog-header-logo uog-header-logo--on-blue-block"
           src="...(derived cropped white logo)..." alt="University of Glasgow">
    </div>
  </div>
  <div class="uog-header-text">
    <h2 class="uog-slide-title">TITLE</h2>
    <p class="uog-slide-subtitle">SUBTITLE</p>
  </div>
</header>
```

**Locked properties:**
- Blue logo block flush with left edge (x=0)
- White-text derived cropped logo inside block
- Title/subtitle to the right
- Header top: 44px, grid: 340px + 1fr, gap: 24px
- Body starts below header at ~296px
- No bottom-right, footer, or corner logos

**Allowed changes:** Replace title and subtitle text only.

## Generator Policy

> Cover, closing, and contents slides are canonical templates. They are not
> adaptive layouts. Source documents may provide their text content, but
> must not change their visual style.
>
> Source decks/reports are content sources, not visual authorities. The UoG
> skill owns the visual system.
