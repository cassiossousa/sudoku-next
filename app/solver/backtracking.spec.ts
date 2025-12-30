import { SudokuGrid } from "../sudoku/sudoku";
import { solveByBacktracking } from "./backtracking";

describe('solveByBacktracking()', () => {
  it('returns the Sudoku grid itself if the game is already solved', () => {
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

    const [solutions, backtrackingNeeded] = solveByBacktracking(sudoku);
    expect(backtrackingNeeded).toBe(false);
    expect(solutions.length).toBe(1);
    expect(solutions[0]).toEqual(sudoku);
  });

  it('short-circuits easy Sudoku games that can be solved via single-guess cells only', () => {
    const sudoku = new SudokuGrid([
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

    const [solutions, backtrackingNeeded] = solveByBacktracking(sudoku);
    expect(backtrackingNeeded).toBe(false);
    expect(solutions.length).toBe(1);
    expect(solutions[0].print()).toBe(
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

  it('returns a single solution by backtracking harder Sudoku games', () => {
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

    const [solutions, backtrackingNeeded] = solveByBacktracking(sudoku);
    expect(backtrackingNeeded).toBe(true);
    expect(solutions.length).toBe(1);
    expect(solutions[0].print()).toBe(
      "-------------\n" +
      "|649|831|257|\n" +
      "|531|672|984|\n" +
      "|827|549|613|\n" +
      "-------------\n" +
      "|218|396|745|\n" +
      "|496|157|832|\n" +
      "|753|284|196|\n" +
      "-------------\n" +
      "|374|928|561|\n" +
      "|185|763|429|\n" +
      "|962|415|378|\n" +
      "-------------"
    );
  });

  it('returns multiple solutions by backtracking quasi-Sudoku games', () => {
const sudoku: SudokuGrid = new SudokuGrid([
      [2, 9, 5, 7, 4, 3, 8, 6, 1],
      [4, 3, 1, 8, 6, 5, 9, 0, 0],
      [8, 7, 6, 1, 9, 2, 5, 4, 3],
      [3, 8, 7, 4, 5, 9, 2, 1, 6],
      [6, 1, 2, 3, 8, 7, 4, 9, 5],
      [5, 4, 9, 2, 1, 6, 7, 3, 8],
      [7, 6, 3, 5, 3, 4, 1, 8, 9],
      [9, 2, 8, 6, 7, 1, 3, 5, 4],
      [1, 5, 4, 9, 3, 8, 6, 0, 0],
    ]);

    const [solutions, backtrackingNeeded] = solveByBacktracking(sudoku);
    expect(backtrackingNeeded).toBe(true);
    expect(solutions.length).toBe(2);
    expect(solutions[0].print()).toBe(
      "-------------\n" +
      "|295|743|861|\n" +
      "|431|865|927|\n" +
      "|876|192|543|\n" +
      "-------------\n" +
      "|387|459|216|\n" +
      "|612|387|495|\n" +
      "|549|216|738|\n" +
      "-------------\n" +
      "|763|534|189|\n" +
      "|928|671|354|\n" +
      "|154|938|672|\n" +
      "-------------"
    );

    expect(solutions[1].print()).toBe(
      "-------------\n" +
      "|295|743|861|\n" +
      "|431|865|972|\n" +
      "|876|192|543|\n" +
      "-------------\n" +
      "|387|459|216|\n" +
      "|612|387|495|\n" +
      "|549|216|738|\n" +
      "-------------\n" +
      "|763|534|189|\n" +
      "|928|671|354|\n" +
      "|154|938|627|\n" +
      "-------------"
    );
  });
});