import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

// Login tests
test.describe('Login functionality', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });
});

// Sorting tests
test.describe('Product sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should sort products by Name (A to Z)', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'az');
    const firstProduct = await page.locator('.inventory_item_name').first().textContent();
    expect(firstProduct).toBe('Sauce Labs Backpack');
  });

  test('should sort products by Price (low to high)', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'lohi');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const sorted = [...prices].sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')));
    expect(prices).toEqual(sorted);
  });
});

// Cart functionality tests
test.describe('Cart functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should add item to cart and see badge update', async ({ page }) => {
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('should remove item from cart and badge disappears', async ({ page }) => {
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('button[data-test="remove-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  test('should show item in cart page after adding', async ({ page }) => {
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
  });
});
