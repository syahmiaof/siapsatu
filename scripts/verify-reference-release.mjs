import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const base = process.env.QA_URL || 'https://siapsatu.syahmiaof.my';
const output = process.env.QA_OUTPUT || 'artifacts/visual-qa/reference-repair/version-live.json';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const assets = [];
for (const name of await fs.readdir('public/assets/illustrations/reference')) {
  const local = await fs.readFile(`public/assets/illustrations/reference/${name}`);
  const response = await fetch(`${base}/assets/illustrations/reference/${name}`);
  const remote = Buffer.from(await response.arrayBuffer());
  assert.equal(response.status, 200, name);
  assert.equal(sha(local), sha(remote), name);
  assets.push({ name, bytes: local.length, sha256: sha(remote), status: response.status });
}
const browser = await chromium.launch();
const pages = [];
try {
  const page = await browser.newPage({ viewport: { width: 1505, height: 1029 }, reducedMotion: 'reduce' });
  for (const [route, variant] of [['/', 'home'], ['/tools', 'tools'], ['/paths/ai-automation', 'path'], ['/community', 'community']]) {
    const response = await page.goto(base + route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, route);
    await page.evaluate(() => document.fonts.ready);
    const artwork = page.locator(`[data-reference-art="${variant}"] img`);
    assert.equal(await artwork.count(), 1, route);
    await artwork.evaluate(im => im.decode());
    const geometry = await page.evaluate(() => ({width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      stylesheets: [...document.querySelectorAll('link[rel="stylesheet"]')].map(el => el.getAttribute('href'))}));
    assert.ok(geometry.scrollWidth <= geometry.width, route);
    pages.push({ route, status: response.status(), artwork: await artwork.getAttribute('src'), ...geometry });
  }
  assert.equal(await page.getByText(/Ratusan learners/).count(), 0);
  await page.getByRole('button', { name: 'Status komuniti WhatsApp' }).click();
  assert.match(await page.getByRole('status').innerText(), /Jemputan WhatsApp belum dibuka/);
} finally {
  await browser.close();
}
await fs.writeFile(output, JSON.stringify({ checkedAt: new Date().toISOString(), base, assets, pages }, null, 2));
console.log(`Verified ${assets.length} byte-identical assets, 4 reference compositions, HTTPS 200 and honest WhatsApp status.`);
