import { SudokuGrid } from '../grid';
import { GridTransformations } from './transformations';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface SeedGeneratorConfig {
  seed: number[][];
  rotations: number;
  shuffleRowGroups: boolean;
  shuffleColGroups: boolean;
  shuffleRows: boolean;
  shuffleCols: boolean;
  swapDigits: boolean;
  difficulty: Difficulty;
}

/**
 * Seed-Based Puzzle Generator
 *
 * This generator creates Sudoku puzzles by applying transformations to a known
 * valid solution. This approach, used by sudoku-gen and Super Sudoku, is fast
 * and produces high-quality puzzles without requiring backtracking.
 *
 * The generator supports:
 * - Rotations (0°, 90°, 180°, 270°)
 * - Row/column group shuffling (bands/stacks)
 * - Individual row/column shuffling within groups
 * - Digit swapping (9! permutations)
 * - Cell removal (hole-digging) based on difficulty
 *
 * With all transformations enabled, a single seed can produce trillions of
 * unique puzzles. The generator uses clue count to determine difficulty:
 * - Easy: ~40 clues
 * - Medium: ~35 clues
 * - Hard: ~30 clues
 * - Expert: ~25 clues
 */
export class SeedBasedGenerator {
  private static DIFFICULTY_CLUE_TARGETS = {
    easy: 40,
    medium: 35,
    hard: 30,
    expert: 25,
  };

  static generatePuzzle(seed: number[][], difficulty: Difficulty): number[][] {
    const config: Partial<SeedGeneratorConfig> = {
      difficulty,
      rotations: Math.floor(Math.random() * 4),
      shuffleRowGroups: true,
      shuffleColGroups: true,
      shuffleRows: true,
      shuffleCols: true,
      swapDigits: true,
    };

    const transformed = this.generateFromSeed(seed, config);
    const puzzle = this.removeCells(transformed, difficulty);

    return puzzle;
  }

  static generateFromSeed(seed: number[][], config: Partial<SeedGeneratorConfig> = {}): number[][] {
    let grid = [...seed.map((row) => [...row])];

    for (let i = 0; i < (config.rotations ?? 1); i++) {
      grid = GridTransformations.rotate90(grid);
    }

    if (config.shuffleRowGroups) {
      grid = GridTransformations.shuffleRowGroups(grid);
    }

    if (config.shuffleColGroups) {
      grid = GridTransformations.shuffleColGroups(grid);
    }

    if (config.shuffleRows) {
      grid = GridTransformations.shuffleRows(grid);
    }

    if (config.shuffleCols) {
      grid = GridTransformations.shuffleCols(grid);
    }

    if (config.swapDigits) {
      grid = GridTransformations.swapDigits(grid);
    }

    return grid;
  }

  private static removeCells(grid: number[][], difficulty: Difficulty): number[][] {
    const targetClues = this.DIFFICULTY_CLUE_TARGETS[difficulty];
    const puzzle = grid.map((row) => [...row]);
    const positions: [number, number][] = [];

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        positions.push([row, col]);
      }
    }

    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    let currentClues = 81;
    for (const [row, col] of positions) {
      if (currentClues <= targetClues) break;

      puzzle[row][col] = 0;
      currentClues--;
    }

    return puzzle;
  }
}
