import cv2
import numpy as np
import json

ref = cv2.imread('artifacts/visual-qa/homepage-v3/reference.png')
cur = cv2.imread('artifacts/visual-qa/homepage-v3/current.png')

H, W, _ = ref.shape
assert cur.shape == (H, W, 3), f"Shape mismatch: ref {ref.shape} vs cur {cur.shape}"

# Compute per-pixel absolute difference
abs_diff = np.abs(ref.astype(np.float32) - cur.astype(np.float32))

# Overall MAE
total_mae = float(np.mean(abs_diff))

# Section metrics:
# 1. Header (0..76)
header_mae = float(np.mean(abs_diff[0:76, :]))
# 2. Hero Left (76..486, x: 0..520)
hero_left_mae = float(np.mean(abs_diff[76:486, 0:520]))
# 3. Hero Right (76..486, x: 520..1280)
hero_right_mae = float(np.mean(abs_diff[76:486, 520:1280]))
# 4. Hero full (76..486)
hero_total_mae = float(np.mean(abs_diff[76:486, :]))
# 5. Cards (486..746)
cards_mae = float(np.mean(abs_diff[486:746, :]))
# 6. Community (746..888)
community_mae = float(np.mean(abs_diff[746:888, :]))

metrics = {
    "total_mae": total_mae,
    "header_0_76": header_mae,
    "hero_total_76_486": hero_total_mae,
    "hero_left": hero_left_mae,
    "hero_right": hero_right_mae,
    "cards_486_746": cards_mae,
    "community_746_888": community_mae
}

print(json.dumps(metrics, indent=2))
with open('artifacts/visual-qa/homepage-v3/geometry.json', 'w') as f:
    json.dump(metrics, f, indent=2)

# Generate 50% overlay
overlay = cv2.addWeighted(ref, 0.5, cur, 0.5, 0)
cv2.imwrite('artifacts/visual-qa/homepage-v3/overlay.png', overlay)

# Generate difference heatmap
# amplify diff for visibility
gray_diff = cv2.cvtColor(abs_diff.astype(np.uint8), cv2.COLOR_BGR2GRAY)
heatmap = cv2.applyColorMap(np.clip(gray_diff * 4, 0, 255).astype(np.uint8), cv2.COLORMAP_JET)
cv2.imwrite('artifacts/visual-qa/homepage-v3/difference.png', heatmap)

# Generate side-by-side comparison
side_by_side = np.hstack([ref, cur])
cv2.imwrite('artifacts/visual-qa/homepage-v3/comparison.png', side_by_side)
print("Saved overlay.png, difference.png, and comparison.png")
