import { IGrid, IGridCell } from "../sudoku/sudoku";
import { fillSingleGuesses } from "./single-guess";
import { SolverStep } from "./step";

/**
 * Let's imagine how a basic backtracking algorithm would work:
 * 
 * 1. You start at one of the grid's empty cells;
 * 2. Then you iterate in such a way that you traverse every cell just once;
 * 2.1. This is worded in order to traverse any type of grid;
 * 3. If the cell already has a value, you go to the next cell;
 * 4. If the cell is empty, you then try to fill it with every valid guess for it;
 * 4.1. [INVALID] If there are no available guesses, you reached a dead end;
 * 4.2. If there are only one available guess, you fill the cell without copying the grid;
 * 4.3. If there are multiple guesses, you create one grid for each guess you fill;
 * 5. You then try to go the next cell;
 * 5.1. [VALID] If there is no next cell, you found a valid grid (store it);
 * 5.2. If there is a next cell, you then do the same loop on step 4;
 * 6. Repeat this process until you exhaust all possible ways to fill the board;
 * 7. Return every valid grid you found (if any).
 * 
 * This is a brute-force algorithm, even if we optimize the way we
 * iterate over guessing trees or fill more trivial cells faster.
 * In case the grid is too complex or allows for too many solutions,
 * remember that this algorithm can and will try to find EVERY ONE OF THEM.
 * 
 * The complexity of each unknown cell is closer to multiplicative than additive,
 * as any cell with multiple available guesses must be tested for all values.
 * This means that the worst-case complexity is closer to O(exp(N)), N being the amount
 * of unknown cells.
 * 
 * Any grid with less-than-17 values (guaranteed to have multiple
 * solutions) could easily take hours or over millions of years to be fully solved.
 * 
 * A grid with exactly 17 digits and one solution takes a few minutes to be solved.
 */
export function solveByBacktracking(grid: IGrid): [[IGrid, SolverStep[]][], boolean] {
  const emptyGrid = grid.getEmptyCopy();
  const solutions: [IGrid, SolverStep[]][] = [];
  const bifurcationsInCourse: [IGrid, SolverStep[]][] = [];
  let backtrackingNeeded = false;

  const _recursiveBacktracking = (currentGrid: IGrid, currentSteps: SolverStep[]): void => {
    // OPTIMIZATION: fill all single guesses in-place,
    // and if this is enough to solve the grid, return it.
    const [fullySolved, singleGuessSteps] = fillSingleGuesses(currentGrid);

    if (fullySolved) {
      solutions.push([currentGrid, [...currentSteps, ...singleGuessSteps]]);
      return;
    }

    // Code needs to get to this very point
    // in order to require backtracking.
    backtrackingNeeded = true;

    // After the first optimization, this next cell cannot be null.
    const firstCell = currentGrid.getFirstEmptyCell()!;
    const availableGuesses: Set<number> = currentGrid.getAvailableGuesses(firstCell);

    // EXIT CONDITION [INVALID] - cell cannot be filled at all.
    if (availableGuesses.size === 0) {
      return;
    }
    
    const firstCellPosition: number[] = currentGrid.findCellPosition(firstCell)!;

    // In order to get here, you need to have at least 2 guesses
    // for the cell (as single guesses are filled first, and
    // zero guesses are invalid/undesirable states), so
    // we will always reach a bifurcation.
    availableGuesses.forEach((value: number, idx: number): void => {
      // Each bifurcation requires its own copy of the current grid
      // to avoid memory concurrency by different guesses. The first
      // grid may keep its reference throughtout the recursion.
      let gridToIterate: IGrid;

      if (idx === 0) {
        gridToIterate = currentGrid;
      } else {
        gridToIterate = currentGrid.getCopy();
      }

      // We're getting a cell based on the original grid's
      // cell position, so we know it's not null.
      const firstCellToIterate: IGridCell = gridToIterate.findCellByPosition(
        firstCellPosition
      )!;
  
      firstCellToIterate.setValue(value);

      const backtrackingStep: SolverStep = {
        solverType: 'backtracking',
        position: firstCellPosition,
        value
      };

      const steps: SolverStep[] = [
        ...currentSteps,
        ...singleGuessSteps,
        backtrackingStep,
      ];

      if (idx === 0) {
        _recursiveBacktracking(gridToIterate, steps);
      } else {
        bifurcationsInCourse.push([gridToIterate, steps]);
      }
    });
  }

  // RECURSION CALL
  _recursiveBacktracking(emptyGrid, []);

  while(bifurcationsInCourse.length > 0) {
    const [grid, steps]: [IGrid, SolverStep[]] = bifurcationsInCourse.pop()!;
    _recursiveBacktracking(grid, steps);
  }

  return [solutions, backtrackingNeeded];
}
