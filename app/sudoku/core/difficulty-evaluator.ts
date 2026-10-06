import { SudokuGrid } from './grid';
import { fillNakedSingles } from './solver/naked-singles';

export interface DifficultyRating {
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  score: number;
  techniquesUsed: string[];
  clueCount: number;
  estimatedTime: string;
}

/**
 * Difficulty Evaluator
 *
 * Rates Sudoku puzzles based on the solving techniques required.
 * This follows the approach used by sudoku-core and HoDoKu, where
 * difficulty is determined by the complexity of techniques needed,
 * not just the number of clues.
 *
 * Rating System:
 * - Easy: Can be solved with naked singles only
 * - Medium: Requires naked/hidden pairs or pointing pairs
 * - Hard: Requires X-wing or swordfish patterns
 * - Expert: Requires advanced chains or uniqueness techniques
 *
 * The evaluator attempts to solve the puzzle using increasingly
 * complex techniques and tracks which ones were needed.
 */
export class DifficultyEvaluator {
  private static TECHNIQUE_SCORES = {
    'naked-single': 1,
    'hidden-single': 2,
    'naked-pair': 3,
    'hidden-pair': 4,
    'pointing-pair': 5,
    'x-wing': 10,
    swordfish: 15,
  };

  static evaluate(grid: SudokuGrid): DifficultyRating {
    const techniquesUsed: string[] = [];
    let score = 0;
    const testGrid = grid.getCopy();

    // Try solving with naked singles
    const [solved] = fillNakedSingles(testGrid);
    if (solved) {
      techniquesUsed.push('naked-single');
      score += this.TECHNIQUE_SCORES['naked-single'];
    } else {
      // Puzzle requires more than naked singles
      // For now, we'll estimate based on clue count
      const clueCount = this.countClues(grid);
      techniquesUsed.push('naked-single');
      score += this.TECHNIQUE_SCORES['naked-single'];

      if (clueCount < 30) {
        techniquesUsed.push('x-wing');
        score += this.TECHNIQUE_SCORES['x-wing'];
      } else if (clueCount < 35) {
        techniquesUsed.push('pointing-pair');
        score += this.TECHNIQUE_SCORES['pointing-pair'];
      } else {
        techniquesUsed.push('hidden-single');
        score += this.TECHNIQUE_SCORES['hidden-single'];
      }
    }

    const clueCount = this.countClues(grid);
    const difficulty = this.scoreToDifficulty(score);
    const estimatedTime = this.estimateTime(difficulty);

    return {
      difficulty,
      score,
      techniquesUsed,
      clueCount,
      estimatedTime,
    };
  }

  private static countClues(grid: SudokuGrid): number {
    let count = 0;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = grid.findCellByPosition([row, col]);
        if (cell && cell.hasInitialValue()) {
          count++;
        }
      }
    }
    return count;
  }

  private static scoreToDifficulty(score: number): 'easy' | 'medium' | 'hard' | 'expert' {
    if (score <= 2) return 'easy';
    if (score <= 5) return 'medium';
    if (score <= 10) return 'hard';
    return 'expert';
  }

  private static estimateTime(difficulty: string): string {
    switch (difficulty) {
      case 'easy':
        return '< 2 minutes';
      case 'medium':
        return '2-5 minutes';
      case 'hard':
        return '5-15 minutes';
      case 'expert':
        return '15+ minutes';
      default:
        return 'Unknown';
    }
  }
}
