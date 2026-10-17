import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "docs", "TOOL_LOGO_MANIFEST_2026-10-17.json");
const outputDir = path.join(root, "artifacts", "tool-logo-qa");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
fs.mkdirSync(outputDir, { recursive: true });

const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));
const cards = manifest.entries.map((entry) => {
  const src = `../../${entry.asset}`;
  const label = entry.slug.replaceAll("-", " ");
  return `<article class="card"><div class="mark"><img src="${escape(src)}" alt="${escape(label)}" /></div><div class="number">${String(entry.number).padStart(2, "0")}</div><h2>${escape(label)}</h2><p>${escape(entry.provenance)} · ${escape(entry.brandRepresentation)}</p></article>`;
}).join("\n");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8" /><title>SiapSatu tool logo QA</title><style>
  *{box-sizing:border-box} body{margin:0;background:#f1f4f9;color:#071a3d;font-family:Arial,sans-serif;padding:28px}
  header{display:flex;align-items:baseline;justify-content:space-between;margin:0 0 20px}h1{font-size:28px;margin:0}header p{font-size:13px;margin:0;color:#52617a}
  main{display:grid;grid-template-columns:repeat(5,1fr);gap:13px}.card{background:#fff;border:1px solid #d7dfec;border-radius:16px;padding:13px;min-height:174px;position:relative;overflow:hidden}
  .mark{height:90px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#f7f9fc}.mark img{width:78px;height:78px;object-fit:contain}
  .number{position:absolute;top:17px;left:17px;color:#8c9ab0;font-size:12px;font-weight:700}h2{text-transform:capitalize;font-size:15px;line-height:1.15;margin:10px 0 4px}p{font-size:10px;line-height:1.2;margin:0;color:#6b7890}
  .card:has(img[src*="aider.svg"]) .mark img{width:155px;height:72px}
</style></head><body><header><h1>SiapSatu · 50 tool marks</h1><p>Asset QA · 17 Oct 2026 · staged only</p></header><main>${cards}</main></body></html>`;
const htmlPath = path.join(outputDir, "contact-sheet.html");
fs.writeFileSync(htmlPath, html);

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1550, height: 1950 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(htmlPath).href);
  await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
  });
  const failures = await page.locator("img").evaluateAll((images) => images
    .filter((image) => !image.complete || image.naturalWidth === 0)
    .map((image) => image.getAttribute("src")));
  if (failures.length) throw new Error(`Broken logo images: ${failures.join(", ")}`);
  const screenshotPath = path.join(outputDir, "contact-sheet.png");
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Rendered ${manifest.entries.length} logos: ${screenshotPath}`);
} finally {
  await browser.close();
}
