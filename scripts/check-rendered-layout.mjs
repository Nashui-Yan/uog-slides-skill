#!/usr/bin/env node
/**
 * check-rendered-layout.mjs — Rendered Geometry Checker
 *
 * Uses Playwright to render an HTML deck at 1920×1080 and measure bounding
 * boxes of body content elements. Reports centre offset, overflow, and
 * evidence-only slides.
 *
 * Usage:
 *   node scripts/check-rendered-layout.mjs <deck.html>
 *   node scripts/check-rendered-layout.mjs <deck.html> --json
 *
 * Requires: npm install playwright && npx playwright install chromium
 */

let chromium;
try {
  const pw = await import('playwright');
  chromium = pw.chromium;
} catch (e) {
  console.error('Playwright not installed. Install with: npm install playwright && npx playwright install chromium');
  console.error('Then run: npx playwright install-deps chromium  (may require root)');
  process.exit(2);
}

import { resolve } from 'path';
import { existsSync } from 'fs';

async function main() {
  const args = process.argv.slice(2);
  const htmlPath = args.find(a => !a.startsWith('--'));
  const jsonOut = args.includes('--json');

  if (!htmlPath) {
    console.log('Usage: node scripts/check-rendered-layout.mjs <path/to/deck.html> [--json]');
    process.exit(1);
  }

  const filePath = resolve(htmlPath);
  if (!existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(3);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const fileUrl = `file://${filePath}`;
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Ensure first slide is active
  await page.waitForSelector('.slide.active', { timeout: 5000 });

  const results = [];

  const slideCount = await page.$$eval('.slide', els => els.length);

  for (let i = 0; i < slideCount; i++) {
    // Navigate to slide
    await page.evaluate(idx => {
      const slides = document.querySelectorAll('.slide');
      slides.forEach(s => s.classList.remove('active'));
      if (slides[idx]) slides[idx].classList.add('active');
      // Trigger resize for stage scaling
      window.dispatchEvent(new Event('resize'));
    }, i);

    await page.waitForTimeout(200);

    const data = await page.evaluate((idx) => {
      const slide = document.querySelectorAll('.slide')[idx];
      if (!slide) return null;

      const isCover = slide.classList.contains('title-slide');
      const isClosing = slide.classList.contains('closing-takeaway');
      const isDivider = slide.classList.contains('section-divider');
      const isNormal = !isCover && !isClosing && !isDivider;

      // Get header lower edge
      const titleEl = slide.querySelector('.uog-slide-title, h1, h2');
      const subtitleEl = slide.querySelector('.uog-slide-subtitle');
      const logoBlock = slide.querySelector('.uog-logo-blue-block');

      let headerLowerEdge = 200;
      if (titleEl) {
        const r = titleEl.getBoundingClientRect();
        headerLowerEdge = Math.max(headerLowerEdge, r.bottom);
      }
      if (subtitleEl) {
        const r = subtitleEl.getBoundingClientRect();
        headerLowerEdge = Math.max(headerLowerEdge, r.bottom);
      }
      if (logoBlock) {
        const r = logoBlock.getBoundingClientRect();
        headerLowerEdge = Math.max(headerLowerEdge, r.bottom);
      }

      // Get body elements (exclude header/nav)
      const bodySelectors = [
        'img:not(.uog-header-logo):not(.uog-header-logo--on-blue-block)',
        'figcaption', '.uog-figure-caption', '.uog-figure-description',
        '.uog-key-observation', '.uog-bottom-takeaway', '.uog-comparison-insight',
        '.uog-kpi-card', '.uog-kpi-interpretation', '.uog-kpi-value', '.uog-kpi-label',
        '.uog-side-explanation', '.uog-compact-bottom-bullets', '.uog-mini-table',
        'ul:not(.uog-agenda-list)', 'ol:not(.uog-agenda-list)', 'p', 'table',
        '.uog-figure-block', '.layout-figure-top-interpretation',
        '.layout-large-figure-with-description', '.layout-two-figure-comparison-interpretation'
      ];

      let groupTop = Infinity, groupBottom = -Infinity;
      let elementCount = 0;
      const excludedParents = ['.uog-slide-header', '.deck-controls', '.slide-count', '.shortcut-hint'];

      for (const sel of bodySelectors) {
        const els = slide.querySelectorAll(sel);
        for (const el of els) {
          // Skip if inside excluded parent
          let skip = false;
          for (const ex of excludedParents) {
            if (el.closest(ex)) { skip = true; break; }
          }
          if (skip) continue;

          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          groupTop = Math.min(groupTop, r.top);
          groupBottom = Math.max(groupBottom, r.bottom);
          elementCount++;
        }
      }

      const title = titleEl ? titleEl.textContent.trim().substring(0, 60) : '';

      return {
        index: idx,
        title,
        isNormal,
        isCover,
        isClosing,
        headerLowerEdge,
        bodyTop: Math.max(headerLowerEdge + 56, 280),
        bodyBottom: 900,
        groupTop: groupTop === Infinity ? null : groupTop,
        groupBottom: groupBottom === -Infinity ? null : groupBottom,
        elementCount,
        figureImgs: slide.querySelectorAll('img:not(.uog-header-logo):not(.uog-header-logo--on-blue-block)').length,
        hasKpi: slide.querySelector('.uog-kpi-card, .kpi-row, .layout-kpi-interpretation') !== null,
      };
    }, i);

    if (!data) continue;

    const issues = [];
    const bodyCenterY = (data.bodyTop + data.bodyBottom) / 2;

    if (data.isNormal && data.groupTop !== null) {
      const groupCenterY = (data.groupTop + data.groupBottom) / 2;
      data.groupCenterY = groupCenterY;
      data.alignmentMode = 'top';

      // Safe zone: no content below bodyBottom
      if (data.groupBottom > 930) {
        issues.push({ priority: 'P1', msg: `Content group bottom ${Math.round(data.groupBottom)} exceeds safe zone (930).` });
      } else if (data.groupBottom > 900) {
        issues.push({ priority: 'P2', msg: `Content group bottom ${Math.round(data.groupBottom)} is below bodyBottom (900).` });
      }

      // Top alignment: first body element should start near bodyTop
      if (data.groupTop > 430) {
        issues.push({ priority: 'P1', msg: `First body element at y=${Math.round(data.groupTop)} — should start near y=300–360.` });
      } else if (data.groupTop > 390) {
        issues.push({ priority: 'P2', msg: `First body element at y=${Math.round(data.groupTop)} — prefer y=300–360.` });
      }

      if (data.elementCount === 0 && data.isNormal) {
        issues.push({ priority: 'P2', msg: 'No measurable body content elements found.' });
      }
    }

    results.push({ ...data, issues });
  }

  await browser.close();

  // Report
  let p1Count = 0, p2Count = 0;
  for (const r of results) {
    const p1s = r.issues.filter(i => i.priority === 'P1');
    const p2s = r.issues.filter(i => i.priority === 'P2');
    p1Count += p1s.length;
    p2Count += p2s.length;
  }

  if (!jsonOut) {
    console.log(`\n=== Rendered Geometry Check ===`);
    console.log(`File: ${filePath}\n`);
    for (const r of results) {
      if (!r.isNormal) continue;
      const p1s = r.issues.filter(i => i.priority === 'P1');
      const p2s = r.issues.filter(i => i.priority === 'P2');
      const status = p1s.length > 0 ? 'P1' : p2s.length > 0 ? 'P2' : 'OK';
      console.log(`  [${status}] Slide ${r.index + 1}: "${r.title}"`);
      if (r.offset !== undefined) console.log(`    offset=${r.offset}px  groupBottom=${Math.round(r.groupBottom)}  elements=${r.elementCount}`);
      for (const issue of r.issues) {
        console.log(`    ${issue.priority === 'P1' ? '❌' : '⚠️'} ${issue.msg}`);
      }
    }
    console.log(`\nSummary: ${results.filter(r => r.isNormal).length} normal slides, ${p1Count} P1, ${p2Count} P2`);
  } else {
    console.log(JSON.stringify(results, null, 2));
  }

  process.exit(p1Count > 0 ? 1 : 0);
}

main().catch(err => { console.error(err); process.exit(1); });
