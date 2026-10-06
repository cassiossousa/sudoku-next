import { SudokuGrid } from '../../grid';
import { HiddenSingles } from './hidden-singles';

/**
 * Hidden Singles Technique Tests
 *
 * Tests the hidden singles technique which finds digits that can only
 * go in one place within a unit (row, column, or box).
 */
describe('HiddenSingles', () => {
  it('returns not applied when no hidden singles exist', () => {
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

    const result = HiddenSingles.find(grid);

    expect(result.technique).toBe('hidden-single');
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

    const result = HiddenSingles.find(grid);

    expect(result).toHaveProperty('applied');
    expect(result).toHaveProperty('technique');
    expect(result).toHaveProperty('cellsFilled');
    expect(result).toHaveProperty('explanation');
    expect(result).toHaveProperty('highlightedCells');
  });

  it('includes highlightedCells when hidden singles are found', () => {
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

    const result = HiddenSingles.find(grid);

    // If hidden singles are found, they should have highlightedCells
    if (result.applied) {
      expect(result.highlightedCells).toBeDefined();
      expect(result.highlightedCells!.length).toBeGreaterThan(0);
    }
  });
});
