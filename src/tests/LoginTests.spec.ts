import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { InventoryPage } from '../pageObjects/InventoryPage';
import { expect } from 'chai';
 
test.describe('LoginTests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({page}) => {
    await page.goto('https://www.saucedemo.com');
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
  });

  test('Test positive login functionallity', async ({page}) => {
    await loginPage.login('STANDARD_USER');
    await expect(page.url()).to.not.include('secret_sauce');
    await expect(page.url()).to.include('https://www.saucedemo.com/inventory.html');
  });

  test('Test negative cases for logging with wrong credentials', async ({page}) => {
    await loginPage.loginWithCredentials('randomUsername', 'randomPassword');
    await loginPage.checkIfWrongPasswordMessageDisplayed();
    await page.goto('https://www.saucedemo.com');
    await loginPage.loginExistingUserWithoutUnderscore('STANDARD_USER');
    await loginPage.checkIfWrongPasswordMessageDisplayed();
    await page.goto('https://www.saucedemo.com');
    await loginPage.loginExistingUserWithBigLetters('STANDARD_USER');
    await loginPage.checkIfWrongPasswordMessageDisplayed();
    await page.goto('https://www.saucedemo.com');
    await loginPage.login('LOCKED_OUT_USER');
    await loginPage.checkIfLockedUserErrorDisplayed();
  });

  test('Test logout and non logged user accessibility', async ({page}) => {
    await loginPage.login('STANDARD_USER');
    await inventoryPage.logoutUser();
    await expect(page.url()).to.equal('https://www.saucedemo.com/');
    await page.goto('https://www.saucedemo.com/inventory.html');
    await loginPage.checkIfInventoryPageNotAccessibleDisplayed();
  });
});
