import { IGrid, IGridCell } from "../sudoku/sudoku";

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
 */
export function backtracking(grid: IGrid): IGrid[] {
    const emptyGrid = grid.getEmptyCopy();
    const firstCell = emptyGrid.getFirstEmptyCell();

    // This is something funny to assume, actually.
    // If the empty grid has no empty cells, what is happening?
    // 1. Either the empty grid has no cells
    //    (so there's nothing to fill, so just return it), or
    // 2. The "empty" grid is completely filled with just the initial values
    //    (and we should just return it, too).
    if (firstCell === null) return [grid];

    const solutions: IGrid[] = [];

    const _isSudokuValid = (currentGrid: IGrid, currentCell: IGridCell): boolean => {
        // Try every available guess in the current cell.
        const availableValues: Set<number> = currentGrid.getAvailableGuesses(currentCell);

        // EXIT CONDITION [INVALID] - cell cannot be filled at all.
        if (availableValues.size === 0) {
            return false;
        }

        let nextGrid: IGrid = currentGrid, nextCell: IGridCell | null = null;

        // SMALL OPTIMIZATION - If there is only one possible guess,
        // we can just add it to the grid without having to copy it.
        if (availableValues.size === 1) {
            const value: number = availableValues.values().next().value!;
            currentCell.setValue(value);
            nextCell = nextGrid.getNextEmptyCell(currentCell);
        } else {
            availableValues.forEach((value: number): void => {
                // If there are multiple (possible) guesses,
                // each one should be added to a copy of the current grid,
                // in order to avoid different backtracking recursions
                // iterating over the same grid.
                nextGrid = currentGrid.getCopy();
                // As we're now iterating over a different grid,
                // the "current" cell is now the first empty cell of this grid
                // (and is not null).
                const currentCellCopy: IGridCell = nextGrid.getFirstEmptyCell()!;
                currentCellCopy.setValue(value);
                nextCell = nextGrid.getNextEmptyCell(currentCellCopy);
            });
        }

        // EXIT CONDITION [VALID] - there is no next cell,
        // so the grid is completely filled with valid guesses.
        if (nextCell === null) {
            solutions.push(nextGrid);
            return true;
        }

        return _isSudokuValid(nextGrid, nextCell);
    }

    // RECURSION CALL
    _isSudokuValid(emptyGrid, firstCell);

    return solutions;
}
