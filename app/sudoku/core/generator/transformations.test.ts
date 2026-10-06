import { GridTransformations } from './transformations';

/**
 * Grid Transformations Tests
 *
 * Tests the transformation methods used by the seed-based generator.
 * These transformations preserve Sudoku validity while creating puzzle variety.
 */
describe('GridTransformations', () => {
  const testGrid = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8],
  ];

  describe('rotate90()', () => {
    it('rotates the grid 90 degrees clockwise', () => {
      const rotated = GridTransformations.rotate90(testGrid);

      expect(rotated[0][0]).toBe(testGrid[8][0]);
      expect(rotated[0][8]).toBe(testGrid[0][0]);
    });

    it('preserves grid dimensions', () => {
      const rotated = GridTransformations.rotate90(testGrid);

      expect(rotated).toHaveLength(9);
      expect(rotated.every((row) => row.length === 9)).toBe(true);
    });
  });

  describe('shuffleRowGroups()', () => {
    it('shuffles the three row groups', () => {
      const shuffled = GridTransformations.shuffleRowGroups([...testGrid.map((row) => [...row])]);

      expect(shuffled).toHaveLength(9);
      expect(shuffled.every((row) => row.length === 9)).toBe(true);
    });

    it('does not modify the original grid', () => {
      const original = testGrid.map((row) => [...row]);
      GridTransformations.shuffleRowGroups(testGrid);

      expect(testGrid).toEqual(original);
    });
  });

  describe('shuffleColGroups()', () => {
    it('shuffles the three column groups', () => {
      const shuffled = GridTransformations.shuffleColGroups([...testGrid.map((row) => [...row])]);

      expect(shuffled).toHaveLength(9);
      expect(shuffled.every((row) => row.length === 9)).toBe(true);
    });
  });

  describe('shuffleRows()', () => {
    it('shuffles rows within each band', () => {
      const shuffled = GridTransformations.shuffleRows([...testGrid.map((row) => [...row])]);

      expect(shuffled).toHaveLength(9);
      expect(shuffled.every((row) => row.length === 9)).toBe(true);
    });
  });

  describe('shuffleCols()', () => {
    it('shuffles columns within each stack', () => {
      const shuffled = GridTransformations.shuffleCols([...testGrid.map((row) => [...row])]);

      expect(shuffled).toHaveLength(9);
      expect(shuffled.every((row) => row.length === 9)).toBe(true);
    });
  });

  describe('swapDigits()', () => {
    it('swaps digit values while preserving zeros', () => {
      const gridWithZeros = [
        [1, 0, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
      ];

      const swapped = GridTransformations.swapDigits(gridWithZeros);

      expect(swapped[0][1]).toBe(0);
      expect(swapped).toHaveLength(9);
      expect(swapped.every((row) => row.length === 9)).toBe(true);
    });
  });

  describe('transpose()', () => {
    it('transposes rows and columns', () => {
      const transposed = GridTransformations.transpose(testGrid);

      expect(transposed[0][0]).toBe(testGrid[0][0]);
      expect(transposed[0][1]).toBe(testGrid[1][0]);
      expect(transposed[1][0]).toBe(testGrid[0][1]);
    });

    it('preserves grid dimensions', () => {
      const transposed = GridTransformations.transpose(testGrid);

      expect(transposed).toHaveLength(9);
      expect(transposed.every((row) => row.length === 9)).toBe(true);
    });
  });
});
