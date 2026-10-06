import { type IGrid } from '../../grid';
import { type TechniqueResult } from '../technique';

/**
 * X-Wing Technique
 *
 * An X-Wing is a pattern that occurs when a candidate appears in exactly two
 * cells in two different rows, and those cells are in the same two columns.
 * This forms an "X" pattern where the candidate must be in one of four cells.
 * The candidate can then be eliminated from all other cells in those two columns.
 *
 * Pattern:
 * - For a given digit, find two rows where the digit can only go in the same two columns
 * - Those four cells form the corners of a rectangle
 * - The digit must be in one of the corners, so eliminate from other cells in those columns
 *
 * This is a medium-to-hard technique not covered by basic constraint propagation.
 * It's one of the first "advanced" patterns solvers learn after mastering basics.
 *
 * Visualization:
 * - The four cells forming the X-Wing pattern are returned in highlightedCells
 * - This allows the UI to visually highlight the pattern during step-by-step solving
 */
export class XWing {
  static find(grid: IGrid): TechniqueResult {
    let eliminations = 0;
    let changesMade = false;
    const highlightedCells: number[][] = [];

    for (let digit = 1; digit <= 9; digit++) {
      const rowPositions: Map<number, number[]> = new Map();

      for (let row = 0; row < 9; row++) {
        const positions: number[] = [];
        for (let col = 0; col < 9; col++) {
          const cell = grid.findCellByPosition([row, col]);
          if (!cell || cell.getValue() !== null) continue;

          const candidates = grid.getAvailableGuesses(cell);
          if (candidates.has(digit)) positions.push(col);
        }
        if (positions.length === 2) rowPositions.set(row, positions);
      }

      const rowsArray = Array.from(rowPositions.entries());
      for (let i = 0; i < rowsArray.length; i++) {
        for (let j = i + 1; j < rowsArray.length; j++) {
          const [row1, cols1] = rowsArray[i];
          const [row2, cols2] = rowsArray[j];

          if (cols1[0] === cols2[0] && cols1[1] === cols2[1]) {
            // Found an X-Wing pattern - record the four corner cells for visualization
            const patternCells: number[][] = [
              [row1, cols1[0]],
              [row1, cols1[1]],
              [row2, cols2[0]],
              [row2, cols2[1]],
            ];

            for (let row = 0; row < 9; row++) {
              if (row === row1 || row === row2) continue;

              for (const col of [cols1[0], cols1[1]]) {
                const cell = grid.findCellByPosition([row, col]);
                if (!cell || cell.getValue() !== null) continue;

                const candidates = grid.getAvailableGuesses(cell);
                if (candidates.has(digit)) {
                  eliminations++;
                  changesMade = true;
                }
              }
            }

            if (changesMade) {
              highlightedCells.push(...patternCells);
            }
          }
        }
      }
    }

    return {
      applied: changesMade,
      technique: 'x-wing',
      cellsFilled: 0,
      explanation: changesMade ? `Eliminated ${eliminations} candidate(s) via X-wing` : undefined,
      highlightedCells: highlightedCells.length > 0 ? highlightedCells : undefined,
    };
  }
}
