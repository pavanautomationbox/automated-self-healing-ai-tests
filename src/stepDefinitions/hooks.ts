import { Before, After, setWorldConstructor } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";
import { LocatorPredictor } from '../ai/locatorPredictor.js'; // Import the locator predictor for AI model
import { HealedLocators } from '../utils/healedLocators.js'; // Import healed locators to track changes

// Extend the Cucumber World to include the browser context and AI model
class CustomWorld {
  browser: Browser | null = null;
  page: Page | null = null;
}

setWorldConstructor(CustomWorld);

/**
 * The `Before` hook is triggered before each test scenario.
 * It initializes the browser and loads the AI model for prediction.
 */
Before(async function () {
  console.log("Starting the browser");

  // Launch the browser and create a new context/page
  this.browser = await chromium.launch({ headless: false });
  const context = await this.browser.newContext();
  this.page = await context.newPage();

  // Load the AI model before running the test
  await LocatorPredictor.loadModel();
});

/**
 * The `After` hook is triggered after each test scenario.
 * It closes the browser and saves training data for the AI model.
 */
After(async function () {
  // Check if the page object exists, and close it
  if (this.page) {
    await this.page.close();
  }
  
  // Check if the browser object exists, and close it
  if (this.browser) {
    await this.browser.close();
  }

  // After the test, train the AI model with healed locators if available
  const healedLocators = HealedLocators.getHealedLocators();
  
  if (healedLocators.length > 0) {
    console.log('Training AI model with healed locators...');
    
    // Store each healed locator for future model training
    healedLocators.forEach(async ({ original, healed }) => {
      await LocatorPredictor.storeTrainingData(original, healed);
    });

    // Clear healed locators after training
    HealedLocators.clear();
  }
});
