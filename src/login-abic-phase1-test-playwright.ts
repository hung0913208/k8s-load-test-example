const { expect, test } = require("@playwright/test")

test.beforeEach(async ({ page }, testInfo) => {
  testInfo.setTimeout(600000)
})

test("Login pass", async ({ page }) => {
  // Open login page
  const loginPageResp = await page.goto(
    "https://taurus-test-sso.alpaca.vn/oauth/login"
  )

  // Test that the response did not fail
  expect(loginPageResp.status()).toBeLessThan(400)

  // Click login
  await page.getByPlaceholder("Tên đăng nhập").fill("owner")
  await page.getByPlaceholder("Nhập mật khẩu").fill("Alpaca#2022")
  await page.getByText("Đăng nhập").click()
  await page.waitForLoadState()
})
