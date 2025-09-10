import {test, expect } from '../fixtures/fixtures';

test('Footer social links point to correct page', async ({ page, login }) => {
    await login();

     // Twitter
  await expect(page.locator('a[href="https://twitter.com/saucelabs"]')).toBeVisible();

  // Facebook
  await expect(page.locator('a[href="https://www.facebook.com/saucelabs"]')).toBeVisible();

  // LinkedIn
  await expect(page.locator('a[href="https://www.linkedin.com/company/sauce-labs/"]')).toBeVisible();
});