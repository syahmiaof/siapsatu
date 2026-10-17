import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const phase = process.argv[2] || 'final';
const base = process.env.QA_URL || 'http://localhost:3114';
const out = `artifacts/visual-qa/all-pages-repair/${phase}`;
const routes = ['/', '/modules', '/tools', '/tools/n8n', '/tools/hermes-agent', '/paths/ai-automation', '/modules/n8n-google-sheets', '/modules/gemini-slide-assignment', '/learn/n8n-google-sheets/3', '/learn/gemini-slide-assignment/2', '/library', '/progress', '/community', '/login'];
const widths = process.env.QA_QUICK ? [1505, 390] : [1505, 768, 390, 360];
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: width > 1000 ? 1029 : 844 }, reducedMotion: 'reduce' });
    for (const route of routes) {
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.locator('img').evaluateAll(imgs => Promise.all(imgs.map(i => {
        i.loading = 'eager';
        return Promise.race([i.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 8000))]);
      })));
      const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
      await page.screenshot({ path: `${out}/${width}-${name}.png` });
      await page.screenshot({ path: `${out}/${width}-${name}-full.png`, fullPage: true });
      const geometry = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, width: innerWidth,
        brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.currentSrc),
        artwork: [...document.querySelectorAll('[data-reference-art]')].map(e => ({ variant: e.getAttribute('data-reference-art'), ...e.getBoundingClientRect().toJSON() })) }));
      results.push({ route, status: response.status(), ...geometry, errors });
      console.log(`${phase} ${width} ${route}: ${response.status()} overflow=${geometry.scrollWidth > width} errors=${errors.length}`);
      await page.close();
    }
    await context.close();
  }
} finally { await browser.close(); }
await fs.writeFile(`${out}/geometry.json`, JSON.stringify(results, null, 2));
if (results.some(r => r.status !== 200 || r.scrollWidth > r.width || r.brokenImages.length || r.errors.length)) process.exitCode = 1;
