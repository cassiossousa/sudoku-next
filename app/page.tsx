import Footer from './components/footer';
import SudokuGame from './components/sudoku-game';
import { sudokuGames } from './sudoku/games';

function getRandomGame() {
  return sudokuGames[Math.floor(Math.random() * sudokuGames.length)];
}

export default function Home() {
  // runs on the server → no hydration mismatch
  const game = getRandomGame();

  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
      {/* CONTENT */}
      <div className="flex flex-col items-center gap-6 px-4 py-6">
        <h1 className="text-3xl font-semibold tracking-tight">Sudoku</h1>

        {/* This forces a fresh server render (new random game) */}
        <form>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition"
          >
            New Game
          </button>
        </form>

        <SudokuGame initialValues={game.grid} />
      </div>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
