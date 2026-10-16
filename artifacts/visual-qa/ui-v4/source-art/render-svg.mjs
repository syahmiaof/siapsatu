import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function renderSvg(svgPath, outPngPath, width, height, bgColor = 'transparent') {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  await page.setContent(`<!doctype html>
  <html>
    <head>
      <style>
        body, html { margin: 0; padding: 0; width: ${width}px; height: ${height}px; background: ${bgColor}; overflow: hidden; }
        svg { display: block; width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      ${svgContent}
    </body>
  </html>`);
  await page.screenshot({ path: outPngPath, omitBackground: bgColor === 'transparent' });
  await browser.close();
}

if (process.argv[2] && process.argv[3]) {
  const w = parseInt(process.argv[4] || '176', 10);
  const h = parseInt(process.argv[5] || '125', 10);
  const bg = process.argv[6] || 'transparent';
  renderSvg(process.argv[2], process.argv[3], w, h, bg).then(() => {
    console.log(`Rendered ${process.argv[2]} to ${process.argv[3]}`);
  });
}
