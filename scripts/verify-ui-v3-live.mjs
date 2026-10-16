import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {chromium} from '@playwright/test';
const base='https://siapsatu.syahmiaof.my';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const assets=[];
for(const name of await fs.readdir('public/assets/illustrations/ui-v3')){
 const file=`public/assets/illustrations/ui-v3/${name}`;
 const response=await fetch(`${base}/assets/illustrations/ui-v3/${name}`);
 const remote=Buffer.from(await response.arrayBuffer());
 const local=await fs.readFile(file);
 assets.push({name,status:response.status,localSha256:hash(local),liveSha256:hash(remote),matches:local.equals(remote)});
}
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1880,height:880},reducedMotion:'reduce'});
const home=await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
const homeProof=await page.evaluate(()=>({heading:document.querySelector('h1')?.textContent,cards:[...document.querySelectorAll('[aria-label="Modul Pilihan"] [data-reveal-item]')].map(e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height}}),layers:[...document.querySelectorAll('[data-malaysia-layers] img')].map(i=>i.getAttribute('src')),stylesheets:[...document.querySelectorAll('link[rel="stylesheet"]')].map(e=>e.getAttribute('href'))}));
await page.setViewportSize({width:360,height:800});await page.goto(base+'/paths/ai-automation',{waitUntil:'networkidle'});
const pathProof=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,learner:document.querySelector('img[src*="path-learner"]')?.getAttribute('src')}));
await page.goto(base+'/community',{waitUntil:'networkidle'});
const communityProof={thumbnails:await page.locator('article figure').count(),demoLabels:await page.getByText(/Suka demo/).count()};
await browser.close();
const result={checkedAt:new Date().toISOString(),base,httpsStatus:home.status(),assets,homeProof,pathProof,communityProof};
await fs.writeFile('artifacts/visual-qa/ui-v3/live-version-proof.json',JSON.stringify(result,null,2));
if(assets.some(a=>!a.matches)||pathProof.scrollWidth>360||homeProof.cards.some(c=>c.bottom>880)||communityProof.thumbnails!==3)throw new Error('Live version proof failed');
console.log(`HTTPS ${result.httpsStatus}; ${assets.length} assets byte-identical; Home fold, narrow Path and Community verified`);
