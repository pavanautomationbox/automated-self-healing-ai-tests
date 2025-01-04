
# Automated Self-Healing AI Tests 🚀

[![Node.js](https://img.shields.io/badge/node-%3E%3D%2016.x-brightgreen)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/playwright-v1.38-blue)](https://playwright.dev/)
[![TensorFlow](https://img.shields.io/badge/tensorflow-%3E%3D2.0-orange)](https://www.tensorflow.org/)

This project is a cutting-edge test automation framework powered by **AI-based self-healing locators**. It leverages Playwright, TensorFlow, and Cucumber for a robust, scalable, and efficient testing solution.

## 📂 **Project Structure**

```plaintext

project/
├── build/                              # Build directory for compiled output
├── features/                           # Cucumber feature files directory
│   ├── login.feature                   # Example Cucumber feature file
├── src/
│   ├── ai/
│   │   ├── models/                     # Directory for TensorFlow AI model files
│   │   │   ├── saved_model.pb          # Main AI model file
│   │   │   ├── model.json              # TensorFlow model JSON file (if applicable)
│   │   │   ├── variables/              # TensorFlow model variables directory
│   │   │   │   ├── variables.data-00000-of-00001
│   │   │   │   └── variables.index
│   │   ├── locatorPredictor.ts         # AI-based locator prediction and training logic
│   ├── utils/
│   │   ├── healedLocators.ts           # HealedLocators class for storing healed locators
│   │   ├── locatorUtils.ts             # Utility methods for handling locators
│   ├── pages/
│   │   ├── loginPage.ts                # Page Object with backup locators and healing
│   ├── stepDefinitions/
│   │   ├── hooks.ts                    # Combined Before and After hooks for AI model handling
│   │   ├── loginSteps.ts               # Step Definitions for login scenario
└── cucumber.js                         # Cucumber configuration file

```

## 🌟 **Key Features**

- **AI-based Locator Healing**: Automatically heals broken locators using TensorFlow models.
- **Backup Locators**: Provides fallback locators to ensure test continuity.
- **Reusable Utilities**: Includes helper functions for locator management.

## Prerequisites
- Node.js v20.13.1 or later.
- Python 3.7+ (for TensorFlow dependencies on Windows).
- Windows Build Tools or equivalent for native modules.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/pavankumardmg/automated-self-healing-ai-tests.git
   cd automated-self-healing-ai-tests

2. Install dependencies:
```bash
   npm install
```   

3. Run tests:
```bash
  npx cucumber-js
```

