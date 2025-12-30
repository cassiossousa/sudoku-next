import { SudokuGrid } from "../sudoku/sudoku";
import { backtracking } from "./backtracking";

describe('Backtracking', () => {
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

  it('works', () => {
    expect(backtracking(sudoku)).toEqual([]);
  });
});