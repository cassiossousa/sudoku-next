'use client';

export default function SudokuControls({
  onInput,
  onSolve,
  onRestart,
  disabled,
  speed,
  setSpeed,
}: {
  onInput: (value: number | null) => void;
  onSolve: () => void;
  onRestart: () => void;
  disabled: boolean;
  speed: number;
  setSpeed: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* NUMBER INPUT */}
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
            className="h-10 w-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded text-lg font-semibold"
          >
            {n}
          </button>
        ))}

        <button
          onClick={() => onInput(null)}
          className="h-10 col-span-9 md:col-span-3 bg-red-500/20 hover:bg-red-500/30 rounded text-sm"
        >
          Clear
        </button>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onSolve}
          className="h-10 bg-yellow-500/20 hover:bg-yellow-500/30 rounded text-sm font-semibold"
        >
          Solve
        </button>

        <button
          onClick={onRestart}
          className="h-10 bg-zinc-700 hover:bg-zinc-600 rounded text-sm font-semibold"
        >
          Restart
        </button>
      </div>

      {/* SPEED CONTROL */}
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
