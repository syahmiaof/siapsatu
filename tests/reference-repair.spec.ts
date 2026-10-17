import { test, expect } from "@playwright/test";

test("Path badges do not recolor cards and the desktop start action fits the reference fold", async ({ page, isMobile }) => {
  await page.setViewportSize(isMobile ? { width: 360, height: 800 } : { width: 1505, height: 1029 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/paths/ai-automation");
  const first = page.locator('[data-step="01"]');
  await expect(first).toHaveCSS("background-color", "rgb(237, 244, 255)");
  const art = page.locator('[data-reference-art="path"] img');
  await expect(art).toBeVisible();
  await expect.poll(() => art.evaluate((im: HTMLImageElement) => im.complete && im.naturalWidth > 0)).toBe(true);
  if (!isMobile) {
    const cta = page.getByRole("link").filter({ hasText: "Mulakan Modul 01" });
    const box = await cta.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThan(1029);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Community shows an honest invitation status and keeps its desktop feed near the reference fold", async ({ page, isMobile }) => {
  if (!isMobile) await page.setViewportSize({ width: 1505, height: 1029 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/community");
  await expect(page.getByText(/Ratusan learners/)).toHaveCount(0);
  await expect(page.getByText("1 minggu lagi", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Sertai WhatsApp Community" })).toHaveCount(0);
  if (!isMobile) {
    await page.evaluate(() => scrollTo(0, 0));
    const firstPost = await page.locator("article").first().boundingBox();
    expect(firstPost!.y).toBeLessThan(540);
  }
  await page.getByRole("button", { name: "Status komuniti WhatsApp" }).click();
  await expect(page.getByRole("status")).toContainText("Jemputan WhatsApp belum dibuka");
});
