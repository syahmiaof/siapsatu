import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 888 }, reducedMotion: 'reduce' });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

const rects = await page.evaluate(() => {
  const getR = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  };
  const getAll = (sel) => {
    return Array.from(document.querySelectorAll(sel)).map((el) => {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    });
  };
  return {
    header: getR('header'),
    logo: getR('header img'),
    nav: getR('header nav'),
    masukBtn: getR('header a[href="/login"]'),
    h1: getR('h1'),
    subtitle: getR('main p'),
    cta: getR('main a[href="/modules"]'),
    chipsContainer: getR('[class*="audienceChips"]'),
    chips: getAll('main a[href*="category="]'),
    heroRight: getR('[class*="heroRight"]'),
    trioArt: getR('[class*="trioArt"]'),
    featuredSection: getR('[class*="featuredSection"]'),
    cards: getAll('[class*="featuredCard"]'),
    banner: getR('[class*="banner"]'),
    navyBox: getR('[class*="navyBox"]'),
    waBox: getR('[class*="whatsappBox"]'),
    waCard: getR('[class*="whatsappCard"]'),
    learnersArt: getR('[class*="learnersArt"]')
  };
});

console.log(JSON.stringify(rects, null, 2));
await browser.close();
