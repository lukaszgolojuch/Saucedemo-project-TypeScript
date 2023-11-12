import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { TestUsers } from '../enums/TestsUser';

export class LoginPage {
  private readonly page: Page;

  private readonly USERNAME_INPUT_SELECTOR = '[data-test="username"]';
  private readonly PASSWORD_INPUT_SELECTOR = '[data-test="password"]';
  private readonly LOGIN_BUTTON_SELECTOR = 'input[type="submit"]';
  private readonly FAILED_LOGIN_MESSAGE =
    "Epic sadface: Username and password do not match any user in this service";
  private readonly INVENTORY_PAGE_NOT_ACCESSIBLE_MESSAGE =
    "Epic sadface: You can only access '/inventory.html' when you are logged in.";
  private readonly LOCKED_USER_MESSAGE =
    "Epic sadface: Sorry, this user has been locked out.";
  private readonly ERROR_MESSAGE_CONTAINER_SELECTOR = '.error-message-container';

  constructor(page: Page) {
    this.page = page;
  }

  public async login(testUserKey: keyof typeof TestUsers): Promise<void> {
    const testUser = TestUsers[testUserKey];
    await this.page.locator(this.USERNAME_INPUT_SELECTOR).fill(testUser.username);
    await this.page.locator(this.PASSWORD_INPUT_SELECTOR).fill(testUser.password);
    await this.page.click(this.LOGIN_BUTTON_SELECTOR);
  }

  public async loginWithCredentials(username: string, password: string): Promise<void> {
    await this.page.locator(this.USERNAME_INPUT_SELECTOR).fill(username);
    await this.page.locator(this.PASSWORD_INPUT_SELECTOR).fill(password);
    await this.page.click(this.LOGIN_BUTTON_SELECTOR);
  }

  public async loginExistingUserWithoutUnderscore(testUserKey: keyof typeof TestUsers): Promise<void> {
    const testUser = TestUsers[testUserKey];
    await this.page.locator(this.USERNAME_INPUT_SELECTOR).fill(testUser.username.replace('_', ''));
    await this.page.locator(this.PASSWORD_INPUT_SELECTOR).fill(testUser.password);
    await this.page.click(this.LOGIN_BUTTON_SELECTOR);
  }

  public async loginExistingUserWithBigLetters(testUserKey: keyof typeof TestUsers): Promise<void> {
    const testUser = TestUsers[testUserKey];
    await this.page.locator(this.USERNAME_INPUT_SELECTOR).fill(testUser.username.toUpperCase());
    await this.page.locator(this.PASSWORD_INPUT_SELECTOR).fill(testUser.password);
    await this.page.click(this.LOGIN_BUTTON_SELECTOR);
  }

  public async checkIfWrongPasswordMessageDisplayed(): Promise<void> {
    await expect(
      this.page.locator(this.ERROR_MESSAGE_CONTAINER_SELECTOR)
    ).toHaveText(this.FAILED_LOGIN_MESSAGE);
  }

  public async checkIfInventoryPageNotAccessibleDisplayed(): Promise<void> {
    await expect(
      this.page.locator(this.ERROR_MESSAGE_CONTAINER_SELECTOR)
    ).toHaveText(this.INVENTORY_PAGE_NOT_ACCESSIBLE_MESSAGE);
  }

  public async checkIfLockedUserErrorDisplayed(): Promise<void> {
    await expect(
      this.page.locator(this.ERROR_MESSAGE_CONTAINER_SELECTOR)
    ).toHaveText(this.LOCKED_USER_MESSAGE);
  }
}
