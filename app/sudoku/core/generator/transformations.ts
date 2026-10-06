/**
 * Grid Transformations
 *
 * Collection of Sudoku grid transformation methods used by the seed-based
 * generator. These transformations preserve Sudoku validity while creating
 * puzzle variety from a single seed solution.
 */

export class GridTransformations {
  static rotate90(grid: number[][]): number[][] {
    const n = grid.length;
    const rotated: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        rotated[col][n - 1 - row] = grid[row][col];
      }
    }

    return rotated;
  }

  static shuffleRowGroups(grid: number[][]): number[][] {
    const groups = [grid.slice(0, 3), grid.slice(3, 6), grid.slice(6, 9)];

    for (let i = groups.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [groups[i], groups[j]] = [groups[j], groups[i]];
    }

    return groups.flat();
  }

  static shuffleColGroups(grid: number[][]): number[][] {
    const transposed = this.transpose(grid);
    const shuffled = this.shuffleRowGroups(transposed);
    return this.transpose(shuffled);
  }

  static shuffleRows(grid: number[][]): number[][] {
    for (let band = 0; band < 3; band++) {
      const start = band * 3;
      const rows = grid.slice(start, start + 3);

      for (let i = rows.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rows[i], rows[j]] = [rows[j], rows[i]];
      }

      for (let i = 0; i < 3; i++) {
        grid[start + i] = rows[i];
      }
    }

    return grid;
  }

  static shuffleCols(grid: number[][]): number[][] {
    const transposed = this.transpose(grid);
    const shuffled = this.shuffleRows(transposed);
    return this.transpose(shuffled);
  }

  static swapDigits(grid: number[][]): number[][] {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }

    const mapping = new Map<number, number>();
    digits.forEach((digit, index) => {
      mapping.set(index + 1, digit);
    });

    return grid.map((row) => row.map((cell) => (cell === 0 ? 0 : (mapping.get(cell) ?? cell))));
  }

  static transpose(grid: number[][]): number[][] {
    return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
  }
}
