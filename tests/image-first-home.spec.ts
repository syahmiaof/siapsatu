import { test, expect } from "@playwright/test";

test.describe("Image-First Homepage (build-with-ai-v3)", () => {
  test("Desktop navigation and hotspots function correctly", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop only");
    await page.setViewportSize({ width: 1536, height: 1024 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // Verify no RM10 pricing on homepage
    await expect(page.locator("[data-image-home]")).not.toContainText(/RM\s*10/);

    // Verify Logo link
    const logoLink = page.locator('header a[aria-label="SiapSatu Home"]');
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute("href", "/");

    // Verify Tools link
    const toolsLink = page.locator('header a[aria-label="Tools"]');
    await expect(toolsLink).toBeVisible();
    await expect(toolsLink).toHaveAttribute("href", "/tools");

    // Verify Laluan link
    const pathsLink = page.locator('header a[aria-label="Laluan"]');
    await expect(pathsLink).toBeVisible();
    await expect(pathsLink).toHaveAttribute("href", "/paths/ai-automation");

    // Verify Komuniti link
    const communityLink = page.locator('header a[aria-label="Komuniti"]');
    await expect(communityLink).toBeVisible();
    await expect(communityLink).toHaveAttribute("href", "/community");

    // Verify Login link
    const loginLink = page.locator('header a[aria-label="Login"]');
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute("href", "/login");

    // Verify Modul triggers MegaMenu
    const modulBtn = page.locator('header button[aria-label="Modul"]');
    await expect(modulBtn).toBeVisible();
    await modulBtn.click();
    await expect(page.locator('div[role="menu"]')).toBeVisible();

    // Verify Audience chips
    const studentChip = page.locator('nav[aria-label="Pilih ikut keperluan"] a[aria-label="Untuk Student"]');
    await expect(studentChip).toHaveAttribute("href", "/modules?category=student");
    const bisnesChip = page.locator('nav[aria-label="Pilih ikut keperluan"] a[aria-label="Untuk Bisnes"]');
    await expect(bisnesChip).toHaveAttribute("href", "/modules?category=bisnes");
    const kerjaChip = page.locator('nav[aria-label="Pilih ikut keperluan"] a[aria-label="Untuk Kerja"]');
    await expect(kerjaChip).toHaveAttribute("href", "/modules?category=kerja");

    // Verify Hero CTA
    const ctaLink = page.locator('a[href="#topik"]');
    await expect(ctaLink).toBeVisible();

    // Verify Topic 1 links to vibe-code-website
    const topic1 = page.locator('[data-topic-card="website"]');
    await expect(topic1).toHaveAttribute("href", "/modules/vibe-code-website");

    // Verify Topic 4 links to n8n-google-sheets
    const topic4 = page.locator('[data-topic-card="automation"]');
    await expect(topic4).toHaveAttribute("href", "/modules/n8n-google-sheets");

    // Verify Topic 2 opens Dialog
    const topic2 = page.locator('[data-topic-card="app"]');
    await topic2.click();
    const dialog = page.locator('div[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Dalam perancangan");
    await expect(dialog).toContainText("App & sistem tanpa coding");
    await expect(dialog.locator('a[href="/tools?category=productivity"]')).toBeVisible();
    await dialog.locator("button", { hasText: "Tutup" }).click();
    await expect(dialog).not.toBeVisible();

    // Verify Topic 3 opens Dialog
    const topic3 = page.locator('[data-topic-card="agent"]');
    await topic3.click();
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("AI agent");
    await expect(dialog.locator('a[href="/tools?category=ai"]')).toBeVisible();
    await dialog.locator("button", { hasText: "Tutup" }).click();
    await expect(dialog).not.toBeVisible();

    // Verify Topic 5 opens Dialog
    const topic5 = page.locator('[data-topic-card="content"]');
    await topic5.click();
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Content AI");
    await expect(dialog.locator('a[href="/tools?category=design"]')).toBeVisible();
    await dialog.locator("button", { hasText: "Tutup" }).click();
    await expect(dialog).not.toBeVisible();
  });

  test("Mobile navigation and single reference dock", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile only");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // Verify mobile header search and menu
    const searchBtn = page.locator('header a[aria-label="Cari modul"]');
    await expect(searchBtn).toBeVisible();
    await expect(searchBtn).toHaveAttribute("href", "/modules");

    const menuBtn = page.locator('header button[aria-label="Buka menu"]');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();
    await expect(page.locator('[role="dialog"][aria-label="Menu navigasi"]')).toBeVisible();
    await page.locator('button[aria-label="Tutup menu"]').click();

    // Verify fixed mobile reference dock has exactly 4 links
    const dock = page.locator("[data-fixed-dock]");
    await expect(dock).toBeVisible();
    const dockLinks = dock.locator("a");
    await expect(dockLinks).toHaveCount(4);
    await expect(dockLinks.nth(0)).toHaveAttribute("href", "/");
    await expect(dockLinks.nth(1)).toHaveAttribute("href", "/modules");
    await expect(dockLinks.nth(2)).toHaveAttribute("href", "/tools");
    await expect(dockLinks.nth(3)).toHaveAttribute("href", "/library");
  });
});
