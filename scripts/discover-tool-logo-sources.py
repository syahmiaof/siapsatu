"""Inspect first-party pages for icon candidates; read-only research helper."""

from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup


SITES = {
    "heygen": "https://www.heygen.com/",
    "descript": "https://www.descript.com/",
    "adobe-express": "https://www.adobe.com/express/",
    "opusclip": "https://www.opus.pro/",
    "gamma": "https://gamma.app/",
    "napkin-ai": "https://www.napkin.ai/",
    "elicit": "https://elicit.com/",
    "granola": "https://www.granola.ai/",
    "otter-ai": "https://otter.ai/",
    "genspark": "https://www.genspark.ai/",
    "bolt-new": "https://bolt.new/",
    "aider": "https://aider.chat/",
    "flowise": "https://flowiseai.com/",
    "playwright": "https://playwright.dev/",
    "context7": "https://context7.com/",
}


def discover(item):
    name, url = item
    try:
        response = requests.get(
            url,
            headers={"User-Agent": "Mozilla/5.0 (SiapSatu logo research)"},
            timeout=15,
        )
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        options = []
        for tag in soup.find_all("link"):
            rel = " ".join(tag.get("rel", []))
            href = tag.get("href")
            if href and ("icon" in rel or rel == "apple-touch-icon"):
                options.append((rel, urljoin(response.url, href), tag.get("sizes", "")))
        for tag in soup.find_all("meta"):
            if tag.get("property") in ("og:image", "og:logo") and tag.get("content"):
                options.append((tag.get("property"), urljoin(response.url, tag["content"]), ""))
        return name, response.status_code, response.url, options[:12]
    except Exception as exc:
        return name, "error", url, [str(exc)]


with ThreadPoolExecutor(max_workers=6) as pool:
    results = [pool.submit(discover, item) for item in SITES.items()]
    for future in as_completed(results):
        print(future.result(), flush=True)
