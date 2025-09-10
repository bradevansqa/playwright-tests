import { test, expect } from '../fixtures/fixtures';

test('Product details page shows correct info', async ({ page, login }) => {
    await login();
  

  await page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' }).click();

  await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');
  await expect(page.locator('.inventory_details_desc')).toContainText('carry.allTheThings()');
});

