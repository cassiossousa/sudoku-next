'use client';

import { useEffect, useState, useCallback } from 'react';
import Footer from './components/footer';
import SudokuGame from './components/sudoku-game';
import { sudokuGames } from './sudoku/games';

function getRandomGame() {
  return sudokuGames[Math.floor(Math.random() * sudokuGames.length)];
}

export default function Home() {
  const [game, setGame] = useState<(typeof sudokuGames)[number] | null>(null);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    // runs only on client -> avoids hydration mismatch
    setGame(getRandomGame());
  }, []);

  const handleNewGame = useCallback(() => {
    setGame(getRandomGame());
    setGameKey((prev) => prev + 1);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
      {/* CONTENT */}
      <div className="flex flex-col items-center gap-6 px-4 py-6">
        <h1 className="text-3xl font-semibold tracking-tight">Sudoku</h1>

        <button
          onClick={handleNewGame}
          disabled={!game}
          className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition disabled:opacity-50"
        >
          New Game
        </button>

        {game ? (
          <SudokuGame key={gameKey} initialValues={game.grid} />
        ) : (
          <div className="text-sm text-zinc-500">Loading game...</div>
        )}
      </div>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
