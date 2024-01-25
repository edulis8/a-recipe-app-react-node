// @ts-check
const { test, expect } = require("@playwright/test")

const buildUrl = (path) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://prod-url/"
      : "http://localhost:3000"

  return new URL(path, baseUrl).toString()
}

test("has title", async ({ page }) => {
  const targetUrl = buildUrl("/")
  await page.goto(targetUrl)

  await expect(page).toHaveTitle(/what can you make/)
})

test("has expected elements on home page", async ({ page }) => {
  const targetUrl = buildUrl("/")
  await page.goto(targetUrl)

  await expect(page.getByText("Recipe Search")).toBeVisible()
  await expect(page.getByRole("button")).toHaveText("search")
})

test("has checkable checkboxes", async ({ page }) => {
  const targetUrl = buildUrl("/")
  await page.goto(targetUrl)
  await page.getByLabel("flour").check()
  await page.getByLabel("sugar").check()
  await page.getByLabel("salt").check()
  await page.getByLabel("butter").check()
  await expect(page.getByLabel("flour")).toBeChecked()
  await expect(page.getByLabel("sugar")).toBeChecked()
  await expect(page.getByLabel("salt")).toBeChecked()
  await expect(page.getByLabel("butter")).toBeChecked()
})

test("has search results matching search term", async ({ page }) => {
  const targetUrl = buildUrl("/")
  await page.goto(targetUrl)
  await page.getByLabel("flour").check()
  await page.getByLabel("sugar").check()
  await page.getByLabel("salt").check()
  await page.getByLabel("butter").check()
  await page.getByRole("textbox").fill("cake")
  await page.getByRole("textbox").press("Enter")
  await expect(page.getByRole("list")).toContainText("Cake")
})

test("search result click leads to recipe page", async ({ page }) => {
  const targetUrl = buildUrl("/")
  await page.goto(targetUrl)
  await page.getByLabel("flour").check()
  await page.getByLabel("sugar").check()
  await page.getByLabel("salt").check()
  await page.getByLabel("butter").check()
  await page.getByRole("textbox").fill("cake")
  await page.getByRole("textbox").press("Enter")
  await page.getByRole("link").nth(0).click()
  await expect(page).toHaveURL(new RegExp("/recipe/"))
  await expect(page.getByRole("heading", { name: "Ingredients" })).toBeVisible()
})

test('should save search results in router params', async ({ page }) => {
  const targetUrl = buildUrl("/#/cake/milk,salt,butter,sugar,flour")
  await page.goto(targetUrl)
  await expect(page.getByLabel('milk')).toBeChecked();
  await expect(page.getByLabel('salt')).toBeChecked();
  await expect(page.getByLabel('butter')).toBeChecked();
  await expect(page.getByLabel('sugar')).toBeChecked();
  await expect(page.getByLabel('flour')).toBeChecked();
  await expect(page.getByRole('textbox')).toHaveValue('cake');
});
