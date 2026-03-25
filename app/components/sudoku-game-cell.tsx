'use client';

export default function SudokuGameCell({
  value,
  row,
  col,
}: {
  value: number | null;
  row: number;
  col: number;
}) {
  return (
    <button
      className="flex justify-center align-center border w-7 h-7 font-bold cursor-pointer"
      onClick={() => alert('CLICKED ME')}
    >
      {value}
    </button>
  );
}
