import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillDetails(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  async getItemTotal() {
    const text = await this.page.locator('.summary_subtotal_label').textContent();
    return parseFloat(text!.replace('Item total: $', ''));
  }

  async getTax() {
    const text = await this.page.locator('.summary_tax_label').textContent();
    return parseFloat(text!.replace('Tax: $', ''));
  }

  async getTotal() {
    const text = await this.page.locator('.summary_total_label').textContent();
    return parseFloat(text!.replace('Total: $', ''));
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
  }
}
