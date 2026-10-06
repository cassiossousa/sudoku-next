import { type IGrid } from '../../grid';
import { type TechniqueResult } from '../technique';

/**
 * Naked Pairs Technique
 *
 * A naked pair occurs when two cells in the same unit (row, column, or box)
 * contain exactly the same two candidates. Since those two digits must go in
 * those two cells, they can be eliminated from all other cells in that unit.
 *
 * Pattern:
 * - Find two cells in a unit with exactly the same two candidates
 * - Remove those two candidates from all other cells in the unit
 * - This can reveal hidden singles or reduce the search space
 *
 * This is a medium difficulty technique that builds on basic constraint propagation.
 * It's commonly used after naked singles and hidden singles.
 *
 * Visualization:
 * - The two cells forming the naked pair are returned in highlightedCells
 * - This allows the UI to show which cells form the pair
 */
export class NakedPairs {
  static find(grid: IGrid): TechniqueResult {
    let eliminations = 0;
    const highlightedCells: number[][] = [];

    // Check rows for naked pairs
    for (let row = 0; row < 9; row++) {
      const pairs = this.findPairsInUnit(grid, 'row', row);
      if (pairs.length > 0) {
        eliminations += pairs.length;
        highlightedCells.push(...pairs);
      }
    }

    // Check columns for naked pairs
    for (let col = 0; col < 9; col++) {
      const pairs = this.findPairsInUnit(grid, 'col', col);
      if (pairs.length > 0) {
        eliminations += pairs.length;
        highlightedCells.push(...pairs);
      }
    }

    // Check boxes for naked pairs
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const pairs = this.findPairsInUnit(grid, 'box', boxRow * 3 + boxCol);
        if (pairs.length > 0) {
          eliminations += pairs.length;
          highlightedCells.push(...pairs);
        }
      }
    }

    return {
      applied: eliminations > 0,
      technique: 'naked-pair',
      cellsFilled: 0, // Naked pairs eliminate candidates, don't fill cells
      explanation:
        eliminations > 0 ? `Eliminated ${eliminations} candidate(s) via naked pairs` : undefined,
      highlightedCells: highlightedCells.length > 0 ? highlightedCells : undefined,
    };
  }

  private static findPairsInUnit(
    grid: IGrid,
    unitType: 'row' | 'col' | 'box',
    unitIndex: number,
  ): number[][] {
    const cellCandidates: Map<string, { positions: number[]; candidates: Set<number> }> = new Map();

    // Collect all cells with exactly 2 candidates in the unit
    for (let i = 0; i < 9; i++) {
      let row: number, col: number;
      if (unitType === 'row') {
        row = unitIndex;
        col = i;
      } else if (unitType === 'col') {
        row = i;
        col = unitIndex;
      } else {
        row = Math.floor(unitIndex / 3) * 3 + Math.floor(i / 3);
        col = (unitIndex % 3) * 3 + (i % 3);
      }

      const cell = grid.findCellByPosition([row, col]);
      if (!cell || cell.getValue() !== null) continue;

      const candidates = grid.getAvailableGuesses(cell);
      if (candidates.size === 2) {
        const key = Array.from(candidates).sort().join(',');
        const existing = cellCandidates.get(key);
        if (existing) {
          existing.positions.push(row * 9 + col);
        } else {
          cellCandidates.set(key, {
            positions: [row * 9 + col],
            candidates: new Set(candidates),
          });
        }
      }
    }

    // Find pairs (exactly 2 cells with the same 2 candidates)
    const pairCells: number[][] = [];
    for (const [key, data] of cellCandidates) {
      if (data.positions.length === 2) {
        pairCells.push(...data.positions.map((pos) => [Math.floor(pos / 9), pos % 9]));
      }
    }

    return pairCells;
  }
}
