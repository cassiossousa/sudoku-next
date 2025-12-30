import { IGrid, IGridCell } from "../sudoku/sudoku";

/**
 * This is not exactly a solver, but given that some
 * easy Sudoku games can be solved by basically iterating
 * through single-guess cells over and over, this is also
 * a good way to expedite other solving algorithms as soon
 * as cells with higher complexity are solved. This also
 * returns a flag to tell whether the grid (changed in-place)
 * was fully solved.
 */
export function fillSingleGuesses(grid: IGrid): boolean {
  const _fillSingleGuesses = (currentCell: IGridCell | null, filledPreviousCell: boolean): boolean => {
    if (currentCell === null) return filledPreviousCell;

    const availableGuesses: Set<number> = grid.getAvailableGuesses(currentCell);
    if (availableGuesses.size === 1) {
      currentCell.setValue(availableGuesses.values().next().value!);
      const nextCell = grid.getFirstEmptyCell();
      return _fillSingleGuesses(nextCell, true);
    } else {
      return _fillSingleGuesses(grid.getNextEmptyCell(currentCell), false);
    }
  }

  // We start with true because there is always the possibility
  // that the grid is already fully solved.
  return _fillSingleGuesses(grid.getFirstEmptyCell(), true);
}