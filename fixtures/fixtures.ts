// fixtures.ts
import { test as base } from '@playwright/test';

// Extend the base test with a "login" fixture
export const test = base.extend<{
  login: () => Promise<void>;
}>({
  login: async ({ page }, use) => {
    // Define the login function
    const login = async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
    };

    await use(login); // Provide the fixture to the tests
  },
});

export { expect } from '@playwright/test';
