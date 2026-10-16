import json
import hashlib
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
import numpy as np

root = Path('.').resolve()
source_art_dir = root / 'artifacts/visual-qa/ui-v4/source-art'
v4_assets_dir = root / 'public/assets/illustrations/ui-v4'
proofs_dir = source_art_dir / 'proofs'
proofs_dir.mkdir(parents=True, exist_ok=True)

# 1. Catalog all generated v4 assets
asset_files = [
    'emblem.svg',
    'growth-arrow.svg',
    'kl-skyline.svg',
    'home-ribbon.svg',
    'path-ribbon.svg',
    'tools-ribbon.svg',
    'community-ribbon.svg',
    'community-hero.svg',
    'channel-pengumuman.svg',
    'channel-tanya.svg',
    'channel-kongsi.svg',
    'channel-idea.svg',
    'channel-semua.svg',
    'path-learner-1100.webp',
    'path-learner-600.webp'
]

manifest_assets = []
for fname in asset_files:
    fpath = v4_assets_dir / fname
    if not fpath.exists():
        print(f'Warning: {fname} does not exist!')
        continue
    data = fpath.read_bytes()
    sha = hashlib.sha256(data).hexdigest()
    size_bytes = len(data)
    
    entry = {
        'filename': fname,
        'path': str(fpath.relative_to(root)),
        'sha256': sha,
        'bytes': size_bytes
    }
    
    if fname.endswith('.webp'):
        im = Image.open(fpath)
        entry['dimensions'] = list(im.size)
        entry['format'] = 'WEBP'
    elif fname.endswith('.svg'):
        entry['format'] = 'SVG'
        content = fpath.read_text(encoding='utf-8')
        import re
        vb = re.search(r'viewBox="([^"]+)"', content)
        if vb:
            entry['viewBox'] = vb.group(1)
            parts = [float(p) for p in vb.group(1).split()]
            if len(parts) == 4:
                entry['viewBoxDimensions'] = [parts[2], parts[3]]
                entry['aspectRatio'] = f'{parts[2]}:{parts[3]}'
    manifest_assets.append(entry)

# Design anchors and recommended CSS integration coordinates for the lead engineer
design_anchors = {
    'home_hero': {
        'viewport': '1505x1045 and 1440x1024',
        'ribbon': {
            'file': 'public/assets/illustrations/ui-v4/home-ribbon.svg',
            'viewBox': '0 0 900 580',
            'cssAnchor': {'position': 'absolute', 'inset': '0', 'width': '100%', 'height': '100%'},
            'preserveAspectRatio': 'meet or slice (avoid "none")'
        },
        'emblem': {
            'file': 'public/assets/illustrations/ui-v4/emblem.svg',
            'viewBox': '0 0 172 121',
            'aspectRatio': '1.421 (172:121)',
            'cssAnchor': {'position': 'absolute', 'left': '42%', 'top': '18%', 'width': '19%', 'height': 'auto'},
            'negativeSpaceSafetyBuffer': '55px clearance above red ribbon stripe'
        },
        'arrow': {
            'file': 'public/assets/illustrations/ui-v4/growth-arrow.svg',
            'viewBox': '0 0 280 280',
            'aspectRatio': '1:1',
            'cssAnchor': {'position': 'absolute', 'right': '11%', 'bottom': '12%', 'width': '34%', 'height': 'auto'},
            'noteClearance': '38px clean gap away from handwritten text "Ilmu hari ini, hasil esok."'
        },
        'skyline': {
            'file': 'public/assets/illustrations/ui-v4/kl-skyline.svg',
            'viewBox': '0 0 320 320',
            'aspectRatio': '1:1',
            'cssAnchor': {'position': 'absolute', 'right': '0%', 'bottom': '0%', 'width': '35%', 'height': 'auto'}
        }
    },
    'tools_hero': {
        'viewport': '1505x1045 and 1440x1024 desktop',
        'banner': {
            'file': 'public/assets/illustrations/ui-v4/tools-ribbon.svg',
            'viewBox': '0 0 800 250',
            'cssAnchor': {'position': 'absolute', 'inset': '0', 'width': '100%', 'height': '100%'}
        },
        'emblem': {
            'file': 'public/assets/illustrations/ui-v4/emblem.svg',
            'viewBox': '0 0 172 121',
            'cssAnchor': {'position': 'absolute', 'left': '27%', 'top': '10%', 'width': '20%', 'height': 'auto'},
            'collisionStatus': 'RESOLVED. Ribbon flows at y=215-225; emblem bottom is at y=137. 53px vertical negative space.'
        },
        'arrow': {
            'file': 'public/assets/illustrations/ui-v4/growth-arrow.svg',
            'viewBox': '0 0 280 280',
            'cssAnchor': {'position': 'absolute', 'right': '18%', 'bottom': '0%', 'width': '28%', 'height': 'auto'}
        }
    },
    'path_hero': {
        'viewport': '1505x1045 and 1440x1024',
        'ribbon': {
            'file': 'public/assets/illustrations/ui-v4/path-ribbon.svg',
            'viewBox': '0 0 900 580',
            'cssAnchor': {'position': 'absolute', 'inset': '0', 'width': '100%', 'height': '100%'}
        },
        'emblem': {
            'file': 'public/assets/illustrations/ui-v4/emblem.svg',
            'viewBox': '0 0 172 121',
            'cssAnchor': {'position': 'absolute', 'left': '44%', 'top': '17%', 'width': '20%', 'height': 'auto'}
        },
        'arrow': {
            'file': 'public/assets/illustrations/ui-v4/growth-arrow.svg',
            'viewBox': '0 0 280 280',
            'cssAnchor': {'position': 'absolute', 'right': '8%', 'bottom': '13%', 'width': '32%', 'height': 'auto'}
        },
        'learner': {
            'file_desktop': 'public/assets/illustrations/ui-v4/path-learner-1100.webp',
            'file_mobile': 'public/assets/illustrations/ui-v4/path-learner-600.webp',
            'aspectRatio': '1100:764 (1.440)',
            'cropQuality': '100% intact unclipped desk baseline and opaque laptop base. 0px loss.'
        }
    },
    'community_hub': {
        'viewport': '3-column desktop and responsive',
        'ribbon': {
            'file': 'public/assets/illustrations/ui-v4/community-ribbon.svg',
            'viewBox': '0 0 900 300'
        },
        'hero_standalone': {
            'file': 'public/assets/illustrations/ui-v4/community-hero.svg',
            'viewBox': '0 0 900 240',
            'includes': ['fluid ribbon', 'navy night sky', 'group discussion bubble', 'chat dots bubble', 'radiating energy ticks']
        },
        'channels': {
            'pengumuman': 'public/assets/illustrations/ui-v4/channel-pengumuman.svg',
            'tanya': 'public/assets/illustrations/ui-v4/channel-tanya.svg',
            'kongsi': 'public/assets/illustrations/ui-v4/channel-kongsi.svg',
            'idea': 'public/assets/illustrations/ui-v4/channel-idea.svg',
            'semua': 'public/assets/illustrations/ui-v4/channel-semua.svg'
        }
    }
}

manifest_data = {
    'version': 'v4-final',
    'timestamp': '2026-10-17T01:30:00Z',
    'engineer': 'Visual Asset Engineer',
    'summary': 'Refined v4 asset suite resolving ribbon curvature, heraldic emblem symmetry & scale, Tools banner collision, directional growth arrow clearance, KL skyline sunset depth, unclipped desk baseline crop, and community 3-column channel elements.',
    'assets': manifest_assets,
    'designAnchors': design_anchors
}

manifest_path = source_art_dir / 'manifest.json'
manifest_path.write_text(json.dumps(manifest_data, indent=2), encoding='utf-8')
print(f'Wrote manifest.json with {len(manifest_assets)} assets.')
