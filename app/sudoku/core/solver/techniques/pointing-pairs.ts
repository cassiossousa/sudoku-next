import { type IGrid } from '../../grid';
import { type TechniqueResult } from '../technique';

/**
 * Pointing Pairs Technique
 *
 * A pointing pair occurs when a candidate in a box is constrained to a single
 * row or column within that box. This means the candidate must be in that row
 * or column within the box, so it can be eliminated from the rest of that row
 * or column outside the box.
 *
 * Pattern:
 * - For a digit in a box, if it only appears in one row/column of the box
 * - Eliminate that digit from the rest of that row/column outside the box
 * - This reduces the search space for more complex techniques
 *
 * This is a medium difficulty technique that requires understanding box interactions.
 * It's commonly used after naked/hidden pairs and before X-Wing.
 *
 * Visualization:
 * - The cells forming the pointing pair are returned in highlightedCells
 * - This allows the UI to show which cells form the pattern
 */
export class PointingPairs {
  static find(grid: IGrid): TechniqueResult {
    let eliminations = 0;
    const highlightedCells: number[][] = [];

    // Check each box for pointing pairs
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        for (let digit = 1; digit <= 9; digit++) {
          const rowSet = new Set<number>();
          const colSet = new Set<number>();
          const positions: number[][] = [];

          // Find all cells in this box that have this digit as a candidate
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              const row = boxRow * 3 + r;
              const col = boxCol * 3 + c;
              const cell = grid.findCellByPosition([row, col]);
              if (!cell || cell.getValue() !== null) continue;

              const candidates = grid.getAvailableGuesses(cell);
              if (candidates.has(digit)) {
                rowSet.add(row);
                colSet.add(col);
                positions.push([row, col]);
              }
            }
          }

          // If the digit is constrained to a single row in this box
          if (rowSet.size === 1 && positions.length > 1) {
            const targetRow = Array.from(rowSet)[0];
            // Eliminate this digit from the rest of the row outside the box
            for (let col = 0; col < 9; col++) {
              if (col >= boxCol * 3 && col < boxCol * 3 + 3) continue; // Skip this box

              const cell = grid.findCellByPosition([targetRow, col]);
              if (!cell || cell.getValue() !== null) continue;

              const candidates = grid.getAvailableGuesses(cell);
              if (candidates.has(digit)) {
                eliminations++;
              }
            }

            if (eliminations > 0) {
              highlightedCells.push(...positions);
            }
          }

          // If the digit is constrained to a single column in this box
          if (colSet.size === 1 && positions.length > 1) {
            const targetCol = Array.from(colSet)[0];
            // Eliminate this digit from the rest of the column outside the box
            for (let row = 0; row < 9; row++) {
              if (row >= boxRow * 3 && row < boxRow * 3 + 3) continue; // Skip this box

              const cell = grid.findCellByPosition([row, targetCol]);
              if (!cell || cell.getValue() !== null) continue;

              const candidates = grid.getAvailableGuesses(cell);
              if (candidates.has(digit)) {
                eliminations++;
              }
            }

            if (eliminations > 0) {
              highlightedCells.push(...positions);
            }
          }
        }
      }
    }

    return {
      applied: eliminations > 0,
      technique: 'pointing-pair',
      cellsFilled: 0, // Pointing pairs eliminate candidates, don't fill cells
      explanation:
        eliminations > 0 ? `Eliminated ${eliminations} candidate(s) via pointing pairs` : undefined,
      highlightedCells: highlightedCells.length > 0 ? highlightedCells : undefined,
    };
  }
}
