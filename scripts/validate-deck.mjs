#!/usr/bin/env node
/**
 * validate-deck.mjs — UoG Slide Deck Validator
 *
 * Validates a generated HTML slide deck against structural, brand, and
 * accessibility requirements.
 *
 * Usage:
 *   node scripts/validate-deck.mjs path/to/deck.html
 *   node scripts/validate-deck.mjs path/to/deck.html --verbose
 *   node scripts/validate-deck.mjs path/to/deck.html --check-logos
 *   node scripts/validate-deck.mjs path/to/deck.html --json
 *
 * Exit codes:
 *   0 — All checks passed
 *   1 — P0 blocking issues found
 *   2 — P1 issues found (warning only)
 *   3 — File not found or parse error
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const UOG_COLOURS = new Set([
  '#011451', // University Blue
  '#4C2683', // Dark Purple
  '#A60367', // Dark Pink
  '#405D18', // Dark Green
  '#005398', // Dark Blue
  '#7D2239', // Dark Red
  '#A5A1CE', // Light Purple
  '#E98BAF', // Light Pink
  '#81C071', // Light Green
  '#4DBBC6', // Light Blue
  '#F2D25C', // Light Yellow
  '#FFFFFF', // White
  '#FAFAF8', // Warm white (theme bg)
  '#F0EEE8', // Alt warm white (theme bg)
  '#F5F4F2', // Subtle warm grey (theme bg)
  '#0A0B0F', // Near-black (theme bg)
  '#11131A', // Alt dark (theme bg)
  '#E8E9EC', // Soft white (theme text)
  '#B0B3BB', // Mid grey (theme text)
  '#6B6E78', // Muted grey (theme text)
  '#1A1C20', // Near-black (theme text)
  '#4A4D54', // Text secondary
  '#8B8E96', // Text muted
  '#3A3D42', // Slate text
  '#6B6E74', // Muted text
]);

const AI_DEFAULT_COLOURS = [
  '#3b82f6', '#3B82F6', // Tailwind blue
  '#6366f1', '#6366F1', // Indigo
  '#8b5cf6', '#8B5CF6', // Purple
  '#a855f7', '#A855F7', // Purple-500
  '#7c3aed', '#7C3AED', // Violet
];

// ---------------------------------------------------------------------------
// Issue collector
// ---------------------------------------------------------------------------

const issues = { P0: [], P1: [], P2: [], P3: [], INFO: [] };

function issue(priority, message, detail = '') {
  issues[priority].push({ message, detail });
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

function checkFileExists(filePath) {
  if (!existsSync(filePath)) {
    issue('P0', `File not found: ${filePath}`);
    return null;
  }
  return readFileSync(filePath, 'utf-8');
}

function checkStructure(html) {
  // .deck-viewport
  if (!/class=["'][^"']*deck-viewport/.test(html) && !html.includes('deck-viewport')) {
    issue('P0', 'Missing .deck-viewport wrapper', 'Required for fixed-stage viewport model. See viewport-base.css.');
  }

  // .deck-stage
  if (!/class=["'][^"']*deck-stage/.test(html) && !html.includes('deck-stage')) {
    issue('P0', 'Missing .deck-stage container', 'Required for 1920×1080 design canvas. See viewport-base.css.');
  }

  // .slide elements
  const slideMatches = html.match(/class=["'][^"']*slide["'\s]/g) || [];
  const slideCount = slideMatches.length;
  if (slideCount === 0) {
    issue('P0', 'No .slide elements found', 'Each slide must be a <section class="slide"> element.');
  } else {
    issue('INFO', `Found ${slideCount} slide elements`);
  }

  // Navigation script
  if (!/<script[\s>]/.test(html)) {
    issue('P0', 'No <script> tag found', 'Navigation script is required for slide keyboard/touch/wheel control.');
  } else {
    // Check for key navigation
    if (!/keydown|keyup|ArrowLeft|ArrowRight/.test(html)) {
      issue('P1', 'Navigation script may lack keyboard controls', 'Check for ArrowLeft/ArrowRight or keydown handler.');
    }
  }

  // Print CSS
  if (!/@media\s+print/.test(html)) {
    issue('P0', 'Missing @media print block', 'Print CSS is required for per-slide page breaks. See viewport-base.css.');
  }

  // Reduced motion
  if (!/prefers-reduced-motion/.test(html)) {
    issue('P0', 'Missing prefers-reduced-motion media query', 'Required for accessibility. See viewport-base.css.');
  }

  // slide-content
  if (html.includes('slide-content')) {
    issue('INFO', 'Uses .slide-content container (recommended pattern)');
  }
}

function checkColours(html) {
  // Extract all hex colours
  const hexRegex = /#[0-9a-fA-F]{6}\b/g;
  const foundHex = [...new Set(html.match(hexRegex) || [])];

  // Normalize to uppercase for comparison
  const uogUpper = new Set([...UOG_COLOURS].map(c => c.toUpperCase()));

  const unknownColours = [];
  for (const hex of foundHex) {
    if (!uogUpper.has(hex.toUpperCase())) {
      unknownColours.push(hex);
    }
  }

  if (unknownColours.length > 0) {
    issue('P1', `Non-UoG colours found: ${unknownColours.join(', ')}`,
      'Verify against BRAND_TOKENS.md. If intentional, update the UOG_COLOURS set in this script.');
  } else if (foundHex.length > 0) {
    issue('INFO', `All ${foundHex.length} hex colours are in the UoG palette`);
  }

  // Check for AI-default colours
  const aiDefaultsFound = [];
  for (const bad of AI_DEFAULT_COLOURS) {
    const re = new RegExp(bad, 'i');
    if (re.test(html)) {
      aiDefaultsFound.push(bad);
    }
  }
  if (aiDefaultsFound.length > 0) {
    issue('P1', `AI-default colours found: ${aiDefaultsFound.join(', ')}`,
      'Replace with UoG brand colours from BRAND_TOKENS.md.');
  }

  // Check University Blue appears
  if (!html.includes('#011451') && !html.includes('#011451'.toLowerCase())) {
    issue('P2', 'University Blue (#011451) not found in deck',
      'University Blue should appear on every slide (text, accent, stripe, or logo).');
  }
}

function checkAccessibility(html) {
  // Alt text on images
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  const imgsWithoutAlt = imgTags.filter(tag => !/\salt=/.test(tag));
  if (imgsWithoutAlt.length > 0) {
    issue('P2', `${imgsWithoutAlt.length} <img> tag(s) without alt attribute`,
      'Every image must have an alt attribute (empty alt="" is acceptable for decorative images).');
  }

  // Heading order (basic check)
  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  const h2s = (html.match(/<h2[\s>]/gi) || []).length;
  if (h1s === 0) {
    issue('P2', 'No <h1> found — title slide should use an <h1>');
  }
  if (h1s > 1) {
    issue('P2', `Multiple <h1> tags (${h1s}) — only the title slide should use <h1>`);
  }
}

function checkSlideHiding(html) {
  // No display:none for slide hiding
  if (/\.slide\s*\{[^}]*display\s*:\s*none/.test(html) ||
      /display\s*:\s*none[^}]*\.slide/.test(html)) {
    issue('P1', 'display: none used on .slide elements',
      'Use visibility + opacity for slide switching, not display: none. It breaks layout display values.');
  }

  // Should use visibility/opacity
  if (/visibility\s*:\s*hidden/.test(html) && /opacity\s*:\s*0/.test(html)) {
    issue('INFO', 'Uses visibility + opacity for slide hiding (correct pattern)');
  }
}

function checkLogoManifest(html, checkLogos) {
  if (!checkLogos) return;

  const manifestPath = resolve(__dirname, '..', 'assets', 'logos', 'logo-manifest.json');
  if (!existsSync(manifestPath)) {
    issue('P1', 'logo-manifest.json not found',
      'Create assets/logos/logo-manifest.json from logo-manifest.example.json. Run --check-logos to validate.');
    return;
  }

  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  } catch (e) {
    issue('P0', `Failed to parse logo-manifest.json: ${e.message}`);
    return;
  }

  // Check selected defaults exist
  const defaults = manifest.selected_defaults;
  if (!defaults) {
    issue('P1', 'logo-manifest.json has no selected_defaults section',
      'Add selected_defaults with title_light, title_dark, footer_light, footer_dark, partner_row entries.');
    return;
  }

  const requiredRoles = ['title_light', 'title_dark', 'footer_light', 'footer_dark', 'partner_row'];
  for (const role of requiredRoles) {
    const entry = defaults[role];
    if (!entry) {
      issue('P1', `Missing selected_defaults.${role} in logo-manifest.json`);
      continue;
    }
    if (!entry.path || entry.path.trim() === '') {
      issue('P1', `selected_defaults.${role}.path is empty`);
      continue;
    }

    // Check the actual file exists on disk
    const logoFullPath = resolve(__dirname, '..', entry.path);
    if (!existsSync(logoFullPath)) {
      issue('P0', `Logo file not found for ${role}: ${entry.path}`);
    } else {
      issue('INFO', `Logo ${role}: ${entry.path} (${entry.format || 'unknown'})`);
    }

    // Check format
    if (entry.format && entry.format !== 'svg') {
      issue('P2', `${role}: logo format is "${entry.format}" — SVG preferred for web`,
        'Consider using the SVG variant instead of PNG/EPS for better scaling.');
    }

    // Warn if raster and too small for title use
    if (entry.format === 'png' && (role === 'title_light' || role === 'title_dark' || role === 'partner_row')) {
      // Try to get dimensions from all_assets
      const asset = (manifest.all_assets || []).find(a => entry.path.includes(a.path) || a.path.includes(entry.path.split('/').pop()));
      if (asset && asset.width && asset.width < 1000) {
        issue('P2', `${role}: raster logo is only ${asset.width}px wide — may be too small for title slide`,
          'Title slide logos should be at least 1000px wide for the 1920px stage, or use SVG.');
      }
    }
  }

  // Check that dark backgrounds use white/reversed logos
  const htmlSlides = html.match(/data-background=["'](?:dark|hero-dark)["']/g) || [];
  const hasDarkSlides = htmlSlides.length > 0;

  if (hasDarkSlides) {
    const titleDark = defaults.title_dark;
    if (titleDark && titleDark.path) {
      const isWhiteVariant = /white|reversed|mono.*white/i.test(titleDark.path);
      if (!isWhiteVariant) {
        issue('P2', `title_dark logo may not be suited for dark backgrounds: ${titleDark.path}`,
          'Dark backgrounds should use white/reversed logo variants. Check logo-manifest.json.');
      }
    }
    const footerDark = defaults.footer_dark;
    if (footerDark && footerDark.path) {
      const isWhiteVariant = /white|reversed/i.test(footerDark.path);
      if (!isWhiteVariant) {
        issue('P2', `footer_dark logo may not be suited for dark backgrounds: ${footerDark.path}`,
          'Dark backgrounds should use white/reversed logo variants.');
      }
    }
  }

  // Check light backgrounds don't use white logos
  const hasLightSlides = /data-background=["'](?:light|hero-light)["']/g.test(html);
  if (hasLightSlides) {
    const titleLight = defaults.title_light;
    if (titleLight && titleLight.path && /white|reversed/i.test(titleLight.path) && !/blue/.test(titleLight.path)) {
      issue('P2', `title_light logo appears to be a white/reversed variant: ${titleLight.path}`,
        'Light backgrounds should use blue/dark logo variants. White logos may have low contrast on light slides.');
    }
  }

  // Check for spaces in logo paths (HTML needs URL encoding)
  for (const role of requiredRoles) {
    const entry = defaults[role];
    if (entry && entry.path && /\s/.test(entry.path)) {
      // Check if the HTML uses this path correctly encoded
      const encoded = entry.path.replace(/\s/g, '%20');
      const rawSpaces = entry.path;
      if (html.includes(rawSpaces) && !html.includes(encoded)) {
        issue('P2', `${role}: logo path "${entry.path}" contains spaces but HTML may not URL-encode it`,
          'Use %20 for spaces in HTML src attributes, or rename directories to use hyphens.');
      }
    }
  }

  // Inventory summary
  const allAssets = manifest.all_assets || [];
  const svgCount = allAssets.filter(a => a.format === 'svg').length;
  const pngCount = allAssets.filter(a => a.format === 'png').length;
  const epsCount = allAssets.filter(a => a.format === 'eps').length;
  issue('INFO', `Logo inventory: ${svgCount} SVG, ${pngCount} PNG, ${epsCount} EPS (${allAssets.length} total)`);
}

function checkSlideAttributes(html) {
  // data-slide-index
  const dataIndexes = html.match(/data-slide-index=["']\d+["']/g) || [];
  if (dataIndexes.length === 0) {
    issue('P2', 'No data-slide-index attributes found',
      'Each <section class="slide"> should have a data-slide-index attribute.');
  }

  // data-background
  const dataBgs = html.match(/data-background=["']\w+["']/g) || [];
  if (dataBgs.length === 0) {
    issue('P2', 'No data-background attributes found',
      'Each slide should have data-background="light" or "dark" for logo variant selection and rhythm tracking.');
  }
}

function checkInlineSvg(html) {
  // Detect inline SVG with UoG-specific markers (generic .st0-.st3 classes + crest paths)
  // The UoG SVG files use a <style> block with .st0-.st3 classes
  const hasUoGSvgStyle = /\.st0\s*\{[^}]*fill:\s*none/.test(html) ||
                         /\.st1\s*\{[^}]*fill:\s*#(?:fff|011451)/.test(html);

  // Detect inline <svg> tags that contain UoG-specific viewBox (235.28 x 126.98)
  const hasUoGViewBox = /<svg[^>]*viewBox=["']0\s+0\s+235\.28\s+126\.98/.test(html);

  // Detect inline SVG with "University of Glasgow" in a <text> or path-based wordmark
  const hasGlasgowSvg = /<svg[^>]*>[\s\S]*?(?:Glasgow|University\s+of\s+Glasgow)/.test(html);

  if (hasUoGSvgStyle || hasUoGViewBox) {
    issue('P1', 'Inline SVG detected with UoG logo CSS classes (.st0-.st3) or viewBox',
      'UoG SVGs use generic CSS classes that conflict with slide CSS. Always use <img src="..."> instead of inline <svg>. See LOGO_USAGE.md for correct usage.');
  } else if (hasGlasgowSvg) {
    issue('P2', 'Inline SVG may contain UoG logo content',
      'If this is a UoG logo, use <img src="..."> instead of inline <svg>. The SVG files use .st0-.st3 classes that conflict with slide CSS.');
  }

  // Check for logo paths with unencoded spaces anywhere in HTML
  const unencodedSpacePaths = html.match(/src=["'][^"']*\s[^"']*(?:Unboxed|Boxed|colour|mono|logo)[^"']*\.svg["']/gi) || [];
  if (unencodedSpacePaths.length > 0) {
    issue('P2', `${unencodedSpacePaths.length} logo src path(s) contain unencoded spaces`,
      'URL-encode spaces as %20 in HTML src attributes. Example: "Unboxed%20colour%20logo%20blue%20text.svg"');
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

function checkSrsSlideTypes(html) {
  const SRS_TYPES = [
    'title-slide', 'section-divider', 'research-question', 'problem-framing',
    'system-architecture', 'pipeline-dag', 'method-algorithm', 'dataset-summary',
    'experimental-setup', 'benchmark-kpi', 'comparison-ablation', 'timeline-roadmap',
    'limitation-risk', 'closing-takeaway', 'appendix-table'
  ];

  // Count how many SRS slide type classes are used in the HTML
  const usedTypes = SRS_TYPES.filter(t => {
    const re = new RegExp(`class=["'][^"']*${t}[^"']*["']`);
    return re.test(html);
  });

  if (usedTypes.length === 0) {
    issue('P2', 'No SRS slide type classes used — deck may use only generic containers',
      'Use semantic slide type classes like .research-question, .benchmark-kpi, etc. for proper styling.');
  } else if (usedTypes.length < 4) {
    issue('P2', `Only ${usedTypes.length} SRS slide type(s) used: ${usedTypes.join(', ')}`,
      'Consider using semantic slide type classes for better visual hierarchy.');
  } else {
    issue('INFO', `Using ${usedTypes.length} SRS slide type classes: ${usedTypes.join(', ')}`);
  }
}

function checkAnimations(html) {
  // Check that animation classes are used (not just defined)
  const animClasses = ['reveal', 'reveal-scale', 'reveal-left', 'reveal-right', 'reveal-blur'];
  const usedAnims = animClasses.filter(a => {
    const re = new RegExp(`class=["'][^"']*${a}[^"']*["']`);
    return re.test(html);
  });

  if (usedAnims.length > 0) {
    issue('INFO', `Using animation classes: ${usedAnims.join(', ')}`);

    // Check that animations go beyond simple reveal (semantic pairing)
    if (usedAnims.length === 1 && usedAnims[0] === 'reveal') {
      issue('P2', 'Only .reveal animations used — consider semantic pairing (reveal-scale for KPIs, reveal-left for timelines, reveal-none for data)');
    }
  }

  // Check no CSS animation property (SRS prefers transitions)
  if (/animation\s*:\s*(?!none)/.test(html) || /animation-name\s*:/.test(html)) {
    issue('P2', 'CSS animation property detected — SRS prefers transition-based animations',
      'Use transition-based .reveal classes instead of @keyframe animations for better reduced-motion support.');
  }
}

function checkGridSystem(html) {
  // Check if grid classes are used
  const gridClasses = ['grid', 'grid-12', 'grid-10', 'grid-8', 'grid-6', 'grid-layout-2col',
    'grid-layout-wide-left', 'grid-layout-wide-right', 'grid-layout-3col', 'grid-layout-4box'];
  const usedGrid = gridClasses.filter(g => html.includes(g));

  if (usedGrid.length > 0) {
    issue('INFO', `Using grid classes: ${usedGrid.join(', ')}`);
  }
}

function checkComponents(html) {
  const components = ['card', 'badge', 'callout', 'kpi-value', 'kpi-label', 'kpi-delta',
    'risk-matrix', 'risk-cell', 'citation', 'formula', 'param-table', 'logo-bar', 'footer-logo',
    'pipeline-flow', 'pipeline-node', 'arch-layers', 'arch-layer'];

  const used = components.filter(c => {
    const re = new RegExp(`class=["'][^"']*${c}[^"']*["']`);
    return re.test(html);
  });

  if (used.length > 0) {
    issue('INFO', `Using component classes: ${used.join(', ')}`);
  }
}

function checkContentDensity(html) {
  // Rough estimate: count words inside slide-content divs
  const slideContents = html.match(/<div[^>]*class=["'][^"']*slide-content[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi) || [];

  for (let i = 0; i < slideContents.length; i++) {
    // Strip HTML tags for word count
    const text = slideContents[i].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    if (wordCount > 500) {
      issue('P2', `Slide ~${i + 1} has ~${wordCount} words — may overflow the 1920×1080 stage`,
        'Consider splitting into multiple slides or reducing text density.');
    } else if (wordCount === 0 && !/logo-bar|partner-row/.test(slideContents[i])) {
      issue('P2', `Slide ~${i + 1} has no visible text content — may be a placeholder`,
        'Ensure all slides have meaningful content or mark them as intentional placeholders.');
    }
  }
}

function checkReducedMotionIntegrity(html) {
  // Basic check already done in checkStructure — this adds detail
  if (/prefers-reduced-motion/.test(html)) {
    const rmBlock = html.match(/@media\s*\(prefers-reduced-motion[^}]*\{[^}]*\}/g) || [];

    let hasAnimDuration = false;
    let hasTransDuration = false;

    for (const block of rmBlock) {
      if (/animation-duration/.test(block)) hasAnimDuration = true;
      if (/transition-duration/.test(block)) hasTransDuration = true;
    }

    if (!hasAnimDuration) {
      issue('P1', 'Reduced-motion media query does not override animation-duration',
        'Add animation-duration: 0.01ms !important to the reduced-motion block.');
    }
    if (!hasTransDuration) {
      issue('P2', 'Reduced-motion media query does not override transition-duration',
        'Consider capping transition-duration at 0.2s in the reduced-motion block.');
    }
  }
}

function checkSlideHeaderSystem(html) {
  // Normal slides should have .uog-logo-anchor + .uog-logo-blue-block + .uog-header-logo
  const hasLogoAnchor = /class=["'][^"']*uog-logo-anchor[^"']*["']/.test(html);
  const hasLogoBlueBlock = /class=["'][^"']*uog-logo-blue-block[^"']*["']/.test(html);
  const hasHeaderLogo = /class=["'][^"']*uog-header-logo[^"']*["']/.test(html);
  const hasHeader = /class=["'][^"']*uog-slide-header[^"']*["']/.test(html);
  const hasSlideTitle = /class=["'][^"']*uog-slide-title[^"']*["']/.test(html);

  const normalSlides = html.match(/class=["'][^"']*slide[^"']*["'](?!.*title-slide)(?!.*closing-takeaway)(?!.*section-divider)/gi) || [];

  if (normalSlides.length >= 2) {
    if (!hasHeader) {
      issue('P1', 'Normal slides lack .uog-slide-header');
    }
    if (!hasLogoAnchor) {
      issue('P1', 'Normal slides lack .uog-logo-anchor — logo should sit above a UoG blue brand block',
        'Add <div class="uog-logo-anchor"> with .uog-logo-blue-block + <img class="uog-header-logo uog-header-logo--above-block">.');
    }
    if (!hasLogoBlueBlock) {
      issue('P1', 'Normal slides lack .uog-logo-blue-block — the blue brand strip should anchor the logo area');
    }
    if (!hasHeaderLogo) {
      issue('P1', 'Normal slides lack .uog-header-logo on every normal slide');
    }
  }

  if (hasLogoAnchor && hasLogoBlueBlock) {
    issue('INFO', 'Logo anchor + blue block present (.uog-logo-anchor + .uog-logo-blue-block)');

    // Check for the derived cropped asset (preferred) or original white-text SVG
    const hasDerivedSvg = /uog-white-text-cropped-for-header\.svg/.test(html);
    const hasOriginalWhite = /Unboxed%20colour%20logo%20white%20text/.test(html);
    // Blue-text on blue block: check within ~400 chars of uog-header-logo--on-blue-block
    const blueTextNearBlock = (() => {
      const blockIdx = html.search(/uog-header-logo--on-blue-block/);
      if (blockIdx === -1) return false;
      const nearby = html.substring(Math.max(0, blockIdx - 500), blockIdx + 500);
      return /Unboxed%20colour%20logo%20blue%20text/.test(nearby);
    })();

    if (hasDerivedSvg) {
      issue('INFO', 'Header uses derived cropped white-text SVG (bbox-based, recommended)');
    } else if (hasOriginalWhite) {
      issue('P2', 'Header uses original white-text SVG — consider the derived cropped asset (uog-white-text-cropped-for-header.svg) for better block fill without oversize CSS hacks');
    }

    if (blueTextNearBlock) {
      issue('P1', 'Blue-text logo on blue block — wordmark will be invisible against University Blue background');
    }

    // Derived SVG should not need negative offsets or transform hacks
    if (/uog-header-logo--on-blue-block[\s\S]{0,200}left\s*:\s*-/.test(html)) {
      issue('P2', 'Logo on blue block uses negative left offset — derived cropped SVG should not need this');
    }
    if (/uog-header-logo--on-blue-block[\s\S]{0,200}top\s*:\s*-/.test(html)) {
      issue('P2', 'Logo on blue block uses negative top offset — derived cropped SVG should not need this');
    }
    if (/uog-header-logo--on-blue-block[\s\S]{0,200}transform\s*:\s*scale/.test(html)) {
      issue('P2', 'Logo on blue block uses transform:scale — derived cropped SVG should not need scaling hacks');
    }
  }
	    // Blue block should be flush with slide left edge (x=0) for official UoG reference
	    const headerLeftMatch = html.match(/uog-slide-header[\s\S]{0,150}left\s*:\s*(\d+)/);
	    if (headerLeftMatch) {
	      const leftPx = parseInt(headerLeftMatch[1]);
	      if (leftPx > 0 && leftPx <= 24) {
	        // close enough — fine
	      } else if (leftPx > 24) {
	        issue('P2', `Slide header left is ${leftPx}px — blue block should be at x=0 (flush with slide edge) for official UoG reference`);
	      }
	    }

  // Cover should use .uog-cover-logo-row (bottom-left logo row)
  const hasCoverLogoRow = /class=["'][^"']*uog-cover-logo-row[^"']*["']/.test(html);
  const hasCoverFooterLogo = /class=["'][^"']*uog-cover-footer-logo[^"']*["']/.test(html);
  const hasOldCoverLockup = /class=["'][^"']*uog-cover-lockup[^"']*["']/.test(html);

  if (/class=["'][^"']*title-slide[^"']*["']/.test(html)) {
    if (hasCoverLogoRow) {
      issue('INFO', 'Cover uses .uog-cover-logo-row (bottom-left logo row)');
    } else if (hasOldCoverLockup) {
      issue('P2', 'Cover uses old .uog-cover-lockup — consider moving to .uog-cover-logo-row for a cleaner layout',
        'Place logo at bottom-left in a .uog-cover-logo-row so partner logos can be added later.');
    } else {
      issue('P2', 'Cover slide present but no .uog-cover-logo-row found');
    }
  }
}

function checkLayoutVariety(html) {
  // Parse slide classes to count layout diversity
  const slideMatches = html.match(/class=["'][^"']*slide[^"']*["']/gi) || [];

  // Detect layout classes used
  const LAYOUT_CLASSES = [
    'layout-big-statement', 'layout-big-bullets', 'layout-two-column',
    'layout-comparison', 'layout-kpi', 'layout-metrics',
    'layout-image-card-grid', 'layout-card-grid', 'layout-bento',
    'layout-process', 'layout-timeline', 'layout-appendix-table',
    'layout-data-table', 'layout-cover', 'layout-close', 'layout-split',
    'layout-stack', 'layout-partner-row'
  ];

  const usedLayouts = [];
  for (const cls of slideMatches) {
    for (const layout of LAYOUT_CLASSES) {
      if (cls.includes(layout)) {
        usedLayouts.push(layout);
        break;
      }
    }
  }

  const uniqueLayouts = [...new Set(usedLayouts)];

  if (uniqueLayouts.length === 0) {
    issue('P2', 'No layout classes detected — slides may lack structural CSS',
      'Add layout classes like .layout-big-bullets or .layout-two-column to each slide.');
  } else if (uniqueLayouts.length === 1 && usedLayouts.length >= 4) {
    issue('P2', `Only one layout class used across ${usedLayouts.length} slides: ${uniqueLayouts[0]}`,
      'Vary layouts based on content shape. Use at least 3 different layout classes in decks of 8+ slides.');
  } else if (uniqueLayouts.length < 3 && usedLayouts.length >= 8) {
    issue('P2', `Only ${uniqueLayouts.length} different layout class(es) across ${usedLayouts.length} slides`,
      'A deck of 8+ slides should use at least 3 different layout classes. See VISUAL_STYLE_BRIEF.md for the content-shape→layout mapping.');
  } else {
    issue('INFO', `Using ${uniqueLayouts.length} different layout classes across ${usedLayouts.length} slides: ${uniqueLayouts.join(', ')}`);
  }

  // Check consecutive same-layout
  let maxConsecutive = 0;
  let currentRun = 0;
  let currentLayout = '';
  for (const layout of usedLayouts) {
    if (layout === currentLayout) {
      currentRun++;
    } else {
      currentLayout = layout;
      currentRun = 1;
    }
    maxConsecutive = Math.max(maxConsecutive, currentRun);
  }

  if (maxConsecutive >= 3) {
    issue('P2', `${maxConsecutive} consecutive slides using the same layout class`,
      'No more than 2 consecutive slides should use the same layout. Vary layouts based on content shape.');
  }

  // Image-card-grid should not dominate
  const imageCardCount = usedLayouts.filter(l => l === 'layout-image-card-grid').length;
  if (imageCardCount > usedLayouts.length * 0.5 && usedLayouts.length >= 4) {
    issue('P2', `${imageCardCount}/${usedLayouts.length} slides use layout-image-card-grid — overfitting to one pattern`,
      'The image-card grid is one optional layout. Choose layouts based on content shape, not as a default.');
  }
}

function checkPrintOverrides(html) {
  // Enhanced: check for per-type print handling
  if (/@media\s+print/.test(html)) {
    const printBlocks = html.match(/@media\s+print\s*\{[^}]*\}/g) || [];
    const printContent = printBlocks.join(' ');

    if (/background\s*:\s*#(?:fff|FFF|ffffff|FFFFFF)/.test(printContent)) {
      issue('INFO', 'Print CSS forces white backgrounds (correct for print readability)');
    } else if (printBlocks.length > 0) {
      issue('P2', 'Print CSS may not override dark backgrounds — check that all slides print with white backgrounds');
    }

    if (/display\s*:\s*none.*deck-controls/.test(printContent)) {
      issue('INFO', 'Print CSS hides deck controls (correct)');
    }
  }
}

function printReport(filePath, verbose) {
  console.log(`\n=== UoG Deck Validation Report ===`);
  console.log(`File: ${filePath}\n`);

  let exitCode = 0;

  for (const level of ['P0', 'P1', 'P2', 'P3', 'INFO']) {
    const items = issues[level];
    if (items.length === 0 && (level === 'INFO' || level === 'P3')) continue;
    if (items.length === 0 && !verbose) continue;

    const icons = { P0: '❌', P1: '⚠️', P2: '💡', P3: '🔮', INFO: 'ℹ️' };
    console.log(`${icons[level]} ${level} (${items.length}):`);
    for (const item of items) {
      console.log(`   ${item.message}`);
      if (verbose && item.detail) {
        console.log(`      → ${item.detail}`);
      }
    }
    console.log('');
  }

  // Determine exit code
  if (issues.P0.length > 0) exitCode = 1;
  else if (issues.P1.length > 0) exitCode = 2;
  else exitCode = 0;

  const total = issues.P0.length + issues.P1.length + issues.P2.length + issues.P3.length;
  if (total === 0) {
    console.log('✅ All checks passed!\n');
  } else {
    console.log(`Summary: ${issues.P0.length} blocking, ${issues.P1.length} warning, ${issues.P2.length} info, ${issues.P3.length} future\n`);
  }

  return exitCode;
}

function printJSON(filePath) {
  const report = {
    file: filePath,
    timestamp: new Date().toISOString(),
    issues: {
      blocking: issues.P0,
      warnings: issues.P1,
      info: issues.P2,
      future: issues.P3,
      meta: issues.INFO,
    },
    summary: {
      blocking: issues.P0.length,
      warnings: issues.P1.length,
      info: issues.P2.length,
      future: issues.P3.length,
      total: issues.P0.length + issues.P1.length + issues.P2.length + issues.P3.length,
    },
  };
  console.log(JSON.stringify(report, null, 2));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`Usage: node validate-deck.mjs <path/to/deck.html> [options]

Options:
  --verbose       Show detailed issue descriptions
  --json          Output results as JSON
  --check-logos   Validate logo references against logo-manifest.json
  --help, -h      Show this help

Exit codes:
  0 — All checks passed
  1 — P0 blocking issues found
  2 — P1 warning issues found
  3 — File not found or parse error
`);
    process.exit(0);
  }

  const fileArg = args.find(a => !a.startsWith('--'));
  const filePath = resolve(fileArg);
  const verbose = args.includes('--verbose');
  const checkLogos = args.includes('--check-logos');
  const jsonOutput = args.includes('--json');

  const html = checkFileExists(filePath);
  if (html === null) {
    process.exit(3);
  }

  checkStructure(html);
  checkColours(html);
  checkAccessibility(html);
  checkSlideHiding(html);
  checkSlideAttributes(html);
  checkInlineSvg(html);
  checkSrsSlideTypes(html);
  checkAnimations(html);
  checkGridSystem(html);
  checkComponents(html);
  checkContentDensity(html);
  checkReducedMotionIntegrity(html);
  checkPrintOverrides(html);
  checkLayoutVariety(html);
  checkSlideHeaderSystem(html);
  checkLogoManifest(html, checkLogos);

  let exitCode;
  if (jsonOutput) {
    printJSON(filePath);
    exitCode = issues.P0.length > 0 ? 1 : issues.P1.length > 0 ? 2 : 0;
  } else {
    exitCode = printReport(filePath, verbose);
  }

  process.exit(exitCode);
}

main();
