import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addToCart(product: string) {
    await this.page.locator(`[data-test="add-to-cart-${product}"]`).click();
  }

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async getCartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }
}
