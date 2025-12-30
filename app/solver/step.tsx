export interface SolverStep {
  solverType: 'single-guess' | 'backtracking';
  position: number[];
  value: number;
}