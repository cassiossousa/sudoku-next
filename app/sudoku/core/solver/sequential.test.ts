import { SudokuGrid } from '../grid';
import { SequentialSolver } from './sequential';

/**
 * Sequential Solver Tests
 *
 * Tests the solver that applies techniques in order of complexity
 * before resorting to backtracking. This mimics how expert human
 * solvers approach puzzles.
 */
describe('SequentialSolver', () => {
  const easyGrid = new SudokuGrid([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);

  it('solves easy puzzles using naked singles', () => {
    const result = SequentialSolver.solve(easyGrid);

    expect(result.solved).toBe(true);
    expect(result.techniquesUsed).toContain('naked-single');
  });

  it('tracks which techniques were used', () => {
    const result = SequentialSolver.solve(easyGrid);

    expect(Array.isArray(result.techniquesUsed)).toBe(true);
    expect(result.techniquesUsed.length).toBeGreaterThan(0);
  });

  it('returns steps taken during solving', () => {
    const result = SequentialSolver.solve(easyGrid);

    expect(Array.isArray(result.steps)).toBe(true);
  });

  it('stops when maximum iterations reached', () => {
    const hardGrid = new SudokuGrid([
      [0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 0, 0, 0, 3],
      [0, 0, 0, 0, 0, 0, 0, 0, 4],
      [0, 0, 0, 0, 0, 0, 0, 0, 5],
      [0, 0, 0, 0, 0, 0, 0, 0, 6],
      [0, 0, 0, 0, 0, 0, 0, 0, 7],
      [0, 0, 0, 0, 0, 0, 0, 0, 8],
      [0, 0, 0, 0, 0, 0, 0, 0, 9],
    ]);

    const result = SequentialSolver.solve(hardGrid);

    expect(result.solved).toBe(false);
  });

  it('does not exceed maximum iterations', () => {
    const grid = new SudokuGrid([
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    const result = SequentialSolver.solve(grid);

    expect(result.solved).toBe(false);
  });
});
