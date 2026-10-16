import { test, expect } from "@playwright/test";
import { MODULES, TOOLS } from "../src/data/mockData";
import { directoryTools } from "../src/lib/catalog";

test("Tools availability is truthful and every published journey reaches content", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.goto("/tools");
  const firstTool = directoryTools[0].slug;
  await expect(page.locator("[data-tool]").first()).toHaveAttribute(
    "data-tool",
    firstTool,
  );
  expect(
    await page
      .locator("[data-tool]")
      .evaluateAll((cards) =>
        cards.slice(0, 6).map((c) => c.getAttribute("data-tool")),
      ),
  ).toEqual(directoryTools.slice(0, 6).map((t) => t.slug));
  for (const tool of TOOLS) {
    const modules = MODULES.filter((m) => m.toolSlugs.includes(tool.slug));
    const card = page.locator(`[data-tool="${tool.slug}"]`);
    if (!modules.length) {
      await expect(card).toContainText("Modul akan datang");
      expect(await card.evaluate((el) => el.tagName)).toBe("ARTICLE");
      await expect(card).not.toHaveAttribute("href");
      await expect(card.locator("a,button,[tabindex]")).toHaveCount(0);
    } else {
      await expect(card).toContainText(`${modules.length} modul`);
      await card.click();
      await expect(
        page.getByText("Tiada modul yang sepadan", { exact: true }),
      ).toHaveCount(0);
      const target = modules.find((m) => !m.featured) || modules[0];
      await expect(
        page.locator(`main a[href="/modules/${target.slug}"]`).first(),
      ).toBeVisible();
      await page.goBack();
      await expect(page.locator(`[data-tool="${tool.slug}"]`)).toBeVisible();
    }
  }
});

test("Directory filters survive Back and exact tool filters can be cleared", async ({
  page,
}) => {
  await page.goto("/tools");
  await page.getByRole("button", { name: "Coding", exact: true }).click();
  await expect(page).toHaveURL(/category=coding/);
  await page.getByPlaceholder("Cari tool...").fill("github");
  await expect(page.locator("[data-tool]")).toHaveCount(1);
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByPlaceholder("Cari tool...")).toHaveValue("github");
  await page.goBack();
  await expect(
    page.getByRole("button", { name: "Semua", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-tool]").first()).toHaveAttribute(
    "data-tool",
    directoryTools[0].slug,
  );
  await page.goto("/modules?tool=chatgpt");
  await expect(page.locator('main a[href^="/modules/"]')).toHaveCount(1);
  await page
    .getByRole("button", { name: "Lihat semua modul", exact: true })
    .click();
  await expect(page).toHaveURL(/\/modules$/);
  await expect(page.locator('main a[href^="/modules/"]')).toHaveCount(
    MODULES.length,
  );
  await page.getByRole("button", { name: "Student", exact: true }).click();
  await page.getByPlaceholder("Cari modul atau tool...").fill("zz-nothing");
  await expect(page.getByText("Tiada modul yang sepadan")).toBeVisible();
  await page.goBack();
  await expect(page.locator('main a[href^="/modules/"]')).toHaveCount(
    MODULES.length,
  );
});

test("Reader controls, last paragraph and template remain above the dock", async ({
  page,
}, info) => {
  test.skip(!info.project.name.includes("mobile"));
  for (const width of [390, 360]) {
    await page.setViewportSize({ width, height: width === 360 ? 800 : 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/learn/n8n-google-sheets/2", { waitUntil: "networkidle" });
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator("[data-fixed-dock]")).toHaveCount(1);
    for (const target of [
      page.locator("pre"),
      page.getByRole("button", { name: "Salin template", exact: true }),
      page.getByRole("button", { name: "Saya dah berjaya ✓", exact: true }),
      page.getByText("Reader demo · progress disimpan pada browser ini."),
    ]) {
      await target.evaluate((el) => el.scrollIntoView({ block: "center" }));
      const box = await target.boundingBox();
      const header = await page.locator("header").boundingBox();
      const dock = await page.locator("[data-fixed-dock]").boundingBox();
      expect(
        box &&
          header &&
          dock &&
          box.y >= header.y + header.height &&
          box.y + box.height <= dock.y,
      ).toBeTruthy();
    }
    const copy = page.getByRole("button", {
      name: "Salin template",
      exact: true,
    });
    await copy.focus();
    await expect(copy).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.locator("pre")).toBeFocused();
    await page.getByRole("link", { name: /Seterusnya: Langkah 3/ }).click();
    await expect(page.locator('a[aria-current="step"]')).toContainText(
      "Google Sheets",
    );
    await page
      .getByRole("link", { name: "Langkah sebelumnya", exact: true })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Sediakan n8n",
    );
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    await page.evaluate(() => scrollTo(0, 0));
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  }
});

test("Clipboard legacy fallback restores keyboard focus", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
    });
    document.execCommand = (command: string) => command === "copy";
  });
  await page.goto("/learn/n8n-google-sheets/2", { waitUntil: "networkidle" });
  const copy = page.getByRole("button", {
    name: "Salin template",
    exact: true,
  });
  await copy.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Telah disalin ke papan klip" }),
  ).toBeFocused();
  await expect(
    page.getByText("Template telah disalin.", { exact: true }),
  ).toBeAttached();
  await expect(page.locator("textarea")).toHaveCount(0);
});

test("Home first module is discoverable without scrolling on mobile", async ({
  page,
}, info) => {
  test.skip(!info.project.name.includes("mobile"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [390, 360]) {
    await page.setViewportSize({ width, height: width === 360 ? 800 : 844 });
    await page.goto("/");
    const card = await page
      .locator('main a[href="/modules/meta-ads-ai"]')
      .first()
      .boundingBox();
    const dock = await page.locator("[data-fixed-dock]").boundingBox();
    expect(card && dock && dock.y - card.y >= 100).toBeTruthy();
    await page.getByRole("link", { name: "Cari modul RM10" }).click();
    await expect(page).toHaveURL(/\/modules$/);
    await expect(
      page.getByRole("heading", { name: "Sunting dokumen" }),
    ).toBeVisible();
  }
});

test("Reader normal motion stays visible after reverse scroll and Back", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/learn/n8n-google-sheets/2", { waitUntil: "networkidle" });
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await page.getByRole("link", { name: /Seterusnya: Langkah 3/ }).click();
  await expect(page).toHaveURL(/\/learn\/n8n-google-sheets\/3$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/learn\/n8n-google-sheets\/2$/);
  await page.evaluate(() => scrollTo(0, 0));
  await expect(page.locator("h1 [data-word]").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator("h1")).toBeInViewport();
});
