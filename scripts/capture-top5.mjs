import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const phase = process.argv[2] || 'final';
const routes = ['/', '/tools', '/modules', '/learn/n8n-google-sheets/2', '/learn/n8n-google-sheets/3'];
const sizes = [[1440,1024],[390,844],[360,800],[768,1024]];
const dir = path.join('artifacts/visual-qa/top5', phase);
await fs.mkdir(dir, {recursive:true});
const browser = await chromium.launch();
const report = [];
for (const [width,height] of sizes) {
  const context = await browser.newContext({viewport:{width,height}, reducedMotion:'reduce'});
  const page = await context.newPage();
  for (const route of routes) {
    const errors = [];
    const listener = error => errors.push(String(error));
    page.on('pageerror', listener);
    await page.goto(`${process.env.QA_URL || 'http://localhost:3000'}${route}`, {waitUntil:'networkidle',timeout:90000});
    await page.evaluate(async () => { await document.fonts.ready; document.querySelectorAll('img').forEach(i=>i.loading='eager'); await Promise.race([Promise.all([...document.images].map(i => i.decode().catch(() => {}))),new Promise(r=>setTimeout(r,8000))]); });
    const name = route === '/' ? 'home' : route.slice(1).replaceAll('/','-');
    const geometry = await page.evaluate(() => {
      const rect = e => {if (!e) return null;const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
      return { overflow:document.documentElement.scrollWidth > innerWidth, header:rect(document.querySelector('header')), logo:rect(document.querySelector('header img')), title:rect(document.querySelector('h1')?.closest('[data-heading]') || document.querySelector('h1')?.parentElement), hero:rect(document.querySelector('section')), illustration:rect(document.querySelector('[data-hero-art]') || document.querySelector('main figure')), search:rect(document.querySelector('main input')), filters:rect(document.querySelector('[role="group"]')), firstCard:rect(document.querySelector('[data-reveal-item]')), brokenImages:[...document.images].filter(i=>!i.complete || !i.naturalWidth).map(i=>i.src)};
    });
    await page.screenshot({path:`${dir}/${width}-${name}-fold.png`});
    // A fixed dock would be painted halfway over content in a stitched full-page image.
    // Only this capture puts it at the document bottom. Fold captures keep real fixed behavior.
    await page.screenshot({path:`${dir}/${width}-${name}-full.png`,fullPage:true,style:'body{position:relative!important}[data-fixed-dock]{position:absolute!important;bottom:0!important;top:auto!important}'});
    report.push({route,width,height,...geometry,errors});
    page.off('pageerror',listener);
    if(route === '/modules' && width === 1440){
      await page.getByRole('button',{name:'Modul',exact:true}).hover();
      await page.screenshot({path:`${dir}/${width}-mega-menu-fold.png`});
    }
    if (phase === 'final' && width < 400 && route.startsWith('/learn/')) {
      for (const [label, target] of [
        ['template', page.locator('pre')],
        ['task', page.getByRole('button', {name:'Saya dah berjaya ✓', exact:true})],
        ['last-paragraph', page.getByText('Reader demo · progress disimpan pada browser ini.')],
      ]) {
        await target.evaluate(el => el.scrollIntoView({block:'center'}));
        await page.screenshot({path:`${dir}/${width}-${name}-${label}.png`});
      }
      await page.evaluate(() => scrollTo(0,0));
    }
    console.log(`${phase} ${width} ${route} overflow=${geometry.overflow}`);
  }
  await context.close();
}
await fs.writeFile(`${dir}/geometry.json`,JSON.stringify(report,null,2));
await browser.close();
