# Template Invariants

These templates are **not adaptive layouts**. They are template-instantiation
tasks. The generator must copy the canonical structure from the demo and replace
only text content.

> Cover, closing, and contents slides are not layout-generation tasks. They
> are template-instantiation tasks. Copy the canonical template structure from
> the demo and replace text only.

## 1 — Cover Page (LOCKED)

Source of truth: `examples/uog-institutional-large-demo/index.html` slide 1

```
<section class="slide title-slide active" data-slide-index="0" data-background="light" data-slide-type="cover">
  <div class="uog-cover-band">
    <div class="uog-cover-text">
      <h1 class="reveal">TITLE</h1>
      <p class="subtitle reveal">SUBTITLE</p>
      <p class="meta reveal">META LINE</p>
    </div>
  </div>
  <div class="uog-cover-author-block">
    <p class="uog-cover-author">AUTHOR NAME</p>
    <p class="uog-cover-institution">SCHOOL | University of Glasgow</p>
  </div>
  <div class="uog-cover-logo-row">
    <img class="uog-cover-footer-logo" src="assets/logos/main-uog-logo-artwork/SVG/Unboxed%20colour%20logo%20blue%20text.svg" alt="University of Glasgow">
  </div>
</section>
```

**Invariants:**
- White slide background (`data-background="light"`)
- Full-width University Blue band (`.uog-cover-band`)
- Title/subtitle/meta in white inside band
- Author/institution block below band on white text
- Bottom-left logo row (`.uog-cover-logo-row`)
- Blue-text UoG logo on white background
- No tiny corner logo, no footer logo, no bottom-right logo
- No dark full-slide background
- No normal header logo block on cover
- No source-document title-page style

**Do not create a new cover logo arrangement. Use the canonical cover logo row exactly.**

## 2 — Contents Page (LOCKED)

Source of truth: `examples/uog-institutional-large-demo/index.html` slide 2

```
<section class="slide" data-slide-index="1" data-background="light" data-slide-type="contents">
  <header class="uog-slide-header">
    <div class="uog-logo-anchor">
      <div class="uog-logo-blue-block">
        <img class="uog-header-logo uog-header-logo--on-blue-block" src="assets/logos/main-uog-logo-artwork/SVG/uog-white-text-cropped-for-header.svg" alt="University of Glasgow">
      </div>
    </div>
    <div class="uog-header-text">
      <h2 class="uog-slide-title reveal">Contents</h2>
      <p class="uog-slide-subtitle reveal">SUBTITLE</p>
    </div>
  </header>
  <div class="uog-slide-body">
    <ol class="uog-agenda-list">
      <li class="reveal"><span class="uog-agenda-number">01</span><span class="uog-agenda-text">ITEM</span></li>
      ...
    </ol>
  </div>
</section>
```

**Invariants:**
- Normal page header with blue logo block
- White background
- Structured agenda rows (`.uog-agenda-list`)
- Numbered items (`.uog-agenda-number` + `.uog-agenda-text`)
- Single-column vertical list
- No loose two-column text
- No source-document contents style

**Contents slide must use the canonical agenda-row template exactly. Only agenda item text may change.**

## 3 — Closing Page (LOCKED)

Source of truth: `examples/uog-institutional-large-demo/index.html` last slide

```
<section class="slide closing-takeaway" data-slide-index="N" data-background="light" data-slide-type="closing">
  <div class="uog-closing-band">
    <div class="uog-closing-text">
      <h2 class="uog-closing-title reveal">TITLE</h2>
      <p class="uog-closing-subtitle reveal">SUBTITLE</p>
      <p class="uog-closing-meta reveal">META</p>
    </div>
  </div>
  <div class="uog-cover-logo-row">
    <img class="uog-cover-footer-logo" src="assets/logos/main-uog-logo-artwork/SVG/Unboxed%20colour%20logo%20blue%20text.svg" alt="University of Glasgow">
  </div>
</section>
```

**Invariants:**
- White slide background
- Full-width University Blue closing band (`.uog-closing-band`)
- Closing text in white inside band
- Bottom-left logo row (`.uog-cover-logo-row`)
- Blue-text UoG logo on white background
- No tiny corner logo, no footer logo, no bottom-right logo
- No dark full-slide background
- No source-document closing style

**Do not create a new closing logo arrangement. Use the canonical closing logo row exactly.**

## 4 — Normal Header (LOCKED)

```
<header class="uog-slide-header">
  <div class="uog-logo-anchor">
    <div class="uog-logo-blue-block">
      <img class="uog-header-logo uog-header-logo--on-blue-block" src="assets/logos/main-uog-logo-artwork/SVG/uog-white-text-cropped-for-header.svg" alt="University of Glasgow">
    </div>
  </div>
  <div class="uog-header-text">
    <h2 class="uog-slide-title">TITLE</h2>
    <p class="uog-slide-subtitle">SUBTITLE</p>
  </div>
</header>
```

**Invariants:**
- Blue logo block flush left (x=0)
- White-text derived cropped logo inside block
- Title/subtitle right of block (x ≈ 364px)
- Header top: 44px, grid: 340px + 1fr, gap: 24px
- No footer or corner logos on normal slides
