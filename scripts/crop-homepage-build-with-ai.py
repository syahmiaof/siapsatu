"""Reproducible, lossless slices of founder-approved mockups. Originals never modified."""
from pathlib import Path
from PIL import Image
import hashlib, json

root = Path(__file__).resolve().parents[1]
source = root / "mockups/build-with-ai-v3"
out = root / "public/assets/home/build-with-ai-v3"
out.mkdir(parents=True, exist_ok=True)
sources = {
    "desktop": Image.open(source / "homepage-desktop.png").convert("RGB"),
    "mobile": Image.open(source / "homepage-mobile.png").convert("RGB"),
}
slices = [
    ("hero-desktop", "desktop", (0, 0, 1536, 572)),
    ("hero-mobile", "mobile", (0, 0, 809, 598)),
    ("dock-mobile", "mobile", (0, 1868, 809, 1944)),
]
desktop_x = [0, 312, 607, 910, 1227, 1536]
mobile_y = [598, 860, 1138, 1396, 1641, 1868]
for i in range(5):
    slices.append((f"topic-{i+1}-desktop", "desktop", (desktop_x[i], 572, desktop_x[i+1], 1024)))
    slices.append((f"topic-{i+1}-mobile", "mobile", (0, mobile_y[i], 809, mobile_y[i+1])))
manifest = {"sources": {}, "slices": []}
for kind in sources:
    p = source / f"homepage-{kind}.png"
    manifest["sources"][kind] = {"path":str(p.relative_to(root)), "sha256":hashlib.sha256(p.read_bytes()).hexdigest(), "size":sources[kind].size}
for name, kind, box in slices:
    p = out / f"{name}.webp"
    cropped = sources[kind].crop(box)
    cropped.save(p, "WEBP", lossless=True, method=6)
    # Decode and compare every pixel: compression must not alter source artwork.
    assert Image.open(p).convert("RGB").tobytes() == cropped.tobytes()
    manifest["slices"].append({"file":p.name, "source":kind,"box":box,"size":cropped.size,"bytes":p.stat().st_size})
(out / "manifest.json").write_text(json.dumps(manifest,indent=2), encoding="utf-8")
print(json.dumps({"count":len(slices),"bytes":sum(s["bytes"] for s in manifest["slices"]),"losslessPixelsVerified":True}))
