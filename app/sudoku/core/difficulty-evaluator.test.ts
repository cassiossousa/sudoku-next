import { SudokuGrid } from './grid';
import { DifficultyEvaluator } from './difficulty-evaluator';

/**
 * Difficulty Evaluator Tests
 *
 * Tests the puzzle difficulty rating system which evaluates puzzles based on:
 * - The solving techniques required
 * - The number of clues provided
 * - Estimated solving time for an average player
 *
 * The evaluator uses the existing naked singles solver to check if a puzzle
 * can be solved with basic techniques, then estimates difficulty based on
 * clue count for more complex puzzles.
 */
describe('DifficultyEvaluator', () => {
  const easyGrid = new SudokuGrid([
    [6, 9, 2, 4, 1, 5, 3, 7, 8],
    [8, 1, 5, 7, 6, 3, 4, 2, 9],
    [7, 3, 4, 9, 2, 8, 5, 6, 1],
    [5, 7, 3, 2, 8, 4, 1, 9, 6],
    [1, 4, 6, 5, 3, 9, 8, 2, 7],
    [9, 2, 8, 1, 5, 6, 7, 4, 3],
    [2, 6, 9, 3, 4, 7, 8, 5, 1],
    [3, 5, 7, 6, 9, 2, 1, 8, 4],
    [4, 8, 1, 0, 7, 0, 2, 5, 9],
  ]);

  it('counts clues correctly', () => {
    const grid = new SudokuGrid([
      [6, 9, 2, 4, 1, 5, 3, 7, 8],
      [8, 1, 5, 7, 6, 3, 4, 2, 9],
      [7, 3, 4, 9, 2, 8, 5, 6, 1],
      [5, 7, 3, 2, 8, 4, 1, 9, 6],
      [1, 4, 6, 5, 3, 9, 8, 2, 7],
      [9, 2, 8, 1, 5, 6, 7, 4, 3],
      [2, 6, 9, 3, 4, 7, 8, 5, 1],
      [3, 5, 7, 6, 9, 2, 1, 8, 4],
      [4, 8, 1, 0, 7, 0, 2, 5, 9],
    ]);

    const rating = DifficultyEvaluator.evaluate(grid);

    expect(rating.clueCount).toBe(79);
  });

  it('returns a difficulty rating', () => {
    const rating = DifficultyEvaluator.evaluate(easyGrid);

    expect(['easy', 'medium', 'hard', 'expert']).toContain(rating.difficulty);
  });

  it('returns a numeric score', () => {
    const rating = DifficultyEvaluator.evaluate(easyGrid);

    expect(typeof rating.score).toBe('number');
    expect(rating.score).toBeGreaterThan(0);
  });

  it('lists techniques used', () => {
    const rating = DifficultyEvaluator.evaluate(easyGrid);

    expect(Array.isArray(rating.techniquesUsed)).toBe(true);
    expect(rating.techniquesUsed.length).toBeGreaterThan(0);
  });

  it('provides estimated solving time', () => {
    const rating = DifficultyEvaluator.evaluate(easyGrid);

    expect(typeof rating.estimatedTime).toBe('string');
    expect(rating.estimatedTime.length).toBeGreaterThan(0);
  });

  it('includes naked-single for puzzles solvable by single guesses', () => {
    const rating = DifficultyEvaluator.evaluate(easyGrid);

    expect(rating.techniquesUsed).toContain('naked-single');
  });
});
