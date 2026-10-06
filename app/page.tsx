import { useState } from 'react';
import Footer from './components/footer';
import SudokuGame from './components/sudoku-game';
import { sudokuGames, type Game } from './sudoku/games';

const difficultyLevels = ['easy', 'medium', 'hard'] as const;

export function getRandomGameByDifficulty(difficulty: Game['difficulty']) {
  const games = sudokuGames.filter((game) => game.difficulty === difficulty);

  if (games.length === 0) {
    throw new Error(`No games available for difficulty: ${difficulty}`);
  }

  return games[Math.floor(Math.random() * games.length)];
}

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Game['difficulty'] | null
  >(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  function handleStartNewGame() {
    if (!selectedDifficulty) return;
    setActiveGame(getRandomGameByDifficulty(selectedDifficulty));
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-6 px-4 py-6">
        <h1 className="text-3xl font-semibold tracking-tight">Sudoku</h1>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {difficultyLevels.map((difficulty) => (
            <button
              key={difficulty}
              type="button"
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-3 py-2 rounded-xl border text-sm capitalize transition ${
                selectedDifficulty === difficulty
                  ? 'border-zinc-100 bg-zinc-100 text-zinc-900'
                  : 'border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleStartNewGame}
          disabled={!selectedDifficulty}
          className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {activeGame ? 'New Game' : 'Start Game'}
        </button>

        {!activeGame ? (
          <p className="text-sm text-zinc-400">
            Pick a difficulty, then start a new Sudoku.
          </p>
        ) : (
          <SudokuGame
            key={`${selectedDifficulty}-${activeGame.grid.flat().join('-')}`}
            initialValues={activeGame.grid}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}
