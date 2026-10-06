import { type IGrid } from '../../grid';
import { type TechniqueResult } from '../technique';

/**
 * Hidden Singles Technique
 *
 * A hidden single occurs when a digit can only go in one cell within a unit
 * (row, column, or box), even though that cell may have multiple candidates.
 * The digit is "hidden" among other candidates in that cell.
 *
 * Pattern:
 * - For a given digit, check each row: if the digit can only go in one cell, fill it
 * - Repeat for columns and boxes
 * - This technique can find cells that naked singles misses
 *
 * This is a basic technique that should be applied after naked singles.
 * It's still considered an easy-to-medium technique.
 *
 * Visualization:
 * - The cell where the hidden single is found is returned in highlightedCells
 * - This allows the UI to show which cell was filled by this technique
 */
export class HiddenSingles {
  static find(grid: IGrid): TechniqueResult {
    let cellsFilled = 0;
    const highlightedCells: number[][] = [];

    // Check rows for hidden singles
    for (let row = 0; row < 9; row++) {
      for (let digit = 1; digit <= 9; digit++) {
        const positions: number[] = [];
        for (let col = 0; col < 9; col++) {
          const cell = grid.findCellByPosition([row, col]);
          if (!cell || cell.getValue() !== null) continue;

          const candidates = grid.getAvailableGuesses(cell);
          if (candidates.has(digit)) positions.push(col);
        }

        if (positions.length === 1) {
          const col = positions[0];
          const cell = grid.findCellByPosition([row, col])!;
          cell.setValue(digit);
          cellsFilled++;
          highlightedCells.push([row, col]);
        }
      }
    }

    // Check columns for hidden singles
    for (let col = 0; col < 9; col++) {
      for (let digit = 1; digit <= 9; digit++) {
        const positions: number[] = [];
        for (let row = 0; row < 9; row++) {
          const cell = grid.findCellByPosition([row, col]);
          if (!cell || cell.getValue() !== null) continue;

          const candidates = grid.getAvailableGuesses(cell);
          if (candidates.has(digit)) positions.push(row);
        }

        if (positions.length === 1) {
          const row = positions[0];
          const cell = grid.findCellByPosition([row, col])!;
          cell.setValue(digit);
          cellsFilled++;
          highlightedCells.push([row, col]);
        }
      }
    }

    // Check boxes for hidden singles
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        for (let digit = 1; digit <= 9; digit++) {
          const positions: number[] = [];
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              const row = boxRow * 3 + r;
              const col = boxCol * 3 + c;
              const cell = grid.findCellByPosition([row, col]);
              if (!cell || cell.getValue() !== null) continue;

              const candidates = grid.getAvailableGuesses(cell);
              if (candidates.has(digit)) positions.push(row * 9 + col);
            }
          }

          if (positions.length === 1) {
            const pos = positions[0];
            const row = Math.floor(pos / 9);
            const col = pos % 9;
            const cell = grid.findCellByPosition([row, col])!;
            cell.setValue(digit);
            cellsFilled++;
            highlightedCells.push([row, col]);
          }
        }
      }
    }

    return {
      applied: cellsFilled > 0,
      technique: 'hidden-single',
      cellsFilled,
      explanation: cellsFilled > 0 ? `Filled ${cellsFilled} hidden single(s)` : undefined,
      highlightedCells: highlightedCells.length > 0 ? highlightedCells : undefined,
    };
  }
}
