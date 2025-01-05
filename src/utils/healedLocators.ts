/**
 * The `HealedLocators` class is responsible for managing the healed locators.
 * It stores the original locators and their corresponding AI-healed versions.
 * This class can be used to track healing attempts and use them for training the AI model.
 */
export class HealedLocators {
  static healedLocators: Array<{ original: string, healed: string, pageName: string }> = [];

  /**
   * Adds a new healed locator to the list of healed locators.
   * This is used after AI healing to store the original and healed locators.
   * 
   * @param original - The original locator string.
   * @param healed - The AI-predicted healed locator string.
   * @param pageName - The name of the page where the locator was healed.
   */
  static addHealedLocator(original: string, healed: string, pageName: string): void {
    this.healedLocators.push({ original, healed, pageName });
  }

  /**
   * Retrieves all healed locators stored in the system.
   * This is useful for reviewing or training the AI model with healed locators.
   * 
   * @returns An array of healed locators, each containing the original locator, healed locator, and page name.
   */
  static getHealedLocators(): Array<{ original: string, healed: string, pageName: string }> {
    return this.healedLocators;
  }

  /**
   * Clears the list of healed locators.
   * This is useful after training the model or after completing a test run.
   */
  static clear(): void {
    this.healedLocators = [];
  }
}
