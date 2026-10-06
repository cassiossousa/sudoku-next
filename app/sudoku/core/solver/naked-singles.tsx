import { IGrid, IGridCell } from '../../sudoku';
import { SolverStep } from './step';

/**
 * Naked Singles Technique
 *
 * This technique fills cells that have exactly one possible value remaining
 * after considering all Sudoku constraints (row, column, box). This is the
 * simplest and most common solving technique, used by all Sudoku solvers.
 *
 * Rationale:
 * - Very fast - O(81 * 9) = O(729) for a 9x9 grid
 * - Can solve many easy puzzles without any backtracking
 * - Mimics the first step expert human solvers take
 * - Reduces the search space for more complex techniques
 *
 * This function iterates through all empty cells and fills any that have
 * exactly one candidate. It continues until no more naked singles exist.
 * The grid is modified in-place for efficiency.
 *
 * Returns:
 * - [fullySolved, steps]: whether the grid is completely solved and the
 *   list of solver steps taken
 *
 * Visualization:
 * - Each filled cell is included in the step's position for highlighting
 * - This allows the UI to show which cells were filled by this technique
 */
export function fillNakedSingles(grid: IGrid): [boolean, SolverStep[]] {
  const solverSteps: SolverStep[] = [];

  const _fillNakedSingles = (
    currentCell: IGridCell | null,
    filledPreviousCell: boolean,
  ): boolean => {
    if (currentCell === null) return filledPreviousCell;

    const availableGuesses: Set<number> = grid.getAvailableGuesses(currentCell);
    if (availableGuesses.size === 1) {
      const cellValue = availableGuesses.values().next().value!;
      currentCell.setValue(cellValue);
      solverSteps.push({
        solverType: 'naked-single',
        position: currentCell.getPosition(),
        value: cellValue,
        highlightedCells: [currentCell.getPosition()], // Highlight the cell being filled
      });

      const nextCell = grid.getFirstEmptyCell();
      return _fillNakedSingles(nextCell, true);
    } else {
      return _fillNakedSingles(grid.getNextEmptyCell(currentCell), false);
    }
  };

  // We start with true because there is always the possibility
  // that the grid starts fully solved.
  const fullySolved = _fillNakedSingles(grid.getFirstEmptyCell(), true);
  return [fullySolved, solverSteps];
}
