# Layout Reference

## Layout Selection

Choose a layout based on CONTENT SHAPE, not aesthetics:

| Content Shape | Layout |
|--------------|--------|
| One big idea + supporting text | `layout-cover` |
| Text + visual (diagram, chart, photo) | `layout-split` |
| 3-4 key metrics / KPIs | `layout-metrics` |
| 4-6 cards / points | `layout-bento` |
| Sequential events / process | `layout-timeline` |
| Before/after or A/B comparison | `layout-comparison` |
| Vertical list / stack | `layout-stack` |
| Full data table | `layout-data-table` |
| Partner/sponsor logos | `layout-partner-row` |
| Closing / thank you | `layout-close` |

## Layout Skeletons

### layout-cover — Title Slide
```html
<section class="slide layout-cover" data-slide-index="0" data-background="dark">
  <div class="slide-content">
    <h1 class="reveal">Presentation Title</h1>
    <p class="subtitle reveal">Subtitle or author line</p>
    <p class="meta reveal">Date · Event · Affiliation</p>
    <div class="logo-bar">
      <!-- logos per manifest -->
    </div>
  </div>
</section>
```

### layout-split — Two Column
```html
<section class="slide layout-split" data-slide-index="3" data-background="light">
  <div class="slide-content">
    <div class="split-left">
      <h2 class="reveal">Section Title</h2>
      <ul class="reveal">
        <li>Point one</li>
        <li>Point two</li>
        <li>Point three</li>
      </ul>
    </div>
    <div class="split-right">
      <div class="visual-frame reveal-scale">
        <!-- chart, diagram, or image -->
      </div>
    </div>
  </div>
</section>
```

### layout-metrics — KPI Grid
```html
<section class="slide layout-metrics" data-slide-index="5" data-background="light">
  <div class="slide-content">
    <h2 class="reveal">Key Results</h2>
    <div class="metrics-grid">
      <div class="metric reveal-scale">
        <span class="kpi-value">98.7%</span>
        <span class="kpi-label">Accuracy</span>
      </div>
      <div class="metric reveal-scale">
        <span class="kpi-value">2.4ms</span>
        <span class="kpi-label">Latency</span>
      </div>
      <div class="metric reveal-scale">
        <span class="kpi-value">1.2M</span>
        <span class="kpi-label">Samples</span>
      </div>
    </div>
  </div>
</section>
```

### layout-bento — Card Grid
```html
<section class="slide layout-bento" data-slide-index="7" data-background="light">
  <div class="slide-content">
    <h2 class="reveal">Approach</h2>
    <div class="card-grid">
      <div class="card reveal"><h3>Card 1</h3><p>Description</p></div>
      <div class="card reveal"><h3>Card 2</h3><p>Description</p></div>
      <div class="card reveal"><h3>Card 3</h3><p>Description</p></div>
      <div class="card reveal"><h3>Card 4</h3><p>Description</p></div>
    </div>
  </div>
</section>
```

### layout-timeline — Process / Timeline
```html
<section class="slide layout-timeline" data-slide-index="6" data-background="light">
  <div class="slide-content">
    <h2 class="reveal">Workflow</h2>
    <div class="timeline">
      <div class="event reveal-left">
        <div class="event-marker">1</div>
        <div class="event-body"><h4>Step One</h4><p>Description</p></div>
      </div>
      <div class="event reveal-left">
        <div class="event-marker">2</div>
        <div class="event-body"><h4>Step Two</h4><p>Description</p></div>
      </div>
    </div>
  </div>
</section>
```

### layout-comparison — Side by Side
```html
<section class="slide layout-comparison" data-slide-index="8" data-background="light">
  <div class="slide-content">
    <h2 class="reveal">Comparison</h2>
    <div class="compare-grid">
      <div class="compare-panel reveal-scale"><h3>Before</h3><!-- content --></div>
      <div class="compare-panel reveal-scale"><h3>After</h3><!-- content --></div>
    </div>
  </div>
</section>
```

### layout-data-table — Full Table
```html
<section class="slide layout-data-table" data-slide-index="9" data-background="light">
  <div class="slide-content">
    <h2 class="reveal">Results</h2>
    <div class="table-wrapper reveal-none">
      <table><!-- full width data table --></table>
    </div>
  </div>
</section>
```

### layout-close — Closing Slide
```html
<section class="slide layout-close" data-slide-index="11" data-background="dark">
  <div class="slide-content">
    <h2 class="reveal">Thank You</h2>
    <p class="reveal">Questions?</p>
    <p class="meta reveal">contact@glasgow.ac.uk</p>
    <div class="logo-bar">
      <!-- logos per manifest -->
    </div>
  </div>
</section>
```

## Responsive Behaviour

All layouts stack to single-column at viewports where the stage scale
drops below a readable threshold. The navigation script handles scaling;
layouts use the fixed 1920×1080 stage coordinates.

## Layout Constraints

- No text overflow (content must fit within 1920×1080 at the defined type scale)
- No more than 6 items in a card grid or metrics grid
- Data tables: max 8 columns, max 20 rows per slide
- Comparison panels: max 3 items per panel
- Timeline: max 6 events per slide
- If content exceeds limits, split into multiple slides

## Layout Selection Philosophy

Layouts are chosen based on **content shape**, not aesthetics. No single layout
is the default for all slides. The agent must vary layouts across a deck.

The image-card grid (`.layout-image-card-grid`) is **one option** among many.
It is best for showing multiple research areas, teams, themes, or programmes.
It should not be forced onto content that doesn't naturally fit that shape.

### Content Shape → Layout Choice

| Content Shape | Layout | When to Use |
|--------------|--------|-------------|
| One central claim | `.layout-big-statement` | Key research finding, thesis statement |
| 3–4 key points | `.layout-big-bullets` | Contributions, takeaways |
| Explanation + visual | `.layout-two-column` | Diagram, architecture, photo alongside explanation |
| Before vs after, A vs B | `.layout-comparison` | Ablation, baseline vs proposed |
| Metrics / KPIs | `.layout-kpi` | Accuracy, latency, benchmark results |
| Themes / programmes / areas | `.layout-image-card-grid` | Research themes, partner projects — optional |
| 4 concepts / pillars | `.layout-card-grid` | Design principles, approach pillars |
| Step-by-step process | `.layout-process` | Training pipeline, data flow, methodology |
| Time milestones | `.layout-timeline` | PhD timeline, project phases |
| Dense reference data | `.layout-appendix-table` | Full benchmark table |

## SRS Slide Type → Layout Mapping

| SRS Slide Type | CSS Class | Recommended Layout | Components Used |
|---------------|-----------|-------------------|----------------|
| Cover | `.title-slide` | `.layout-cover` | `.logo-bar`, `.subtitle`, `.meta` |
| Section Divider | `.section-divider` | centered grid | `.section-number`, `.section-subtitle` |
| Research Question | `.research-question` | `.layout-stack` | `.question-block`, `.citation` |
| Problem Framing | `.problem-framing` | split 60/40 | `.eyebrow`, `.impact-list` |
| System Architecture | `.system-architecture` | `.layout-bento` or auto-grid | `.arch-card` |
| Pipeline / DAG | `.pipeline-dag` | flex centered | `.pipeline-node`, `.pipeline-arrow`, `.pipeline-step-group` |
| Method / Algorithm | `.method-algorithm` | `.layout-stack` | `.method-steps`, `.formula`, `pre`/`code` |
| Dataset Summary | `.dataset-summary` | 5-col grid | `.dataset-stat`, `table`, `.citation` |
| Experimental Setup | `.experimental-setup` | 2-col grid | `.param-table`, `.badge-row` |
| Benchmark / KPI | `.benchmark-kpi` | `.layout-metrics` | `.kpi-hero`, `.kpi-value`, `.kpi-label`, `.kpi-delta` |
| Comparison / Ablation | `.comparison-ablation` | `.layout-comparison` | `.compare-panel`, `.metric-row`, `.compare-delta` |
| Timeline / Roadmap | `.timeline-roadmap` | `.layout-timeline` | `.event`, `.event-marker`, `.event-body` |
| Limitation / Risk | `.limitation-risk` | risk grid | `.risk-cell`, `.risk-severity`, `.mitigation` |
| Closing / Takeaway | `.closing-takeaway` | `.layout-close` | `.takeaway-list`, `.contact-row`, `.logo-bar` |
| Appendix Table | `.appendix-table` | `.layout-data-table` | `table`, `.table-caption` |

See `references/srs-slide-types.md` for the full specification.
