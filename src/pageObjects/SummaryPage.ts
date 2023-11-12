import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class SummaryPage {
  private readonly page: Page;
  private readonly headerText = 'Thank you for your order!';

  constructor(page: Page) {
    this.page = page;
  }

  public async checkIfThankYouMessageVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', {name: this.headerText})).toBeVisible();
  }
}
