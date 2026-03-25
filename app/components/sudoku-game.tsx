import { SudokuGrid } from '../sudoku/sudoku';
import SudokuGameCell from './sudoku-game-cell';
import SudokuGameCellInitial from './sudoku-game-cell-initial';

export default function SudokuGame({ sudoku }: { sudoku: SudokuGrid }) {
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
