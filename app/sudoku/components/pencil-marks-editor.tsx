'use client';

import type { IGridCell } from '../core/grid-cell';

/**
 * Pencil Marks Editor Component
 *
 * This component provides a UI for editing pencil marks (also called notes or candidates)
 * in Sudoku cells. Pencil marks are small numbers placed in cells to indicate which
 * values might go there, helping players track possibilities without committing to a value.
 *
 * Based on industry patterns from Super Sudoku, sudokUI, and mobile Sudoku apps:
 * - Notes are only shown for empty cells (not initial values or filled cells)
 * - A 3x3 grid of buttons allows toggling each digit 1-9
 * - Active notes are highlighted to distinguish from inactive ones
 * - Clicking a note toggles it on/off
 *
 * This component is client-side only (requires 'use client') because it handles
 * user interaction and state updates through the onToggleNote callback.
 *
 * Props:
 * - cell: The SudokuGridCell being edited
 * - notes: Array of active note digits for this cell
 * - onToggleNote: Callback to toggle a note digit
 */
export default function PencilMarksEditor({
  cell,
  notes,
  onToggleNote,
}: {
  cell: IGridCell;
  notes: number[];
  onToggleNote: (digit: number) => void;
}) {
  // Don't show editor for cells that have initial values or are already filled
  // Pencil marks are only useful for empty cells where the player is considering options
  if (cell.hasInitialValue() || cell.getValue() !== null) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-1 p-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
        <button
          key={digit}
          type="button"
          onClick={() => onToggleNote(digit)}
          className={`text-xs p-1 rounded ${
            notes.includes(digit)
              ? 'bg-zinc-700 text-zinc-100'
              : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
          }`}
        >
          {digit}
        </button>
      ))}
    </div>
  );
}
