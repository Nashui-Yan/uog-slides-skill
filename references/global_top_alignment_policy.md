# Global Top-Alignment Policy

## Rule

**ALL normal content slides must use top alignment inside the body region.**
No ordinary content slide uses body-level vertical centring.

## Exceptions

Cover, contents, closing, and section-divider slides remain canonical and unchanged.

## Body Region (1920×1080)

```
bodyTop ≈ 300px
bodyBottom ≈ 920px
```

## Layout

- `.uog-slide-body` defines the body region only — no global centring
- All composition wrappers default to top alignment
- First meaningful content starts near bodyTop
- Text blocks: top-left aligned
- Figure blocks: top-aligned, image horizontally centred in panel, caption directly below, description directly below caption
- Figure+text: figure column top aligns with text column top
- Two-figure: both panels top align, captions stay attached, shared insight below

## Figure Sizing

Layout selected by figure count, aspect ratio, and text load. See `references/figure_layout_matrix.md` for the decision matrix. Figures scaled to fit panels with `object-fit: contain`. Never crop.

## 1920×1080 Only

All layout planning uses fixed 1920×1080 coordinates. Higher resolutions use uniform whole-slide scaling only. No responsive reflow, no per-resolution sizing.

## Validation

Normal slides checked for:
1. Body region compliance (content within y=300–920)
2. Top alignment (first body element near bodyTop)
3. Bottom overflow (no content below bodyBottom)
4. Attachment (caption/description near figure, no footer-like text)
5. Canonical protection (cover/contents/closing unchanged)
