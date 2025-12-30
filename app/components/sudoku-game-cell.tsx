import { IGridCell } from "../sudoku/sudoku"

export default function SudokuGameCell({ cell } : { cell: IGridCell }) {
  const hasInitialValue = Boolean(cell.initialValue);
  const initialValueClasses = hasInitialValue ? 'text-blue-700' : '';
  return (
    <div className={`border-black border w-7 h-7 font-bold ${initialValueClasses}`}>
      { cell.getValue() }
    </div>
  );
}