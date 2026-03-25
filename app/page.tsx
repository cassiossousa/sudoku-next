import SudokuGame from './components/sudoku-game';
import { SudokuGrid } from './sudoku/sudoku';

export default function Home() {
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
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-semibold tracking-tight">Sudoku</h1>
        <SudokuGame sudoku={sudoku} />
      </div>
    </main>
  );
}
