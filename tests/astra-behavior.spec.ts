import { test, expect } from "@playwright/test";

test("Tools search, empty reset, and category selection", async ({ page }) => {
  await page.goto("/tools?search=n8n");
  await expect(
    page.getByRole("heading", { name: "n8n", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "ChatGPT", exact: true }),
  ).toHaveCount(0);
  await page.getByPlaceholder("Cari tool...").fill("zz-no-result");
  await expect(page.getByText("Tiada tool dijumpai")).toBeVisible();
  await page.getByPlaceholder("Cari tool...").fill("");
  await page.getByRole("button", { name: "Coding", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "GitHub", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "n8n", exact: true }),
  ).toHaveCount(0);
});

test("Query-linked catalog and back navigation remain readable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/modules?search=n8n");
  await expect(page.getByPlaceholder("Cari modul atau tool...")).toHaveValue(
    "n8n",
  );
  await page.locator('a[href="/modules/n8n-google-sheets"]').first().click();
  await expect(page).toHaveURL(/\/modules\/n8n-google-sheets$/);
  await page.goBack();
  await expect(page.getByPlaceholder("Cari modul atau tool...")).toHaveValue(
    "n8n",
  );
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await page.evaluate(() => scrollTo(0, 0));
  await expect
    .poll(() =>
      page
        .locator("h1 [data-word]")
        .first()
        .evaluate((el) => getComputedStyle(el).opacity),
    )
    .toBe("1");
});

test("Checkout keyboard trap, Escape and focus restoration", async ({
  page,
}) => {
  await page.goto("/modules/n8n-google-sheets");
  const opener = page.getByRole("button", { name: /Beli modul RM10/i }).first();
  await opener.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test("Reader coherent step, clipboard contents and persistent completion", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/learn/n8n-google-sheets/2");
  await expect(page.locator("header")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Sediakan n8n",
  );
  await page
    .getByRole("button", { name: "Salin template", exact: true })
    .click();
  const code = await page.locator("pre code").textContent();
  expect(
    (await page.evaluate(() => navigator.clipboard.readText())).replace(
      /\r\n/g,
      "\n",
    ),
  ).toBe(code);
  await page.getByRole("link", { name: /Seterusnya: Langkah 3/ }).click();
  await expect(page).toHaveURL(/\/3$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Google Sheets",
  );
  await page.getByRole("button", { name: /Tanda langkah siap/ }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: /Langkah telah siap/ }),
  ).toBeVisible();
});

test("Denied clipboard reports manual fallback", async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
      configurable: true,
    }),
  );
  await page.goto("/learn/n8n-google-sheets/2");
  await page
    .getByRole("button", { name: "Salin template", exact: true })
    .click();
  await expect(
    page.getByText("Salinan automatik gagal.", { exact: false }),
  ).toBeVisible();
  await expect(page.getByText("Disalin!", { exact: true })).toHaveCount(0);
});

test("Malformed local progress safely falls back to demo", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "siapsatu_user_progress_v1",
      '{"completedSteps":null}',
    ),
  );
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/learn/n8n-google-sheets/2");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Sediakan n8n",
  );
  expect(errors).toEqual([]);
});

test("Login preview makes no account or delivery claim", async ({ page }) => {
  await page.goto("/login");
  await page
    .getByLabel("Alamat E-mel atau Nombor WhatsApp")
    .fill("demo@example.com");
  await page.getByRole("button", { name: "Pratonton akses" }).click();
  await expect(page.getByText("Pratonton borang selesai")).toBeVisible();
  await expect(
    page.getByText(/Tiada e-mel atau WhatsApp dihantar/),
  ).toBeVisible();
});

test("Mobile dock leaves final tool reachable", async ({ page }, info) => {
  test.skip(!info.project.name.includes("mobile"));
  await page.goto("/tools");
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  const dock = page.locator("[data-fixed-dock]");
  // Upcoming cards are articles; validate the actual final tool, not the last link.
  const last = page.locator("[data-tool]").last();
  await last.scrollIntoViewIfNeeded();
  const a = await last.boundingBox(),
    d = await dock.boundingBox();
  expect(a && d && a.y + a.height <= d.y + 1).toBeTruthy();
  await page
    .getByRole("button", { name: "Buka menu" })
    .scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Buka menu" }).click();
  const sheet = page.getByRole("dialog", { name: "Menu navigasi" });
  await expect(sheet).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(sheet).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Buka menu" })).toBeFocused();
});


test('Community publishing stays local and supports optional title',async({page})=>{
 await page.goto('/community');
 await page.getByText('Tajuk',{exact:true}).click();
 await page.getByLabel('Tajuk hantaran demo').fill('Hasil QA tempatan');
 await page.getByLabel('Isi hantaran demo').fill('Workflow percubaan saya sudah siap.');
 await page.getByRole('button',{name:'Tambah hantaran demo'}).click();
 await expect(page.getByRole('heading',{name:'Hasil QA tempatan'})).toBeVisible();
 await expect(page.getByRole('status')).toContainText('Tiada mesej dihantar');
 await page.reload();await expect(page.getByRole('heading',{name:'Hasil QA tempatan'})).toHaveCount(0);
});

test('Mega menu keyboard arrows and Escape restore trigger focus',async({page},info)=>{
 test.skip(info.project.name.includes('mobile'));
 await page.goto('/');const trigger=page.getByRole('button',{name:'Modul',exact:true});
 await trigger.focus();await page.keyboard.press('ArrowDown');
 const links=page.getByRole('menu',{name:'Koleksi Modul'}).locator('a');
 await expect(links.first()).toBeFocused();await page.keyboard.press('ArrowDown');await expect(links.nth(1)).toBeFocused();
 await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
});
