import { render, screen } from '@testing-library/react';
import PencilMarksEditor from './pencil-marks-editor';
import { SudokuGridCell } from '../core/grid-cell';

/**
 * Pencil Marks Editor Tests
 *
 * Tests the pencil marks UI component which allows players to toggle
 * candidate numbers in empty Sudoku cells. Pencil marks are a common
 * feature in Sudoku apps (Super Sudoku, sudokUI, mobile apps) that help
 * players track possibilities without committing to values.
 */
describe('PencilMarksEditor', () => {
  const cell = new SudokuGridCell(0, 0, null, null);
  const onToggleNote = jest.fn();

  it('renders nothing for initial value cells', () => {
    const initialCell = new SudokuGridCell(0, 0, 5, null);

    const { container } = render(
      <PencilMarksEditor cell={initialCell} notes={[]} onToggleNote={onToggleNote} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders nothing for filled cells', () => {
    const filledCell = new SudokuGridCell(0, 0, null, 5);

    const { container } = render(
      <PencilMarksEditor cell={filledCell} notes={[]} onToggleNote={onToggleNote} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders for empty cells', () => {
    render(<PencilMarksEditor cell={cell} notes={[]} onToggleNote={onToggleNote} />);

    for (let i = 1; i <= 9; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('calls onToggleNote when a note button is clicked', () => {
    render(<PencilMarksEditor cell={cell} notes={[]} onToggleNote={onToggleNote} />);

    const button = screen.getByText('5');
    button.click();

    expect(onToggleNote).toHaveBeenCalledWith(5);
  });

  it('highlights active notes', () => {
    render(<PencilMarksEditor cell={cell} notes={[1, 5, 9]} onToggleNote={onToggleNote} />);

    const button1 = screen.getByText('1');
    const button5 = screen.getByText('5');
    const button3 = screen.getByText('3');

    expect(button1).toHaveClass('bg-zinc-700', 'text-zinc-100');
    expect(button5).toHaveClass('bg-zinc-700', 'text-zinc-100');
    expect(button3).toHaveClass('bg-zinc-800', 'text-zinc-500');
  });
});
