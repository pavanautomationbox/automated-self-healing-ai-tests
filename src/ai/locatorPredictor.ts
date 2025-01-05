import * as tf from '@tensorflow/tfjs-node';
import path from 'path';
import fs from 'fs';

/**
 * The `LocatorPredictor` class is responsible for predicting healed locators using an AI model.
 * It loads the trained model and uses it to predict new locators based on the failed locator inputs.
 */
export class LocatorPredictor {
  private static model: tf.GraphModel | null = null;
  private static trainingDataPath = path.resolve('src/ai/models/training_data.json');

  /**
   * Loads the AI model from the saved file.
   * The model is loaded only once and reused for prediction purposes.
   */
  public static async loadModel(): Promise<void> {
    if (this.model) return;

    const modelPath = path.resolve('src/ai/models/locator_model');
    this.model = await tf.loadGraphModel(`file://${modelPath}/saved_model.pb`);
    console.log('AI model loaded successfully from:', modelPath);
  }

  /**
   * Predicts a new locator based on the failed locator using the AI model.
   * The failed locator is converted to a numerical format and passed into the model for prediction.
   * The predicted result is then converted back into a string locator.
   * 
   * @param failedLocator - The locator string that failed during the test.
   * @returns The AI-predicted healed locator string.
   */
  public static async predictNewLocator(failedLocator: string): Promise<string> {
    if (!this.model) throw new Error('Model not loaded.');

    const inputTensor = tf.tensor([this.locatorToNumber(failedLocator)]);
    const predictionTensor = this.model.predict(inputTensor) as tf.Tensor;
    const healedLocator = this.numberToLocator((await predictionTensor.array())[0]);

    inputTensor.dispose();
    predictionTensor.dispose();

    return healedLocator;
  }

  /**
   * Stores training data of original and healed locators in a JSON file.
   * This data can be used to retrain the AI model in the future.
   * 
   * @param originalLocator - The original locator string.
   * @param healedLocator - The healed locator string.
   */
  public static async storeTrainingData(originalLocator: string, healedLocator: string): Promise<void> {
    const trainingData = this.getTrainingData();
    trainingData.push({ originalLocator, healedLocator });
    fs.writeFileSync(this.trainingDataPath, JSON.stringify(trainingData, null, 2));
    console.log('Training data updated:', { originalLocator, healedLocator });
  }

  /**
   * Retrieves all the training data stored in the system.
   * If no data exists, it returns an empty array.
   * 
   * @returns An array of objects containing the original and healed locators.
   */
  private static getTrainingData(): { originalLocator: string; healedLocator: string }[] {
    if (!fs.existsSync(this.trainingDataPath)) return [];
    return JSON.parse(fs.readFileSync(this.trainingDataPath, 'utf8')) || [];
  }

  /**
   * Converts a string locator into a numerical representation for use with the AI model.
   * 
   * @param locator - The locator string.
   * @returns A numeric representation of the locator.
   */
  private static locatorToNumber(locator: string): number {
    return locator.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }

  /**
   * Converts a numeric value back into a string locator.
   * 
   * @param number - The numeric value representing a locator.
   * @returns The locator string.
   */
  private static numberToLocator(number: number): string {
    return String.fromCharCode(Math.round(number));
  }
}
