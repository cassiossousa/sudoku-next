/**
 * Solver Step
 *
 * Represents a single step taken during Sudoku solving.
 * Used to track the solving process for visualization and step-by-step hints.
 *
 * - solverType: The technique used (naked-single, backtracking, x-wing, etc.)
 * - position: The cell position affected by this step
 * - value: The value filled in the cell
 * - highlightedCells: Positions of cells involved in the pattern (for visualization)
 */
export interface SolverStep {
  solverType: 'naked-single' | 'backtracking' | 'x-wing' | 'sequential';
  position: number[];
  value: number;
  highlightedCells?: number[][];
}
