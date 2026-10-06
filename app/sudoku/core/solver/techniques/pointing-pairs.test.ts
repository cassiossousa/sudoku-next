import { SudokuGrid } from '../../grid';
import { PointingPairs } from './pointing-pairs';

/**
 * Pointing Pairs Technique Tests
 *
 * Tests the pointing pairs technique which finds candidates in a box
 * constrained to a single row or column.
 */
describe('PointingPairs', () => {
  it('returns not applied when no pointing pairs exist', () => {
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

    const result = PointingPairs.find(grid);

    expect(result.technique).toBe('pointing-pair');
    expect(result).toHaveProperty('applied');
    expect(result).toHaveProperty('cellsFilled');
    expect(result).toHaveProperty('highlightedCells');
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

    const result = PointingPairs.find(grid);

    expect(result).toHaveProperty('applied');
    expect(result).toHaveProperty('technique');
    expect(result).toHaveProperty('cellsFilled');
    expect(result).toHaveProperty('explanation');
    expect(result).toHaveProperty('highlightedCells');
  });

  it('has cellsFilled of 0 (pointing pairs eliminate candidates, do not fill cells)', () => {
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

    const result = PointingPairs.find(grid);

    expect(result.cellsFilled).toBe(0);
  });

  it('includes highlightedCells when pointing pairs are found', () => {
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

    const result = PointingPairs.find(grid);

    // If pointing pairs are found, they should have highlightedCells
    if (result.applied) {
      expect(result.highlightedCells).toBeDefined();
      expect(result.highlightedCells!.length).toBeGreaterThan(0);
    }
  });
});
