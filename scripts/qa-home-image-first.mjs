import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const out = "artifacts/home-image-first-v3";
await mkdir(out, {recursive:true});
const browser=await chromium.launch();
const results=[];
for(const [width,height] of [[1536,1024],[1366,900],[768,1024],[390,844],[360,800]]) {
 const page=await browser.newPage({viewport:{width,height},reducedMotion:"reduce"});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("http://localhost:3000",{waitUntil:"networkidle"});
 await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`${out}/home-${width}-fold.png`});
 await page.screenshot({path:`${out}/home-${width}-full.png`,fullPage:true});
 await page.locator('[data-image-home]').screenshot({path:`${out}/composition-${width}.png`});
 const geometry=await page.evaluate(()=>{
  const rect=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom};};
  const support=document.querySelector('[data-image-home] section>p:not(.sr-only)');
  return {overflow:document.documentElement.scrollWidth>innerWidth,
   hero:rect(document.querySelector('[data-image-home] section')),
   cards:[...document.querySelectorAll('[data-topic-card]')].map(rect),
   dock:rect(document.querySelector('[data-fixed-dock]')),
   support:{...rect(support),scrollHeight:support.scrollHeight,clientHeight:support.clientHeight,font:getComputedStyle(support).fontSize},
   brokenImages:[...document.images].filter(i=>i.getClientRects().length&&(!i.complete||!i.naturalWidth)).map(i=>i.src)};
 });
 results.push({width,height,errors,...geometry});
 await page.close();
}
await browser.close();
await writeFile(`${out}/geometry.json`,JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
