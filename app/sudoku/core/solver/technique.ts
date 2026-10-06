import { type IGrid } from '../grid';

/**
 * Solver Technique Base Interface
 *
 * This module defines the common interface for all Sudoku solving techniques.
 * Each technique (naked singles, hidden singles, X-wing, etc.) implements
 * the apply() method and returns a standardized result.
 *
 * The TechniqueResult includes:
 * - applied: whether the technique made any changes
 * - technique: name of the technique used
 * - cellsFilled: number of cells directly filled by this technique
 * - explanation: human-readable description of what was done
 * - highlightedCells: positions of cells involved in the pattern (for visualization)
 *
 * This interface allows the solver to:
 * - Track which techniques were needed to solve a puzzle (for difficulty rating)
 * - Provide step-by-step explanations (for hints or visualization)
 * - Score puzzles based on technique complexity
 * - Show visual feedback for patterns like X-Wing (highlight all cells in the pattern)
 */
export interface TechniqueResult {
  applied: boolean;
  technique: string;
  cellsFilled: number;
  explanation?: string;
  highlightedCells?: number[][]; // Positions of cells involved in the pattern
}

/**
 * Abstract base class for solver techniques.
 *
 * All concrete techniques (naked singles, hidden singles, X-wing, etc.)
 * should extend this class and implement the apply() method.
 * This ensures consistent return types and makes it easy to add new techniques
 * to the solver pipeline.
 */
export abstract class SolverTechnique {
  abstract apply(grid: IGrid): TechniqueResult;
}
