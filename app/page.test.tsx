import { getRandomGameByDifficulty, sudokuGames } from './sudoku/games';

/**
 * Page Component Tests
 *
 * Tests the game selection and randomization logic.
 * Since games are now generated on-demand using the seed-based generator,
 * tests verify that the generation produces valid puzzles.
 */
describe('getRandomGameByDifficulty()', () => {
  it('returns a valid Sudoku game with the requested difficulty', () => {
    const game = getRandomGameByDifficulty('medium');

    expect(game).toBeDefined();
    expect(game.difficulty).toBe('medium');
    expect(game.grid).toHaveLength(9);
    expect(game.grid.every((row) => row.length === 9)).toBe(true);
    expect(game.grid.flat().some((value) => value !== 0)).toBe(true);
  });

  it('returns a game matching the requested difficulty', () => {
    const game = getRandomGameByDifficulty('easy');

    expect(game.difficulty).toBe('easy');
  });

  it('handles expert difficulty', () => {
    const game = getRandomGameByDifficulty('expert');

    expect(game.difficulty).toBe('expert');
  });

  it('sudokuGames array contains valid games for all difficulties', () => {
    const difficulties = sudokuGames.map((game) => game.difficulty);

    expect(difficulties).toContain('easy');
    expect(difficulties).toContain('medium');
    expect(difficulties).toContain('hard');
    expect(difficulties).toContain('expert');
  });
});
