import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const phase = process.argv[2] || "final";
const base = process.env.QA_URL || "http://localhost:3113";
const out = `artifacts/visual-qa/reference-repair/${phase}`;
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
const records = [];
const sizes = [
  [1880, 880, 1],
  [1505, 1029, 1],
  [1440, 900, 1],
  [768, 1024, 1],
  [390, 844, 1],
  [360, 800, 1],
  [1248, 588, 1.5],
];
for (const [width, height, deviceScaleFactor] of (process.env.QA_QUICK ? sizes.filter(s => s[0] === 1505 || s[0] === 390) : sizes)) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor,
    reducedMotion: "no-preference",
  });
  await context.addInitScript(() => { window.__v3cls = 0; new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__v3cls += entry.value; }).observe({type:'layout-shift', buffered:true}); });
  const page = await context.newPage();
  for (const route of ["/", "/tools", "/paths/ai-automation", "/community"]) {
    const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
    const prefix = `${out}/${width}-${name}`;
    const errors = [];
    const listener = (e) => errors.push(String(e));
    page.on("pageerror", listener);
    await page.goto(base + route, { waitUntil: "load" });
    await page.waitForTimeout(100);
    await page.screenshot({
      path: prefix + "-entrance.png",
      animations: "allow",
    });
    await page.evaluate(async () => {
      await document.fonts.ready;
      document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
      await Promise.all(
        [...document.images].map((i) => i.decode().catch(() => {})),
      );
    });
    await page.waitForTimeout(1600);
    const geometry = await page.evaluate(() => {
      const rect = (e) => e?.getBoundingClientRect().toJSON();
      return {
        cls: window.__v3cls,
        innerWidth,
        innerHeight,
        dpr: devicePixelRatio,
        visualViewportScale: visualViewport?.scale,
        scrollWidth: document.documentElement.scrollWidth,
        header: rect(document.querySelector("header")),
        hero: rect(document.querySelector("main section")),
        cards: [...document.querySelectorAll("[data-reveal-item]")].map(rect),
        brokenImages: [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.src),
      };
    });
    await page.screenshot({ path: prefix + "-fold.png" });
    await page.screenshot({
      path: prefix + "-full.png",
      fullPage: true,
      style:
        "body{position:relative!important}[data-fixed-dock]{position:absolute!important;bottom:0!important;top:auto!important}",
    });
    if (route === "/") {
      await page.evaluate(() =>
        scrollTo(
          0,
          Math.max(
            0,
            document
              .querySelector('[aria-label="Modul Pilihan"]')
              .getBoundingClientRect().top +
              scrollY -
              20,
          ),
        ),
      );
      await page.waitForTimeout(700);
      await page.screenshot({ path: prefix + "-cards-community.png" });
    }
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(200);
    const reverseVisible = await page.locator("h1").isVisible();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.screenshot({ path: prefix + "-reduced.png" });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    records.push({
      route,
      base,
      width,
      height,
      deviceScaleFactor,
      motion: "normal; separate reduced capture",
      ...geometry,
      reverseVisible,
      errors,
    });
    page.off("pageerror", listener);
    console.log(
      `${phase} ${width} ${route} overflow=${geometry.scrollWidth > width}`,
    );
  }
  await context.close();
}
await fs.writeFile(`${out}/geometry.json`, JSON.stringify(records, null, 2));
await browser.close();
