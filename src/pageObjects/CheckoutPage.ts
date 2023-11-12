import { Page } from 'playwright';

export class CheckoutPage {
  private readonly FIRST_NAME_INPUT_SELECTOR = '[data-test="firstName"]';
  private readonly LAST_NAME_INPUT_SELECTOR = '[data-test="lastName"]';
  private readonly ZIP_INPUT_SELECTOR = '[data-test="postalCode"]';
  private readonly CONTINUE_BUTTON_SELECTOR = '[data-test="continue"]';

  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async enterShippingInformation(firstName: string, lastName: string, zip: string): Promise<void> {
    await this.page.locator(this.FIRST_NAME_INPUT_SELECTOR).fill(firstName);
    await this.page.locator(this.LAST_NAME_INPUT_SELECTOR).fill(lastName);
    await this.page.locator(this.ZIP_INPUT_SELECTOR).fill(zip);
    await this.page.locator(this.CONTINUE_BUTTON_SELECTOR).click();
  }
}
