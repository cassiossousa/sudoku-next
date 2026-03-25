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
      className="w-10 h-10 flex items-center justify-center border border-zinc-700
                 text-sm font-medium
                 hover:bg-zinc-800 focus:outline-none focus:bg-zinc-700
                 transition-colors"
      onClick={() => console.log(`Cell ${row}, ${col}`)}
    >
      {value ?? ''}
    </button>
  );
}
