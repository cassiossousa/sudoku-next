'use client';

export default function SudokuNumpad({
  onInput,
  disabled,
}: {
  onInput: (value: number | null) => void;
  disabled: boolean;
}) {
  return (
    <div
      className={`
        grid grid-cols-9 md:grid-cols-3 gap-2
        ${disabled ? 'opacity-40 pointer-events-none' : ''}
      `}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <button
          key={n}
          onClick={() => onInput(n)}
          className="h-12 w-12 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded text-lg font-semibold"
        >
          {n}
        </button>
      ))}

      <button
        onClick={() => onInput(null)}
        className="col-span-9 md:col-span-3 h-12 bg-red-500/20 hover:bg-red-500/30 rounded text-sm"
      >
        Clear
      </button>
    </div>
  );
}
