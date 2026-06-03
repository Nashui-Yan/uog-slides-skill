# Brand Tokens — University of Glasgow

> Source: https://www.gla.ac.uk/myglasgow/staff/brandtoolkit/colour/
> Accessed: 2026-06-03
> Status: Fully extracted. No design tokens published by UoG — these are our derivations.

## Primary Colour

| Token | Name | Hex | RGB | CMYK |
|-------|------|-----|-----|------|
| `--uog-blue` | University Blue | `#011451` | `1, 20, 81` | `C100 M87 Y0 K31` |

University Blue must be prevalent across all communications. It is the primary brand identifier.

## Secondary Dark Palette

Used as backgrounds with white text. Suitable for dark slide themes, section dividers, title slides.

| Token | Name | Hex | RGB | CMYK |
|-------|------|-----|-----|------|
| `--uog-dark-purple` | Dark Purple | `#4C2683` | `76, 38, 131` | `C84 M100 Y0 K12` |
| `--uog-dark-pink` | Dark Pink | `#A60367` | `166, 3, 103` | `C34 M100 Y1 K6` |
| `--uog-dark-green` | Dark Green | `#405D18` | `64, 93, 24` | `C73 M41 Y100 K34` |
| `--uog-dark-blue` | Dark Blue | `#005398` | `0, 83, 152` | `C95 M53 Y0 K0` |
| `--uog-dark-red` | Dark Red | `#7D2239` | `125, 34, 57` | `C34 M94 Y64 K34` |

Text on Secondary Dark backgrounds: **White** (`#FFFFFF`).

## Secondary Light Palette

Used as accents only — not as full backgrounds per brand guidelines. Suitable for chart colours, highlight bars, icon fills, data accents.

| Token | Name | Hex | RGB | CMYK |
|-------|------|-----|-----|------|
| `--uog-light-purple` | Light Purple | `#A5A1CE` | `165, 161, 206` | `C34 M35 Y1 K0` |
| `--uog-light-pink` | Light Pink | `#E98BAF` | `233, 139, 175` | `C4 M56 Y7 K0` |
| `--uog-light-green` | Light Green | `#81C071` | `129, 192, 113` | `C53 M3 Y74 K0` |
| `--uog-light-blue` | Light Blue | `#4DBBC6` | `77, 187, 198` | `C64 M4 Y23 K0` |
| `--uog-light-yellow` | Light Yellow | `#F2D25C` | `242, 210, 92` | `C6 M14 Y76 K0` |

Text on Secondary Light backgrounds (if used): **University Blue** (`#011451`).

## Derived Design Tokens

The University does not publish CSS custom properties. These are our derived token names for use in theme CSS files:

```css
:root {
  /* === Primary Brand === */
  --uog-blue: #011451;
  --uog-blue-rgb: 1, 20, 81;

  /* === Secondary Dark === */
  --uog-dark-purple: #4C2683;
  --uog-dark-purple-rgb: 76, 38, 131;
  --uog-dark-pink: #A60367;
  --uog-dark-pink-rgb: 166, 3, 103;
  --uog-dark-green: #405D18;
  --uog-dark-green-rgb: 64, 93, 24;
  --uog-dark-blue: #005398;
  --uog-dark-blue-rgb: 0, 83, 152;
  --uog-dark-red: #7D2239;
  --uog-dark-red-rgb: 125, 34, 57;

  /* === Secondary Light === */
  --uog-light-purple: #A5A1CE;
  --uog-light-purple-rgb: 165, 161, 206;
  --uog-light-pink: #E98BAF;
  --uog-light-pink-rgb: 233, 139, 175;
  --uog-light-green: #81C071;
  --uog-light-green-rgb: 129, 192, 113;
  --uog-light-blue: #4DBBC6;
  --uog-light-blue-rgb: 77, 187, 198;
  --uog-light-yellow: #F2D25C;
  --uog-light-yellow-rgb: 242, 210, 92;

  /* === Text-on-brand-colour rules === */
  --text-on-dark: #FFFFFF;
  --text-on-light: #011451;   /* = --uog-blue */
}
```

## Text Pairing Rules

| Background Type | Text Colour | Token |
|----------------|-------------|-------|
| University Blue | White | `--text-on-dark` |
| Secondary Dark (any) | White | `--text-on-dark` |
| Secondary Light (as bg) | University Blue | `--text-on-light` |
| White / near-white | University Blue | `--uog-blue` |
| Light grey | University Blue | `--uog-blue` |

## Accessibility Notes (from source)

The page states: "The colour contrast ratios of these combinations are informed by best practice for digital and print accessibility."

No specific WCAG conformance level is published. Our computed WCAG 2.1 contrast ratios
(run `node scripts/extract-brand-colours.mjs --contrast` to regenerate):

White text on dark backgrounds:
- University Blue `#011451` → White: **17.21:1** (AAA ✅)
- Dark Purple `#4C2683` → White: **10.98:1** (AAA ✅)
- Dark Pink `#A60367` → White: **7.42:1** (AAA ✅)
- Dark Green `#405D18` → White: **7.51:1** (AAA ✅)
- Dark Blue `#005398` → White: **7.80:1** (AAA ✅)
- Dark Red `#7D2239` → White: **9.72:1** (AAA ✅)

University Blue text on light backgrounds:
- Light Purple `#A5A1CE` → University Blue: **7.04:1** (AAA ✅)
- Light Pink `#E98BAF` → University Blue: **7.19:1** (AAA ✅)
- Light Green `#81C071` → University Blue: **7.96:1** (AAA ✅)
- Light Blue `#4DBBC6` → University Blue: **7.57:1** (AAA ✅)
- Light Yellow `#F2D25C` → University Blue: **11.60:1** (AAA ✅)

**Our rule**: Use light palette colours only for accents (charts, icons, highlight strips), never for full-slide backgrounds, consistent with the brand guidance.

## What We Do NOT Invent

- We do not add arbitrary UoG colours not on the brand page
- We do not modify brand hex codes
- We do not create "UoG variants" by lightening/darkening official colours (use official secondary palette instead)
- We do not claim these are "official UoG design tokens" — they are our CSS derivations from the published brand palette
- We do not override the University's text-pairing rules

## TODO: Manual Input Required

- [ ] Typography tokens from https://www.gla.ac.uk/myglasgow/staff/brandtoolkit/typography/
- [ ] Logo clearspace and minimum sizes
- [ ] College/school sub-brand colour verification
- [ ] Official WCAG conformance target (if any exists)
- [ ] Official dark-mode colour scheme (if any exists — likely not)
