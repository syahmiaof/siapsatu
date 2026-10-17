import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const base = process.env.QA_URL || 'http://localhost:3114';
const output = process.env.QA_OUTPUT || 'artifacts/visual-qa/all-pages-repair/published-pages-local.json';
const browser = await chromium.launch();
const results = [];
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.goto(base + '/modules', { waitUntil: 'networkidle' });
  const modules = await page.locator('main a[href^="/modules/"]').evaluateAll(links => [...new Set(links.map(a => a.getAttribute('href')))]);
  for (const width of [1505, 360]) {
    await page.setViewportSize({ width, height: width > 1000 ? 1029 : 844 });
    for (const module of modules) {
      for (const route of [module, module.replace('/modules/', '/learn/') + '/1']) {
        const errors = [];
        const onError = error => errors.push(error.message);
        page.on('pageerror', onError);
        const response = await page.goto(base + route, { waitUntil: 'networkidle' });
        const geometry = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          title: document.querySelector('h1')?.textContent,
          broken: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.currentSrc) }));
        results.push({ route, status: response.status(), ...geometry, errors });
        page.off('pageerror', onError);
      }
    }
  }
} finally { await browser.close(); }
await fs.writeFile(output, JSON.stringify({ base, checkedAt: new Date().toISOString(), results }, null, 2));
const failures = results.filter(r => r.status !== 200 || r.scrollWidth > r.width || !r.title || r.broken.length || r.errors.length);
console.log(`${results.length} published module/lesson checks, ${failures.length} findings.`);
if (failures.length) { console.log(JSON.stringify(failures)); process.exitCode = 1; }
