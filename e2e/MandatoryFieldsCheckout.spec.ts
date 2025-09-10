import { test, expect } from '../fixtures/fixtures';

test('Checkout requires mandatory fields', async ({ page, login }) => {
  await login();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
});