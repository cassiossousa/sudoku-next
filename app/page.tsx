import SudokuGame from './components/sudoku-game';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-semibold tracking-tight">Sudoku</h1>
        <SudokuGame />
      </div>
    </main>
  );
}
