import { test, expect } from "@playwright/test";

test("Home outcomes lead to real student modules without homepage pricing", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("body")).not.toContainText(/RM\s*10/);
  const outcomes = page.getByRole("region", {
    name: "Hasil pertama untuk student",
  });
  await expect(outcomes.getByRole("heading")).toHaveText([
    "Siapkan slide yang jelas",
    "Faham bahan PDF",
    "Bina website pertama",
  ]);
  const slugs = [
    "gemini-slide-assignment",
    "notebooklm-pdf-study",
    "vibe-code-website",
  ];
  for (const slug of slugs) {
    const link = outcomes.locator(`a[href="/modules/${slug}"]`);
    await expect(link).toContainText("Lihat modul");
    await link.click();
    await expect(page).toHaveURL(new RegExp(`/modules/${slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Beli modul RM10/i }).first(),
    ).toBeVisible();
    await page.goBack();
  }
  await page.goto("/modules");
  const catalogueCards = page.locator('main a[href^="/modules/"]');
  expect(await catalogueCards.count()).toBeGreaterThan(3);
  for (const card of await catalogueCards.all())
    await expect(card).toContainText("RM10");
});

test("Audience chips open the correct filtered catalogue", async ({ page }) => {
  for (const audience of [
    {
      label: "Student",
      category: "student",
      included: "gemini-slide-assignment",
      excluded: "meta-ads-ai",
    },
    {
      label: "Bisnes",
      category: "bisnes",
      included: "meta-ads-ai",
      excluded: "gemini-slide-assignment",
    },
    {
      label: "Kerja",
      category: "kerja",
      included: "gemini-canvas",
      excluded: "gemini-slide-assignment",
    },
  ]) {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Pilih ikut keperluan" })
      .getByRole("link", { name: `Untuk ${audience.label}` })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`/modules\\?category=${audience.category}$`),
    );
    await expect(
      page.getByRole("button", { name: audience.label, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.locator(`main a[href="/modules/${audience.included}"]`),
    ).toBeVisible();
    await expect(
      page.locator(`main a[href="/modules/${audience.excluded}"]`),
    ).toHaveCount(0);
  }
});

test("Home navigation stays price-free and spotlight is keyboard reachable", async ({
  page,
}, info) => {
  await page.goto("/");
  if (info.project.name.includes("mobile")) {
    await page.getByRole("button", { name: "Buka menu" }).click();
    await expect(page.locator("body")).not.toContainText(/RM\s*10/);
    await page.getByRole("button", { name: "Tutup menu" }).click();
  } else {
    const trigger = page.getByRole("button", { name: "Modul", exact: true });
    await trigger.focus();
    await page.keyboard.press("ArrowDown");
    const menu = page.getByRole("menu", { name: "Koleksi Modul" });
    await expect(menu).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/RM\s*10/);
    await page.keyboard.press("End");
    const spotlight = menu.getByRole("link", {
      name: "Lihat modul",
      exact: true,
    });
    await expect(spotlight).toBeFocused();
    await expect(spotlight).toHaveAttribute(
      "href",
      "/modules/gemini-slide-assignment",
    );
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  }
  const cta = page.getByRole("link", { name: "Pilih hasil pertama" });
  await cta.focus();
  await expect(cta).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/modules\?category=student$/);
});

test("Editorial stories link to published modules and audience catalogues", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const storyLinks = page.locator('section[aria-labelledby$="-why"] a');
  const destinations = await storyLinks.evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")),
  );
  expect(destinations).toEqual([
    "/modules?category=student",
    "/modules/github-dari-kosong",
    "/modules?category=bisnes",
    "/modules/meta-ads-ai",
    "/modules/7-hari-content",
    "/modules?category=kerja",
    "/modules/gemini-canvas",
    "/modules/n8n-weekly-report",
  ]);
  for (const destination of destinations) {
    await page
      .locator(`section[aria-labelledby$="-why"] a[href="${destination}"]`)
      .click();
    await expect(page).toHaveURL(
      (url) => url.pathname + url.search === destination,
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.goBack();
  }
});
