# Examples

This directory contains example slide decks generated with
`nashui-uog-slides-skill`.

## Minimal Test Deck

`minimal-test.html` — A 4-slide test deck with:
- Viewport base CSS
- Navigation script
- Print CSS
- Reduced motion CSS
- University Blue branding
- Logo placeholders

Use this file as:
1. A template reference when building new decks
2. A test target for `scripts/validate-deck.mjs`

## Adding Examples

To add a new example:
1. Generate the deck using the skill
2. Copy the HTML file here
3. Run `node scripts/validate-deck.mjs examples/<your-file>.html`
4. Fix any P0/P1 issues
5. Update this README

## Current Examples

| File | Theme | Slides | Description |
|------|-------|--------|-------------|
| `minimal-test.html` | uog-research-blue | 4 | Minimal structural test deck |

## TODO

- [ ] Add a full 12-slide conference example
- [ ] Add a uog-energy-noir themed example
- [ ] Add a uog-swiss-data themed example
- [ ] Add a partner-logo-row example
