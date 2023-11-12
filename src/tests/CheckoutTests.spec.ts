import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage'; 
import { ProductPage } from '../pageObjects/ProductPage'; 
import { ShoppingCartPage } from '../pageObjects/ShoppingCartPage'; 
import { CheckoutPage } from '../pageObjects/CheckoutPage'; 
import { CheckoutStepTwoPage } from '../pageObjects/CheckoutStepTwoPage'; 
import { SummaryPage } from '../pageObjects/SummaryPage';
import {InventoryPage} from "../pageObjects/InventoryPage";

test.describe('CheckoutTests', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let shoppingCartPage: ShoppingCartPage;
  let checkoutPage: CheckoutPage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let summaryPage: SummaryPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({page}) => {
    await page.goto('https://www.saucedemo.com');
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    inventoryPage = new InventoryPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    summaryPage = new SummaryPage(page);
  });

  test('Test full checkout process', async ({page}) => {
    await loginPage.login('STANDARD_USER');
    await inventoryPage.openSpecifiedProductPage('SAUCE_LABS_BACKPACK');
    await productPage.addToCart();
    await productPage.navigateToShoppingCart();
    await shoppingCartPage.checkout();
    await checkoutPage.enterShippingInformation('John', 'Doe', '12345');
    await checkoutStepTwoPage.checkIfExpectedProductDataVisible('SAUCE_LABS_BACKPACK');
    await checkoutStepTwoPage.completePurchase();
    await summaryPage.checkIfThankYouMessageVisible();
  });
});
