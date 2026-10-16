import { test, expect } from "@playwright/test";

test("Reader step rail recovers after a mobile to desktop resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/learn/n8n-google-sheets/3", { waitUntil: "networkidle" });
  const menu = page.locator("details");
  await expect(menu).not.toHaveAttribute("open");
  await page.setViewportSize({ width: 1440, height: 1024 });
  await expect(menu).toHaveAttribute("open", "");
  await expect(page.locator('[aria-current="step"]')).toBeVisible();
  await page.setViewportSize({ width: 360, height: 800 });
  await expect(menu).not.toHaveAttribute("open");
  await page.getByText("Langkah modul", { exact: true }).click();
  await expect(page.locator('[aria-current="step"]')).toBeVisible();
});

test("n8n workflow is readable before instructions on narrow screens", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  for (const step of [2, 3]) {
    await page.goto(`/learn/n8n-google-sheets/${step}`, {
      waitUntil: "networkidle",
    });
    const diagram = await page.locator("figure").boundingBox();
    const instructions = await page.locator("article ol").boundingBox();
    expect(diagram && instructions && diagram.y < instructions.y).toBeTruthy();
    expect(diagram!.y).toBeLessThan(620);
    await expect(page.locator("h1")).toContainText(
      step === 2 ? "Sediakan n8n" : "Google Sheets",
    );
  }
});
