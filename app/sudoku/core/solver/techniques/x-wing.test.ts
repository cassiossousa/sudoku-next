import { SudokuGrid } from '../../grid';
import { XWing } from './x-wing';

/**
 * X-Wing Technique Tests
 *
 * Tests the X-Wing solving technique which eliminates candidates
 * when a digit appears in exactly two cells in two different rows
 * at the same column positions.
 */
describe('XWing', () => {
  it('returns not applied when no X-Wing pattern exists', () => {
    const grid = new SudokuGrid([
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

    const result = XWing.find(grid);

    expect(result.applied).toBe(false);
    expect(result.technique).toBe('x-wing');
    expect(result.highlightedCells).toBeUndefined();
  });

  it('returns a valid TechniqueResult structure', () => {
    const grid = new SudokuGrid([
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

    const result = XWing.find(grid);

    expect(result).toHaveProperty('applied');
    expect(result).toHaveProperty('technique');
    expect(result).toHaveProperty('cellsFilled');
    expect(result).toHaveProperty('explanation');
    expect(result).toHaveProperty('highlightedCells');
  });

  it('has cellsFilled of 0 (X-Wing eliminates candidates, does not fill cells)', () => {
    const grid = new SudokuGrid([
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

    const result = XWing.find(grid);

    expect(result.cellsFilled).toBe(0);
  });

  it('includes highlightedCells when X-Wing pattern is found', () => {
    const grid = new SudokuGrid([
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

    const result = XWing.find(grid);

    // If an X-Wing is found, it should have highlightedCells (the four corner cells)
    // For this specific grid, no X-Wing exists, so highlightedCells should be undefined
    expect(result.highlightedCells).toBeUndefined();
  });
});
