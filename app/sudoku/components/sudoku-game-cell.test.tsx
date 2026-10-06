import { render, screen } from '@testing-library/react';
import SudokuGameCell from './sudoku-game-cell';

describe('SudokuGameCell', () => {
  const defaultProps = {
    value: 5,
    row: 0,
    col: 0,
    isInitial: false,
    isSelected: false,
    isInvalid: false,
    isHighlighted: false,
    onSelect: jest.fn(),
    onChange: jest.fn(),
  };

  it('renders the cell value', () => {
    render(<SudokuGameCell {...defaultProps} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders empty string for null value', () => {
    render(<SudokuGameCell {...defaultProps} value={null} />);

    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('applies selected styles when isSelected is true', () => {
    const { container } = render(<SudokuGameCell {...defaultProps} isSelected={true} />);

    expect(container.firstChild).toHaveClass('ring-2', 'ring-blue-400');
  });

  it('applies invalid styles when isInvalid is true', () => {
    const { container } = render(<SudokuGameCell {...defaultProps} isInvalid={true} />);

    expect(container.firstChild).toHaveClass('border-red-400', 'bg-red-500/10');
  });

  it('applies highlighted styles when isHighlighted is true', () => {
    const { container } = render(<SudokuGameCell {...defaultProps} isHighlighted={true} />);

    expect(container.firstChild).toHaveClass('bg-yellow-400/30', 'border-yellow-400');
  });

  it('applies initial value styles when isInitial is true', () => {
    const { container } = render(<SudokuGameCell {...defaultProps} isInitial={true} />);

    expect(container.firstChild).toHaveClass('bg-zinc-800', 'text-blue-400');
  });

  it('calls onSelect with position when clicked', () => {
    const onSelect = jest.fn();
    render(<SudokuGameCell {...defaultProps} onSelect={onSelect} />);

    const cell = screen.getByText('5');
    cell.click();

    expect(onSelect).toHaveBeenCalledWith({ row: 0, col: 0 });
  });

  it('has tabIndex 0 for keyboard accessibility', () => {
    const { container } = render(<SudokuGameCell {...defaultProps} />);

    const cell = container.querySelector('button');
    expect(cell).toHaveAttribute('tabIndex', '0');
  });
});
