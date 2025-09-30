// Lottery number generator utilities

export interface PowerballTicket {
  numbers: number[];
  powerball: number;
  powerPlay: number;
}

export interface MegaMillionsTicket {
  numbers: number[];
  megaBall: number;
  megaplier: number;
}

// Generate random number within range (inclusive)
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate unique random numbers
const generateUniqueNumbers = (count: number, min: number, max: number): number[] => {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(getRandomNumber(min, max));
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

// Generate Powerball ticket
// 5 white balls from 1-69, 1 red Powerball from 1-26
// Power Play multiplier: 2x, 3x, 4x, 5x, or 10x
export const generatePowerballTicket = (): PowerballTicket => {
  const numbers = generateUniqueNumbers(5, 1, 69);
  const powerball = getRandomNumber(1, 26);
  const powerPlayOptions = [2, 3, 4, 5, 10];
  const powerPlay = powerPlayOptions[getRandomNumber(0, powerPlayOptions.length - 1)];

  return {
    numbers,
    powerball,
    powerPlay,
  };
};

// Generate Mega Millions ticket
// 5 white balls from 1-70, 1 gold Mega Ball from 1-25
// Megaplier: 2x, 3x, 4x, or 5x
export const generateMegaMillionsTicket = (): MegaMillionsTicket => {
  const numbers = generateUniqueNumbers(5, 1, 70);
  const megaBall = getRandomNumber(1, 25);
  const megaplierOptions = [2, 3, 4, 5];
  const megaplier = megaplierOptions[getRandomNumber(0, megaplierOptions.length - 1)];

  return {
    numbers,
    megaBall,
    megaplier,
  };
};