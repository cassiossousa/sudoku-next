'use client';

import { useState, useRef } from 'react';
import { SudokuGrid } from '../sudoku/sudoku';
import SudokuCell from './sudoku-game-cell';
import SudokuNumpad from './sudoku-numpad';
import { solveByBacktracking } from '../solver/backtracking';

export default function SudokuGame({
  initialValues,
}: {
  initialValues: number[][];
}) {
  const [sudoku, setSudoku] = useState<SudokuGrid>(
    () => new SudokuGrid(initialValues),
  );

  const [selected, setSelected] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const [highlighted, setHighlighted] = useState<boolean[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(false)),
  );

  const [speed, setSpeed] = useState(500); // ms

  const solvingRef = useRef(false);

  function updateCell(row: number, col: number, value: number | null) {
    setSudoku((currentSudoku) => {
      const newSudoku = currentSudoku.getCopy();
      const cell = newSudoku.findCellByPosition([row, col]);
      if (cell && !cell.hasInitialValue()) {
        cell.setValue(value);
      }
      return newSudoku as SudokuGrid;
    });
  }

  function handleNumberInput(value: number | null) {
    if (!selected) return;
    updateCell(selected.row, selected.col, value);
  }

  async function handleSolve() {
    if (solvingRef.current) return;
    solvingRef.current = true;

    const [solutions, backtrackingNeeded] = solveByBacktracking(sudoku);
    const [solvedGrid, steps] = solutions[0];

    // 1. Reset to initial values only
    setSudoku(new SudokuGrid(initialValues));
    setHighlighted(Array.from({ length: 9 }, () => Array(9).fill(false)));

    // 2. Play steps
    for (const step of steps) {
      await new Promise((res) => setTimeout(res, speed));

      setSudoku((current) => {
        const next = current.getCopy();
        const cell = next.findCellByPosition(step.position);
        if (cell && !cell.hasInitialValue()) {
          cell.setValue(step.value);
        }
        return next as SudokuGrid;
      });

      setHighlighted((prev) => {
        const next = prev.map((r) => [...r]);
        const [r, c] = step.position;
        next[r][c] = true;
        return next;
      });
    }

    solvingRef.current = false;
  }

  const [isInvalid, invalidCells] = sudoku.isInvalid();

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      {/* GRID */}
      <div className="border-4 border-zinc-700 rounded-lg overflow-visible shadow-lg">
        {[0, 1, 2].map((boardRow) => (
          <div key={boardRow} className="flex">
            {[0, 1, 2].map((boardCol) => (
              <div
                key={`${boardRow}-${boardCol}`}
                className="flex flex-col border-r-2 border-b-2 border-zinc-700 last:border-r-0"
              >
                {[0, 1, 2].map((boxRow) => (
                  <div key={boxRow} className="flex">
                    {[0, 1, 2].map((boxCol) => {
                      const row = boardRow * 3 + boxRow;
                      const col = boardCol * 3 + boxCol;

                      const cell = sudoku.findCellByPosition([row, col])!;
                      const value = cell.getValue();
                      const isInitial = cell.hasInitialValue();

                      return (
                        <SudokuCell
                          key={`${row}-${col}`}
                          value={value}
                          row={row}
                          col={col}
                          isInitial={isInitial}
                          isSelected={
                            selected?.row === row && selected?.col === col
                          }
                          isInvalid={isInvalid && invalidCells[row][col]}
                          isHighlighted={highlighted[row][col]}
                          onSelect={setSelected}
                          onChange={updateCell}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* NUMPAD */}
      <SudokuNumpad
        onInput={handleNumberInput}
        onSolve={handleSolve}
        disabled={!selected}
        speed={speed}
        setSpeed={setSpeed}
      />
    </div>
  );
}
