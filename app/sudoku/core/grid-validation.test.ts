import { SudokuGrid } from './grid';
import { GridValidation } from './grid-validation';

describe('GridValidation', () => {
  const emptyGrid = new SudokuGrid([
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

  describe('isInvalid()', () => {
    it('returns false for an empty grid', () => {
      const [isInvalid] = GridValidation.isInvalid(emptyGrid);

      expect(isInvalid).toBe(false);
    });

    it('returns true for a grid with duplicate in row', () => {
      const invalidGrid = new SudokuGrid([
        [6, 9, 2, 4, 1, 5, 3, 7, 8],
        [8, 1, 5, 7, 6, 3, 4, 2, 9],
        [7, 3, 4, 9, 2, 8, 5, 6, 1],
        [5, 7, 3, 2, 8, 4, 1, 9, 6],
        [1, 4, 6, 5, 3, 9, 8, 2, 7],
        [9, 2, 8, 1, 5, 6, 7, 4, 3],
        [2, 6, 9, 3, 4, 7, 8, 5, 1],
        [3, 5, 7, 6, 9, 2, 1, 8, 4],
        [4, 8, 1, 6, 7, 1, 2, 5, 9],
      ]);

      const [isInvalid] = GridValidation.isInvalid(invalidGrid);

      expect(isInvalid).toBe(true);
    });

    it('returns invalid cells array matching grid size', () => {
      const [isInvalid, invalidCells] = GridValidation.isInvalid(emptyGrid);

      expect(invalidCells).toHaveLength(9);
      expect(invalidCells.every((row) => row.length === 9)).toBe(true);
    });
  });

  describe('isInvalidForRow()', () => {
    it('returns false for a valid row', () => {
      const isInvalid = GridValidation.isInvalidForRow(emptyGrid, 0);

      expect(isInvalid).toBe(false);
    });

    it('returns true for a row with duplicates', () => {
      const gridWithDuplicate = new SudokuGrid([
        [6, 9, 2, 4, 1, 5, 3, 7, 6],
        [8, 1, 5, 7, 6, 3, 4, 2, 9],
        [7, 3, 4, 9, 2, 8, 5, 6, 1],
        [5, 7, 3, 2, 8, 4, 1, 9, 6],
        [1, 4, 6, 5, 3, 9, 8, 2, 7],
        [9, 2, 8, 1, 5, 6, 7, 4, 3],
        [2, 6, 9, 3, 4, 7, 8, 5, 1],
        [3, 5, 7, 6, 9, 2, 1, 8, 4],
        [4, 8, 1, 0, 7, 0, 2, 5, 9],
      ]);

      const isInvalid = GridValidation.isInvalidForRow(gridWithDuplicate, 0);

      expect(isInvalid).toBe(true);
    });
  });

  describe('isInvalidForCol()', () => {
    it('returns false for a valid column', () => {
      const isInvalid = GridValidation.isInvalidForCol(emptyGrid, 0);

      expect(isInvalid).toBe(false);
    });

    it('returns true for a column with duplicates', () => {
      const gridWithDuplicate = new SudokuGrid([
        [6, 9, 2, 4, 1, 5, 3, 7, 8],
        [8, 1, 5, 7, 6, 3, 4, 2, 9],
        [7, 3, 4, 9, 2, 8, 5, 6, 1],
        [5, 7, 3, 2, 8, 4, 1, 9, 6],
        [1, 4, 6, 5, 3, 9, 8, 2, 7],
        [9, 2, 8, 1, 5, 6, 7, 4, 3],
        [2, 6, 9, 3, 4, 7, 8, 5, 1],
        [3, 5, 7, 6, 9, 2, 1, 8, 4],
        [6, 8, 1, 6, 7, 1, 2, 5, 9],
      ]);

      const isInvalid = GridValidation.isInvalidForCol(gridWithDuplicate, 0);

      expect(isInvalid).toBe(true);
    });
  });

  describe('isInvalidForBox()', () => {
    it('returns false for a valid 3x3 box', () => {
      const isInvalid = GridValidation.isInvalidForBox(emptyGrid, 0, 0);

      expect(isInvalid).toBe(false);
    });

    it('returns true for a box with duplicates', () => {
      const gridWithDuplicate = new SudokuGrid([
        [6, 9, 2, 4, 1, 5, 3, 7, 8],
        [8, 1, 5, 7, 6, 3, 4, 2, 9],
        [7, 3, 6, 9, 2, 8, 5, 6, 1],
        [5, 7, 3, 2, 8, 4, 1, 9, 6],
        [1, 4, 6, 5, 3, 9, 8, 2, 7],
        [9, 2, 8, 1, 5, 6, 7, 4, 3],
        [2, 6, 9, 3, 4, 7, 8, 5, 1],
        [3, 5, 7, 6, 9, 2, 1, 8, 4],
        [0, 8, 1, 0, 7, 0, 2, 5, 9],
      ]);

      const isInvalid = GridValidation.isInvalidForBox(gridWithDuplicate, 0, 0);

      expect(isInvalid).toBe(true);
    });

    it('checks the correct box boundaries', () => {
      const isInvalid = GridValidation.isInvalidForBox(emptyGrid, 4, 4);

      expect(isInvalid).toBe(false);
    });
  });
});
