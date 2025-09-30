/**
 * Lottery Number Generator Utilities
 *
 * This module provides functions to generate random lottery numbers for Powerball and Mega Millions.
 * It ensures all generated numbers are unique and within the valid ranges for each lottery type.
 */

/**
 * Represents a Powerball lottery ticket
 *
 * @property {number[]} numbers - Array of 5 unique white ball numbers (1-69), sorted in ascending order
 * @property {number} powerball - Single red Powerball number (1-26)
 * @property {number} powerPlay - Power Play multiplier option (2x, 3x, 4x, 5x, or 10x)
 *
 * @example
 * const ticket: PowerballTicket = {
 *   numbers: [5, 12, 23, 45, 67],
 *   powerball: 15,
 *   powerPlay: 3
 * };
 */
export interface PowerballTicket {
  numbers: number[];
  powerball: number;
  powerPlay: number;
}

/**
 * Represents a Mega Millions lottery ticket
 *
 * @property {number[]} numbers - Array of 5 unique white ball numbers (1-70), sorted in ascending order
 * @property {number} megaBall - Single gold Mega Ball number (1-25)
 * @property {number} megaplier - Megaplier multiplier option (2x, 3x, 4x, or 5x)
 *
 * @example
 * const ticket: MegaMillionsTicket = {
 *   numbers: [8, 19, 31, 54, 68],
 *   megaBall: 12,
 *   megaplier: 4
 * };
 */
export interface MegaMillionsTicket {
  numbers: number[];
  megaBall: number;
  megaplier: number;
}

/**
 * Generates a random integer within a specified range (inclusive)
 *
 * This helper function uses Math.random() to generate a number between min and max,
 * including both endpoints. It's used internally to generate individual lottery numbers.
 *
 * @param {number} min - The minimum value (inclusive)
 * @param {number} max - The maximum value (inclusive)
 * @returns {number} A random integer between min and max
 *
 * @example
 * const randomNum = getRandomNumber(1, 69); // Could return any number from 1 to 69
 */
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates an array of unique random numbers within a specified range
 *
 * This function uses a Set to ensure all generated numbers are unique.
 * It keeps generating random numbers until it has the required count,
 * then converts to an array and sorts in ascending order.
 *
 * Why use a Set? Sets automatically prevent duplicate values, making it perfect
 * for generating unique lottery numbers without manual duplicate checking.
 *
 * @param {number} count - How many unique numbers to generate
 * @param {number} min - The minimum value for numbers (inclusive)
 * @param {number} max - The maximum value for numbers (inclusive)
 * @returns {number[]} Array of unique numbers sorted in ascending order
 *
 * @example
 * const numbers = generateUniqueNumbers(5, 1, 69);
 * // Returns something like: [12, 23, 34, 45, 67]
 */
const generateUniqueNumbers = (count: number, min: number, max: number): number[] => {
  // Create a Set to store unique numbers (Sets automatically reject duplicates)
  const numbers = new Set<number>();

  // Keep adding random numbers until we have enough unique ones
  while (numbers.size < count) {
    numbers.add(getRandomNumber(min, max));
  }

  // Convert Set to Array and sort in ascending order (a - b sorts numerically)
  return Array.from(numbers).sort((a, b) => a - b);
};

/**
 * Generates a complete Powerball lottery ticket with random numbers
 *
 * Powerball Rules:
 * - Choose 5 white balls from a pool of 69 (numbers 1-69)
 * - Choose 1 red Powerball from a pool of 26 (numbers 1-26)
 * - Optional Power Play multiplier: 2x, 3x, 4x, 5x, or 10x
 *
 * How it works:
 * 1. Generate 5 unique numbers for white balls
 * 2. Generate 1 number for the Powerball (can duplicate white balls)
 * 3. Randomly select a Power Play multiplier from available options
 *
 * @returns {PowerballTicket} A complete Powerball ticket object
 *
 * @example
 * const ticket = generatePowerballTicket();
 * console.log(ticket);
 * // Output: { numbers: [5, 23, 34, 56, 67], powerball: 15, powerPlay: 3 }
 */
export const generatePowerballTicket = (): PowerballTicket => {
  // Generate 5 unique white ball numbers from 1-69
  const numbers = generateUniqueNumbers(5, 1, 69);

  // Generate 1 red Powerball number from 1-26
  const powerball = getRandomNumber(1, 26);

  // Available Power Play multiplier options (10x is rare but possible)
  const powerPlayOptions = [2, 3, 4, 5, 10];

  // Randomly select one of the Power Play multipliers
  const powerPlay = powerPlayOptions[getRandomNumber(0, powerPlayOptions.length - 1)];

  return {
    numbers,
    powerball,
    powerPlay,
  };
};

/**
 * Generates a complete Mega Millions lottery ticket with random numbers
 *
 * Mega Millions Rules:
 * - Choose 5 white balls from a pool of 70 (numbers 1-70)
 * - Choose 1 gold Mega Ball from a pool of 25 (numbers 1-25)
 * - Optional Megaplier: 2x, 3x, 4x, or 5x
 *
 * How it works:
 * 1. Generate 5 unique numbers for white balls
 * 2. Generate 1 number for the Mega Ball (can duplicate white balls)
 * 3. Randomly select a Megaplier from available options
 *
 * @returns {MegaMillionsTicket} A complete Mega Millions ticket object
 *
 * @example
 * const ticket = generateMegaMillionsTicket();
 * console.log(ticket);
 * // Output: { numbers: [8, 19, 31, 54, 68], megaBall: 12, megaplier: 4 }
 */
export const generateMegaMillionsTicket = (): MegaMillionsTicket => {
  // Generate 5 unique white ball numbers from 1-70
  const numbers = generateUniqueNumbers(5, 1, 70);

  // Generate 1 gold Mega Ball number from 1-25
  const megaBall = getRandomNumber(1, 25);

  // Available Megaplier options (no 10x option in Mega Millions)
  const megaplierOptions = [2, 3, 4, 5];

  // Randomly select one of the Megaplier options
  const megaplier = megaplierOptions[getRandomNumber(0, megaplierOptions.length - 1)];

  return {
    numbers,
    megaBall,
    megaplier,
  };
};