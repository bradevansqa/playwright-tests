import { log } from 'console';
import { test, expect } from './fixtures';

test('Multiple items in cart', async ({ page, login }) => {
  await login(); 
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  const priceStrings = await page.locator('.inventory_item_price').allTextContents();
  const itemPrices = priceStrings.map(p => parseFloat(p.replace('$', '')));
  const expectedTotal = itemPrices.reduce((a, b) => a + b, 0);

  // Proceed to checkout overview page
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Test');
  await page.locator('[data-test="lastName"]').fill('User');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();

  // Get the displayed total
  const displayedTotalText = await page.locator('.summary_subtotal_label').textContent();
  const displayedTotal = parseFloat(displayedTotalText!.replace('Item total: $', ''));

  expect(displayedTotal).toBeCloseTo(expectedTotal, 2);
});