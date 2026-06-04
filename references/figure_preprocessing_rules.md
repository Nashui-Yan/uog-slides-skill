# Figure Preprocessing Rules

## Policy

> Figure layout must be based on the effective visual content bbox, not only
> the image file bbox or rendered `<img>` element bbox.

## Workflow

For every figure asset used in a deck:

1. Read intrinsic image width/height
2. Detect effective visual content bbox (non-background pixels)
3. Estimate whitespace margins
4. Compute effective aspect ratio = visual_bbox_width / visual_bbox_height
5. If whitespace_ratio > 25% OR any side margin > 12%: create trimmed derivative
6. Use trimmed derivative for slides; keep original file unchanged
7. Write `figure_manifest.json`

## Analysis Script

```
python3 scripts/analyze_figures.py <figure_dir> --out <processed_dir> --manifest <manifest.json>
```

Uses Pillow to detect near-white background pixels and compute visual bounding boxes.

## Manifest Fields

| Field | Description |
|-------|-------------|
| `original_path` | Source file |
| `processed_path` | Trimmed derivative (null if not trimmed) |
| `width` / `height` | Intrinsic dimensions |
| `visual_bbox` | [x_min, y_min, x_max, y_max] |
| `whitespace_ratio` | 1 − visual_area / total_area |
| `raw_aspect_ratio` | width / height |
| `effective_aspect_ratio` | visual_width / visual_height |
| `recommended_layout` | Suggested layout class |
| `recommended_max_height` | Suggested CSS max-height |

## Decision Rules

- **whitespace_ratio > 25%** → create trimmed derivative, use processed path
- **any side margin > 12%** → create trimmed derivative
- **effective_aspect_ratio differs significantly from raw** → use effective for layout decisions
- **all figures pass thresholds** → use originals, manifest still records metrics
