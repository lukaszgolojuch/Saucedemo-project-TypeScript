import { Page } from 'playwright';
import { Products } from '../enums/Product';

export class InventoryPage {
  private readonly page: Page;
  private readonly BURGER_MENU_BUTTON_NAME = 'Open Menu';
  private readonly LOGOUT_BUTTON_NAME = 'Logout';

  constructor(page: Page) {
    this.page = page;
  }

  public async openSpecifiedProductPage(productKey: keyof typeof Products): Promise<void> {
    const product = Products[productKey];
    await this.page.getByText(product.productName).click();
  }

  public async logoutUser(): Promise<void> {
    await this.page.getByRole('button', {name: this.BURGER_MENU_BUTTON_NAME}).click();
    await this.page.getByRole('link', {name: this.LOGOUT_BUTTON_NAME}).click();
  }
}
