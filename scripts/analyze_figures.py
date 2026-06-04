#!/usr/bin/env python3
"""
analyze_figures.py — Figure Preprocessing and Sizing Analysis

Detects effective visual content bbox, computes whitespace ratios, creates
trimmed derivatives, and writes a figure manifest for layout decisions.

Usage:
  python3 scripts/analyze_figures.py <figure_dir> --out <output_dir> --manifest <manifest.json>

The original figure files are never modified.
"""

import os, sys, json, argparse
from PIL import Image
import numpy as np

def detect_visual_bbox(img, bg_threshold=240, alpha_threshold=8, margin_pct=0.03):
    """
    Find bounding box of non-background content.
    Background is near-white pixels or transparent pixels.
    Returns (x_min, y_min, x_max, y_max).
    """
    arr = np.array(img)
    w, h = img.size

    if img.mode == 'RGBA':
        alpha = arr[:,:,3]
        rgb = arr[:,:,:3]
        is_bg = (alpha < alpha_threshold) | (
            (rgb[:,:,0] > bg_threshold) &
            (rgb[:,:,1] > bg_threshold) &
            (rgb[:,:,2] > bg_threshold)
        )
    elif img.mode == 'RGB':
        is_bg = (
            (arr[:,:,0] > bg_threshold) &
            (arr[:,:,1] > bg_threshold) &
            (arr[:,:,2] > bg_threshold)
        )
    else:
        if img.mode != 'RGBA' and img.mode != 'RGB':
            img = img.convert('RGBA')
            return detect_visual_bbox(img, bg_threshold, alpha_threshold, margin_pct)

    rows = np.any(~is_bg, axis=1)
    cols = np.any(~is_bg, axis=0)

    if not rows.any() or not cols.any():
        return 0, 0, w-1, h-1

    y_min = np.argmax(rows)
    y_max = h - 1 - np.argmax(rows[::-1])
    x_min = np.argmax(cols)
    x_max = w - 1 - np.argmax(cols[::-1])

    # Add small margin
    bw = x_max - x_min
    bh = y_max - y_min
    mx = int(bw * margin_pct)
    my = int(bh * margin_pct)
    x_min = max(0, x_min - mx)
    y_min = max(0, y_min - my)
    x_max = min(w-1, x_max + mx)
    y_max = min(h-1, y_max + my)

    return x_min, y_min, x_max, y_max


def analyze_figure(filepath, bg_threshold=240):
    """Analyze a single figure and return metrics."""
    img = Image.open(filepath)
    w, h = img.size

    x_min, y_min, x_max, y_max = detect_visual_bbox(img, bg_threshold)
    vb_w = x_max - x_min
    vb_h = y_max - y_min

    total_area = w * h
    visual_area = vb_w * vb_h
    whitespace_ratio = 1.0 - (visual_area / total_area) if total_area > 0 else 0

    left_margin = x_min / w if w > 0 else 0
    right_margin = (w - 1 - x_max) / w if w > 0 else 0
    top_margin = y_min / h if h > 0 else 0
    bottom_margin = (h - 1 - y_max) / h if h > 0 else 0

    raw_aspect = w / h if h > 0 else 1
    effective_aspect = vb_w / vb_h if vb_h > 0 else 1

    max_margin = max(left_margin, right_margin, top_margin, bottom_margin)
    needs_trim = whitespace_ratio > 0.25 or max_margin > 0.12

    return {
        'file': os.path.basename(filepath),
        'width': w, 'height': h,
        'visual_bbox': [x_min, y_min, x_max, y_max],
        'visual_width': vb_w, 'visual_height': vb_h,
        'whitespace_ratio': round(whitespace_ratio, 3),
        'margins': {
            'left': round(left_margin, 3), 'right': round(right_margin, 3),
            'top': round(top_margin, 3), 'bottom': round(bottom_margin, 3)
        },
        'raw_aspect_ratio': round(raw_aspect, 3),
        'effective_aspect_ratio': round(effective_aspect, 3),
        'needs_trim': needs_trim,
        'bg_threshold': bg_threshold,
    }


def classify_aspect(ratio):
    if ratio >= 2.2: return 'very_wide'
    if ratio >= 1.55: return 'wide'
    if ratio >= 0.75: return 'near_square'
    if ratio >= 0.55: return 'tall'
    return 'very_tall'


def recommend_layout(info):
    """Recommend layout based on effective aspect ratio and size."""
    ea = info['effective_aspect_ratio']
    cat = classify_aspect(ea)

    if cat in ('very_wide', 'wide'):
        return 'layout-figure-top-interpretation', 520
    elif cat == 'near_square':
        return 'layout-figure-text-interpretation', 540
    else:
        return 'layout-figure-left', 560


def main():
    parser = argparse.ArgumentParser(description='Analyze figure assets for visual content bbox')
    parser.add_argument('figure_dir', help='Directory containing figure files')
    parser.add_argument('--out', required=True, help='Output directory for processed figures')
    parser.add_argument('--manifest', required=True, help='Output manifest JSON path')
    parser.add_argument('--bg-threshold', type=int, default=240, help='Background pixel threshold (0-255)')
    args = parser.parse_args()

    os.makedirs(args.out, exist_ok=True)

    extensions = ('.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG')
    files = sorted([f for f in os.listdir(args.figure_dir) if f.endswith(extensions)])

    if not files:
        print(f'No image files found in {args.figure_dir}')
        sys.exit(1)

    print(f'Analyzing {len(files)} figures from {args.figure_dir}\n')
    print(f'{"File":30s} {"Size":>10s} {"WS%":>6s} {"Raw AR":>7s} {"Eff AR":>7s} {"Trim":>5s} {"Category":>12s}')
    print('-' * 85)

    manifest = {'figures': [], 'summary': {}}
    trimmed_count = 0

    for fname in files:
        fpath = os.path.join(args.figure_dir, fname)
        info = analyze_figure(fpath, args.bg_threshold)

        ws = info['whitespace_ratio']
        ra = info['raw_aspect_ratio']
        ea = info['effective_aspect_ratio']
        cat = classify_aspect(ea)

        print(f'{fname:30s} {info["width"]:>4d}×{info["height"]:<4d} {ws*100:5.1f}% {ra:7.3f} {ea:7.3f} {"YES" if info["needs_trim"] else "":>5s} {cat:>12s}')

        # Create processed version if needed
        processed_path = None
        if info['needs_trim']:
            img = Image.open(fpath)
            x0, y0, x1, y1 = info['visual_bbox']
            cropped = img.crop((x0, y0, x1, y1))
            out_name = os.path.splitext(fname)[0] + '_trimmed.png'
            out_path = os.path.join(args.out, out_name)
            cropped.save(out_path)
            processed_path = out_path
            trimmed_count += 1

        info['processed_path'] = processed_path
        info['recommended_layout'], info['recommended_max_height'] = recommend_layout(info)
        info['aspect_category'] = cat
        manifest['figures'].append(info)

    manifest['summary'] = {
        'total': len(files),
        'trimmed': trimmed_count,
        'output_dir': args.out,
        'bg_threshold': args.bg_threshold,
    }

    with open(args.manifest, 'w') as f:
        json.dump(manifest, f, indent=2)

    print(f'\n{trimmed_count}/{len(files)} figures trimmed → {args.out}')
    print(f'Manifest: {args.manifest}')


if __name__ == '__main__':
    main()
