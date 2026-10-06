import { getRandomGameByDifficulty } from './page';
import { sudokuGames } from './sudoku/games';

describe('getRandomGameByDifficulty()', () => {
  it('returns a valid Sudoku game from the configured list for a given difficulty', () => {
    const originalRandom = Math.random;
    Math.random = () => 0.25;

    try {
      const game = getRandomGameByDifficulty('medium');

      expect(game).toBeDefined();
      expect(game.difficulty).toBe('medium');
      expect(game.grid).toHaveLength(9);
      expect(game.grid.every((row) => row.length === 9)).toBe(true);
      expect(game.grid.flat().some((value) => value !== 0)).toBe(true);
      expect(sudokuGames).toContain(game);
    } finally {
      Math.random = originalRandom;
    }
  });

  it('returns a game matching the requested difficulty', () => {
    const game = getRandomGameByDifficulty('easy');

    expect(game.difficulty).toBe('easy');
  });
});
