import { IGridCell, SudokuGrid } from "../sudoku/sudoku";
import SudokuGameCell from "./sudoku-game-cell";

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
    <div className={`border-black border`}>
      <div className={`border-black border-2`}>
      {
        [0, 1, 2].map((boardRow: number) => (
          <div
            key={`box-row-${boardRow}`}
            className="flex"
          >
          {
            [0, 1, 2].map((boardCol: number) => (
              <div
                key={`box-${boardRow}-${boardCol}`}
                className={`flex flex-col border-black border-2`}
              >
                {[0, 1, 2].map((boxRow: number) => (
                  <div
                    key={`box-row-${boxRow}`}
                    className="flex"
                  >
                  {[0, 1, 2].map((boxCol: number) => {
                    const row = boardRow * 3 + boxRow;
                    const col = boardCol * 3 + boxCol;
                    return (
                      <SudokuGameCell
                        key={`cell-${row}-${col}`}
                        cell={sudoku.grid[row][col]}
                      >
                      </SudokuGameCell>
                    );
                  })}
                  </div>
                ))}
              </div>
            ))
          }
          </div>
        ))
      }
      </div>
    </div>
  );
}