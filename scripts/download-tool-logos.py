"""Fetch the 50 SiapSatu expansion marks with provenance and validation.

This script does not edit runtime data or existing protected brand assets.
"""

from __future__ import annotations

import hashlib
import io
import json
import re
import tarfile
import zipfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
from xml.etree import ElementTree

import requests
from bs4 import BeautifulSoup
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "assets" / "tools" / "expansion-2026"
MANIFEST = ROOT / "docs" / "TOOL_LOGO_MANIFEST_2026-10-17.json"
RESEARCH = ROOT / "docs" / "TOOL_CATALOG_AUDIT_AND_50_IDEAS_2026-10-17.md"

LOBE_VERSION = "1.95.1"
LOBE_TARBALL = "https://registry.npmjs.org/@lobehub/icons-static-svg/-/icons-static-svg-1.95.1.tgz"
LOBE_SHA256 = "fc2a063f9c5db18f6b3f27a62670c95a9e767cc45ba7bbe5d949f9f9af090fc3"
SIMPLE_VERSION = "16.35.0"
SIMPLE_TARBALL = "https://registry.npmjs.org/simple-icons/-/simple-icons-16.35.0.tgz"
SIMPLE_SHA256 = "20ebead4f6bc93464812a5e260d19fc4d84772e5eeff69a6fbea263ca2441c5f"
HEYGEN_ZIP = "https://dynamic.heygen.ai/Heygen%20Brand-kit/heygen-brandkit.zip"
MCP_ICON = (
    "https://modelcontextprotocol.io/mintlify-assets/_mintlify/favicons/mcp/"
    "ebiVJzri-bsiCfVZ/_generated/favicon/android-chrome-192x192.png"
)

# Source syntax: lobe:<member>, simple:<member>, url:<address>, heygen,
# gamma, or local:<path>. Product/parent/protocol distinctions are deliberate.
SPECS = [
    (1, "adobe-firefly", "url:https://main--federal--adobecom.aem.page/federal/assets/svgs/firefly-appicon-256.svg", "product", "first-party"),
    (2, "midjourney", "lobe:midjourney.svg", "product", "community-vector"),
    (3, "ideogram", "lobe:ideogram.svg", "product", "community-vector"),
    (4, "recraft", "lobe:recraft.svg", "product", "community-vector"),
    (5, "runway", "lobe:runway.svg", "product", "community-vector"),
    (6, "pika", "lobe:pika.svg", "product", "community-vector"),
    (7, "luma", "lobe:luma-color.svg", "product", "community-vector"),
    (8, "kling-ai", "lobe:kling-color.svg", "product", "community-vector"),
    (9, "heygen", "heygen", "product", "first-party-brand-kit"),
    (10, "elevenlabs", "lobe:elevenlabs.svg", "product", "community-vector"),
    (11, "suno", "lobe:suno.svg", "product", "community-vector"),
    (12, "descript", "url:https://static-cdn.descript.com/web/icons/favicon.svg", "product", "first-party"),
    (13, "capcut-ai", "lobe:capcut.svg", "product", "community-vector"),
    (14, "adobe-express", "url:https://main--federal--adobecom.aem.page/federal/assets/svgs/express.svg", "product", "first-party"),
    (15, "opusclip", "url:https://cdn.prod.website-files.com/6388604483b03a9ecb34d695/6435197bfb1d6e486e04c37b_webclip.png", "product", "first-party-site-icon"),
    (16, "gamma", "gamma", "product", "first-party-developer-docs"),
    (17, "napkin-ai", "url:https://www.napkin.ai/apple-touch-icon.png?v=2", "product", "first-party-site-icon"),
    (18, "elicit", "url:https://framerusercontent.com/images/GWXKVhGBLC34aTLlmLIMsRVb4.png", "product", "first-party-site-icon"),
    (19, "granola", "url:https://www.granola.ai/favicon/favicon.svg", "product", "first-party-site-icon"),
    (20, "otter-ai", "url:https://cdn.prod.website-files.com/618e9316785b3582a5178502/618e943a80919a98b5e9bf69_apple-icon.png", "product", "first-party-site-icon"),
    (21, "genspark", "url:https://www.genspark.ai/apple-touch-icon.png", "product", "first-party-site-icon"),
    (22, "manus", "lobe:manus.svg", "product", "community-vector"),
    (23, "github-copilot", "lobe:githubcopilot.svg", "product", "community-vector"),
    (24, "windsurf", "lobe:windsurf.svg", "product", "community-vector"),
    (25, "replit-agent", "lobe:replit-color.svg", "parent-platform", "community-vector"),
    (26, "bolt-new", "url:https://bolt.new/static/favicon.svg", "product", "first-party-site-icon"),
    (27, "lovable", "lobe:lovable-color.svg", "product", "community-vector"),
    (28, "v0", "lobe:v0.svg", "product", "community-vector"),
    (29, "aider", "url:https://aider.chat/assets/logo.svg", "product-wordmark", "first-party"),
    (30, "cline", "lobe:cline.svg", "product", "community-vector"),
    (31, "devin", "lobe:devin-color.svg", "product", "community-vector"),
    (32, "kilo", "lobe:kilocode.svg", "product", "community-vector"),
    (33, "dify", "lobe:dify-color.svg", "product", "community-vector"),
    (34, "flowise", "url:https://raw.githubusercontent.com/FlowiseAI/Flowise/main/packages/ui/public/logo512.png", "product", "first-party-repository"),
    (35, "langflow", "simple:langflow.svg", "product", "community-vector"),
    (36, "langgraph", "lobe:langgraph-color.svg", "product", "community-vector"),
    (37, "crewai", "lobe:crewai-color.svg", "product", "community-vector"),
    (38, "openai-agents-sdk", "url:https://raw.githubusercontent.com/openai/openai-agents-python/main/docs/assets/images/favicon-platform.svg", "parent-platform", "first-party-repository"),
    (39, "google-adk", "url:https://raw.githubusercontent.com/google/adk-python/main/src/google/adk/cli/browser/adk_favicon.svg", "product", "first-party-repository"),
    (40, "microsoft-agent-framework", "url:https://raw.githubusercontent.com/microsoft/agent-framework/main/dotnet/nuget/icon.png", "product", "first-party-repository"),
    (41, "pydanticai", "lobe:pydanticai-color.svg", "product", "community-vector"),
    (42, "mastra", "lobe:mastra.svg", "product", "community-vector"),
    (43, "mcp-inspector", f"url:{MCP_ICON}", "protocol", "first-party-protocol-site"),
    (44, "github-mcp-server", "local:public/assets/tools/github.svg", "parent-platform", "existing-verified-local-mark"),
    (45, "playwright-mcp", "url:https://raw.githubusercontent.com/microsoft/playwright/main/packages/dashboard/public/playwright-logo.svg", "parent-platform", "first-party-repository"),
    (46, "context7-mcp", "url:https://raw.githubusercontent.com/upstash/context7/master/public/context7-icon.svg", "product", "first-party-repository"),
    (47, "supabase-mcp", "simple:supabase.svg", "parent-platform", "community-vector"),
    (48, "cloudflare-documentation-mcp", "lobe:cloudflare-color.svg", "parent-platform", "community-vector"),
    (49, "mcp-filesystem-server", f"url:{MCP_ICON}", "protocol", "first-party-protocol-site"),
    (50, "mcp-memory-server", f"url:{MCP_ICON}", "protocol", "first-party-protocol-site"),
]


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def get(url: str) -> bytes:
    response = requests.get(url, timeout=25, headers={"User-Agent": "SiapSatu asset research/1.0"})
    response.raise_for_status()
    if len(response.content) > 8_000_000:
        raise ValueError(f"Asset too large: {url}")
    return response.content


def package(url: str, expected_hash: str) -> dict[str, bytes]:
    data = get(url)
    if sha256(data) != expected_hash:
        raise ValueError(f"Pinned package hash changed: {url}")
    archive = tarfile.open(fileobj=io.BytesIO(data), mode="r:gz")
    return {
        member.name: archive.extractfile(member).read()
        for member in archive
        if member.isfile() and member.name.endswith(".svg")
    }


def official_urls() -> dict[int, str]:
    result = {}
    for line in RESEARCH.read_text(encoding="utf-8").splitlines():
        match = re.match(r"^\|\s*(\d+)\s*\|.*\|\s*\[[^]]+\]\((https://[^)]+)\)\s*\|$", line)
        if match and int(match.group(1)) <= 50:
            result[int(match.group(1))] = match.group(2)
    if len(result) != 50:
        raise ValueError(f"Expected 50 official product links, got {len(result)}")
    return result


def gamma_source() -> str:
    page = "https://developers.gamma.app/"
    soup = BeautifulSoup(get(page), "html.parser")
    for tag in soup.find_all("link"):
        if "apple-touch-icon" in tag.get("rel", []):
            original = parse_qs(urlsplit(tag["href"]).query).get("url", [])
            if original and "Gamma-Avatar_Light" in original[0]:
                return original[0]
    raise ValueError("Gamma official developer avatar not found")


def validate(data: bytes, suffix: str) -> dict:
    if suffix == ".svg":
        root = ElementTree.fromstring(data)
        if not root.tag.endswith("svg"):
            raise ValueError("Not an SVG root")
        for element in root.iter():
            if element.tag.lower().endswith(("script", "foreignobject")):
                raise ValueError("Active SVG content")
            for attr, value in element.attrib.items():
                key = attr.split("}")[-1].lower()
                if key.startswith("on") or key == "href" and value.startswith(("http:", "https:", "javascript:")):
                    raise ValueError("External or active SVG reference")
        return {"format": "svg", "viewBox": root.attrib.get("viewBox")}
    image = Image.open(io.BytesIO(data))
    image.verify()
    image = Image.open(io.BytesIO(data))
    if image.format != "PNG" or min(image.size) < 96:
        raise ValueError(f"Expected PNG >=96px, got {image.format} {image.size}")
    return {"format": "png", "width": image.width, "height": image.height}


def fetch_one(spec, lobe, simple, gamma_url):
    number, slug, source, representation, provenance = spec
    if source.startswith("lobe:"):
        member = f"package/icons/{source.removeprefix('lobe:')}"
        data = lobe[member]
        url = f"{LOBE_TARBALL}#{member}"
        suffix = ".svg"
    elif source.startswith("simple:"):
        member = f"package/icons/{source.removeprefix('simple:')}"
        data = simple[member]
        url = f"{SIMPLE_TARBALL}#{member}"
        suffix = ".svg"
    elif source == "heygen":
        member = "heygen-brandkit/heygen-symbol-blue-logo.svg"
        archive = zipfile.ZipFile(io.BytesIO(get(HEYGEN_ZIP)))
        data = archive.read(member)
        url = f"{HEYGEN_ZIP}#{member}"
        suffix = ".svg"
    elif source == "gamma":
        url = gamma_url
        data = get(url)
        suffix = ".png"
    elif source.startswith("local:"):
        path = ROOT / source.removeprefix("local:")
        url = path.as_uri()
        data = path.read_bytes()
        suffix = path.suffix
    else:
        url = source.removeprefix("url:")
        data = get(url)
        suffix = ".svg" if urlsplit(url).path.lower().endswith(".svg") else ".png"
    details = validate(data, suffix)
    return number, slug, data, suffix, url, representation, provenance, details


def main() -> None:
    if len(SPECS) != 50 or {item[0] for item in SPECS} != set(range(1, 51)):
        raise ValueError("Specs must contain exactly 50 unique numbered tools")
    official = official_urls()
    lobe = package(LOBE_TARBALL, LOBE_SHA256)
    simple = package(SIMPLE_TARBALL, SIMPLE_SHA256)
    gamma_url = gamma_source()
    fetched = []
    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(fetch_one, spec, lobe, simple, gamma_url) for spec in SPECS]
        for future in as_completed(futures):
            fetched.append(future.result())

    OUTPUT.mkdir(parents=True, exist_ok=True)
    entries = []
    for number, slug, data, suffix, url, representation, provenance, details in sorted(fetched):
        path = OUTPUT / f"{slug}{suffix}"
        path.write_bytes(data)
        entries.append({
            "number": number,
            "slug": slug,
            "asset": str(path.relative_to(ROOT)).replace("\\", "/"),
            "officialProductPage": official[number],
            "source": url,
            "provenance": provenance,
            "brandRepresentation": representation,
            "sha256": sha256(data),
            "bytes": len(data),
            **details,
        })
    MANIFEST.write_text(json.dumps({
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "scope": "50 SiapSatu expansion tools; assets staged for UI demo, not wired into runtime",
        "lobeVersion": LOBE_VERSION,
        "simpleIconsVersion": SIMPLE_VERSION,
        "count": len(entries),
        "entries": entries,
    }, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Saved {len(entries)} validated brand assets to {OUTPUT}")
    print(f"Manifest: {MANIFEST}")


if __name__ == "__main__":
    main()
