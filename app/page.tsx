import { useState } from 'react';
import Footer from './components/footer';
import SudokuGame from './components/sudoku-game';
import { sudokuGames, Game } from './sudoku/games';

export default function Home() {
  const [randomGame] = useState<Game>(
    () => sudokuGames[Math.floor(Math.random() * sudokuGames.length)],
  );

  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
      {/* CONTENT */}
      <div className="flex flex-col items-center gap-6 px-4 py-6">
        <h1 className="text-3xl font-semibold tracking-tight">Sudoku</h1>
        <SudokuGame initialValues={randomGame.grid} />
      </div>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
