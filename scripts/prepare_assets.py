"""Reproduce supplied brand copies and the display crop. Never crop mockup UI."""
from pathlib import Path
import shutil
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
for source, target in [
    ('brand/logo-concepts/siapsatu-primary-final.png', 'public/assets/brand/siapsatu-logo.png'),
    ('brand/tool-logos/n8n-official.png', 'public/assets/tools/n8n.png'),
    ('brand/tool-logos/hermes-agent-official.png', 'public/assets/tools/hermes-agent.png'),
]:
    destination = ROOT / target
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / source, destination)
Image.open(ROOT / 'brand/logo-concepts/siapsatu-primary-final.png').crop((99,213,1710,668)).save(ROOT / 'public/assets/brand/siapsatu-display.png')
print('Supplied marks copied; exact-pixel display crop created. Clean illustrations are separately generated assets. Provenance unchanged.')
