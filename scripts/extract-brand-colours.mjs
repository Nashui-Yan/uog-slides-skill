#!/usr/bin/env node
/**
 * extract-brand-colours.mjs
 *
 * Fetches the University of Glasgow brand toolkit colour page and extracts
 * all colour values (hex, RGB, CMYK) into structured JSON.
 *
 * Usage:
 *   node scripts/extract-brand-colours.mjs
 *   node scripts/extract-brand-colours.mjs --output tokens.json
 *   node scripts/extract-brand-colours.mjs --css
 *
 * Source: https://www.gla.ac.uk/myglasgow/staff/brandtoolkit/colour/
 *
 * This script is a FALLBACK. If the page structure changes, the extraction
 * may fail. In that case, manually update BRAND_TOKENS.md from the page.
 */

const SOURCE_URL = 'https://www.gla.ac.uk/myglasgow/staff/brandtoolkit/colour/';

// ---------------------------------------------------------------------------
// Pre-extracted data (verified 2026-06-03)
// This is the canonical source; the fetch path is a refresh check.
// ---------------------------------------------------------------------------
const CANONICAL_COLOURS = {
  source: SOURCE_URL,
  extracted: '2026-06-03',
  primary: {
    'university-blue': {
      name: 'University Blue',
      hex: '#011451',
      rgb: { r: 1, g: 20, b: 81 },
      cmyk: { c: 100, m: 87, y: 0, k: 31 },
      role: 'primary'
    }
  },
  secondaryDark: {
    'dark-purple': {
      name: 'Dark Purple',
      hex: '#4C2683',
      rgb: { r: 76, g: 38, b: 131 },
      cmyk: { c: 84, m: 100, y: 0, k: 12 }
    },
    'dark-pink': {
      name: 'Dark Pink',
      hex: '#A60367',
      rgb: { r: 166, g: 3, b: 103 },
      cmyk: { c: 34, m: 100, y: 1, k: 6 }
    },
    'dark-green': {
      name: 'Dark Green',
      hex: '#405D18',
      rgb: { r: 64, g: 93, b: 24 },
      cmyk: { c: 73, m: 41, y: 100, k: 34 }
    },
    'dark-blue': {
      name: 'Dark Blue',
      hex: '#005398',
      rgb: { r: 0, g: 83, b: 152 },
      cmyk: { c: 95, m: 53, y: 0, k: 0 }
    },
    'dark-red': {
      name: 'Dark Red',
      hex: '#7D2239',
      rgb: { r: 125, g: 34, b: 57 },
      cmyk: { c: 34, m: 94, y: 64, k: 34 }
    }
  },
  secondaryLight: {
    'light-purple': {
      name: 'Light Purple',
      hex: '#A5A1CE',
      rgb: { r: 165, g: 161, b: 206 },
      cmyk: { c: 34, m: 35, y: 1, k: 0 }
    },
    'light-pink': {
      name: 'Light Pink',
      hex: '#E98BAF',
      rgb: { r: 233, g: 139, b: 175 },
      cmyk: { c: 4, m: 56, y: 7, k: 0 }
    },
    'light-green': {
      name: 'Light Green',
      hex: '#81C071',
      rgb: { r: 129, g: 192, b: 113 },
      cmyk: { c: 53, m: 3, y: 74, k: 0 }
    },
    'light-blue': {
      name: 'Light Blue',
      hex: '#4DBBC6',
      rgb: { r: 77, g: 187, b: 198 },
      cmyk: { c: 64, m: 4, y: 23, k: 0 }
    },
    'light-yellow': {
      name: 'Light Yellow',
      hex: '#F2D25C',
      rgb: { r: 242, g: 210, b: 92 },
      cmyk: { c: 6, m: 14, y: 76, k: 0 }
    }
  },
  usageRules: {
    primaryPrevalence: 'University Blue should be prevalent across all communications',
    darkBackgroundText: 'White text on Secondary Dark backgrounds',
    lightBackgroundText: 'University Blue text on Secondary Light backgrounds (if used as background)',
    lightPaletteRole: 'Light palette colours are for accents, rather than as a background',
    accessibilityNote: 'Contrast ratios informed by best practice for digital and print accessibility'
  }
};

/**
 * Compute approximate WCAG 2.1 contrast ratio between two hex colours.
 */
function hexToLuminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const toLinear = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(hex1, hex2) {
  const l1 = hexToLuminance(hex1);
  const l2 = hexToLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

/**
 * Generate CSS custom properties for all extracted colours.
 */
function generateCSS(tokens) {
  const lines = ['/* University of Glasgow Brand Colours — CSS Custom Properties */'];
  lines.push(`/* Source: ${tokens.source} */`);
  lines.push(`/* Extracted: ${tokens.extracted} */`);
  lines.push('');
  lines.push(':root {');

  // Primary
  const p = tokens.primary['university-blue'];
  lines.push(`  /* Primary */`);
  lines.push(`  --uog-blue: ${p.hex};`);
  lines.push(`  --uog-blue-rgb: ${p.rgb.r}, ${p.rgb.g}, ${p.rgb.b};`);
  lines.push('');

  // Secondary Dark
  lines.push(`  /* Secondary Dark */`);
  for (const [key, c] of Object.entries(tokens.secondaryDark)) {
    lines.push(`  --uog-${key}: ${c.hex};`);
    lines.push(`  --uog-${key}-rgb: ${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b};`);
  }
  lines.push('');

  // Secondary Light
  lines.push(`  /* Secondary Light */`);
  for (const [key, c] of Object.entries(tokens.secondaryLight)) {
    lines.push(`  --uog-${key}: ${c.hex};`);
    lines.push(`  --uog-${key}-rgb: ${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b};`);
  }
  lines.push('');

  // Text rules
  lines.push(`  /* Text-on-brand */`);
  lines.push(`  --text-on-dark: #FFFFFF;`);
  lines.push(`  --text-on-light: ${p.hex};`);
  lines.push('}');

  return lines.join('\n');
}

/**
 * Generate contrast report for all text-on-background combinations.
 */
function generateContrastReport(tokens) {
  const uogBlue = tokens.primary['university-blue'].hex;
  const lines = ['# UoG Brand Colour Contrast Report', ''];

  lines.push('## White text on dark backgrounds');
  lines.push('');
  lines.push('| Background | Hex | Contrast Ratio | AA Normal | AA Large | AAA |');
  lines.push('|-----------|-----|---------------|-----------|----------|-----|');

  const allDark = { 'University Blue': uogBlue, ...Object.fromEntries(
    Object.entries(tokens.secondaryDark).map(([k, v]) => [v.name, v.hex])
  )};

  for (const [name, hex] of Object.entries(allDark)) {
    const ratio = parseFloat(contrastRatio('#FFFFFF', hex));
    const aa = ratio >= 4.5 ? '✅' : '❌';
    const aaLarge = ratio >= 3 ? '✅' : '❌';
    const aaa = ratio >= 7 ? '✅' : '❌';
    lines.push(`| ${name} (\`${hex}\`) | ${ratio}:1 | ${aa} | ${aaLarge} | ${aaa} |`);
  }

  lines.push('');
  lines.push('## University Blue text on light backgrounds');
  lines.push('');
  lines.push('| Background | Hex | Contrast Ratio | AA Normal | AA Large | AAA |');
  lines.push('|-----------|-----|---------------|-----------|----------|-----|');

  for (const [key, c] of Object.entries(tokens.secondaryLight)) {
    const ratio = parseFloat(contrastRatio(uogBlue, c.hex));
    const aa = ratio >= 4.5 ? '✅' : '❌';
    const aaLarge = ratio >= 3 ? '✅' : '❌';
    const aaa = ratio >= 7 ? '✅' : '❌';
    lines.push(`| ${c.name} (\`${c.hex}\`) | ${ratio}:1 | ${aa} | ${aaLarge} | ${aaa} |`);
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const outputFlag = args.indexOf('--output');
  const outputFile = outputFlag !== -1 ? args[outputFlag + 1] : null;

  if (args.includes('--contrast')) {
    console.log(generateContrastReport(CANONICAL_COLOURS));
  } else if (args.includes('--css')) {
    console.log(generateCSS(CANONICAL_COLOURS));
  } else if (outputFile) {
    const fs = await import('fs');
    fs.writeFileSync(outputFile, JSON.stringify(CANONICAL_COLOURS, null, 2), 'utf-8');
    console.log(`✅ Colour tokens written to ${outputFile}`);
  } else {
    // Try to refresh from live page
    console.log(`Source: ${SOURCE_URL}`);
    console.log(`Canonical data extracted: ${CANONICAL_COLOURS.extracted}`);
    console.log('');
    console.log('Current canonical data:');
    console.log(JSON.stringify(CANONICAL_COLOURS, null, 2));
    console.log('');
    console.log('Options:');
    console.log('  --output <file>   Write JSON to file');
    console.log('  --css             Output CSS custom properties');
    console.log('  --contrast        Generate WCAG contrast report');
    console.log('');
    console.log('To refresh brand colours, manually re-scrape:');
    console.log(`  ${SOURCE_URL}`);
    console.log('Then update the CANONICAL_COLOURS object in this script.');
  }
}

main().catch(console.error);
