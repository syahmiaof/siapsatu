import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const ARTIFACTS_DIR = path.join(process.cwd(), "artifacts", "visual-qa");

test.beforeAll(async () => {
  if (!fs.existsSync(ARTIFACTS_DIR)) {
    fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
  }
});

const ROUTES = [
  { path: "/", name: "homepage" },
  { path: "/modules", name: "modules-catalog" },
  { path: "/tools", name: "tools-directory" },
  { path: "/tools/n8n", name: "tool-n8n" },
  { path: "/tools/hermes-agent", name: "tool-hermes-agent" },
  { path: "/paths/ai-automation", name: "learning-path-automation" },
  { path: "/modules/n8n-google-sheets", name: "module-detail-n8n" },
  { path: "/learn/n8n-google-sheets/2", name: "lesson-reader-n8n" },
  { path: "/library", name: "library-dashboard" },
  { path: "/progress", name: "progress-map" },
  { path: "/community", name: "community-hub" },
  { path: "/login", name: "login-page" },
];

for (const route of ROUTES) {
  test(`Capture visual screenshot for ${route.name} (${route.path})`, async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name.includes("mobile");
    const deviceLabel = isMobile ? "mobile" : "desktop";

    await page.goto(route.path, { waitUntil: "domcontentloaded" });
    // Scroll through the page so GSAP ScrollTrigger reveals all below-the-fold elements
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    const screenshotPath = path.join(ARTIFACTS_DIR, `${deviceLabel}-${route.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Verify key presence
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });
}

test("Mega menu interaction on desktop", async ({ page }, testInfo) => {
  if (testInfo.project.name.includes("mobile")) {
    test.skip();
    return;
  }

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);

  // Click on Modul button in desktop header
  const modulBtn = page.getByRole("button", { name: /Modul/i });
  await modulBtn.click();
  await page.waitForTimeout(500);

  // Mega menu should be visible
  const megaMenu = page.locator("[aria-label='Koleksi Modul']");
  await expect(megaMenu).toBeVisible();

  // Capture screenshot of open mega menu
  const screenshotPath = path.join(ARTIFACTS_DIR, "desktop-mega-menu-open.png");
  await page.screenshot({ path: screenshotPath, fullPage: false });

  // Press Escape to close
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  await expect(megaMenu).not.toBeVisible();
});

test("Mobile menu drawer interaction on mobile", async ({ page }, testInfo) => {
  if (!testInfo.project.name.includes("mobile")) {
    test.skip();
    return;
  }

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);

  // Click hamburger button
  const menuButton = page.locator("button[aria-label='Buka menu']");
  await menuButton.click();
  await page.waitForTimeout(500);

  // Menu sheet drawer should be visible
  const menuSheet = page.locator("[aria-label='Menu navigasi']");
  await expect(menuSheet).toBeVisible();

  // Capture screenshot of mobile menu drawer
  const screenshotPath = path.join(ARTIFACTS_DIR, "mobile-menu-drawer-open.png");
  await page.screenshot({ path: screenshotPath, fullPage: false });

  // Close drawer
  const closeButton = page.locator("button[aria-label='Tutup menu']");
  await closeButton.click();
  await page.waitForTimeout(300);
  await expect(menuSheet).not.toBeVisible();
});

test("Tools directory search and category filter", async ({ page }, testInfo) => {
  if (testInfo.project.name.includes("mobile")) {
    test.skip();
    return;
  }

  await page.goto("/tools", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Search for n8n
  const searchInput = page.getByPlaceholder("Cari tool...");
  await searchInput.fill("n8n");
  await page.waitForTimeout(300);

  // Should show n8n tool card
  const n8nCard = page.getByRole("heading", { name: "n8n", exact: true });
  await expect(n8nCard).toBeVisible();

  // Clear search and click AI category filter
  await searchInput.clear();
  const aiFilter = page.getByRole("button", { name: "AI Assistant" });
  await aiFilter.click();
  await page.waitForTimeout(300);

  // Should show Hermes Agent
  const hermesCard = page.getByRole("heading", { name: "Hermes Agent" });
  await expect(hermesCard).toBeVisible();
});

test("Checkout preview modal on module detail", async ({ page }, testInfo) => {
  if (testInfo.project.name.includes("mobile")) {
    test.skip();
    return;
  }

  await page.goto("/modules/n8n-google-sheets", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Click buy button to open preview modal
  const buyBtn = page.getByRole("button", { name: /Beli modul RM10/i }).first();
  await buyBtn.click();
  await page.waitForTimeout(400);

  // Modal dialog should be visible
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  await expect(page.getByText(/Pratonton Checkout SiapSatu/i)).toBeVisible();

  // Capture screenshot of modal
  const screenshotPath = path.join(ARTIFACTS_DIR, "desktop-checkout-modal.png");
  await page.screenshot({ path: screenshotPath, fullPage: false });

  // Close modal
  const closeBtn = page.locator("button[aria-label='Tutup']");
  await closeBtn.click();
  await page.waitForTimeout(300);
  await expect(modal).not.toBeVisible();
});

test("Lesson reader copy template and step completion", async ({ page, context }, testInfo) => {
  if (testInfo.project.name.includes("mobile")) {
    test.skip();
    return;
  }

  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/learn/n8n-google-sheets/2", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Test copy template button
  const copyBtn = page.getByRole("button", { name: /Salin template/i });
  await expect(copyBtn).toBeVisible();
  await copyBtn.click();
  await page.waitForTimeout(300);
  await expect(page.getByText(/Disalin!/i)).toBeVisible();

  // Test step completion button
  const markCompleteBtn = page.getByRole("button", { name: /Tanda langkah siap/i });
  await markCompleteBtn.click();
  await page.waitForTimeout(300);
  await expect(page.getByText(/Langkah telah siap/i)).toBeVisible();
});
