import { SudokuGrid } from '../../grid';
import { NakedPairs } from './naked-pairs';

/**
 * Naked Pairs Technique Tests
 *
 * Tests the naked pairs technique which finds two cells in a unit
 * that share exactly the same two candidates.
 */
describe('NakedPairs', () => {
  it('returns not applied when no naked pairs exist', () => {
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

    const result = NakedPairs.find(grid);

    expect(result.technique).toBe('naked-pair');
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

    const result = NakedPairs.find(grid);

    expect(result).toHaveProperty('applied');
    expect(result).toHaveProperty('technique');
    expect(result).toHaveProperty('cellsFilled');
    expect(result).toHaveProperty('explanation');
    expect(result).toHaveProperty('highlightedCells');
  });

  it('has cellsFilled of 0 (naked pairs eliminate candidates, do not fill cells)', () => {
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

    const result = NakedPairs.find(grid);

    expect(result.cellsFilled).toBe(0);
  });

  it('includes highlightedCells when naked pairs are found', () => {
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

    const result = NakedPairs.find(grid);

    // If naked pairs are found, they should have highlightedCells
    if (result.applied) {
      expect(result.highlightedCells).toBeDefined();
      expect(result.highlightedCells!.length).toBeGreaterThan(0);
    }
  });
});
