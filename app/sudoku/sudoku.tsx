export interface IGridCell {
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

export interface IGrid {
  getFirstEmptyCell(): IGridCell | null;
  getNextEmptyCell(cell: IGridCell): IGridCell | null;
  getEmptyCopy(): IGrid;
  getCopy(): IGrid;
  getAvailableGuesses(cell: IGridCell): Set<number>;
  print(): string;
}

export class SudokuGrid implements IGrid {
  grid: IGridCell[][];
  initialValues: (number | null)[][] | undefined;

  constructor(initialValues?: (number | null)[][], values?: (number | null)[][]) {
    this.grid = [];
    this.initialValues = initialValues;
    for (let row = 0; row < 9; row++) {
      this.grid.push([]);
      for (let col = 0; col < 9; col++) {
        const initialValue: number | null = initialValues?.[row]?.[col] || null;
        const value: number | null = values?.[row]?.[col] || null;
        this.grid[row].push(new SudokuGridCell(initialValue, value));
      }
    }
  }

  getFirstEmptyCell(): IGridCell | null {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = this.grid[row][col];
        if (cell.getInitialValue() === null) {
          return cell;
        }
      }
    }
    return null;
  }

  findCellPosition(cell: IGridCell): [number, number] | null {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.grid[row][col] === cell) {
          return [row, col];
        }
      }
    }
    return null;
  }

  getNextEmptyCell(cell: IGridCell): IGridCell | null {
    const cellPosition: [number, number] | null = this.findCellPosition(cell);
    if (cellPosition === null) return null;
    const [rowCurrent, colCurrent] = cellPosition;
    // We can safely avoid every row before the current cell's row.
    for (let row = rowCurrent; row < 9; row++) {
      // We cannot avoid columns as easily,
      // as the current cell's next row (if any)
      // must be iterated through every column.
      for (let col = 0; col < 9; col++) {
        if (row === rowCurrent && col <= colCurrent) continue;
        const nextCell = this.grid[row][col];
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
    for (let row = 0; row < 9; row++) {
        currentValues.push([]);
        for (let col = 0; col < 9; col++) {
            const currentValue = this.grid[row][col].getValue();
            currentValues[row].push(currentValue);
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
    const [row, _] = cellPosition;
    for (let col = 0; col < 9; col++) {
      const currentValue = this.grid[row][col].getValue();
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
    const [_, col] = cellPosition;
    for (let row = 0; row < 9; row++) {
      const currentValue = this.grid[row][col].getValue();
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
    const [row, col] = cellPosition;
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
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
    const sudokuParts: string[] = [];
    for (let row = 0; row < 9; row++) {
      if (row % 3 === 0) sudokuParts.push(`-------------`);
      const sudokuPartsRow: string[] = [];
      for (let col = 0; col < 9; col++) {
        if (col % 3 === 0) sudokuPartsRow.push(`|`);
        const value: number | null = this.grid[row][col].getValue();
        sudokuPartsRow.push(`${value || " "}`);
      }
      sudokuPartsRow.push('|');
      sudokuParts.push(sudokuPartsRow.join(''))
    }
    sudokuParts.push(`-------------`)
    return sudokuParts.join(`\n`);
  }
}