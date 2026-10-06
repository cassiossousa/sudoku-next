import { type IGrid, type IGridCell } from './grid';

export class GridValidation {
  static isInvalid(grid: IGrid): [boolean, boolean[][]] {
    let isInvalid = false;

    const createBooleanGrid = (rows: number, cols: number): boolean[][] =>
      Array(rows)
        .fill(false)
        .map(() => Array(cols).fill(false));

    const invalidCells: boolean[][] = createBooleanGrid(9, 9);

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (
          this.isInvalidForRow(grid, row) ||
          this.isInvalidForCol(grid, col) ||
          this.isInvalidForBox(grid, row, col)
        ) {
          isInvalid = true;
          invalidCells[row][col] = true;
        }
      }
    }

    return [isInvalid, invalidCells];
  }

  static isInvalidForRow(grid: IGrid, row: number): boolean {
    const numbersInRow: Set<number> = new Set();

    for (let col = 0; col < 9; col++) {
      const cell = grid.findCellByPosition([row, col]);
      const value = cell?.getValue();
      if (value) {
        if (numbersInRow.has(value)) {
          return true;
        } else {
          numbersInRow.add(value);
        }
      }
    }

    return false;
  }

  static isInvalidForCol(grid: IGrid, col: number): boolean {
    const numbersInCol: Set<number> = new Set();

    for (let row = 0; row < 9; row++) {
      const cell = grid.findCellByPosition([row, col]);
      const value = cell?.getValue();
      if (value) {
        if (numbersInCol.has(value)) {
          return true;
        } else {
          numbersInCol.add(value);
        }
      }
    }

    return false;
  }

  static isInvalidForBox(grid: IGrid, row: number, col: number): boolean {
    const numbersInBox: Set<number> = new Set();
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);

    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        const cell = grid.findCellByPosition([r, c]);
        const currentValue = cell?.getValue();
        if (currentValue) {
          if (numbersInBox.has(currentValue)) {
            return true;
          } else {
            numbersInBox.add(currentValue);
          }
        }
      }
    }

    return false;
  }
}
