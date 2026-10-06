import { render, screen, fireEvent } from '@testing-library/react';
import SudokuControls from './sudoku-controls';

describe('SudokuControls', () => {
  const defaultProps = {
    onInput: jest.fn(),
    onSolve: jest.fn(),
    onRestart: jest.fn(),
    disabled: false,
    speed: 50,
    setSpeed: jest.fn(),
    counters: {
      branchesReceived: null,
      maxConcurrency: null,
    },
  };

  it('renders all number buttons 1-9', () => {
    render(<SudokuControls {...defaultProps} />);

    for (let i = 1; i <= 9; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('renders clear button', () => {
    render(<SudokuControls {...defaultProps} />);

    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('renders solve button', () => {
    render(<SudokuControls {...defaultProps} />);

    expect(screen.getByText('Solve')).toBeInTheDocument();
  });

  it('renders restart button', () => {
    render(<SudokuControls {...defaultProps} />);

    expect(screen.getByText('Restart')).toBeInTheDocument();
  });

  it('renders speed control with current speed', () => {
    render(<SudokuControls {...defaultProps} speed={500} />);

    expect(screen.getByText('Solving speed: 0.50s')).toBeInTheDocument();
  });

  it('does not render counters when null', () => {
    render(<SudokuControls {...defaultProps} />);

    expect(screen.queryByText(/Branches received/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Max concurrency/)).not.toBeInTheDocument();
  });

  it('renders counters when available', () => {
    render(
      <SudokuControls {...defaultProps} counters={{ branchesReceived: 100, maxConcurrency: 8 }} />,
    );

    expect(screen.getByText('Branches received: 100')).toBeInTheDocument();
    expect(screen.getByText('Max concurrency: 8')).toBeInTheDocument();
  });

  it('calls onInput with number when number button clicked', () => {
    const onInput = jest.fn();
    render(<SudokuControls {...defaultProps} onInput={onInput} />);

    fireEvent.click(screen.getByText('5'));

    expect(onInput).toHaveBeenCalledWith(5);
  });

  it('calls onInput with null when clear button clicked', () => {
    const onInput = jest.fn();
    render(<SudokuControls {...defaultProps} onInput={onInput} />);

    fireEvent.click(screen.getByText('Clear'));

    expect(onInput).toHaveBeenCalledWith(null);
  });

  it('calls onSolve when solve button clicked', () => {
    const onSolve = jest.fn();
    render(<SudokuControls {...defaultProps} onSolve={onSolve} />);

    fireEvent.click(screen.getByText('Solve'));

    expect(onSolve).toHaveBeenCalled();
  });

  it('calls onRestart when restart button clicked', () => {
    const onRestart = jest.fn();
    render(<SudokuControls {...defaultProps} onRestart={onRestart} />);

    fireEvent.click(screen.getByText('Restart'));

    expect(onRestart).toHaveBeenCalled();
  });

  it('calls setSpeed when speed input changes', () => {
    const setSpeed = jest.fn();
    render(<SudokuControls {...defaultProps} setSpeed={setSpeed} />);

    const speedInput = screen.getByRole('slider');
    fireEvent.change(speedInput, { target: { value: '500' } });

    expect(setSpeed).toHaveBeenCalledWith(500);
  });

  it('applies disabled styles when disabled is true', () => {
    const { container } = render(<SudokuControls {...defaultProps} disabled={true} />);

    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('opacity-40', 'pointer-events-none');
  });

  it('does not apply disabled styles when disabled is false', () => {
    const { container } = render(<SudokuControls {...defaultProps} disabled={false} />);

    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).not.toHaveClass('opacity-40', 'pointer-events-none');
  });
});
