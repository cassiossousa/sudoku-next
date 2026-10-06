import { type IGrid } from '../grid';
import { type TechniqueResult, SolverTechnique } from './technique';

/**
 * Dummy technique for testing the base class
 */
class DummyTechnique extends SolverTechnique {
  constructor(
    private shouldApply: boolean,
    private techniqueName: string,
  ) {
    super();
  }

  apply(grid: IGrid): TechniqueResult {
    return {
      applied: this.shouldApply,
      technique: this.techniqueName,
      cellsFilled: this.shouldApply ? 1 : 0,
      explanation: this.shouldApply ? 'Test explanation' : undefined,
    };
  }
}

describe('SolverTechnique', () => {
  it('is an abstract class that requires apply method', () => {
    expect(SolverTechnique).toBeDefined();
  });

  it('allows extending classes to implement apply', () => {
    const technique = new DummyTechnique(true, 'test');
    const mockGrid = {
      findCellByPosition: jest.fn(),
      getAvailableGuesses: jest.fn(),
    } as unknown as IGrid;

    const result = technique.apply(mockGrid);

    expect(result).toBeDefined();
    expect(result.applied).toBe(true);
    expect(result.technique).toBe('test');
  });

  it('returns correct TechniqueResult structure', () => {
    const technique = new DummyTechnique(false, 'test');
    const mockGrid = {
      findCellByPosition: jest.fn(),
      getAvailableGuesses: jest.fn(),
    } as unknown as IGrid;

    const result = technique.apply(mockGrid);

    expect(result).toHaveProperty('applied');
    expect(result).toHaveProperty('technique');
    expect(result).toHaveProperty('cellsFilled');
    expect(result).toHaveProperty('explanation');
  });
});
