import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { Products } from '../enums/Product';

export class ProductPage {
  private readonly page: Page;
  private readonly SHOPPING_CART_ICON_SELECTOR = '.shopping_cart_link';

  constructor(page: Page) {
    this.page = page;
  }

  public async addToCart(): Promise<void> {
    await this.page.getByText('Add to cart').click();
  }

  public async navigateToShoppingCart(): Promise<void> {
    await this.page.click(this.SHOPPING_CART_ICON_SELECTOR);
  }

  public async checkIfExpectedProductDetailsVisible(productKey: keyof typeof Products): Promise<void> {
    const product = Products[productKey];
    await expect(this.page.getByText(product.productName)).toBeVisible();
    await expect(this.page.getByText(product.description)).toBeVisible();
    await expect(this.page.getByText("$" + product.price.toString())).toBeVisible();
  }
}
