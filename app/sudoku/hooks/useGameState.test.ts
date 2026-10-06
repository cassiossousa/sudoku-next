import { renderHook, act } from '@testing-library/react';
import { useGameState } from './useGameState';
import { SudokuGrid } from '../core';

describe('useGameState', () => {
  const initialValues = [
    [6, 9, 2, 4, 1, 5, 3, 7, 8],
    [8, 1, 5, 7, 6, 3, 4, 2, 9],
    [7, 3, 4, 9, 2, 8, 5, 6, 1],
    [5, 7, 3, 2, 8, 4, 1, 9, 6],
    [1, 4, 6, 5, 3, 9, 8, 2, 7],
    [9, 2, 8, 1, 5, 6, 7, 4, 3],
    [2, 6, 9, 3, 4, 7, 8, 5, 1],
    [3, 5, 7, 6, 9, 2, 1, 8, 4],
    [4, 8, 1, 0, 7, 0, 2, 5, 9],
  ];

  it('initializes with a SudokuGrid from initialValues', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    expect(result.current.sudoku).toBeInstanceOf(SudokuGrid);
  });

  it('initializes highlighted as 9x9 false array', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    expect(result.current.highlighted).toHaveLength(9);
    expect(result.current.highlighted.every((row) => row.length === 9)).toBe(true);
    expect(result.current.highlighted.every((row) => row.every((cell) => !cell))).toBe(true);
  });

  it('initializes speed as 50', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    expect(result.current.speed).toBe(50);
  });

  it('initializes counters with null values', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    expect(result.current.counters.branchesReceived).toBeNull();
    expect(result.current.counters.maxConcurrency).toBeNull();
  });

  it('initializes solvingRef as false', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    expect(result.current.solvingRef.current).toBe(false);
  });

  it('allows updating speed', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    act(() => {
      result.current.setSpeed(100);
    });

    expect(result.current.speed).toBe(100);
  });

  it('allows updating highlighted cells', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    const newHighlighted = Array.from({ length: 9 }, () => Array(9).fill(false));
    newHighlighted[0][0] = true;

    act(() => {
      result.current.setHighlighted(newHighlighted);
    });

    expect(result.current.highlighted[0][0]).toBe(true);
  });

  it('allows updating counters', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    act(() => {
      result.current.setCounters({
        branchesReceived: 100,
        maxConcurrency: 8,
      });
    });

    expect(result.current.counters.branchesReceived).toBe(100);
    expect(result.current.counters.maxConcurrency).toBe(8);
  });

  it('allows updating a cell value', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    act(() => {
      result.current.updateCell(8, 3, 5);
    });

    const cell = result.current.sudoku.findCellByPosition([8, 3]);
    expect(cell?.getValue()).toBe(5);
  });

  it('does not update initial values', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    const originalValue = result.current.sudoku.findCellByPosition([0, 0])?.getValue();

    act(() => {
      result.current.updateCell(0, 0, 5);
    });

    const cell = result.current.sudoku.findCellByPosition([0, 0]);
    expect(cell?.hasInitialValue()).toBe(true);
    expect(cell?.getValue()).toBe(originalValue);
  });

  it('allows clearing a cell value', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    act(() => {
      result.current.updateCell(8, 3, 5);
    });

    act(() => {
      result.current.updateCell(8, 3, null);
    });

    const cell = result.current.sudoku.findCellByPosition([8, 3]);
    expect(cell?.getValue()).toBeNull();
  });

  it('resets state on handleRestart', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    act(() => {
      result.current.setCounters({
        branchesReceived: 100,
        maxConcurrency: 8,
      });
    });

    act(() => {
      result.current.handleRestart();
    });

    expect(result.current.counters.branchesReceived).toBeNull();
    expect(result.current.counters.maxConcurrency).toBeNull();
    expect(result.current.highlighted.every((row) => row.every((cell) => !cell))).toBe(true);
  });

  it('resets solvingRef on handleRestart', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    act(() => {
      result.current.solvingRef.current = true;
    });

    act(() => {
      result.current.handleRestart();
    });

    expect(result.current.solvingRef.current).toBe(false);
  });

  it('recreates SudokuGrid on handleRestart', () => {
    const { result } = renderHook(() => useGameState(initialValues));

    const originalGrid = result.current.sudoku;

    act(() => {
      result.current.handleRestart();
    });

    expect(result.current.sudoku).not.toBe(originalGrid);
  });
});
