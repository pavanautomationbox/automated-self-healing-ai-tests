import { Page } from 'playwright';
import { LocatorUtils } from '../utils/locatorUtils.js';

/**
 * The `LoginPage` class represents the login page of the application.
 * It encapsulates all the actions that can be performed on the login page,
 * including interacting with elements like username, password, and login buttons.
 */
export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Enters a username into the username input field.
   * 
   * @param username - The username to enter.
   */
  public async enterUsername(username: string): Promise<void> {
    const usernameLocator = 'input[name="username"]';
    const validLocator = await LocatorUtils.getValidLocator(this.page, usernameLocator, ['#username'], 'login page', 'username input');
    await this.page.fill(validLocator, username);
  }

  /**
   * Enters a password into the password input field.
   * 
   * @param password - The password to enter.
   */
  public async enterPassword(password: string): Promise<void> {
    const passwordLocator = 'input[name="password"]';
    const validLocator = await LocatorUtils.getValidLocator(this.page, passwordLocator, ['#password'], 'login page', 'password input');
    await this.page.fill(validLocator, password);
  }

  /**
   * Clicks the login button to submit the login form.
   */
  public async clickLoginButton(): Promise<void> {
    const loginButtonLocator = 'button[name="login"]';
    const validLocator = await LocatorUtils.getValidLocator(this.page, loginButtonLocator, ['#loginButton'], 'login page', 'login button');
    await this.page.click(validLocator);
  }
}
