interface IGridCell {
    initialValue: number | null;
    value: number | null;
    getInitialValue(): number | null;
    getValue(): number | null;
    setValue(value: number): void;
}

class SudokuGridCell implements IGridCell {
    initialValue: number | null;
    value: number | null;

    constructor(initialValue: number | null, value?: number | null) {
        this.initialValue = initialValue;
        this.value = initialValue ? null : (value || null);
    }

    getInitialValue(): number | null {
        return this.initialValue;
    }

    getValue(): number | null {
        return this.initialValue || this.value;
    }

    setValue(value: number): void {
        this.value = value;
    }
}

interface IGrid {
    getFirstEmptyCell(): IGridCell | null;
    getNextEmptyCell(cell: IGridCell): IGridCell | null;
    getEmptyCopy(): IGrid;
    getCopy(): IGrid;
    getAvailableGuesses(cell: IGridCell): Set<number>;
    print(): string;
}

class SudokuGrid implements IGrid {
    grid: IGridCell[][];
    initialValues: (number | null)[][] | undefined;

    constructor(initialValues?: (number | null)[][], values?: (number | null)[][]) {
        this.grid = [];
        this.initialValues = initialValues;

        for (let yPos = 0; yPos < 9; yPos++) {
            this.grid.push([]);
            for (let xPos = 0; xPos < 9; xPos++) {
                const initialValue: number | null = initialValues?.[xPos]?.[yPos] || null;
                const value: number | null = values?.[xPos]?.[yPos] || null;
                this.grid[xPos].push(new SudokuGridCell(initialValue, value));
            }
        }
    }

    getFirstEmptyCell(): IGridCell | null {
        for (let yPos = 0; yPos < 9; yPos++) {
            for (let xPos = 0; xPos < 9; xPos++) {
                const cell = this.grid[xPos][yPos];
                if (cell.getInitialValue() === null) {
                    return cell;
                }
            }
        }

        return null;
    }

    findCellPosition(cell: IGridCell): [number, number] | null {
        for (let yPos = 0; yPos < 9; yPos++) {
            for (let xPos = 0; xPos < 9; xPos++) {
                if (this.grid[xPos][yPos] === cell) {
                    return [xPos, yPos];
                }
            }
        }

        return null;
    }

    getNextEmptyCell(cell: IGridCell): IGridCell | null {
        const cellPosition: [number, number] | null = this.findCellPosition(cell);
        if (cellPosition === null) return null;

        const [xPosCurrent, yPosCurrent] = cellPosition;

        // We can safely avoid every row before the current cell's row.
        for (let yPos = yPosCurrent; yPos < 9; yPos++) {
            // We cannot avoid columns as easily,
            // as the current cell's next row (if any)
            // must be iterated through every column.
            for (let xPos = 0; xPos < 9; xPos++) {
                if (yPos === yPosCurrent && xPos <= xPosCurrent) continue;
                const nextCell = this.grid[xPos][yPos];
                if (nextCell.getInitialValue() === null) {
                    return nextCell;
                }
            }
        }

        return null;
    }

    getEmptyCopy(): IGrid {
        return new SudokuGrid(this.initialValues);
    }

    getCopy(): IGrid {
        const currentValues: (number | null)[][] = [];

        for (let xPos = 0; xPos < 9; xPos++) {
            currentValues.push([]);
            for (let yPos = 0; yPos < 9; yPos++) {
                const currentValue = this.grid[xPos][yPos].getValue();
                currentValues[xPos].push(currentValue);
            }
        }

        return new SudokuGrid(this.initialValues, currentValues);
    }

    getAvailableGuessesInRow(cell: IGridCell): Set<number> {
        // If cell already has a value, there are no available guesses for it.
        if (cell.getValue() !== null) return new Set();

        const cellPosition: [number, number] | null = this.findCellPosition(cell);
        if (cellPosition === null) return new Set();

        const availableGuesses: Set<number> = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const [_, yPos] = cellPosition;

        for (let xPos = 0; xPos < 9; xPos++) {
            const currentValue = this.grid[xPos][yPos].getValue();
            if (currentValue !== null) availableGuesses.delete(currentValue);
        }

        return availableGuesses;
    }

    getAvailableGuessesInCol(cell: IGridCell): Set<number> {
        // If cell already has a value, there are no available guesses for it.
        if (cell.getValue() !== null) return new Set();

        const cellPosition: [number, number] | null = this.findCellPosition(cell);
        if (cellPosition === null) return new Set();

        const availableGuesses: Set<number> = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const [xPos, _] = cellPosition;

        for (let yPos = 0; yPos < 9; yPos++) {
            const currentValue = this.grid[xPos][yPos].getValue();
            if (currentValue) availableGuesses.delete(currentValue);
        }

        return availableGuesses;
    }
    
    getAvailableGuessesInBox(cell: IGridCell): Set<number> {
        // If cell already has a value, there are no available guesses for it.
        if (cell.getValue() !== null) return new Set();

        const cellPosition: [number, number] | null = this.findCellPosition(cell);
        if (cellPosition === null) return new Set();

        const availableGuesses: Set<number> = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const [xPos, yPos] = cellPosition;

        const startRow = 3 * Math.floor(yPos / 3);
        const startCol = 3 * Math.floor(xPos / 3);

        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                const currentValue = this.grid[r][c].getValue();
                if (currentValue) availableGuesses.delete(currentValue);
            }
        }

        return availableGuesses;
    }

    getAvailableGuesses(cell: IGridCell): Set<number> {
        const availableValuesInBox = this.getAvailableGuessesInBox(cell);
        const availableValuesInRow = this.getAvailableGuessesInRow(cell);
        const availableValuesInCol = this.getAvailableGuessesInCol(cell);
        return new Set(
            [...availableValuesInBox].filter(
                (val: number) => {
                    return (
                        availableValuesInRow.has(val) &&
                        availableValuesInCol.has(val)
                    )
                }
            )
        );
    }

    print(): string {
        const sudokuParts: string[] = []
        for (let yPos = 0; yPos < 9; yPos++) {
            const sudokuPartsY: string[] = [];
            for (let xPos = 0; xPos < 9; xPos++) {
                const value: number | null = this.grid[xPos][yPos].getValue();
                sudokuPartsY.push(`${value || " "}`);
            }
            sudokuParts.push(sudokuPartsY.join(''))
        }

        return sudokuParts.join(`\n`);
    }
}

/**
 * Let's imagine how a basic backtracking algorithm would work:
 * 
 * 1. You start at one of the grid's empty cells;
 * 2. Then you iterate in such a way that you traverse every cell just once, and you are also able to go back (backtrack) to a previous node;
 * 2.1. This is worded in order to traverse any type of grid;
 * 3. If the cell already has a value, you go to the next cell;
 * 4. If the cell is empty, you then try to fill it with a possible value for it;
 * 4.1. You immediately check if the grid is valid with the value you just set to the cell:
 * 4.2. If it is not valid, you try the next possible value for the current cell;
 * 4.3. If it is valid, you move to the next cell and do the same process;
 * 5. If you reach a cell whose possible values are all invalid, you backtrack to the previous cell and signal that its value is invalid;
 * 6. If you reach the last cell with a valid value, you store the filled grid as a solution;
 * 7. Repeat this process until you exhaust all possibilities for the first "empty" cell;
 * 8. Return every filled grid you found (if any).
 */
export function backtracking(grid: IGrid): IGrid[] {
    const emptyGrid = grid.getEmptyCopy();
    const firstCell = emptyGrid.getFirstEmptyCell();

    // This is something funny to assume, actually.
    // If the empty grid has no empty cells, what is happening?
    // Either the empty grid has no cells
    // (so there's nothing to fill, so just return it),
    // or the "empty" grid is completely filled already, with just the initial values
    // (and we should just return it, too).
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
