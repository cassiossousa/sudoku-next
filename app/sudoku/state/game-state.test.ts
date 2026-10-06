import { createInitialGameState, type GameStatus, type Difficulty } from './game-state';

describe('game-state', () => {
  const initialValues = [
    [6, 9, 2, 4, 1, 5, 3, 7, 8],
    [8, 1, 5, 7, 6, 3, 4, 2, 9],
    [7, 3, 4, 9, 2, 8, 5, 6, 1],
    [5, 7, 3, 2, 8, 4, 1, 9, 6],
    [1, 4, 6, 5, 3, 9, 8, 2, 7],
    [9, 2, 8, 1, 5, 6, 7, 4, 3],
    [2, 6, 9, 3, 4, 7, 6, 8, 5],
    [3, 5, 7, 6, 9, 2, 1, 8, 4],
    [4, 8, 1, 8, 7, 1, 2, 5, 9],
  ];

  describe('createInitialGameState()', () => {
    it('creates a game state with default difficulty', () => {
      const state = createInitialGameState(initialValues);

      expect(state.difficulty).toBe('easy');
    });

    it('creates a game state with specified difficulty', () => {
      const state = createInitialGameState(initialValues, 'hard');

      expect(state.difficulty).toBe('hard');
    });

    it('initializes grid with provided values', () => {
      const state = createInitialGameState(initialValues);

      expect(state.grid).toEqual(initialValues);
    });

    it('initializes initialGrid with provided values', () => {
      const state = createInitialGameState(initialValues);

      expect(state.initialGrid).toEqual(initialValues);
    });

    it('initializes selectedCell as null', () => {
      const state = createInitialGameState(initialValues);

      expect(state.selectedCell).toBeNull();
    });

    it('initializes highlighted as 9x9 false array', () => {
      const state = createInitialGameState(initialValues);

      expect(state.highlighted).toHaveLength(9);
      expect(state.highlighted.every((row) => row.length === 9)).toBe(true);
      expect(state.highlighted.every((row) => row.every((cell) => !cell))).toBe(true);
    });

    it('initializes mistakes as 0', () => {
      const state = createInitialGameState(initialValues);

      expect(state.mistakes).toBe(0);
    });

    it('initializes timer as 0', () => {
      const state = createInitialGameState(initialValues);

      expect(state.timer).toBe(0);
    });

    it('initializes status as not-started', () => {
      const state = createInitialGameState(initialValues);

      expect(state.status).toBe('not-started');
    });

    it('initializes speed as 50', () => {
      const state = createInitialGameState(initialValues);

      expect(state.speed).toBe(50);
    });

    it('initializes counters with null values', () => {
      const state = createInitialGameState(initialValues);

      expect(state.counters.branchesReceived).toBeNull();
      expect(state.counters.maxConcurrency).toBeNull();
    });

    it('does not mutate the input initialValues', () => {
      const originalValues = initialValues.map((row) => [...row]);
      createInitialGameState(initialValues);

      expect(initialValues).toEqual(originalValues);
    });
  });

  describe('Difficulty type', () => {
    it('accepts valid difficulty values', () => {
      const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

      difficulties.forEach((difficulty) => {
        const state = createInitialGameState(initialValues, difficulty);
        expect(state.difficulty).toBe(difficulty);
      });
    });
  });

  describe('GameStatus type', () => {
    it('accepts valid status values', () => {
      const statuses: GameStatus[] = ['not-started', 'playing', 'completed'];

      statuses.forEach((status) => {
        const state = createInitialGameState(initialValues);
        state.status = status;
        expect(state.status).toBe(status);
      });
    });
  });
});
