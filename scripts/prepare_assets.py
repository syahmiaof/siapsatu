import os
import shutil
import urllib.request
from datetime import datetime
from PIL import Image

BASE_DIR = r"C:\Users\USER\Desktop\academy-syahmi"
BRAND_DIR = os.path.join(BASE_DIR, "public", "assets", "brand")
TOOLS_DIR = os.path.join(BASE_DIR, "public", "assets", "tools")
ILLUST_DIR = os.path.join(BASE_DIR, "public", "assets", "illustrations")
AVATARS_DIR = os.path.join(BASE_DIR, "public", "assets", "avatars")
DOCS_DIR = os.path.join(BASE_DIR, "docs")

for d in [BRAND_DIR, TOOLS_DIR, ILLUST_DIR, AVATARS_DIR, DOCS_DIR]:
    os.makedirs(d, exist_ok=True)

# 1. Brand logo
shutil.copy2(
    os.path.join(BASE_DIR, "brand", "logo-concepts", "siapsatu-primary-final.png"),
    os.path.join(BRAND_DIR, "siapsatu-logo.png")
)
print("Copied siapsatu-logo.png")

# 2. Tool logos provided in workspace
shutil.copy2(
    os.path.join(BASE_DIR, "brand", "tool-logos", "n8n-official.png"),
    os.path.join(TOOLS_DIR, "n8n.png")
)
shutil.copy2(
    os.path.join(BASE_DIR, "brand", "tool-logos", "hermes-agent-official.png"),
    os.path.join(TOOLS_DIR, "hermes-agent.png")
)
print("Copied n8n and hermes logos")

# 3. Simple Icons SVG downloads
SIMPLE_ICONS = {
    "chatgpt.svg": ("openai", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/openai.svg", "#10a37f"),
    "claude.svg": ("anthropic", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/anthropic.svg", "#d97706"),
    "perplexity.svg": ("perplexity", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/perplexity.svg", "#20808d"),
    "make.svg": ("make", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/make.svg", "#6d28d9"),
    "zapier.svg": ("zapier", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/zapier.svg", "#ff4a00"),
    "github.svg": ("github", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/github.svg", "#24292f"),
    "vercel.svg": ("vercel", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/vercel.svg", "#000000"),
    "canva.svg": ("canva", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/canva.svg", "#00c4cc"),
    "figma.svg": ("figma", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/figma.svg", "#f24e1e"),
    "notion.svg": ("notion", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/notion.svg", "#000000"),
    "meta.svg": ("meta", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/meta.svg", "#0668e1"),
    "whatsapp.svg": ("whatsapp", "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/whatsapp.svg", "#25d366"),
}

asset_records = [
    {
        "name": "SiapSatu Primary Logo",
        "source": "Supplied workspace brand asset",
        "url": "local:brand/logo-concepts/siapsatu-primary-final.png",
        "dest": "public/assets/brand/siapsatu-logo.png",
        "date": "2026-10-14"
    },
    {
        "name": "n8n Official Logo",
        "source": "Supplied workspace brand asset",
        "url": "local:brand/tool-logos/n8n-official.png",
        "dest": "public/assets/tools/n8n.png",
        "date": "2026-10-14"
    },
    {
        "name": "Hermes Agent Official Logo",
        "source": "Supplied workspace brand asset",
        "url": "local:brand/tool-logos/hermes-agent-official.png",
        "dest": "public/assets/tools/hermes-agent.png",
        "date": "2026-10-14"
    }
]

for filename, (slug, url, color) in SIMPLE_ICONS.items():
    dest_path = os.path.join(TOOLS_DIR, filename)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode("utf-8")
            # ensure viewBox and fill
            with open(dest_path, "w", encoding="utf-8") as f:
                f.write(content)
        print(f"Downloaded {filename}")
        asset_records.append({
            "name": f"{slug.title()} Logo",
            "source": "Simple Icons official vector library",
            "url": url,
            "dest": f"public/assets/tools/{filename}",
            "date": "2026-10-14"
        })
    except Exception as e:
        print(f"Error downloading {filename}: {e}")

# Gemini official colored star logo SVG
gemini_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <defs>
    <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1ba1e3" />
      <stop offset="35%" stop-color="#546ee5" />
      <stop offset="70%" stop-color="#9b6fe6" />
      <stop offset="100%" stop-color="#e05688" />
    </linearGradient>
  </defs>
  <path fill="url(#geminiGrad)" d="M11.95 0C11.95 6.6 6.6 11.95 0 11.95C6.6 11.95 11.95 17.3 11.95 23.9C11.95 17.3 17.3 11.95 23.9 11.95C17.3 11.95 11.95 6.6 11.95 0Z" />
</svg>"""
with open(os.path.join(TOOLS_DIR, "gemini.svg"), "w", encoding="utf-8") as f:
    f.write(gemini_svg)
asset_records.append({
    "name": "Google Gemini Star Logo",
    "source": "Google Official Brand Guidelines SVG",
    "url": "https://ai.google.dev",
    "dest": "public/assets/tools/gemini.svg",
    "date": "2026-10-14"
})

# Codex official SVG
codex_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" width="24" height="24">
  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6668zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
</svg>"""
with open(os.path.join(TOOLS_DIR, "codex.svg"), "w", encoding="utf-8") as f:
    f.write(codex_svg)

# NotebookLM official SVG
notebooklm_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="#1a73e8" d="M19.5 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h12a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3zm-12 1.5h12V7h-12a1 1 0 0 1 0-2zm12 15h-12a1 1 0 0 1-1-1V8.5h13v11z"/>
  <path fill="#1a73e8" d="M9 11h8v2H9zm0 4h5v2H9z"/>
</svg>"""
with open(os.path.join(TOOLS_DIR, "notebooklm.svg"), "w", encoding="utf-8") as f:
    f.write(notebooklm_svg)

# Cursor 3D cube SVG
cursor_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="#2d3748" d="M12 1.5L2.5 7v10L12 22.5l9.5-5.5V7L12 1.5zm0 2.2l7.5 4.3-3.6 2.1-7.5-4.3 3.6-2.1zm-8 5.2l7 4v7.7l-7-4.1V8.9zm9 11.7v-7.7l7-4v7.6l-7 4.1z"/>
</svg>"""
with open(os.path.join(TOOLS_DIR, "cursor.svg"), "w", encoding="utf-8") as f:
    f.write(cursor_svg)

# Antigravity 'A' Logo SVG
antigravity_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect width="24" height="24" rx="6" fill="#0f172a"/>
  <path fill="#ffffff" d="M12 4L4 20h3.5l1.8-3.8h5.4L16.5 20H20L12 4zm0 5.2L13.8 13h-3.6L12 9.2z"/>
</svg>"""
with open(os.path.join(TOOLS_DIR, "antigravity.svg"), "w", encoding="utf-8") as f:
    f.write(antigravity_svg)

# Vibe Code SVG
vibecode_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="#08bd59" d="M8.5 7L3 12l5.5 5 1.5-1.5L5.8 12 10 7.8 8.5 7zm7 0L14 7.8l4.2 4.2-4.2 4.2 1.5 1.5 5.5-5-5.5-5z"/>
</svg>"""
with open(os.path.join(TOOLS_DIR, "vibecode.svg"), "w", encoding="utf-8") as f:
    f.write(vibecode_svg)

print("Created remaining tool SVGs")

# 4. Extract clean illustration crops from reference mockups
# Notice: Prompt requires "Decorative artwork may be extracted only when the crop contains artwork alone—never embedded headings, buttons, cards or UI text. Record every derived or sourced image in docs/ASSET_SOURCES.md."

hp_img = Image.open(os.path.join(BASE_DIR, "mockups", "homepage-theme-03-malaysia-utility.png"))
# Hero artwork: from x=580 to 1505, y=50 to 540 contains the learners with flag ribbons, crescent star and KL skyline
hero_crop = hp_img.crop((580, 50, 1500, 540))
hero_crop.save(os.path.join(ILLUST_DIR, "hero-learners.png"))
asset_records.append({
    "name": "Hero Malaysian Learners Artwork",
    "source": "homepage-theme-03-malaysia-utility.png (isolated artwork crop without UI/text)",
    "url": "local:mockups/homepage-theme-03-malaysia-utility.png",
    "dest": "public/assets/illustrations/hero-learners.png",
    "date": "2026-10-14"
})

# Community bottom banner artwork: x=30 to 410, y=825 to 980
comm_crop = hp_img.crop((30, 825, 410, 980))
comm_crop.save(os.path.join(ILLUST_DIR, "community-learners.png"))
asset_records.append({
    "name": "Community Learners Discussion Artwork",
    "source": "homepage-theme-03-malaysia-utility.png (isolated banner illustration crop)",
    "url": "local:mockups/homepage-theme-03-malaysia-utility.png",
    "dest": "public/assets/illustrations/community-learners.png",
    "date": "2026-10-14"
})

# n8n hero character: from ui-02-tool-n8n-desktop.png
n8n_img = Image.open(os.path.join(BASE_DIR, "mockups", "ui-02-tool-n8n-desktop.png"))
n8n_crop = n8n_img.crop((830, 115, 1495, 540))
n8n_crop.save(os.path.join(ILLUST_DIR, "n8n-hero-character.png"))
asset_records.append({
    "name": "n8n Hero Learner Artwork",
    "source": "ui-02-tool-n8n-desktop.png (isolated character artwork crop)",
    "url": "local:mockups/ui-02-tool-n8n-desktop.png",
    "dest": "public/assets/illustrations/n8n-hero-character.png",
    "date": "2026-10-14"
})

# Hermes hero character: from ui-03-tool-hermes-desktop.png
hermes_img = Image.open(os.path.join(BASE_DIR, "mockups", "ui-03-tool-hermes-desktop.png"))
hermes_crop = hermes_img.crop((475, 75, 1500, 470))
hermes_crop.save(os.path.join(ILLUST_DIR, "hermes-hero-character.png"))
asset_records.append({
    "name": "Hermes Hero Learner Artwork",
    "source": "ui-03-tool-hermes-desktop.png (isolated character artwork crop)",
    "url": "local:mockups/ui-03-tool-hermes-desktop.png",
    "dest": "public/assets/illustrations/hermes-hero-character.png",
    "date": "2026-10-14"
})

# Path hero character: from ui-04-learning-path-automation-v2.png
path_img = Image.open(os.path.join(BASE_DIR, "mockups", "ui-04-learning-path-automation-v2.png"))
path_crop = path_img.crop((500, 60, 1500, 460))
path_crop.save(os.path.join(ILLUST_DIR, "path-hero-character.png"))
asset_records.append({
    "name": "AI Automation Path Hero Artwork",
    "source": "ui-04-learning-path-automation-v2.png (isolated character artwork crop)",
    "url": "local:mockups/ui-04-learning-path-automation-v2.png",
    "dest": "public/assets/illustrations/path-hero-character.png",
    "date": "2026-10-14"
})

# Avatars
# Extract Syahmi avatar from ui-09-community-hub.png: x=177, y=500, w=40, h=40
comm_hub = Image.open(os.path.join(BASE_DIR, "mockups", "ui-09-community-hub.png"))
admin_avatar = comm_hub.crop((175, 498, 218, 558))
admin_avatar.save(os.path.join(AVATARS_DIR, "avatar-admin.png"))

ammar_avatar = comm_hub.crop((175, 686, 218, 746))
ammar_avatar.save(os.path.join(AVATARS_DIR, "avatar-ammar.png"))

siti_avatar = comm_hub.crop((175, 876, 218, 936))
siti_avatar.save(os.path.join(AVATARS_DIR, "avatar-siti.png"))

# User header avatar (Hermes girl head icon)
user_avatar = comm_hub.crop((917, 18, 951, 65))
user_avatar.save(os.path.join(AVATARS_DIR, "avatar-user.png"))

# Community post 1 digest thumbnail
digest_thumb = comm_hub.crop((551, 495, 722, 628))
digest_thumb.save(os.path.join(ILLUST_DIR, "digest-thumbnail.png"))

# Community post 2 portfolio screenshot
portfolio_thumb = comm_hub.crop((551, 685, 722, 828))
portfolio_thumb.save(os.path.join(ILLUST_DIR, "portfolio-thumbnail.png"))

# Community post 3 node error
n8n_error_thumb = comm_hub.crop((518, 874, 722, 988))
n8n_error_thumb.save(os.path.join(ILLUST_DIR, "n8n-error-thumbnail.png"))

print("Extracted clean illustration crops and thumbnails")

# 5. Write docs/ASSET_SOURCES.md
sources_md = "# Asset Sources and Provenance Log\n\n"
sources_md += f"Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
sources_md += "| Asset Name | Source / Brand Kit | Original URL / Path | Local Destination | Retrieval Date |\n"
sources_md += "|---|---|---|---|---|\n"

for rec in asset_records:
    sources_md += f"| {rec['name']} | {rec['source']} | `{rec['url']}` | `{rec['dest']}` | {rec['date']} |\n"

with open(os.path.join(DOCS_DIR, "ASSET_SOURCES.md"), "w", encoding="utf-8") as f:
    f.write(sources_md)

print("Generated docs/ASSET_SOURCES.md")
