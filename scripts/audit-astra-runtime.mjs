import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const routes = ['/', '/modules', '/tools', '/tools/n8n', '/tools/hermes-agent', '/paths/ai-automation', '/modules/n8n-google-sheets', '/learn/n8n-google-sheets/2', '/learn/n8n-google-sheets/3', '/learn/gemini-slide-assignment/2', '/library', '/progress', '/community', '/login'];
const baseURL = process.env.QA_URL || 'http://localhost:3110';
const browser = await chromium.launch();
const results = [];
try {
  for (const width of [1440, 390]) {
    for (const route of routes) {
      const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1024 } });
      const consoleErrors = [], httpErrors = [], failedRequests = [], cancelledPrefetches = [];
      page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
      page.on('response', response => { if (response.status() >= 400) httpErrors.push({ status: response.status(), url: response.url() }); });
      page.on('requestfailed', request => {
        const failure = { url: request.url(), error: request.failure()?.errorText };
        const isCancelledPrefetch = failure.error === 'net::ERR_ABORTED'
          && request.headers()['next-router-prefetch'] === '1';
        (isCancelledPrefetch ? cancelledPrefetches : failedRequests).push(failure);
      });
      await page.goto(baseURL + route, { waitUntil: 'networkidle', timeout: 90000 });
      const retiredImages = await page.locator('img').evaluateAll(images => images.map(image => image.currentSrc || image.src).filter(src => /hero-malaysia-utility|community-discussion|hero-learners|community-learners|avatar-admin|avatar-ammar|avatar-siti/.test(src)));
      results.push({ route, width, consoleErrors, httpErrors, failedRequests, cancelledPrefetches, retiredImages });
      // Closing a tab aborts speculative Next.js prefetches. Teardown is outside
      // the observed page lifetime; do not mutate recorded results during it.
      page.removeAllListeners('console');
      page.removeAllListeners('response');
      page.removeAllListeners('requestfailed');
      await page.close();
    }
  }
} finally {
  await browser.close();
}
const output = process.env.QA_OUTPUT || 'artifacts/visual-qa/astra/runtime-audit.json';
await fs.writeFile(output, JSON.stringify(results, null, 2));
const failures = results.filter(result => result.consoleErrors.length || result.httpErrors.length || result.failedRequests.length || result.retiredImages.length);
console.log(`${results.length} route/viewport runtime checks; ${failures.length} with findings.`);
if (failures.length) process.exitCode = 1;
