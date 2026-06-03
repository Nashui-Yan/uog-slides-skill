# SRS Slide Types — Specification

Definitive specification of the 15 SRS slide types for `nashui-uog-slides-skill`.

## Slide Type Catalog

| # | Type | Class | Layout | Content Shape | Animation |
|---|------|-------|--------|--------------|-----------|
| 1 | Cover | `.title-slide` | `.layout-cover` | Title + subtitle + meta + logo bar | `.reveal-blur` (optional) |
| 2 | Section Divider | `.section-divider` | grid centered | Section number + title + subtitle | None (immediate) |
| 3 | Research Question | `.research-question` | `.layout-stack` | Accent-bordered question + context + citation | `.reveal` (question first) |
| 4 | Problem Framing | `.problem-framing` | split 60/40 | Problem statement (left) + impact list (right) | `.reveal` (stagger both sides) |
| 5 | System Architecture | `.system-architecture` | `.layout-bento` or auto-grid | Component cards with labels + descriptions | `.arch-layers` build-up |
| 6 | Pipeline / DAG | `.pipeline-dag` | flex centered | Nodes + arrows + labels | `.pipeline-steps` sequential reveal |
| 7 | Method / Algorithm | `.method-algorithm` | `.layout-stack` | Numbered steps + optional pseudocode + formula | `.reveal-left` staggered |
| 8 | Dataset Summary | `.dataset-summary` | 5-col stat grid | Stat cards (value + label) + table + citation | `.reveal-scale` on stats |
| 9 | Experimental Setup | `.experimental-setup` | 2-col grid | Parameter table + environment badges + protocol | `.reveal` (both columns) |
| 10 | Benchmark / KPI | `.benchmark-kpi` | `.layout-metrics` | Hero KPI + KPI row or grid | `.reveal-scale` on values |
| 11 | Comparison / Ablation | `.comparison-ablation` | `.layout-comparison` | Side-by-side panels with metric rows + delta | `.compare-reveal` |
| 12 | Timeline / Roadmap | `.timeline-roadmap` | `.layout-timeline` | Vertical timeline with event markers + phases | `.reveal-left` staggered |
| 13 | Limitation / Risk | `.limitation-risk` | risk grid | Risk cells with severity badges + mitigations | `.reveal` per cell |
| 14 | Closing / Takeaway | `.closing-takeaway` | `.layout-close` | Thank you + takeaways + contact + logo bar | `.reveal` on takeaways |
| 15 | Appendix Table | `.appendix-table` | `.layout-data-table` | Dense table with caption | `.reveal-none` |

## Theme Visual Guidance

| Slide Type | Research Blue | Energy Noir | Swiss Data |
|-----------|--------------|-------------|-----------|
| Cover | Solid UoG Blue bg, white text | Gradient bg, white text | White bg, UoG Blue text, blue stripe |
| Section Divider | Solid UoG Blue | Solid UoG Blue | Solid UoG Blue |
| Research Question | Dark Blue accent bar | Cyan glow accent bar | Thin UoG Blue 2px bar |
| Problem Framing | Warm divider line | Subtle border divider | Clean border divider |
| System Architecture | Subtle card shadows | Glowing dark cards | No-shadow cards |
| Pipeline | Dark Blue nodes | Cyan nodes | UoG Blue nodes, near-zero radius |
| Method | Dark Blue numbered circles | Cyan circles + code block | UoG Blue circles, no-radius |
| Dataset | Blue stat values | Cyan stat values | Blue stat values |
| Experimental Setup | Blue param headers | Cyan param headers | Blue param headers |
| Benchmark KPI | UoG Blue values, subtle accent border | Cyan values, glow border | UoG Blue values, thin border |
| Comparison | Blue-tinted winner | Cyan-bordered winner | Blue-bordered winner |
| Timeline | Dark Blue markers | Yellow markers | Blue markers, thin connector |
| Limitation | Red/Yellow severity | Pink/Yellow severity | Red/Yellow severity |
| Closing | Solid UoG Blue | Gradient bg | White with blue stripe |
| Appendix | Blue table headers, striping | Cyan table text, dark bg | Blue headers, clean borders |

## Content Constraints

- **Cover**: 1 title, 1 subtitle, 1 meta line, logo bar. No body text.
- **Section Divider**: 1 section title, optional subtitle, optional section number. No body text.
- **Research Question**: 1 main question, 1-2 context paragraphs, 1 citation. Max 80 words on question.
- **Problem Framing**: Left panel max 80 words, right panel 3-5 impact items.
- **System Architecture**: 3-8 component cards, each with 3-10 word label + 10-30 word description.
- **Pipeline / DAG**: 3-7 steps/nodes. Each step max 2 words label.
- **Method / Algorithm**: 3-8 numbered steps, each 5-15 words title + optional 10-30 word detail.
- **Dataset Summary**: 4-5 stat cards, optional 4-8 row summary table, 1 citation.
- **Experimental Setup**: Max 12 parameter rows, 2-4 badges, 1 protocol paragraph.
- **Benchmark / KPI**: 1 hero KPI OR 3-row KPI grid. Max 6 metrics total.
- **Comparison / Ablation**: 2-3 panels, 3-8 metric rows per panel.
- **Timeline / Roadmap**: 3-6 events, optionally grouped into past/present/future phases.
- **Limitation / Risk**: 2-6 risk cells, each with severity + mitigation.
- **Closing / Takeaway**: 1 thank-you title, 2-4 takeaways, 1 contact line, logo bar.
- **Appendix Table**: Max 8 columns, max 20 rows. Smaller type allowed.

## Accessibility Per Type

- Cover: `aria-roledescription="title slide"`, logo alt text
- Section Divider: `aria-roledescription="section divider"`
- Research Question: Question in `<h2>`, citation in `<cite>` or `.citation`
- Data slides (Dataset, KPI, Comparison, Appendix): Ensure colour is not the sole differentiator
- All images: `alt` text present. Decorative images: `alt=""`
- Tables: `<thead>`, `<tbody>`, `<th scope="col">` or `scope="row"`
