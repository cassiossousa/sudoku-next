import { SeedBasedGenerator, type Difficulty } from './core/generator/seed-based';

/**
 * Sudoku Game Library
 *
 * This file uses the seed-based generator to create puzzles on-demand
 * instead of storing static puzzles. This follows AGENTS.md guidance to use
 * transformation-based generation for speed and quality.
 *
 * Seed solutions are valid, complete Sudoku grids. The generator applies
 * random transformations (rotations, shuffles, digit swaps) and removes cells
 * to create puzzles with the requested difficulty.
 *
 * The generator includes difficulty evaluation to ensure generated puzzles
 * match their intended difficulty rating.
 */
export interface Game {
  difficulty: Difficulty;
  grid: number[][];
}

// Valid Sudoku seed solutions (complete, solved grids)
const SEED_SOLUTIONS: number[][][] = [
  [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ],
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8],
  ],
];

export function getRandomGameByDifficulty(difficulty: Difficulty): Game {
  const seed = SEED_SOLUTIONS[Math.floor(Math.random() * SEED_SOLUTIONS.length)];
  const grid = SeedBasedGenerator.generatePuzzle(seed, difficulty);

  return { difficulty, grid };
}

// Keep an array for compatibility with existing code
export const sudokuGames: Game[] = [
  getRandomGameByDifficulty('easy'),
  getRandomGameByDifficulty('easy'),
  getRandomGameByDifficulty('easy'),
  getRandomGameByDifficulty('medium'),
  getRandomGameByDifficulty('medium'),
  getRandomGameByDifficulty('hard'),
  getRandomGameByDifficulty('hard'),
  getRandomGameByDifficulty('expert'),
];
