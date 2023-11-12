import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { Products } from '../enums/Product';

export class CheckoutStepTwoPage {

  private readonly page: Page;
  private readonly FINISH_BUTTON_SELECTOR_SELECTOR = '[data-test="finish"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async completePurchase(): Promise<void> {
    await this.page.locator(this.FINISH_BUTTON_SELECTOR_SELECTOR).click();
  }

  public async checkIfExpectedProductDataVisible(productKey: keyof typeof Products): Promise<void> {
    const product = Products[productKey];
    await expect(this.page.getByText(product.productName)).toBeVisible();
    await expect(this.page.getByText(product.description)).toBeVisible();
    await expect(this.page.getByText("$" + product.price.toString(), { exact: true })).toBeVisible();
  }
}
