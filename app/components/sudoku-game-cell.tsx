'use client';

export default function SudokuCell({
  value,
  row,
  col,
  isInitial,
  isSelected,
  isInvalid,
  onSelect,
  onChange,
}: {
  value: number | null;
  row: number;
  col: number;
  isInitial: boolean;
  isSelected: boolean;
  isInvalid: boolean;
  onSelect: (pos: { row: number; col: number }) => void;
  onChange: (row: number, col: number, value: number | null) => void;
}) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (isInitial) return;

    if (e.key >= '1' && e.key <= '9') {
      onChange(row, col, Number(e.key));
    }

    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      onChange(row, col, null);
    }
  }

  const baseStyles =
    'w-12 h-12 flex items-center justify-center border text-xl font-semibold transition-colors focus:outline-none';

  const stateStyles = isInitial
    ? 'bg-zinc-800 text-blue-400 border-zinc-700'
    : 'border-zinc-700 hover:bg-zinc-800 focus:bg-zinc-700';

  const invalidStyles = isInvalid
    ? 'border-red-400 bg-red-500/10 text-red-300'
    : '';

  const selectedStyles = isSelected
    ? `
      ring-2 ring-blue-400
      outline outline-2 outline-blue-400
      outline-offset-[-2px]
      relative z-10
    `
    : '';

  return (
    <button
      tabIndex={0}
      onClick={() => onSelect({ row, col })}
      onKeyDown={handleKeyDown}
      className={`${baseStyles} ${stateStyles} ${invalidStyles} ${selectedStyles}`}
    >
      {value ?? ''}
    </button>
  );
}
