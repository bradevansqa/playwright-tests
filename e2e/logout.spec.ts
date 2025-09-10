import { test, expect } from '.../fixtures/fixtures';

test('Logout feature functionality', async ({ page, login }) => {
  await login(); 
  await expect(page).toHaveURL(/.*inventory.html/); 
  await expect(page.locator('.inventory_list')).toBeVisible();  
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  });