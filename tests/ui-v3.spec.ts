import { test, expect } from "@playwright/test";

test("Home cards stay aligned during entrance, at rest and after Back", async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    "Desktop fold contract; mobile discovery covered separately",
  );
  for (const viewport of [
    { width: 1880, height: 880 },
    { width: 1505, height: 1029 },
    { width: 1248, height: 588 },
  ]) {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const cards = page.locator(
      '[aria-label="Modul Pilihan"] [data-reveal-item]',
    );
    await expect(cards).toHaveCount(3);
    for (let sample = 0; sample < 8; sample++) {
      const boxes = await cards.evaluateAll((es) =>
        es.map((e) => {
          const r = e.getBoundingClientRect();
          return { top: r.top, bottom: r.bottom };
        }),
      );
      expect(
        Math.max(...boxes.map((b) => b.top)) -
          Math.min(...boxes.map((b) => b.top)),
      ).toBeLessThan(1);
      expect(
        Math.max(...boxes.map((b) => b.bottom)) -
          Math.min(...boxes.map((b) => b.bottom)),
      ).toBeLessThan(1);
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(800);
    const first = await cards.first().boundingBox();
    expect(first!.y + first!.height).toBeLessThan(viewport.height);
    if (viewport.width === 1880) expect(first!.y).toBeLessThanOrEqual(560);
    await cards.first().click();
    await expect(page).toHaveURL(/\/modules\/meta-ads/);
    await page.goBack();
    await expect(
      page.getByRole("heading", { name: "Satu modul. Satu hasil." }),
    ).toBeVisible();
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    await page.evaluate(() => scrollTo(0, 0));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(cards.first()).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("Path keeps four steps and outcomes in reference fold and stores local checklist", async ({
  page,
  isMobile,
}) => {
  await page.setViewportSize(isMobile ? {width:360,height:800} : {width:1505,height:1029});
  await page.goto("/paths/ai-automation");
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const steps = page.locator(
    '[aria-label="Modul dalam laluan ini"] [data-reveal-item]',
  );
  await expect(steps).toHaveCount(4);
  await expect(
    page.locator('[data-hero-art] img[src*="path-learner"]'),
  ).toHaveCount(1);
  if (!isMobile) {
    await page.waitForTimeout(1200);
    expect(
      (await steps.last().boundingBox())!.y +
        (await steps.last().boundingBox())!.height,
    ).toBeLessThan(1029);
  }
  const toggle = page.getByRole("button", {
    name: "Tanda Faham Asas Automation sebagai selesai",
    exact: true,
  });
  await toggle.click();
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "Tanda Faham Asas Automation sebagai belum selesai",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByText("RM27", { exact: false })).toHaveCount(0);
});

test("Community examples and thumbnails remain labelled; composing and filtering stay local", async ({
  page,
}) => {
  await page.goto("/community");
  await expect(page.getByText("Komuniti demo · hantaran contoh")).toBeVisible();
  await expect(page.locator("article figure")).toHaveCount(3);
  await expect(page.getByText("24 Suka demo", { exact: true })).toBeVisible();
  await page
    .getByRole("button", { name: "Suka hantaran", exact: true })
    .first()
    .click();
  await expect(page.getByText("25 Suka demo", { exact: true })).toBeVisible();
  await page
    .getByRole("textbox", { name: "Isi hantaran demo" })
    .fill("Contoh latihan UI v3");
  await page
    .getByRole("button", { name: "Tambah hantaran demo", exact: true })
    .click();
  await expect(
    page.locator("article").filter({ hasText: "Contoh latihan UI v3" }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Tiada mesej dihantar");
  await page.reload();
  await expect(
    page.getByText("Contoh latihan UI v3", { exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Tanya Soalan", exact: true })
    .first()
    .click();
  await expect(page.locator("article")).toHaveCount(1);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
