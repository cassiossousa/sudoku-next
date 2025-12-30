import { IGridCell } from "../sudoku/sudoku"

export default function SudokuGameCellInitial({ initialValue }: { initialValue: number}) {
  return (
    <div
      className='flex justify-center align-center border-black border w-7 h-7 font-bold text-blue-700'
    >
      { initialValue }
    </div>
  )
}