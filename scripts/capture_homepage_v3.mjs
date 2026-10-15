import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 888 }, reducedMotion: 'reduce' });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  await document.fonts.ready;
  document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
  await Promise.race([
    Promise.all([...document.images].map((i) => i.decode().catch(() => {}))),
    new Promise((r) => setTimeout(r, 4000)),
  ]);
});
await page.waitForTimeout(1000);

await page.screenshot({ path: 'artifacts/visual-qa/homepage-v3/current.png' });
console.log('Saved artifacts/visual-qa/homepage-v3/current.png');
await browser.close();
