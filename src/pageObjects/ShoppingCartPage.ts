import { Page } from 'playwright';

export class ShoppingCartPage {
  private readonly page: Page;
  private readonly checkoutButtonSelector = '[data-test="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async checkout(): Promise<void> {
    await this.page.locator(this.checkoutButtonSelector).click();
  }
}