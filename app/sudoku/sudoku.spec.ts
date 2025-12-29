import { SudokuGrid, SudokuGridCell } from "./sudoku";

describe('SudokuGrid', () => {
  let sudoku: SudokuGrid;

  beforeEach(() => {
    sudoku = new SudokuGrid([
      [6, 0, 2, 4, 1, 0, 0, 0, 8],
      [0, 1, 5, 7, 0, 3, 0, 0, 9],
      [7, 3, 4, 0, 0, 8, 0, 6, 0],
      [5, 0, 3, 2, 0, 4, 0, 0, 0],
      [0, 0, 8, 0, 9, 0, 0, 0, 5],
      [0, 0, 6, 0, 5, 7, 0, 3, 0],
      [0, 5, 0, 0, 7, 0, 9, 0, 4],
      [4, 0, 9, 0, 0, 0, 2, 5, 0],
      [0, 8, 7, 0, 0, 0, 6, 0, 3],
    ]);
  });

  describe('getAvailableGuessesInRow()', () => {
    it('returns the proper guesses in the row', () => {
      expect(sudoku.getAvailableGuessesInRow(4)).toEqual(
        new Set([1, 2, 3, 4, 6, 7])
      );
    });
  });

  describe('getAvailableGuessesInCol()', () => {
    it('returns the proper guesses in the column', () => {
      expect(sudoku.getAvailableGuessesInCol(1)).toEqual(
        new Set([2, 4, 6, 7, 9])
      );
    });
  });

  describe('getAvailableGuessesInBox()', () => {
    it('returns the proper guesses in the 3x3 box containing the position', () => {
      expect(sudoku.getAvailableGuessesInBox(4, 1)).toEqual(
        new Set([1, 2, 4, 7, 9])
      );
    });
  });

  describe('getAvailableGuesses()', () => {
    it('returns the proper guesses for a given cell', () => {
      const cell = sudoku.grid[4][1];
      expect(sudoku.getAvailableGuesses(cell)).toEqual(
        new Set([2, 4, 7])
      );
    });

    it('returns an empty set for a cell that does not belong to the grid', () => {
      const cell = new SudokuGridCell(4, 1, null);
      expect(sudoku.getAvailableGuesses(cell)).toEqual(new Set());
    });

    it('returns an empty set for a cell that already has a value', () => {
      const cell = sudoku.grid[4][2];
      expect(sudoku.getAvailableGuesses(cell)).toEqual(new Set());
    });
  })

  describe('print()', () => {
    it('prints the Sudoku properly', () => {
      expect(sudoku.print()).toBe(
        `-------------\n` +
        `|6 2|41 |  8|\n` +
        `| 15|7 3|  9|\n` +
        `|734|  8| 6 |\n` +
        `-------------\n` +
        `|5 3|2 4|   |\n` +
        `|  8| 9 |  5|\n` +
        `|  6| 57| 3 |\n` +
        `-------------\n` +
        `| 5 | 7 |9 4|\n` +
        `|4 9|   |25 |\n` +
        `| 87|   |6 3|\n` +
        `-------------`
      );
    });
  });
});