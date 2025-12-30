import { IGridCell } from "../sudoku/sudoku"

export default function SudokuGameCell({ cell } : { cell: IGridCell }) {
  const hasInitialValue = Boolean(cell.initialValue);
  return hasInitialValue ? (
    <div
      className={`flex justify-center align-center border-black border w-7 h-7 font-bold text-blue-700`}
    >
      { cell.getValue() }
    </div>
  ) : (
    <button
      className={`flex justify-center align-center border-black border w-7 h-7 font-bold text-black`}
    >
      { cell.getValue() }
    </button>
  )
}