# Playwright Test Automation with MCP 🤖🎭

[![Playwright Tests](https://github.com/bradevansqa/playwright-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/bradevansqa/playwright-tests/actions/workflows/playwright.yml)

## 📊 Test Reports

* [View Latest Playwright Test Report](https://bradevansqa.github.io/playwright-tests/)

---

## Overview

This repository contains Playwright end-to-end tests for the [Sauce Demo](https://www.saucedemo.com/) website.
It demonstrates both **traditional test automation** and **AI-assisted test generation with MCP**.

* Tests include login, logout, add-to-cart, checkout, sorting, and UI validations.
* Uses Playwright with TypeScript and fixtures for reusable test setup.
* HTML reports are generated for each test run.
* MCP (Model Context Protocol) is used to explore the site and generate Playwright tests automatically.

---

## 🚀 Tech Stack

* [Playwright](https://playwright.dev/) for browser automation
* TypeScript for test scripting
* Page Object Model (POM) for maintainable code
* Fixtures for reusable test setup
* GitHub Actions for CI/CD
* **MCP (Model Context Protocol)** + GitHub Copilot for AI-driven test generation

---

## 📂 Project Structure

* `e2e/` → Hand-written test cases
* `e2e/mcp-generated/` → AI-generated tests from MCP prompts
* `pages/` → Page Objects
* `fixtures/` → Custom Playwright fixtures
* `prompts/` → MCP `.prompt.md` files for test generation
* `playwright.config.ts` → Test runner configuration

---

## 🧪 Example Test (Manual)

```ts
test('User can add a product and checkout', async ({ page, login }) => {
  await login();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('.inventory_item_name')).toHaveText("Sauce Labs Backpack");
});
```

---

## 🤖 MCP-Generated Tests

This project also integrates with **GitHub Copilot MCP (Model Context Protocol)** to explore [SauceDemo](https://www.saucedemo.com/) and generate Playwright tests automatically.

* Prompts are defined in `.prompt.md` files under `prompts/`.
* Example: `generate_tests.prompt.md` can be run with **MCP: Run Prompt** in VS Code.
* The MCP agent explores flows such as login, sorting, and cart management, then generates `.spec.ts` tests into the `e2e/mcp-generated/` folder.

### Example MCP Prompt

```md
Explore https://www.saucedemo.com/ and generate Playwright tests for:
- login/logout
- product sorting
- add to cart & checkout
```

This demonstrates the ability to **combine AI-assisted test generation with traditional Playwright automation**, speeding up test coverage while keeping maintainable, reviewed test scripts.


* [GitHub Pages Test Reports](https://bradevansqa.github.io/playwright-tests/)

---

