import { SudokuGrid } from "../sudoku/sudoku";
import { fillSingleGuesses } from "./single-guess";

describe('fillSingleGuesses()', () => {
  it('returns true if the Sudoku game is already solved', () => {
    const sudoku: SudokuGrid = new SudokuGrid([
      [6, 9, 2, 4, 1, 5, 3, 7, 8],
      [8, 1, 5, 7, 6, 3, 4, 2, 9],
      [7, 3, 4, 9, 2, 8, 5, 6, 1],
      [5, 7, 3, 2, 8, 4, 1, 9, 6],
      [1, 2, 8, 3, 9, 6, 7, 4, 5],
      [9, 4, 6, 1, 5, 7, 8, 3, 2],
      [3, 5, 1, 6, 7, 2, 9, 8, 4],
      [4, 6, 9, 8, 3, 1, 2, 5, 7],
      [2, 8, 7, 5, 4, 9, 6, 1, 3],
    ]);

    const fullySolved = fillSingleGuesses(sudoku);
    expect(fullySolved).toBe(true);
    expect(sudoku.print()).toBe(
      "-------------\n" +
      "|692|415|378|\n" +
      "|815|763|429|\n" +
      "|734|928|561|\n" +
      "-------------\n" +
      "|573|284|196|\n" +
      "|128|396|745|\n" +
      "|946|157|832|\n" +
      "-------------\n" +
      "|351|672|984|\n" +
      "|469|831|257|\n" +
      "|287|549|613|\n" +
      "-------------"
    );
  });

  it('fills single guesses and solves an easy Sudoku game', () => {
    const sudoku: SudokuGrid = new SudokuGrid([
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

    const fullySolved = fillSingleGuesses(sudoku);
    expect(fullySolved).toBe(true);
    expect(sudoku.print()).toBe(
      "-------------\n" +
      "|692|415|378|\n" +
      "|815|763|429|\n" +
      "|734|928|561|\n" +
      "-------------\n" +
      "|573|284|196|\n" +
      "|128|396|745|\n" +
      "|946|157|832|\n" +
      "-------------\n" +
      "|351|672|984|\n" +
      "|469|831|257|\n" +
      "|287|549|613|\n" +
      "-------------"
    );
  });

  it('fills single guesses without solving harder Sudoku games', () => {
    const sudoku: SudokuGrid = new SudokuGrid([
      [0, 4, 0, 8, 0, 0, 2, 0, 0],
      [5, 3, 0, 0, 0, 0, 0, 0, 4],
      [8, 0, 0, 5, 0, 9, 0, 1, 0],
      [2, 0, 0, 0, 0, 0, 0, 4, 5],
      [4, 9, 0, 0, 0, 0, 8, 3, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 6],
      [3, 0, 0, 0, 2, 0, 5, 0, 0],
      [1, 0, 0, 0, 6, 0, 0, 2, 0],
      [0, 6, 0, 0, 0, 5, 3, 0, 0],
    ]);

    const fullySolved = fillSingleGuesses(sudoku);
    expect(fullySolved).toBe(false);
    expect(sudoku.print()).toBe(
      "-------------\n"+
      "|64 |8  |2  |\n"+
      "|53 |   |9 4|\n"+
      "|8  |5 9|61 |\n"+
      "-------------\n"+
      "|2  |   |745|\n"+
      "|49 |   |832|\n"+
      "|7  |   |196|\n"+
      "-------------\n"+
      "|3  | 2 |5  |\n"+
      "|1  | 6 |42 |\n"+
      "|96 |  5|3  |\n"+
      "-------------"
    );
  });
});