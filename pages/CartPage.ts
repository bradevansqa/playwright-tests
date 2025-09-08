import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async getCartItems() {
    return this.page.locator('.inventory_item_name');
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
