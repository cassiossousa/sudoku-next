import { SudokuGrid } from '../sudoku/sudoku';
import SudokuGameCell from './sudoku-game-cell';
import SudokuGameCellInitial from './sudoku-game-cell-initial';

export default function SudokuGame() {
  const sudoku = new SudokuGrid([
    [0, 4, 0, 8, 0, 0, 2, 0, 0],
    [5, 3, 0, 0, 0, 0, 0, 0, 4],
    [8, 0, 0, 5, 0, 9, 0, 1, 0],
    [2, 0, 0, 0, 0, 0, 0, 4, 5],
    [4, 9, 0, 0, 0, 0, 8, 3, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 6],
    [3, 0, 0, 0, 2, 0, 5, 0, 0],
    [1, 0, 0, 0, 6, 0, 0, 2, 0],
    [0, 6, 0, 0, 0, 5, 3, 0, 0],
  ]);

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
                    const cell = sudoku.grid[row][col];
                    const value = cell.getValue();
                    const hasInitialValue = cell.hasInitialValue();

                    return hasInitialValue ? (
                      <SudokuGameCellInitial
                        key={`${row}-${col}`}
                        initialValue={value!}
                      />
                    ) : (
                      <SudokuGameCell
                        key={`${row}-${col}`}
                        value={value}
                        row={row}
                        col={col}
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
