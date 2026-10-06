export type GameStatus = 'not-started' | 'playing' | 'completed';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  grid: number[][];
  initialGrid: number[][];
  selectedCell: { row: number; col: number } | null;
  highlighted: boolean[][];
  mistakes: number;
  timer: number;
  status: GameStatus;
  difficulty: Difficulty;
  speed: number;
  counters: {
    branchesReceived: number | null;
    maxConcurrency: number | null;
  };
}

export const createInitialGameState = (
  initialValues: number[][],
  difficulty: Difficulty = 'easy',
): GameState => ({
  grid: initialValues,
  initialGrid: initialValues,
  selectedCell: null,
  highlighted: Array.from({ length: 9 }, () => Array(9).fill(false)),
  mistakes: 0,
  timer: 0,
  status: 'not-started',
  difficulty,
  speed: 50,
  counters: {
    branchesReceived: null,
    maxConcurrency: null,
  },
});
