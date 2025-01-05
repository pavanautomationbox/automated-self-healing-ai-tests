import { chromium, Browser, BrowserContext, Page } from "@playwright/test";

export class BrowserUtils {
  private static browser: Browser | null = null;

  static async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: false });
    }
    return this.browser;
  }

  static async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  static async newPage(): Promise<Page> {
    const browser = await this.getBrowser();
    const context: BrowserContext = await browser.newContext();
    return context.newPage();
  }
}
