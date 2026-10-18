import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const base = process.env.QA_URL || "http://localhost:3114";
const out = "artifacts/homepage-student-2026-10-18";
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const results = [];
for (const [width, height] of [
  [1440, 900],
  [768, 1024],
  [390, 844],
  [360, 800],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${out}/home-${width}-fold.png` });
  await page.screenshot({
    path: `${out}/home-${width}-full.png`,
    fullPage: true,
  });
  const metrics = await page.evaluate(() => {
    const rect = (s) => {
      const r = document.querySelector(s)?.getBoundingClientRect();
      return r
        ? {
            x: r.x,
            y: r.y,
            width: r.width,
            height: r.height,
            bottom: r.bottom,
            right: r.right,
          }
        : null;
    };
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      firstCard: rect('section[aria-label="Hasil pertama untuk student"] a'),
      dock: rect("[data-fixed-dock]"),
      subtitle: rect('section[aria-label="Pengenalan SiapSatu"] p'),
      art: rect('section[aria-label="Pengenalan SiapSatu"] picture'),
      brokenImages: [...document.images]
        .filter(
          (i) =>
            i.getClientRects().length && (!i.complete || i.naturalWidth === 0),
        )
        .map((i) => i.src),
    };
  });
  assert.equal(metrics.overflow, false, `Overflow at ${width}px`);
  assert.deepEqual(
    metrics.brokenImages,
    [],
    `Visible image failure at ${width}px`,
  );
  if (width <= 390)
    assert.ok(
      metrics.firstCard.bottom <= metrics.dock.y,
      `First card hidden by dock at ${width}px`,
    );
  const cta = page.getByRole("link", { name: "Pilih hasil pertama" });
  await cta.focus();
  await page.keyboard.press("Tab");
  const focus = await page.evaluate(() => ({
    text: document.activeElement.textContent,
    outline: getComputedStyle(document.activeElement).outlineStyle,
  }));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload({ waitUntil: "networkidle" });
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await page
    .getByRole("link", { name: "Cari modul untuk kerja" })
    .scrollIntoViewIfNeeded();
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForFunction(() =>
    [...document.querySelectorAll("h1 [data-word]")].every(
      (e) => getComputedStyle(e).opacity === "1",
    ),
  );
  await page.screenshot({ path: `${out}/home-${width}-motion.png` });
  results.push({
    width,
    height,
    ...metrics,
    focus,
    errors,
    normalHeadingVisible: await page.locator("h1").isVisible(),
  });
  await page.close();
}
await browser.close();
await writeFile(`${out}/render-checks.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
