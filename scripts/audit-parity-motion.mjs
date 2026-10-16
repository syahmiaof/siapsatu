import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch();
const results = [];
try {
  for (const reducedMotion of ['reduce','no-preference']) {
    for (const [width,height] of [[1440,1024],[768,1024],[390,844],[360,800]]) {
      const context=await browser.newContext({viewport:{width,height},reducedMotion});
      for (const route of ['/','/tools','/modules','/learn/n8n-google-sheets/2','/learn/n8n-google-sheets/3']) {
        const page=await context.newPage();
        const errors=[];
        page.on('pageerror',e=>errors.push(String(e)));
        await page.goto(`${process.env.QA_URL || 'http://localhost:3112'}${route}`,{waitUntil:'networkidle'});
        await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
        await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));
        await page.waitForTimeout(100);
        await page.evaluate(()=>scrollTo(0,0));
        await page.waitForTimeout(reducedMotion==='reduce'?50:1200);
        const check=await page.evaluate(()=>({
          overflow:document.documentElement.scrollWidth>innerWidth,
          invisibleHeadingWords:[...document.querySelectorAll('h1 [data-word]')].filter(e=>{const s=getComputedStyle(e);return s.visibility==='hidden'||Number(s.opacity)<.95;}).map(e=>e.textContent),
          brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),
          title:document.querySelector('h1')?.getAttribute('aria-label'),
        }));
        results.push({route,width,reducedMotion,...check,errors});
        await page.close();
      }
      await context.close();
    }
  }
}finally{await browser.close();}
await fs.writeFile('artifacts/visual-qa/parity-v2/motion-audit.json',JSON.stringify(results,null,2));
const bad=results.filter(r=>r.overflow||r.invisibleHeadingWords.length||r.brokenImages.length||r.errors.length);
console.log(`${results.length} normal/reduced-motion reverse-scroll checks; ${bad.length} findings.`);
if(bad.length)process.exitCode=1;
