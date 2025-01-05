import { LocatorPredictor } from '../ai/locatorPredictor.js';
import { HealedLocators } from './healedLocators.js';

/**
 * The `LocatorUtils` class is responsible for determining the best locator to use for an element.
 * It checks the primary locator, then falls back to backup locators, and finally predicts a healed locator using AI if needed.
 */
export class LocatorUtils {
  /**
   * Retrieves a valid locator by checking primary, backup, and AI-healed locators.
   * It first checks if the primary locator is valid. If not, it checks backup locators.
   * If no valid locator is found, it predicts a healed locator using the AI model.
   * 
   * @param page - The Playwright page instance.
   * @param primaryLocator - The primary locator string.
   * @param backupLocators - An array of backup locators.
   * @param pageName - The name of the page to be used for logging and healing.
   * @param field - The field name for debugging/logging purposes.
   * @returns The valid locator string.
   */
  public static async getValidLocator(
    page: any,
    primaryLocator: string,
    backupLocators: string[],
    pageName: string,
    field: string
  ): Promise<string> {
    try {
      // Check if the primary locator is valid
      if (await this.isLocatorValid(page, primaryLocator)) {
        return primaryLocator;
      }

      // Check backup locators if the primary locator fails
      for (const backup of backupLocators) {
        if (await this.isLocatorValid(page, backup)) {
          return backup;
        }
      }

      // If no valid locator is found, use AI to predict a healed locator
      const healedLocator = await LocatorPredictor.predictNewLocator(primaryLocator);

      // If the healed locator is valid, add it to healed locators
      if (await this.isLocatorValid(page, healedLocator)) {
        HealedLocators.addHealedLocator(primaryLocator, healedLocator, pageName);
        return healedLocator;
      }

      // If no valid locator is found, throw an error
      throw new Error(`No valid locator found for ${field}`);
    } catch (error) {
      console.error(`Failed to locate element: ${field}`, error);
      throw error;
    }
  }

  /**
   * Checks if a locator is valid by attempting to find it on the page.
   * 
   * @param page - The Playwright page instance.
   * @param locator - The locator string to check.
   * @returns A boolean indicating whether the locator is valid (i.e., element found).
   */
  private static async isLocatorValid(page: any, locator: string): Promise<boolean> {
    try {
      // Wait for the element to appear on the page within the timeout
      await page.waitForSelector(locator, { timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }
}
