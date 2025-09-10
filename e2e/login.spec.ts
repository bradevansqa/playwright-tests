import { test, expect } from '../fixtures/fixtures';

test('Login feature functionality', async ({ page,login }) => {
  await login();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await page.locator('[data-test="username"]').fill('bradtest');
  await page.locator('[data-test="password"]').fill('nwepassword');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
});