#!/usr/bin/env node
/**
 * validate-srs.mjs — SRS Implementation Validator
 *
 * Meta-validates the SRS implementation — checks that all required files
 * exist, all 15 slide types are implemented, all 3 themes provide coverage,
 * and the animation/grid systems are complete.
 *
 * Usage:
 *   node scripts/validate-srs.mjs
 *   node scripts/validate-srs.mjs --report
 *   node scripts/validate-srs.mjs --json
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Expected slide types from the SRS
// ---------------------------------------------------------------------------
const SRS_SLIDE_TYPES = [
  { name: 'title-slide',          label: 'Cover',                   priority: 'P0' },
  { name: 'section-divider',      label: 'Section Divider',         priority: 'P0' },
  { name: 'research-question',    label: 'Research Question',       priority: 'P0' },
  { name: 'problem-framing',      label: 'Problem Framing',         priority: 'P0' },
  { name: 'system-architecture',  label: 'System Architecture',     priority: 'P0' },
  { name: 'pipeline-dag',         label: 'Pipeline / DAG',          priority: 'P0' },
  { name: 'method-algorithm',     label: 'Method / Algorithm',      priority: 'P0' },
  { name: 'dataset-summary',      label: 'Dataset Summary',         priority: 'P0' },
  { name: 'experimental-setup',   label: 'Experimental Setup',      priority: 'P0' },
  { name: 'benchmark-kpi',        label: 'Benchmark Result / KPI',  priority: 'P0' },
  { name: 'comparison-ablation',  label: 'Comparison / Ablation',   priority: 'P0' },
  { name: 'timeline-roadmap',     label: 'Timeline / Roadmap',      priority: 'P0' },
  { name: 'limitation-risk',      label: 'Limitation / Risk',       priority: 'P0' },
  { name: 'closing-takeaway',     label: 'Closing / Takeaway',      priority: 'P0' },
  { name: 'appendix-table',       label: 'Appendix Dense Table',    priority: 'P0' },
];

const SRS_ANIMATION_CLASSES = ['reveal', 'reveal-scale', 'reveal-left', 'reveal-right', 'reveal-blur', 'reveal-none'];
const SRS_GRID_SPANS = ['col-1','col-2','col-3','col-4','col-5','col-6','col-7','col-8','col-9','col-10','col-11','col-12'];
const SRS_LAYOUT_CLASSES = ['layout-cover','layout-close','layout-split','layout-split-wide','layout-metrics','layout-bento','layout-timeline','layout-comparison','layout-stack','layout-data-table','layout-partner-row'];

// ---------------------------------------------------------------------------
// Check Result Collector
// ---------------------------------------------------------------------------
const results = { pass: [], fail: [], warn: [] };

function pass(msg)  { results.pass.push(msg); }
function fail(msg)  { results.fail.push(msg); }
function warn(msg)  { results.warn.push(msg); }

// ---------------------------------------------------------------------------
// File existence checks
// ---------------------------------------------------------------------------
const REQUIRED_FILES = [
  'grid-system.css',
  'animations.css',
  'slide-types.css',
  'viewport-base.css',
  'themes/uog-research-blue.css',
  'themes/uog-energy-noir.css',
  'themes/uog-swiss-data.css',
  'scripts/validate-deck.mjs',
  'BRAND_TOKENS.md',
  'LOGO_USAGE.md',
  'THEME_SYSTEM.md',
  'assets/logos/logo-manifest.json',
];

function checkFilesExist() {
  for (const file of REQUIRED_FILES) {
    const full = resolve(BASE, file);
    if (existsSync(full)) {
      pass(`File exists: ${file}`);
    } else {
      fail(`Missing required file: ${file}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Slide type CSS coverage
// ---------------------------------------------------------------------------
function checkSlideTypeCoverage() {
  const slideTypesPath = resolve(BASE, 'slide-types.css');
  if (!existsSync(slideTypesPath)) {
    fail('slide-types.css not found — cannot check slide type coverage');
    return;
  }

  const css = readFileSync(slideTypesPath, 'utf-8');

  for (const st of SRS_SLIDE_TYPES) {
    const pattern = new RegExp(`\\.slide\\.${st.name}\\b`);
    if (pattern.test(css)) {
      pass(`Slide type CSS: .slide.${st.name} (${st.label})`);
    } else {
      fail(`Missing slide type CSS: .slide.${st.name} (${st.label}) [${st.priority}]`);
    }
  }

  // Check layout classes
  for (const lc of SRS_LAYOUT_CLASSES) {
    const pattern = new RegExp(`\\.${lc}\\b`);
    if (pattern.test(css)) {
      pass(`Layout class CSS: .${lc}`);
    } else {
      fail(`Missing layout class CSS: .${lc}`);
    }
  }

  // Check component classes
  const components = ['card', 'badge', 'callout', 'kpi-value', 'kpi-label', 'kpi-delta',
    'risk-matrix', 'risk-cell', 'citation', 'code-block', 'logo-bar', 'footer-logo',
    'pipeline-flow', 'pipeline-node', 'arch-layers', 'arch-layer', 'formula',
    'param-table', 'compare-grid', 'compare-panel', 'eyebrow', 'section-number'];
  for (const comp of components) {
    const pattern = new RegExp(`\\.${comp}\\b`);
    if (pattern.test(css)) {
      pass(`Component CSS: .${comp}`);
    } else {
      warn(`Component class not found in CSS: .${comp} (may be intentional)`);
    }
  }

  // Check print overrides
  if (/@media\s+print/.test(css)) {
    const printSection = css.match(/@media\s+print\s*\{([^}]*\}[^}]*)*/g) || [];
    pass(`Print CSS: ${printSection.length} @media print block(s)`);
  } else {
    fail('No @media print block in slide-types.css');
  }
}

// ---------------------------------------------------------------------------
// Animation CSS coverage
// ---------------------------------------------------------------------------
function checkAnimationCoverage() {
  const animPath = resolve(BASE, 'animations.css');
  if (!existsSync(animPath)) {
    fail('animations.css not found');
    return;
  }

  const css = readFileSync(animPath, 'utf-8');

  for (const ac of SRS_ANIMATION_CLASSES) {
    const pattern = new RegExp(`\\.${ac}\\b`);
    if (pattern.test(css)) {
      pass(`Animation class: .${ac}`);
    } else {
      fail(`Missing animation class: .${ac}`);
    }
  }

  // Check reduced-motion scoping
  if (/prefers-reduced-motion/.test(css)) {
    const rmMatches = css.match(/prefers-reduced-motion[^}]*\{/g) || [];
    pass(`Reduced motion: ${rmMatches.length} scoping block(s)`);
  } else {
    fail('No prefers-reduced-motion scoping in animations.css');
  }

  // Check no @keyframes (should use transitions only)
  if (/@keyframes\b/.test(css)) {
    warn('animations.css contains @keyframes — should use transitions only per SRS');
  } else {
    pass('No @keyframes — transition-only animations (correct)');
  }
}

// ---------------------------------------------------------------------------
// Grid system coverage
// ---------------------------------------------------------------------------
function checkGridCoverage() {
  const gridPath = resolve(BASE, 'grid-system.css');
  if (!existsSync(gridPath)) {
    fail('grid-system.css not found');
    return;
  }

  const css = readFileSync(gridPath, 'utf-8');

  for (const span of SRS_GRID_SPANS) {
    const pattern = new RegExp(`\\.${span}\\b`);
    if (pattern.test(css)) {
      pass(`Grid span: .${span}`);
    } else {
      fail(`Missing grid span: .${span}`);
    }
  }

  // Grid templates
  const templates = ['grid-layout-header-body', 'grid-layout-2col', 'grid-layout-wide-left',
    'grid-layout-wide-right', 'grid-layout-3col', 'grid-layout-4box'];
  for (const t of templates) {
    if (css.includes(t)) {
      pass(`Grid template: .${t}`);
    } else {
      fail(`Missing grid template: .${t}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Theme coverage
// ---------------------------------------------------------------------------
function checkThemeCoverage() {
  const themes = [
    { file: 'uog-research-blue.css', name: 'Research Blue' },
    { file: 'uog-energy-noir.css', name: 'Energy Noir' },
    { file: 'uog-swiss-data.css', name: 'Swiss Data' },
  ];

  for (const theme of themes) {
    const themePath = resolve(BASE, 'themes', theme.file);
    if (!existsSync(themePath)) {
      fail(`Theme file not found: themes/${theme.file}`);
      continue;
    }

    const css = readFileSync(themePath, 'utf-8');

    // Check imports
    if (css.includes('slide-types.css')) {
      pass(`${theme.name}: imports slide-types.css`);
    } else {
      fail(`${theme.name}: missing @import for slide-types.css`);
    }

    if (css.includes('animations.css')) {
      pass(`${theme.name}: imports animations.css`);
    } else {
      warn(`${theme.name}: missing @import for animations.css`);
    }

    // Check component tokens
    if (/--card-bg/.test(css)) pass(`${theme.name}: has --card-bg token`);
    else warn(`${theme.name}: missing --card-bg token`);

    if (/--callout-bg/.test(css)) pass(`${theme.name}: has --callout-bg token`);
    else warn(`${theme.name}: missing --callout-bg token`);

    if (/--code-bg/.test(css)) pass(`${theme.name}: has --code-bg token`);
    else warn(`${theme.name}: missing --code-bg token`);

    // Check slide type overrides for all 15 types
    let overrideCount = 0;
    for (const st of SRS_SLIDE_TYPES) {
      const pattern = new RegExp(`\\.slide\\.${st.name}\\b`);
      if (pattern.test(css) || (st.name === 'title-slide' && css.includes('.slide.title-slide'))) {
        overrideCount++;
      }
    }
    if (overrideCount >= 14) {
      pass(`${theme.name}: ${overrideCount}/15 slide type overrides`);
    } else if (overrideCount >= 10) {
      warn(`${theme.name}: only ${overrideCount}/15 slide type overrides`);
    } else {
      fail(`${theme.name}: only ${overrideCount}/15 slide type overrides — too few`);
    }

    // Check print overrides
    if (/@media\s+print/.test(css)) {
      pass(`${theme.name}: has print overrides`);
    } else {
      fail(`${theme.name}: missing @media print overrides`);
    }
  }
}

// ---------------------------------------------------------------------------
// Viewport base integrity
// ---------------------------------------------------------------------------
function checkViewportBase() {
  const vpPath = resolve(BASE, 'viewport-base.css');
  if (!existsSync(vpPath)) {
    fail('viewport-base.css not found');
    return;
  }

  const css = readFileSync(vpPath, 'utf-8');

  if (css.includes('.deck-viewport')) pass('viewport-base: .deck-viewport present');
  else fail('viewport-base: missing .deck-viewport');

  if (css.includes('.deck-stage')) pass('viewport-base: .deck-stage present');
  else fail('viewport-base: missing .deck-stage');

  if (css.includes('transform')) pass('viewport-base: stage scaling (transform) present');
  else fail('viewport-base: missing transform scaling');

  if (/@media\s+print/.test(css)) pass('viewport-base: @media print block present');
  else fail('viewport-base: missing @media print block');

  if (/prefers-reduced-motion/.test(css)) pass('viewport-base: reduced-motion support present');
  else fail('viewport-base: missing reduced-motion support');

  if (css.includes('@page')) pass('viewport-base: @page rule for PDF export present');
  else warn('viewport-base: missing @page rule for PDF export');
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
function printReport() {
  console.log('\n=== SRS Implementation Validation Report ===\n');
  console.log(`Project: ${BASE}\n`);

  console.log(`✅ PASS: ${results.pass.length}`);
  console.log(`❌ FAIL: ${results.fail.length}`);
  console.log(`⚠️  WARN: ${results.warn.length}\n`);

  if (results.fail.length > 0) {
    console.log('--- FAILURES ---');
    for (const f of results.fail) console.log(`  ❌ ${f}`);
    console.log();
  }

  if (results.warn.length > 0) {
    console.log('--- WARNINGS ---');
    for (const w of results.warn) console.log(`  ⚠️  ${w}`);
    console.log();
  }

  const summary = results.fail.length === 0
    ? '✅ All SRS checks passed! Ready for deployment.'
    : `❌ ${results.fail.length} failures must be fixed before deployment.`;
  console.log(summary);
}

function printJSON() {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    project: BASE,
    pass: results.pass.length,
    fail: results.fail.length,
    warn: results.warn.length,
    failures: results.fail,
    warnings: results.warn,
  }, null, 2));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const args = process.argv.slice(2);
  const jsonOut = args.includes('--json');

  checkFilesExist();
  checkSlideTypeCoverage();
  checkAnimationCoverage();
  checkGridCoverage();
  checkThemeCoverage();
  checkViewportBase();

  if (jsonOut) {
    printJSON();
  } else {
    printReport();
  }

  process.exit(results.fail.length > 0 ? 1 : 0);
}

main();
