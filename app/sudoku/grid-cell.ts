export interface IGridCell {
  initialValue: number | null;
  value: number | null;
  getValue(): number | null;
  hasInitialValue(): boolean;
  setValue(value: number | null): void;
  getPosition(): number[];
}

export class SudokuGridCell implements IGridCell {
  row: number;
  col: number;
  initialValue: number | null;
  value: number | null;

  constructor(row: number, col: number, initialValue: number | null, value?: number | null) {
    this.row = row;
    this.col = col;
    this.initialValue = initialValue;
    this.value = initialValue ? null : value || null;
  }

  hasInitialValue(): boolean {
    return Boolean(this.initialValue);
  }

  getValue(): number | null {
    return this.initialValue || this.value;
  }

  setValue(value: number | null): void {
    if (!this.initialValue) this.value = value;
  }

  getPosition(): number[] {
    return [this.row, this.col];
  }
}
