'use client';

export default function SudokuGameCell({
  value,
  row,
  col,
  isInvalid,
  onChange,
}: {
  value: number | null;
  row: number;
  col: number;
  isInvalid: boolean;
  onChange: (row: number, col: number, value: number | null) => void;
}) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key >= '1' && e.key <= '9') {
      onChange(row, col, Number(e.key));
    }

    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      onChange(row, col, null);
    }
  }

  return (
    <button
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`w-10 h-10 flex items-center justify-center border
        text-sm font-medium transition-colors
        focus:outline-none
        ${
          isInvalid
            ? 'border-red-400 bg-red-500/10 text-red-300 focus:bg-red-500/20'
            : 'border-zinc-700 hover:bg-zinc-800 focus:bg-zinc-700'
        }
      `}
    >
      {value ?? ''}
    </button>
  );
}
