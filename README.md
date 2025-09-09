[![Playwright Tests](https://github.com/bradevansqa/playwright-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/bradevansqa/playwright-tests/actions/workflows/playwright.yml)

# Playwright Test Automation

This repository contains Playwright end-to-end tests for the Sauce Demo website.

## Overview

- Tests include login, logout, add-to-cart, checkout, sorting, and UI validations.
- Uses Playwright with TypeScript and fixtures for reusable test setup.
- HTML reports are generated for each test run.

# Playwright E2E Testing Project 🎭

This project demonstrates **end-to-end test automation** using [Playwright](https://playwright.dev/) with TypeScript.  
The test suite covers login/logout flows, product sorting, cart management, and checkout functionality on [SauceDemo](https://www.saucedemo.com/).  

## 🚀 Tech Stack
- [Playwright](https://playwright.dev/) for browser automation
- TypeScript for test scripting
- Page Object Model (POM) for maintainable code
- Fixtures for reusable test setup
- GitHub Actions for CI/CD

## 📂 Project Structure
- `e2e/` → Test cases
- `pages/` → Page Objects
- `fixtures/` → Custom Playwright fixtures
- `playwright.config.ts` → Test runner configuration

## 🧪 Example Test
```ts
test('User can add a product and checkout', async ({ page, login }) => {
  await login();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('.inventory_item_name')).toHaveText("Sauce Labs Backpack");
});
