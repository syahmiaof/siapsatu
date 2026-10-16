#!/usr/bin/env python3
"""
Compare baseline UI-v4 captures against approved reference mockups.
Generates side-by-side comparisons, 50% overlays, landmark metrics, and baseline report.
"""

from PIL import Image, ImageDraw, ImageOps, ImageFont
from pathlib import Path
import json
import math
import sys

ROOT = Path(__file__).resolve().parents[1]
QA_V4 = ROOT / "artifacts/visual-qa/ui-v4"
phase = sys.argv[1] if len(sys.argv) > 1 else ("post" if (QA_V4 / "post/geometry.json").exists() else "baseline")
DATA_DIR = QA_V4 / phase
OUT_DIR = QA_V4 / "comparisons"
OUT_DIR.mkdir(parents=True, exist_ok=True)
print(f"[compare-ui-v4] Processing phase: {phase} from {DATA_DIR}")

REFS = {
    "home": "homepage-theme-03-malaysia-utility.png",
    "tools": "ui-01-tools-directory-desktop.png",
    "paths-ai-automation": "ui-04-learning-path-automation-v2.png",
    "community": "ui-09-community-hub.png",
}

# Approved reference landmark reference values at 1505x1029 reference desktop match:
# Inspected from mockups at 1505 width
REF_LANDMARKS = {
    "home": {
        "header_bottom_y": 110,
        "hero_title_y": 160,
        "cta_y": 380,
        "card_row_y": 580,
        "community_strip_y": 845,
    },
    "tools": {
        "header_bottom_y": 110,
        "hero_title_y": 160,
        "controls_y": 340,
        "grid_first_card_y": 445,
    },
    "paths-ai-automation": {
        "header_bottom_y": 110,
        "hero_title_y": 160,
        "step_first_y": 460,
    },
    "community": {
        "header_bottom_y": 110,
        "hero_banner_y": 140,
        "three_column_start_y": 380,
    },
}

def generate_comparison_pair(ref_img, actual_img, dest_stem, labels):
    """
    Creates a side-by-side JPG and a 50% overlay PNG with matched dimensions.
    Pads with white canvas rather than stretching to preserve aspect ratio.
    """
    ref_rgb = ref_img.convert("RGB")
    act_rgb = actual_img.convert("RGB")

    target_w = act_rgb.width
    # Scale ref proportionally to match actual image width
    scale_factor = target_w / ref_rgb.width
    scaled_ref_h = round(ref_rgb.height * scale_factor)
    ref_scaled = ref_rgb.resize((target_w, scaled_ref_h), Image.Resampling.LANCZOS)

    canvas_h = max(ref_scaled.height, act_rgb.height)

    # Pad on white canvas
    canvas_ref = Image.new("RGB", (target_w, canvas_h), "white")
    canvas_act = Image.new("RGB", (target_w, canvas_h), "white")
    canvas_ref.paste(ref_scaled, (0, 0))
    canvas_act.paste(act_rgb, (0, 0))

    # 1. Overlay (50% blend)
    overlay = Image.blend(canvas_ref, canvas_act, 0.5)
    overlay_path = OUT_DIR / f"{dest_stem}-overlay.png"
    overlay.save(overlay_path)

    # 2. Side-by-side
    header_bar_h = 36
    sbs = Image.new("RGB", (target_w * 2, canvas_h + header_bar_h), "white")
    sbs.paste(canvas_ref, (0, header_bar_h))
    sbs.paste(canvas_act, (target_w, header_bar_h))

    draw = ImageDraw.Draw(sbs)
    draw.rectangle([0, 0, target_w * 2, header_bar_h], fill="#0a192f")
    draw.text((16, 10), labels[0], fill="#ffffff")
    draw.text((target_w + 16, 10), labels[1], fill="#38bdf8")

    sbs_path = OUT_DIR / f"{dest_stem}-side-by-side.jpg"
    sbs.save(sbs_path, quality=88)

    return {
        "destStem": dest_stem,
        "overlay": overlay_path.name,
        "sideBySide": sbs_path.name,
        "width": target_w,
        "height": canvas_h,
    }

def run_comparisons():
    geo_file = DATA_DIR / "geometry.json"
    if not geo_file.exists():
        print(f"Error: {geo_file} not found.")
        return

    records = json.loads(geo_file.read_text(encoding="utf-8"))
    comparison_results = []
    landmark_analysis = []

    for item in records:
        w = item["width"]
        h = item["height"]
        route = item["route"]
        name = "home" if route == "/" else route.lstrip("/").replace("/", "-")
        stem = f"{w}-{name}"

        fold_img_path = DATA_DIR / f"{stem}-fold.png"
        if not fold_img_path.exists():
            print(f"Skipping {stem}: fold screenshot not found.")
            continue

        actual_fold = Image.open(fold_img_path)

        # Select reference mockup
        ref_name = REFS.get(name)
        ref_path = ROOT / "mockups" / ref_name if ref_name else None

        if w < 700 and name == "tools":
            mobile_ref = ROOT / "mockups/ui-10-tools-directory-mobile-v2.png"
            if mobile_ref.exists():
                ref_path = mobile_ref
                ref_img = Image.open(ref_path)
                # Crop top 90px mobile status chrome
                ref_img = ref_img.crop((0, 90, ref_img.width, ref_img.height))
            else:
                ref_img = Image.open(ref_path)
        elif ref_path and ref_path.exists():
            ref_img = Image.open(ref_path)
            # If 1505 reference match desktop, crop bottom whitespace (mockup is 1045, viewport is 1029)
            if w == 1505 and h == 1029:
                ref_img = ref_img.crop((0, 0, 1505, 1029))
        else:
            print(f"No reference for {name}")
            continue

        pair_meta = generate_comparison_pair(
            ref_img,
            actual_fold,
            stem,
            (f"Approved Reference: {ref_path.name}", f"UI-v4 {phase.capitalize()} ({w}x{h} DPR {item['dpr']})")
        )

        comparison_results.append({
            "key": stem,
            "route": route,
            "viewport": f"{w}x{h}",
            "dpr": item["dpr"],
            "reference": ref_path.name,
            **pair_meta
        })

        # Landmark measurements
        if route == "/":
            header_y = (item.get("header") or {}).get("bottom")
            card_row_y = (item.get("cardRow") or {}).get("top")
            community_strip_y = (item.get("communityStrip") or {}).get("top")
            cards = item.get("cards", [])
            first_card_y = cards[0].get("top") if cards else None

            ref_home = REF_LANDMARKS["home"]
            # At 1505x1029, compare directly with expected reference landmarks
            if w == 1505:
                landmark_analysis.append({
                    "route": route,
                    "viewport": f"{w}x{h}",
                    "landmarks": {
                        "header_bottom_y": {"actual": header_y, "reference": ref_home["header_bottom_y"], "delta": (header_y - ref_home["header_bottom_y"]) if header_y is not None else None},
                        "card_row_start_y": {"actual": card_row_y, "reference": ref_home["card_row_y"], "delta": (card_row_y - ref_home["card_row_y"]) if card_row_y is not None else None},
                        "community_strip_start_y": {"actual": community_strip_y, "reference": ref_home["community_strip_y"], "delta": (community_strip_y - ref_home["community_strip_y"]) if community_strip_y is not None else None},
                        "first_card_y": {"actual": first_card_y, "reference": ref_home["card_row_y"]},
                    }
                })
            else:
                landmark_analysis.append({
                    "route": route,
                    "viewport": f"{w}x{h}",
                    "landmarks": {
                        "header_bottom_y": {"actual": header_y},
                        "card_row_start_y": {"actual": card_row_y},
                        "community_strip_start_y": {"actual": community_strip_y},
                        "first_card_y": {"actual": first_card_y},
                    }
                })
        elif route == "/tools":
            header_y = (item.get("header") or {}).get("bottom")
            grid_y = (item.get("toolsGrid") or {}).get("top")
            cards = item.get("cards", [])
            first_card_y = cards[0].get("top") if cards else (item.get("firstToolCard") or {}).get("top")
            landmark_analysis.append({
                "route": route,
                "viewport": f"{w}x{h}",
                "landmarks": {
                    "header_bottom_y": {"actual": header_y},
                    "tools_grid_y": {"actual": grid_y},
                    "first_card_y": {"actual": first_card_y},
                }
            })
        elif route == "/paths/ai-automation":
            header_y = (item.get("header") or {}).get("bottom")
            timeline_y = (item.get("pathTimeline") or {}).get("top")
            cards = item.get("cards", [])
            first_card_y = cards[0].get("top") if cards else None
            landmark_analysis.append({
                "route": route,
                "viewport": f"{w}x{h}",
                "landmarks": {
                    "header_bottom_y": {"actual": header_y},
                    "timeline_y": {"actual": timeline_y},
                    "first_card_y": {"actual": first_card_y},
                }
            })
        elif route == "/community":
            header_y = (item.get("header") or {}).get("bottom")
            feed_y = (item.get("communityFeed") or {}).get("top")
            side_y = (item.get("communitySide") or {}).get("top")
            landmark_analysis.append({
                "route": route,
                "viewport": f"{w}x{h}",
                "landmarks": {
                    "header_bottom_y": {"actual": header_y},
                    "feed_y": {"actual": feed_y},
                    "side_y": {"actual": side_y},
                }
            })

    # Save comparison metadata
    (OUT_DIR / "comparison-meta.json").write_text(json.dumps(comparison_results, indent=2), encoding="utf-8")
    (OUT_DIR / "landmark-analysis.json").write_text(json.dumps(landmark_analysis, indent=2), encoding="utf-8")

    # Generate desktop contact sheet (1505 and 1880 side-by-side cards)
    cards = []
    for ref_route in ["home", "tools", "paths-ai-automation", "community"]:
        sbs_file = OUT_DIR / f"1505-{ref_route}-side-by-side.jpg"
        if sbs_file.exists():
            im = Image.open(sbs_file)
            cards.append(ImageOps.contain(im, (1200, 460)))

    if cards:
        total_h = sum(c.height for c in cards)
        contact = Image.new("RGB", (1200, total_h), "white")
        cur_y = 0
        for c in cards:
            contact.paste(c, (0, cur_y))
            cur_y += c.height
        contact.save(OUT_DIR / "contact-1505.jpg", quality=88)

    # Generate HTML gallery index
    html = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>SiapSatu UI v4 Baseline Evidence & Comparisons</title>
  <style>
    body {{ max-width: 1200px; margin: 40px auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0a192f; background: #f8fafc; }}
    h1 {{ color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }}
    h2 {{ color: #1e293b; margin-top: 32px; }}
    .metric-table {{ width: 100%; border-collapse: collapse; margin-bottom: 24px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }}
    .metric-table th, .metric-table td {{ padding: 10px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 14px; }}
    .metric-table th {{ background: #f1f5f9; font-weight: 600; }}
    .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 16px; margin-top: 16px; }}
    .card {{ background: white; border-radius: 8px; border: 1px solid #e2e8f0; padding: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }}
    .card img {{ width: 100%; height: auto; border-radius: 4px; display: block; }}
    .card h3 {{ font-size: 14px; margin: 8px 0 4px; color: #334155; }}
    .links a {{ color: #2563eb; text-decoration: none; font-size: 13px; margin-right: 12px; }}
    .links a:hover {{ text-decoration: underline; }}
    .badge-pass {{ display: inline-block; padding: 2px 8px; border-radius: 4px; background: #dcfce7; color: #166534; font-size: 12px; font-weight: 600; }}
    .badge-warn {{ display: inline-block; padding: 2px 8px; border-radius: 4px; background: #fef9c3; color: #854d0e; font-size: 12px; font-weight: 600; }}
    .badge-fail {{ display: inline-block; padding: 2px 8px; border-radius: 4px; background: #fee2e2; color: #991b1b; font-size: 12px; font-weight: 600; }}
  </style>
</head>
<body>
  <h1>SiapSatu UI v4 Baseline Evidence & Reference Comparisons</h1>
  <p>Fresh pre-change baseline across 7 required viewports and 4 key routes. Headless Playwright captured with fonts settled, full decode, animations settled, and reduced-motion validated.</p>
  
  <h2>Desktop 1505x1029 Reference Comparisons Overview</h2>
  <img src="comparisons/contact-1505.jpg" style="max-width:100%; border-radius:8px; border:1px solid #cbd5e1;" alt="Desktop Reference Contact">

  <h2>Landmark Alignment Summary (Desktop 1505x1029 Reference Match)</h2>
  <table class="metric-table">
    <thead>
      <tr>
        <th>Route</th>
        <th>Landmark</th>
        <th>Reference Offset</th>
        <th>Actual Baseline</th>
        <th>Delta (px)</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
"""
    for la in landmark_analysis:
        if "1505" in la["viewport"]:
            for lm_key, vals in la["landmarks"].items():
                ref_val = vals.get("reference", "N/A")
                act_val = vals.get("actual", "N/A")
                delta_val = vals.get("delta", "N/A")
                status_badge = '<span class="badge-pass">NOMINAL</span>' if delta_val != "N/A" and abs(delta_val) <= 15 else '<span class="badge-warn">SHIFTED</span>'
                html += f"""      <tr>
        <td>{la['route']}</td>
        <td><code>{lm_key}</code></td>
        <td>{ref_val}px</td>
        <td>{act_val}px</td>
        <td>{delta_val if delta_val == 'N/A' else f'{delta_val:+d}px'}</td>
        <td>{status_badge}</td>
      </tr>\n"""

    html += """    </tbody>
  </table>

  <h2>Comparison Pairs and Overlays</h2>
  <div class="grid">
"""
    for cr in comparison_results:
        html += f"""    <div class="card">
      <img src="comparisons/{cr['sideBySide']}" alt="{cr['key']} Side by Side">
      <h3>{cr['key']} ({cr['viewport']} - DPR {cr['dpr']})</h3>
      <div class="links">
        <a href="comparisons/{cr['sideBySide']}" target="_blank">Side-by-Side</a>
        <a href="comparisons/{cr['overlay']}" target="_blank">50% Overlay</a>
        <a href="{phase}/{cr['key']}-fold.png" target="_blank">Fold Capture</a>
        <a href="{phase}/{cr['key']}-full.png" target="_blank">Full Page</a>
        <a href="{phase}/{cr['key']}-reduced.png" target="_blank">Reduced Motion</a>
      </div>
    </div>\n"""

    html += """  </div>
</body>
</html>
"""
    (QA_V4 / "index.html").write_text(html, encoding="utf-8")
    print("Comparison pairs, overlays, landmark analysis, and gallery index successfully generated.")

if __name__ == "__main__":
    run_comparisons()
