import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const phase = process.argv[2] || "baseline";
const base = process.env.QA_URL || "http://127.0.0.1:3112";
const outDir = path.resolve(process.cwd(), `artifacts/visual-qa/ui-v4/${phase}`);
await fs.mkdir(outDir, { recursive: true });

console.log(`[QA UI-v4] Target Base: ${base}`);
console.log(`[QA UI-v4] Phase: ${phase}`);
console.log(`[QA UI-v4] Output Dir: ${outDir}`);

const browser = await chromium.launch();
const records = [];

const viewports = [
  { width: 1505, height: 1029, dpr: 1, label: "desktop-reference" },
  { width: 1880, height: 880, dpr: 1, label: "wide-short-desktop" },
  { width: 1440, height: 900, dpr: 1, label: "standard-laptop" },
  { width: 1248, height: 588, dpr: 1.5, label: "scaled-display" },
  { width: 768, height: 1024, dpr: 1, label: "tablet" },
  { width: 390, height: 844, dpr: 1, label: "iphone-mobile" },
  { width: 360, height: 800, dpr: 1, label: "android-narrow" },
];

const routes = [
  { route: "/", name: "home" },
  { route: "/tools", name: "tools" },
  { route: "/paths/ai-automation", name: "paths-ai-automation" },
  { route: "/community", name: "community" },
];

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dpr,
    reducedMotion: "no-preference",
  });

  await context.addInitScript(() => {
    window.__cls = 0;
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch {
      // Observer unsupported or failed
    }
  });

  const page = await context.newPage();

  for (const { route, name } of routes) {
    const prefix = path.join(outDir, `${vp.width}-${name}`);
    const pageErrors = [];
    const consoleErrors = [];

    page.on("pageerror", (err) => pageErrors.push(String(err)));
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    console.log(`Capturing ${vp.width}x${vp.height} (DPR ${vp.dpr}) - ${route}...`);

    await page.goto(base + route, { waitUntil: "load" });
    await page.waitForLoadState("domcontentloaded");

    // Capture initial entrance
    await page.waitForTimeout(100);
    await page.screenshot({
      path: `${prefix}-entrance.png`,
      animations: "allow",
    });

    // Wait for fonts and decode all images
    await page.evaluate(async () => {
      await document.fonts.ready;
      document.querySelectorAll("img").forEach((img) => (img.loading = "eager"));
      await Promise.all(
        [...document.images].map((img) => img.decode().catch(() => {}))
      );
    });

    // Let entrance animations settle
    await page.waitForTimeout(1600);

    // Extract exact geometry & landmarks
    const geometry = await page.evaluate(() => {
      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: Math.round(r.x),
          y: Math.round(r.y),
          width: Math.round(r.width),
          height: Math.round(r.height),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          left: Math.round(r.left),
          right: Math.round(r.right),
        };
      };

      const headerEl = document.querySelector("header");
      const h1El = document.querySelector("h1");
      const ctaEl = document.querySelector('main a[href="/modules"], main a[href*="modules"], main button, [class*="ctaContainer"] a');
      const cardRowEl = document.querySelector('[aria-label="Modul Pilihan"]') || document.querySelector('[class*="featuredSection"]');
      const cards = [...document.querySelectorAll("[data-reveal-item]")].map(rect);
      const communityStripEl = document.querySelector('[class*="banner"]') || document.querySelector('[class*="navyBox"]')?.parentElement;

      // Route specific queries
      const heroArtEl = document.querySelector('[class*="heroRight"]') || document.querySelector('[data-malaysia-layers]') || document.querySelector('[class*="heroIllustrationWrap"]');
      const chipsEl = document.querySelector('[class*="audienceChips"]');

      // Tools specific
      const toolsGridEl = document.querySelector('[class*="toolsGrid"], [class*="grid"]');
      const firstToolCardEl = document.querySelector('[class*="toolCard"], article');

      // Paths specific
      const pathTimelineEl = document.querySelector('[class*="timeline"], [class*="steps"]');
      const pathLearnerEl = document.querySelector('img[src*="path-learner"]');

      // Community specific
      const communityFeedEl = document.querySelector('[class*="feed"], [class*="central"]');
      const communitySideEl = document.querySelector('[class*="sidebar"], [class*="right"]');

      return {
        cls: window.__cls || 0,
        innerWidth,
        innerHeight,
        dpr: devicePixelRatio,
        visualViewportScale: visualViewport?.scale || 1,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        header: rect(headerEl),
        h1: rect(h1El),
        cta: rect(ctaEl),
        chips: rect(chipsEl),
        heroArtwork: rect(heroArtEl),
        cardRow: rect(cardRowEl),
        cards,
        communityStrip: rect(communityStripEl),
        communityNavyBox: rect(document.querySelector('[class*="navyBox"]')),
        communityWaBox: rect(document.querySelector('[class*="whatsappBox"]')),
        toolsGrid: rect(toolsGridEl),
        firstToolCard: rect(firstToolCardEl),
        pathTimeline: rect(pathTimelineEl),
        pathLearner: rect(pathLearnerEl),
        communityFeed: rect(communityFeedEl),
        communitySide: rect(communitySideEl),
        brokenImages: [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.src),
      };
    });

    // Capture first fold screenshot (browser chrome is naturally excluded by Playwright viewport)
    await page.screenshot({ path: `${prefix}-fold.png` });

    // Capture full page screenshot with proper dock positioning
    await page.screenshot({
      path: `${prefix}-full.png`,
      fullPage: true,
      style: "body{position:relative!important}[data-fixed-dock]{position:absolute!important;bottom:0!important;top:auto!important}",
    });

    // Route-specific scroll captures
    if (route === "/") {
      await page.evaluate(() => {
        const el = document.querySelector('[aria-label="Modul Pilihan"]') || document.querySelector('[class*="featuredSection"]');
        if (el) {
          window.scrollTo(0, Math.max(0, el.getBoundingClientRect().top + window.scrollY - 20));
        }
      });
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${prefix}-cards-community.png` });
    }

    // Scroll down and back up to test reverse visibility
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const reverseH1Visible = await page.locator("h1").isVisible().catch(() => false);

    // Reduced motion check
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${prefix}-reduced.png` });
    await page.emulateMedia({ reducedMotion: "no-preference" });

    const overflow = geometry.scrollWidth > vp.width;

    records.push({
      route,
      base,
      width: vp.width,
      height: vp.height,
      dpr: vp.dpr,
      label: vp.label,
      overflow,
      reverseH1Visible,
      pageErrors,
      consoleErrors,
      ...geometry,
    });

    console.log(`  -> ${vp.width} ${route} overflow=${overflow} CLS=${geometry.cls} brokenImgs=${geometry.brokenImages.length}`);
  }

  await context.close();
}

const geoPath = path.join(outDir, "geometry.json");
await fs.writeFile(geoPath, JSON.stringify(records, null, 2), "utf-8");
console.log(`[QA UI-v4] Saved baseline geometry to ${geoPath}`);

await browser.close();
console.log(`[QA UI-v4] Capture completed successfully.`);
