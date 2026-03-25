'use client';

import { useState } from 'react';
import { SudokuGrid } from '../sudoku/sudoku';
import SudokuGameCell from './sudoku-game-cell';
import SudokuGameCellInitial from './sudoku-game-cell-initial';

export default function SudokuGame({
  initialValues,
}: {
  initialValues: number[][];
}) {
  const [sudoku, setSudoku] = useState<SudokuGrid>(
    () => new SudokuGrid(initialValues),
  );

  function updateCell(row: number, col: number, value: number | null) {
    setSudoku((currentSudoku) => {
      const newSudoku = currentSudoku.getCopy();
      const cell = newSudoku.findCellByPosition([row, col]);
      if (cell) {
        cell.setValue(value);
      }
      return newSudoku as SudokuGrid;
    });
  }

  const [isInvalid, invalidCells] = sudoku.isInvalid();

  return (
    <div className="border-4 border-zinc-700 rounded-lg overflow-hidden shadow-lg">
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
                    const hasInitialValue = cell.hasInitialValue();

                    return hasInitialValue ? (
                      <SudokuGameCellInitial
                        key={`${row}-${col}`}
                        initialValue={value!}
                        isInvalid={isInvalid && invalidCells[row][col]}
                      />
                    ) : (
                      <SudokuGameCell
                        key={`${row}-${col}`}
                        value={value}
                        row={row}
                        col={col}
                        isInvalid={isInvalid && invalidCells[row][col]}
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
  );
}
