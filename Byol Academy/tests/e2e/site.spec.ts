import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/", "/about", "/contact", "/privacy", "/terms", "/blog", "/styleguide"];

for (const route of pages) {
  test(`${route} has no serious or critical accessibility issues`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    const severe = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    );
    expect(severe, JSON.stringify(severe, null, 2)).toEqual([]);
  });
}

test("the sample adapts and exposes a text equivalent for its map", async ({ page }) => {
  await page.goto("/#see-it-adapt");
  await page.getByRole("button", { name: /start the simulation/i }).click();

  for (let questionIndex = 0; questionIndex < 3; questionIndex += 1) {
    await page.getByRole("radio").first().check();
    await page.getByRole("button", { name: /check answer/i }).click();
    await expect(page.getByRole("status")).toContainText(/right|not quite/i);
    await page.getByRole("button", { name: /next question|see your sample map/i }).click();
  }

  await expect(page.locator(".demo-results .demo-table")).toBeVisible();
  await expect(page.getByText(/not your real results and not the production engine/i)).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  const severe = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );
  expect(severe, JSON.stringify(severe, null, 2)).toEqual([]);
});

test("the mobile navigation exposes the three platforms", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile navigation check runs on the mobile project.");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await navigation.getByText("Platforms", { exact: true }).click();
  await expect(navigation.getByRole("link", { name: "Medicoplasma" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "BYOL Schools" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "BYOL Colleges" })).toBeVisible();
});

test("the theme toggle follows system preference and persists a manual choice", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("button", { name: "Switch to dark mode" })).toHaveAttribute("aria-pressed", "false");
});

test("the site does not overflow the viewport horizontally", async ({ page }) => {
  await page.goto("/");
  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
});

test("unknown routes render a branded 404", async ({ page }) => {
  await page.goto("/route-that-does-not-exist");
  await expect(page.getByRole("heading", { name: /let’s get you back on track/i })).toBeVisible();
});
