#!/usr/bin/env python3
"""
derive_uog_header_logo.py

Rasterize the official UoG white-text SVG, detect the visible non-transparent
pixel bounding box, and produce a cropped derived SVG for normal-slide
header use. The original official asset is never modified.

Bug fixed 2026-06-03: scale_y was incorrectly svg_h / raster_w instead of
svg_h / raster_h. Fixed, safer padding, added self-check.

Usage:
  python3 scripts/derive_uog_header_logo.py
"""

import os, sys, json, xml.etree.ElementTree as ET
from io import BytesIO
from PIL import Image, ImageDraw
import cairosvg

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SVG_DIR = os.path.join(BASE, "assets", "logos", "main-uog-logo-artwork", "SVG")
DERIVED_DIR = os.path.join(BASE, "assets", "logos", "main-uog-logo-artwork", "derived")

ORIGINAL_SVG = os.path.join(SVG_DIR, "Unboxed colour logo white text.svg")
DERIVED_SVG  = os.path.join(SVG_DIR, "uog-white-text-cropped-for-header.svg")
SUMMARY_JSON = os.path.join(DERIVED_DIR, "uog-white-text-derivation-summary.json")
BBOX_DEBUG   = os.path.join(DERIVED_DIR, "uog-white-text-bbox-debug.png")
SELFCHECK_PNG = os.path.join(DERIVED_DIR, "uog-white-text-cropped-for-header-debug.png")

# ---------------------------------------------------------------------------
# Parameters
# ---------------------------------------------------------------------------
RASTER_WIDTH   = 4000
ALPHA_THRESHOLD = 8
HORIZ_PAD_PCT   = 0.04   # 4% of bbox width each side
VERT_PAD_PCT    = 0.12   # 12% of bbox height each side (much safer)

# ---------------------------------------------------------------------------
# Phase A: Rasterize (aspect-ratio-preserving) & detect bbox
# ---------------------------------------------------------------------------
def rasterize_svg(svg_path, output_width):
    """Rasterize SVG to PNG at given width. Height computed to preserve aspect ratio."""
    # Read viewBox to compute correct output height
    tree = ET.parse(svg_path)
    root = tree.getroot()
    vb_str = root.attrib.get("viewBox", "")
    vb_parts = [float(x) for x in vb_str.split()]
    if len(vb_parts) != 4:
        raise ValueError(f"Cannot parse viewBox: {vb_str}")
    vb_x, vb_y, vb_w, vb_h = vb_parts

    output_height = round(output_width * vb_h / vb_w)
    print(f"  viewBox: {vb_x} {vb_y} {vb_w} {vb_h}")
    print(f"  aspect ratio: {vb_w/vb_h:.4f}")
    print(f"  raster target: {output_width}×{output_height}px")

    png_bytes = cairosvg.svg2png(
        url=svg_path,
        output_width=output_width,
        output_height=output_height,
        background_color="rgba(0,0,0,0)"
    )
    img = Image.open(BytesIO(png_bytes)).convert("RGBA")
    print(f"  actual raster: {img.width}×{img.height}px")
    return img, vb_parts


def detect_bbox(img, alpha_threshold=ALPHA_THRESHOLD):
    """Find bounding box of all pixels with alpha >= threshold."""
    pixels = img.load()
    w, h = img.size
    x_min, y_min, x_max, y_max = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            _, _, _, a = pixels[x, y]
            if a >= alpha_threshold:
                found = True
                if x < x_min: x_min = x
                if y < y_min: y_min = y
                if x > x_max: x_max = x
                if y > y_max: y_max = y
    if not found:
        raise ValueError("No non-transparent pixels found")
    return x_min, y_min, x_max, y_max


# ---------------------------------------------------------------------------
# Phase B: Safer padding
# ---------------------------------------------------------------------------
def pad_bbox(x_min, y_min, x_max, y_max, img_w, img_h):
    bw = x_max - x_min
    bh = y_max - y_min
    px = max(1, round(bw * HORIZ_PAD_PCT))
    py = max(1, round(bh * VERT_PAD_PCT))
    return (
        max(0, x_min - px),
        max(0, y_min - py),
        min(img_w - 1, x_max + px),
        min(img_h - 1, y_max + py),
    )


# ---------------------------------------------------------------------------
# Phase C: Map bbox to SVG coords (FIXED scale factors)
# ---------------------------------------------------------------------------
def raster_to_svg_coords(px, py, raster_w, raster_h, svg_vb):
    svg_min_x, svg_min_y, svg_w, svg_h = svg_vb
    scale_x = svg_w / raster_w
    scale_y = svg_h / raster_h     # FIXED: was raster_w
    svg_x = svg_min_x + px * scale_x
    svg_y = svg_min_y + py * scale_y
    return svg_x, svg_y, scale_x, scale_y


# ---------------------------------------------------------------------------
# Phase D: Write derived SVG
# ---------------------------------------------------------------------------
def write_derived_svg(original_svg_path, output_path, svg_vb,
                       px_min, py_min, px_max, py_max, raster_w, raster_h):
    svg_x1, svg_y1, scale_x, scale_y = raster_to_svg_coords(px_min, py_min, raster_w, raster_h, svg_vb)
    svg_x2, svg_y2, _, _ = raster_to_svg_coords(px_max, py_max, raster_w, raster_h, svg_vb)

    new_vb_x = svg_x1
    new_vb_y = svg_y1
    new_vb_w = svg_x2 - svg_x1
    new_vb_h = svg_y2 - svg_y1

    ET.register_namespace("", "http://www.w3.org/2000/svg")
    tree = ET.parse(original_svg_path)
    root = tree.getroot()
    root.attrib["viewBox"] = f"{new_vb_x:.6f} {new_vb_y:.6f} {new_vb_w:.6f} {new_vb_h:.6f}"
    root.attrib.pop("width", None)
    root.attrib.pop("height", None)
    root.attrib["width"] = "100%"
    root.attrib["height"] = "100%"
    tree.write(output_path, encoding="UTF-8", xml_declaration=True)

    return {
        "new_viewBox": f"{new_vb_x:.4f} {new_vb_y:.4f} {new_vb_w:.4f} {new_vb_h:.4f}",
        "scale_x": scale_x,
        "scale_y": scale_y,
        "svg_coords": (svg_x1, svg_y1, svg_x2, svg_y2),
    }


# ---------------------------------------------------------------------------
# Self-check: rasterize derived SVG and verify margins
# ---------------------------------------------------------------------------
SELFCHECK_MIN_LEFT   = 0.02  # 2% of derived raster width
SELFCHECK_MIN_RIGHT  = 0.02
SELFCHECK_MIN_TOP    = 0.05  # 5% of derived raster height
SELFCHECK_MIN_BOTTOM = 0.05

def self_check(derived_svg_path, selfcheck_png_path):
    """Rasterize the derived SVG and verify visible pixels have safe margins."""
    print("\n--- Self-check: rasterizing derived SVG ---")
    dimg, _ = rasterize_svg(derived_svg_path, 2000)
    dimg.save(selfcheck_png_path)
    print(f"  Saved: {selfcheck_png_path}")

    dx_min, dy_min, dx_max, dy_max = detect_bbox(dimg)
    dw, dh = dimg.size
    left_margin   = dx_min / dw
    right_margin  = (dw - 1 - dx_max) / dw
    top_margin    = dy_min / dh
    bottom_margin = (dh - 1 - dy_max) / dh

    print(f"  Derived bbox: ({dx_min},{dy_min})→({dx_max},{dy_max}) in {dw}×{dh}")
    print(f"  Margins: L={left_margin*100:.1f}% R={right_margin*100:.1f}% T={top_margin*100:.1f}% B={bottom_margin*100:.1f}%")

    issues = []
    if left_margin < SELFCHECK_MIN_LEFT:
        issues.append(f"LEFT margin {left_margin*100:.1f}% < {SELFCHECK_MIN_LEFT*100:.0f}%")
    if right_margin < SELFCHECK_MIN_RIGHT:
        issues.append(f"RIGHT margin {right_margin*100:.1f}% < {SELFCHECK_MIN_RIGHT*100:.0f}%")
    if top_margin < SELFCHECK_MIN_TOP:
        issues.append(f"TOP margin {top_margin*100:.1f}% < {SELFCHECK_MIN_TOP*100:.0f}%")
    if bottom_margin < SELFCHECK_MIN_BOTTOM:
        issues.append(f"BOTTOM margin {bottom_margin*100:.1f}% < {SELFCHECK_MIN_BOTTOM*100:.0f}%")

    margins_ok = len(issues) == 0
    return margins_ok, issues, {
        "left_pct": round(left_margin*100, 1),
        "right_pct": round(right_margin*100, 1),
        "top_pct": round(top_margin*100, 1),
        "bottom_pct": round(bottom_margin*100, 1),
        "bbox": (dx_min, dy_min, dx_max, dy_max),
        "raster_size": (dw, dh),
    }


# ---------------------------------------------------------------------------
# Debug: draw bboxes on raster image
# ---------------------------------------------------------------------------
def draw_bbox_debug(img, raw_bbox, padded_bbox, output_path):
    debug = img.copy()
    draw = ImageDraw.Draw(debug)
    rx1, ry1, rx2, ry2 = raw_bbox
    px1, py1, px2, py2 = padded_bbox
    # Raw bbox in red
    draw.rectangle([rx1, ry1, rx2, ry2], outline=(255,0,0,255), width=6)
    # Padded bbox in green
    draw.rectangle([px1, py1, px2, py2], outline=(0,255,0,255), width=6)
    debug.save(output_path)
    print(f"  Debug image saved: {output_path}  (red=raw bbox, green=padded)")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    print("=== UoG Logo Bbox Derivation (fixed scale factors) ===\n")
    print(f"Source: {ORIGINAL_SVG}")
    print(f"Raster width: {RASTER_WIDTH}px  (height auto from aspect ratio)")
    print(f"Alpha threshold: {ALPHA_THRESHOLD}")
    print(f"Padding: {HORIZ_PAD_PCT*100:.0f}% horiz, {VERT_PAD_PCT*100:.0f}% vert\n")

    os.makedirs(DERIVED_DIR, exist_ok=True)

    # Phase A
    print("Phase A: Rasterize (aspect-ratio-preserving) + detect bbox")
    img, svg_vb = rasterize_svg(ORIGINAL_SVG, RASTER_WIDTH)
    rw, rh = img.width, img.height

    rx_min, ry_min, rx_max, ry_max = detect_bbox(img)
    raw_w = rx_max - rx_min
    raw_h = ry_max - ry_min
    print(f"  Raw bbox: ({rx_min},{ry_min})→({rx_max},{ry_max})  size={raw_w}×{raw_h}")
    print(f"  Raw occupies: {100*raw_w/rw:.1f}% width × {100*raw_h/rh:.1f}% height\n")

    # Phase B
    print("Phase B: Safer padding")
    px_min, py_min, px_max, py_max = pad_bbox(rx_min, ry_min, rx_max, ry_max, rw, rh)
    pad_w = px_max - px_min
    pad_h = py_max - py_min
    print(f"  Padded bbox: ({px_min},{py_min})→({px_max},{py_max})  size={pad_w}×{pad_h}\n")

    # Phase C
    print("Phase C: Map to SVG coords (FIXED scale factors)")
    svg_x1, svg_y1, scale_x, scale_y = raster_to_svg_coords(px_min, py_min, rw, rh, svg_vb)
    svg_x2, svg_y2, _, _ = raster_to_svg_coords(px_max, py_max, rw, rh, svg_vb)
    print(f"  scale_x = {svg_vb[2]} / {rw} = {scale_x:.8f}")
    print(f"  scale_y = {svg_vb[3]} / {rh} = {scale_y:.8f}")
    ratio_diff = abs(scale_x - scale_y) / max(scale_x, scale_y) * 100
    if ratio_diff > 1.0:
        print(f"  ⚠️  Scale factors differ by {ratio_diff:.2f}% — aspect ratio may not be preserved!")
    else:
        print(f"  ✅ Scale factors match (diff {ratio_diff:.3f}%)")
    print(f"  SVG crop: ({svg_x1:.4f},{svg_y1:.4f})→({svg_x2:.4f},{svg_y2:.4f})")
    print(f"  New viewBox size: {svg_x2-svg_x1:.4f} × {svg_y2-svg_y1:.4f}\n")

    # Phase D
    print("Phase D: Write derived SVG")
    info = write_derived_svg(ORIGINAL_SVG, DERIVED_SVG, svg_vb,
                              px_min, py_min, px_max, py_max, rw, rh)
    print(f"  Derived SVG: {DERIVED_SVG}")
    print(f"  viewBox: {info['new_viewBox']}\n")

    # Debug images
    print("Debug outputs:")
    img.save(os.path.join(DERIVED_DIR, "uog-white-text-analysis.png"))
    draw_bbox_debug(img, (rx_min, ry_min, rx_max, ry_max),
                    (px_min, py_min, px_max, py_max), BBOX_DEBUG)

    # Self-check
    margins_ok, issues, margins = self_check(DERIVED_SVG, SELFCHECK_PNG)
    if not margins_ok:
        print(f"\n❌ SELF-CHECK FAILED: {len(issues)} margin issue(s)")
        for issue in issues:
            print(f"   - {issue}")
        print("\nIncrease HORIZ_PAD_PCT/VERT_PAD_PCT and re-run.")
        sys.exit(1)
    else:
        print(f"\n✅ Self-check passed — all margins safe")

    # Summary
    summary = {
        "source": ORIGINAL_SVG,
        "derived": DERIVED_SVG,
        "raster_width": rw,
        "raster_height": rh,
        "alpha_threshold": ALPHA_THRESHOLD,
        "original_viewBox": f"{svg_vb[0]} {svg_vb[1]} {svg_vb[2]} {svg_vb[3]}",
        "scale_x": round(scale_x, 8),
        "scale_y": round(scale_y, 8),
        "scale_diff_pct": round(ratio_diff, 3),
        "raw_bbox": {"x_min": rx_min, "y_min": ry_min, "x_max": rx_max, "y_max": ry_max,
                      "width": raw_w, "height": raw_h},
        "padded_bbox": {"x_min": px_min, "y_min": py_min, "x_max": px_max, "y_max": py_max,
                         "width": pad_w, "height": pad_h},
        "derived_viewBox": info["new_viewBox"],
        "self_check_margins": margins,
        "self_check_pass": True,
    }
    with open(SUMMARY_JSON, "w") as f:
        json.dump(summary, f, indent=2)
    print(f"  Summary: {SUMMARY_JSON}")
    print(f"\n✅ Done. Derived SVG: {DERIVED_SVG}")


if __name__ == "__main__":
    main()
