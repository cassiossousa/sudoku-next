'use client';

export default function SudokuNumpad({
  onInput,
  onSolve,
  disabled,
  speed,
  setSpeed,
}: {
  onInput: (value: number | null) => void;
  onSolve: () => void;
  disabled: boolean;
  speed: number;
  setSpeed: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
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

      {/* Solve button (always active) */}
      <button
        onClick={onSolve}
        className="h-12 bg-yellow-500/20 hover:bg-yellow-500/30 rounded text-sm font-semibold"
      >
        Solve
      </button>

      {/* Speed control */}
      <div className="flex flex-col gap-2 text-xs">
        <label>Solving speed: {(speed / 1000).toFixed(2)}s</label>
        <input
          type="range"
          min={50}
          max={1000}
          step={50}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
