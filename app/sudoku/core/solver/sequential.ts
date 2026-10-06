import { type IGrid } from '../../grid';
import { fillNakedSingles } from './naked-singles';
import { XWing } from './techniques/x-wing';
import { HiddenSingles } from './techniques/hidden-singles';
import { NakedPairs } from './techniques/naked-pairs';
import { PointingPairs } from './techniques/pointing-pairs';
import { type TechniqueResult } from './technique';

/**
 * Sequential Solver
 *
 * This solver applies Sudoku solving techniques in order of complexity
 * before resorting to backtracking. This approach, used by sudoku-core and
 * HoDoKu, is more efficient than brute-force backtracking alone.
 *
 * Technique Hierarchy (from simple to complex):
 * 1. Naked Singles - cells with only one possible value
 * 2. Hidden Singles - values that can only go in one place in a unit
 * 3. Naked Pairs - two cells sharing exactly two candidates
 * 4. Pointing Pairs - candidate constrained to one row/column in a box
 * 5. X-Wing - pattern across two rows/columns
 * 6. Backtracking - brute-force search as last resort
 *
 * Rationale:
 * - Simple techniques are faster and easier for humans to understand
 * - Applying them first reduces the search space for backtracking
 * - Tracking which techniques were used helps with difficulty rating
 * - Mimics how expert human solvers approach puzzles
 *
 * Visualization:
 * - Each technique returns highlighted cells showing the pattern
 * - This allows the UI to visualize patterns like X-Wing during step-by-step solving
 */
export class SequentialSolver {
  static solve(grid: IGrid): {
    solved: boolean;
    techniquesUsed: string[];
    steps: any[];
  } {
    const techniquesUsed: string[] = [];
    const steps: any[] = [];
    let gridCopy = grid.getCopy();
    let progress = true;
    let iterations = 0;
    const MAX_ITERATIONS = 100;

    while (progress && iterations < MAX_ITERATIONS) {
      progress = false;
      iterations++;

      // Technique 1: Naked Singles (fastest, fill immediately)
      const [nakedSolved, nakedSteps] = fillNakedSingles(gridCopy);
      if (nakedSteps.length > 0) {
        techniquesUsed.push('naked-single');
        steps.push(...nakedSteps);
        progress = true;
      }

      if (nakedSolved) {
        break;
      }

      // Technique 2: Hidden Singles (digits that can only go in one place)
      const hiddenSinglesResult = HiddenSingles.find(gridCopy);
      if (hiddenSinglesResult.applied) {
        techniquesUsed.push('hidden-single');
        steps.push({
          solverType: 'sequential',
          position: [0, 0], // Placeholder
          value: 0, // Placeholder
          highlightedCells: hiddenSinglesResult.highlightedCells,
          explanation: hiddenSinglesResult.explanation,
        });
        progress = true;
      }

      // Technique 3: Naked Pairs (two cells sharing two candidates)
      const nakedPairsResult = NakedPairs.find(gridCopy);
      if (nakedPairsResult.applied) {
        techniquesUsed.push('naked-pair');
        steps.push({
          solverType: 'sequential',
          position: [0, 0], // Placeholder
          value: 0, // Placeholder
          highlightedCells: nakedPairsResult.highlightedCells,
          explanation: nakedPairsResult.explanation,
        });
        progress = true;
      }

      // Technique 4: Pointing Pairs (candidate constrained in a box)
      const pointingPairsResult = PointingPairs.find(gridCopy);
      if (pointingPairsResult.applied) {
        techniquesUsed.push('pointing-pair');
        steps.push({
          solverType: 'sequential',
          position: [0, 0], // Placeholder
          value: 0, // Placeholder
          highlightedCells: pointingPairsResult.highlightedCells,
          explanation: pointingPairsResult.explanation,
        });
        progress = true;
      }

      // Technique 5: X-Wing (pattern across two rows/columns)
      const xWingResult = XWing.find(gridCopy);
      if (xWingResult.applied) {
        techniquesUsed.push('x-wing');
        steps.push({
          solverType: 'sequential',
          position: [0, 0], // Placeholder
          value: 0, // Placeholder
          highlightedCells: xWingResult.highlightedCells,
          explanation: xWingResult.explanation,
        });
        progress = true;
      }

      // If no technique made progress, we're stuck
      if (!progress) break;
    }

    // Check if solved
    const isSolved = gridCopy.getFirstEmptyCell() === null;

    return {
      solved: isSolved,
      techniquesUsed,
      steps,
    };
  }
}
