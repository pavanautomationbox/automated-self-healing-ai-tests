import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/loginPage.js';
import { Page } from 'playwright';
import { LocatorUtils } from '../utils/locatorUtils.ts';

/**
 * The step definitions for the login feature.
 * These steps are used to define the actions and expectations for logging into the application.
 * They interact with the `LoginPage` class to perform the login functionality.
 */
let loginPage: LoginPage;
let page: Page;

Given('I am on the login page', async function () {
  // Initialize the Playwright page object and LoginPage instance
  page = this.page; // Assuming Playwright page is available in the context
  loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com/');
});

When('I enter the username {string}', async function (username: string) {
  // Enter the username on the login page
  await loginPage.enterUsername(username);
});

When('I enter the password {string}', async function (password: string) {
  // Enter the password on the login page
  await loginPage.enterPassword(password);
});

When('I click the login button', async function () {
  // Click the login button on the login page
  await loginPage.clickLoginButton();
});

Then('I should be logged in successfully', async function () {
  // Add validation here for successful login, e.g., check for logged-in page elements
  const successLocator = 'div[class="success-message"]';
  const validLocator = await LocatorUtils.getValidLocator(page, successLocator, ['#loginSuccess'], 'login page', 'success message');
  const successMessage = await page.innerText(validLocator);
  if (!successMessage.includes('Welcome')) {
    throw new Error('Login failed');
  }
});
