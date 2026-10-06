import { useState, useRef } from 'react';
import { SudokuGrid } from '../core';
import type { GameState, GameStatus, Difficulty } from '../state/game-state';
import { createInitialGameState } from '../state/game-state';

export function useGameState(initialValues: number[][], difficulty: Difficulty = 'easy') {
  const [sudoku, setSudoku] = useState<SudokuGrid>(() => new SudokuGrid(initialValues));

  const [selected, setSelected] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const [highlighted, setHighlighted] = useState<boolean[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(false)),
  );

  const [speed, setSpeed] = useState(50);

  const [counters, setCounters] = useState<{
    branchesReceived: number | null;
    maxConcurrency: number | null;
  }>({
    branchesReceived: null,
    maxConcurrency: null,
  });

  const solvingRef = useRef(false);

  const updateCell = (row: number, col: number, value: number | null) => {
    setSudoku((currentSudoku) => {
      const newSudoku = currentSudoku.getCopy();
      const cell = newSudoku.findCellByPosition([row, col]);
      if (cell && !cell.hasInitialValue()) {
        cell.setValue(value);
      }
      return newSudoku as SudokuGrid;
    });
  };

  const handleRestart = () => {
    solvingRef.current = false;
    setSudoku(new SudokuGrid(initialValues));
    setHighlighted(Array.from({ length: 9 }, () => Array(9).fill(false)));
    setSelected(null);
    setCounters({
      branchesReceived: null,
      maxConcurrency: null,
    });
  };

  return {
    sudoku,
    setSudoku,
    highlighted,
    setHighlighted,
    speed,
    setSpeed,
    counters,
    setCounters,
    solvingRef,
    updateCell,
    handleRestart,
  };
}
