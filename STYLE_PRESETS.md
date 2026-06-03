# Style Presets — Quick Reference

> These presets are derived from the three core themes. Each preset is a
> pre-configured combination of the UoG brand palette for a specific use case.

## Preset 1: Academic Conference

- **Theme**: `uog-research-blue`
- **Palette**: University Blue primary, white/light-slate backgrounds
- **Accent**: UoG Dark Blue (`#005398`)
- **Fonts**: Serif display (Georgia), system sans-serif body
- **Density**: Low (speaker-led, 1-3 bullets per slide)
- **Slide count**: 8-20
- **Signature**: Blue title slides, clean white content slides, subtle blue-tinted shadows

## Preset 2: PhD Annual Progress Review

- **Theme**: `uog-research-blue`
- **Palette**: University Blue primary, warm off-white alternating
- **Accent**: UoG Dark Red (`#7D2239`) for key findings
- **Fonts**: Serif display, system sans-serif body
- **Density**: Medium (mix of bullet lists and data slides)
- **Slide count**: 12-30
- **Signature**: Alternating light backgrounds, red accent for research highlights

## Preset 3: Technical Systems Presentation

- **Theme**: `uog-energy-noir`
- **Palette**: Near-black backgrounds, light data accents
- **Accent**: UoG Light Blue (`#4DBBC6`) — glows on dark
- **Fonts**: Serif display, system sans-serif body, monospace for code
- **Density**: Medium-High (architecture diagrams, system flows)
- **Slide count**: 8-20
- **Signature**: Dark gradient title slide, glowing accents, code blocks

## Preset 4: Digital Twin / CPS Showcase

- **Theme**: `uog-energy-noir`
- **Palette**: Near-black backgrounds, warm data accents
- **Accent**: UoG Light Yellow (`#F2D25C`) for KPIs
- **Fonts**: Serif display, system sans-serif body
- **Density**: Medium (KPI towers, system diagrams, comparison slides)
- **Slide count**: 10-25
- **Signature**: Yellow-gold KPI values on dark, University Blue gradient dividers

## Preset 5: Benchmark Results / Data Deck

- **Theme**: `uog-swiss-data`
- **Palette**: White/light-grey alternating, University Blue as anchor
- **Accent**: University Blue (`#011451`) — used sparingly
- **Fonts**: All sans-serif (Helvetica Neue / Inter), monospace for numbers
- **Density**: High (tables, charts, KPI grids)
- **Slide count**: 10-40
- **Signature**: Strict grid, large mono KPI values, minimal border radius

## Preset 6: Methods / Methodology

- **Theme**: `uog-swiss-data`
- **Palette**: White grounds, UoG Dark Green for positive indicators
- **Accent**: UoG Dark Green (`#405D18`) for success/complete, UoG Dark Red for issues
- **Fonts**: All sans-serif
- **Density**: Medium (process diagrams, comparison tables, decision trees)
- **Slide count**: 8-20
- **Signature**: Green/red semantic colour coding, process flow layouts

## Preset Selection Logic

```
Is the audience primarily academic?
  ├── Yes → uog-research-blue
  │   ├── Speaker-led (lecture/APR)? → Low density
  │   └── Reading-first (handout)? → Medium density
  │
  ├── Technical/Industry? → uog-energy-noir
  │   ├── Dark aesthetic preferred? → Full noir
  │   └── Mixed audience? → Consider research-blue instead
  │
  └── Data-heavy? → uog-swiss-data
      ├── Primarily tables/charts? → High density
      └── Methods/process? → Medium density
```

## What NOT to Use

These are **banned** across all presets:
- `#3b82f6` (Tailwind blue)
- `#6366f1` (Indigo)
- `#8b5cf6` (Purple)
- Purple-to-indigo gradients
- Glassmorphism (frosted glass backgrounds)
- Inter, Roboto, Arial as display fonts (body only)
- Gratuitous box shadows on data slides
- Emoji as icons
- Non-UoG brand colours (stick to `BRAND_TOKENS.md`)

## Font Pairings

Until the official UoG typeface is extracted from the typography brand page:

| Theme | Display | Body | Mono |
|-------|---------|------|------|
| Research Blue | Georgia / Times New Roman | system-ui, -apple-system, Segoe UI | SF Mono, Cascadia Code |
| Energy Noir | Georgia / Times New Roman | system-ui, -apple-system, Segoe UI | SF Mono, Cascadia Code |
| Swiss Data | Helvetica Neue, system-ui | Helvetica Neue, Inter, system-ui | SF Mono, JetBrains Mono |

**TODO**: Replace all font stacks with the official University of Glasgow typeface(s) from https://www.gla.ac.uk/myglasgow/staff/brandtoolkit/typography/

## SRS Slide Type Recommendations per Preset

| Preset | Primary Slide Types | Avoid |
|--------|-------------------|-------|
| Academic Conference | Cover, Section Divider, Research Question, Method, Benchmark KPI, Comparison, Closing | Pipeline (too technical for general audience) |
| PhD APR | All 15 types — comprehensive | None |
| Technical Systems | Cover, System Architecture, Pipeline, Method, Benchmark KPI, Limitation, Closing | Appendix (keep decks tight) |
| Digital Twin / CPS | Cover, Problem Framing, System Architecture, Pipeline, Benchmark KPI, Timeline, Limitation, Closing | Dataset Summary (unless public data) |
| Benchmark Results | Cover, Dataset Summary, Experimental Setup, Benchmark KPI, Comparison, Appendix | Research Question, Problem Framing (audience already knows context) |
| Methods | Cover, Research Question, Method, Experimental Setup, Comparison, Limitation, Closing | System Architecture, Pipeline (methods-focused deck) |
