import { test, expect } from '../fixtures';

test('Add Product and Checkout functionality', async ({ page, login }) => {
  await login();

  await test.step('Add product to cart', async () => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");
  });

  await test.step('Verify cart contents', async () => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('.inventory_item_name')).toHaveText("Sauce Labs Backpack");
  });

  await test.step('Checkout', async () => {
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Brad');
    await page.locator('[data-test="lastName"]').fill('Test');
    await page.locator('[data-test="postalCode"]').fill('90210');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('.inventory_item_name')).toHaveText("Sauce Labs Backpack");
    await expect(page.locator('.summary_info')).toHaveText(
      'Payment Information:SauceCard #31337Shipping Information:Free Pony Express Delivery!Price TotalItem total: $29.99Tax: $2.40Total: $32.39CancelFinish'
    );

    const itemTotal = parseFloat((await page.locator('.summary_subtotal_label').textContent())!.replace('Item total: $', ''));
    const tax = parseFloat((await page.locator('.summary_tax_label').textContent())!.replace('Tax: $', ''));
    const total = parseFloat((await page.locator('.summary_total_label').textContent())!.replace('Total: $', ''));
    expect(total).toBeCloseTo(itemTotal + tax, 2);
  });

  await test.step('Complete checkout', async () => {
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(page.locator('.complete-header')).toHaveText("Thank you for your order!");
  });
});
