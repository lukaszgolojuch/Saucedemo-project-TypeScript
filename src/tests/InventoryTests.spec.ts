import { test } from '@playwright/test';
import { InventoryPage } from '../pageObjects/InventoryPage';
import { ProductPage } from '../pageObjects/ProductPage';
import { LoginPage } from '../pageObjects/LoginPage';

test.describe('InventoryTests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let productPage: ProductPage;

  test.beforeEach(async ({page}) => {
    await page.goto('https://www.saucedemo.com');
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    productPage = new ProductPage(page);
  });

  test('Test if inventory has expected data', async ({page}) => {
    await loginPage.login('STANDARD_USER');
    await inventoryPage.openSpecifiedProductPage('SAUCE_LABS_BIKE_LIGHT');
    await productPage.checkIfExpectedProductDetailsVisible('SAUCE_LABS_BIKE_LIGHT');
  });
});
