# Sudoku Next AI Agent Guidelines

## Project Context
- This repo is a Next.js + React + TypeScript Sudoku app.
- The app uses the App Router (`app/`), Tailwind styling, and Jest for tests.
- The domain logic is centered on valid Sudoku generation and solving behavior, not generic UI patterns.
- Architecture emphasizes separation of concerns: puzzle generation, solver logic, game state management, and UI rendering are distinct layers.
- This project follows patterns from industry-leading Sudoku implementations (Super Sudoku, sudokUI, sudoku-core, jonathontoon/sudoku) and modern web game architecture (Clean Architecture, DDD, ECS patterns).

## Core Working Rules
1. Keep changes small and focused on the task.
2. Prefer project patterns already in use instead of introducing new abstractions.
3. Follow TDD for bug fixes and behavior changes: add or update the relevant test before implementing the fix.
4. **HARD RULE: All new source files (TS/TSX) must have corresponding test files. Test files must be created alongside or before new implementation files.**
5. Validate with the smallest relevant Jest command after changing behavior.
6. Avoid broad refactors unless the task requires it.
7. Maintain clear separation between domain logic (Sudoku rules, constraints, generation) and UI concerns (rendering, input handling, state display).
8. When adding features, consider whether they belong in the game engine layer, solver layer, or presentation layer.

## Sudoku-Specific Expectations
- Keep each puzzle in `app/sudoku/games.ts` as a valid `Game` with:
  - `difficulty: 'easy' | 'medium' | 'hard'`
  - `grid: number[][]`
- Prefer valid, solvable Sudoku boards with a single correct solution for game data.
- Do not leave placeholder or all-zero puzzle data in production arrays.
- Keep difficulty categorization consistent with the puzzle complexity.
- Puzzles should be generated with guaranteed unique solutions (research from sudokUI, sudoku-core, Super Sudoku).
- Consider implementing multiple solving techniques before falling back to backtracking (Peter Norvig's approach, sudoku-core's 45 techniques).
- For puzzle generation, prefer transformation-based approaches (rotation, permutation, digit swapping) for speed and quality (research from sudoku-gen, Super Sudoku).
- Constraint propagation should be separate from the search algorithm (Clean Architecture principle from sudoku-core, norvig/pytudes).

## UI and State Rules
- Do not call `Math.random()` during render in a React component.
- Avoid hydration mismatches by making random behavior happen only in response to user actions or after mount.
- Keep the selected game locked until the user explicitly chooses a difficulty and starts a new game.
- Prefer user-driven actions over automatic randomization on page load.

## CSS and Tailwind Guidelines
- Prefer Tailwind utility classes over custom CSS when the styling is simple and local to a component.
- Keep class strings readable and consistent with the project's existing patterns: layout via flex/grid, spacing via gap/padding/margin utilities, and borders/backgrounds using the current zinc palette.
- Do not add one-off class names that duplicate existing patterns unless the change really needs a new design token or composition.
- Favor explicit, readable conditional class composition over complex string concatenation when small and maintainable.
- Keep styling behavior deterministic and server-safe; avoid classes that depend on browser-only state or random values.
- Only add custom CSS when Tailwind cannot express the requirement cleanly; prefer small, scoped styles over broad global resets.

## Next.js and SSR Pitfalls
- **CRITICAL**: When using React hooks (`useState`, `useEffect`, `useCallback`, etc.) in the App Router, the file MUST have `'use client';` at the very top (before any imports). This directive tells Next.js to treat the component as a Client Component, enabling hooks and browser APIs.
- Do not rely on values that are different between server render and client hydration, such as `Math.random()`, `Date.now()`, `new Date()`, or any browser-only API during render.
- Never precompute a random game on the server for the initial page render; the app must keep the initial state stable until a user action or a client-only effect runs.
- Beware of server/client mismatches from access to `window`, `document`, `navigator`, `localStorage`, `sessionStorage`, or media queries during render.
- Avoid reading browser-only environment state in module scope or render paths that run during SSR.
- Keep interactive behavior in client-driven flows; if it must happen after mount, gate it behind `useEffect` or user input rather than server render logic.
- Do not assume SSR can fully reproduce a client-only experience such as random game selection, timers, hover-driven state, or layout decisions based on viewport size.
- If a feature cannot be reliably pre-rendered server-side, prefer a stable fallback and then hydrate or update the UI after the client has initialized.

## File Structure

The project follows a layered architecture with clear separation of concerns:

```
app/
├── sudoku/
│   ├── core/                    # Domain logic (framework-free)
│   │   ├── grid.ts             # Grid data model, constraints
│   │   ├── grid-cell.ts        # Cell implementation
│   │   ├── grid-validation.ts # Validation logic
│   │   ├── index.ts           # Core exports
│   │   ├── solver/            # Solving algorithms
│   │   │   ├── backtracking.tsx
│   │   │   ├── single-guess.tsx
│   │   │   ├── semaphore.ts
│   │   │   └── step.tsx
│   │   └── generator/         # Puzzle generation
│   │       └── seed-based.ts  # Transformation-based generation
│   ├── state/                 # Game state management
│   │   └── game-state.ts      # GameState types and factory
│   ├── hooks/                 # React hooks for UI
│   │   └── useGameState.ts    # Game state hook
│   ├── components/            # UI components
│   │   ├── sudoku-game.tsx
│   │   ├── sudoku-game-cell.tsx
│   │   └── sudoku-controls.tsx
│   ├── games.ts              # Pre-generated puzzle data
│   └── sudoku.tsx            # Main re-exports
├── components/               # Shared UI components
└── page.tsx                 # Main page
```

## Architecture Patterns

### Layered Architecture
- **Domain Layer** (`app/sudoku/core/`): Pure Sudoku logic, no framework dependencies
- **Application Layer** (`app/sudoku/state/`, `app/sudoku/hooks/`): Game state management and React integration
- **Presentation Layer** (`app/sudoku/components/`, `app/page.tsx`): UI rendering and user interaction

### Separation Principles
- Domain logic must remain framework-free and testable without React
- State management hooks bridge domain logic with React
- Components are thin and delegate to hooks for state/logic
- Re-exports from `sudoku.tsx` maintain backward compatibility

## File Size Limits
- Production TypeScript/JavaScript files: maximum 200 lines (excluding comments/blank lines)
- Test files: maximum 400 lines (excluding comments/blank lines)
- Enforced via ESLint `max-lines` rule

## Testing Expectations
- Jest is the project test runner.
- Existing tests live under `app/**/*.test.ts` and `app/**/*.spec.ts`.
- When changing game selection logic, page behavior, or solver logic, update or add tests in the same area.
- Prefer targeted checks over broad suites, but run the relevant project test set before concluding work is complete.

## Validation Commands
- Typical verification command:
  - `npm test -- --runInBand`
- If a bug fix is narrow, run the specific test file first, then the broader suite if needed.

## Style and Safety Notes
- Keep TypeScript types explicit where they help clarity.
- Preserve the current object and function naming style used by the app.
- Do not add package dependencies unless the task truly requires them.
- Prefer deterministic behavior for puzzles and page state.
- **File size limits enforced by ESLint**:
  - Non-test files: maximum 200 lines (excluding comments and blank lines)
  - Test files: maximum 400 lines (excluding comments and blank lines)
  - If a file exceeds these limits, refactor by extracting functions, components, or modules to keep code maintainable and focused.

## Decision Principles
- If a user asks for a random game, make that randomness happen only after a user-triggered action or a client-only state update.
- If a user wants a "start new game" flow, default to a fixed current game until the user selects difficulty and confirms the action.
- When in doubt, preserve the project's "sudoku first, UI simple, test-backed" approach.

## Documentation Maintenance
- **Update README.md periodically** whenever relevant architectural or feature changes are made to the project.
- Keep the initial README section (architecture, highlights, and summary) synchronized with the actual implementation.
- When adding new features (e.g., hint system, undo/redo, new solving techniques), update the README's feature highlights.
- When architectural changes occur (e.g., adding new layers, refactoring file structure), update the README's architecture overview.
- Ensure README accurately reflects the current tech stack, patterns in use, and project status.
- Update installation/usage instructions if new dependencies or workflows are added.

## Regression Prevention
- **Always run tests before committing** changes, even for small fixes. Use `npm test` (which now includes `--runInBand` by default) to catch breaking changes early.
- **When modifying core logic** (solver, generator, validation), verify that existing puzzles still solve correctly and generate valid unique solutions.
- **When changing UI components**, ensure that existing game flows (select difficulty → start game → make moves → win) still work without hydration errors or state inconsistencies.
- **Check for SSR hydration issues** after any changes that involve `useEffect`, random values, or browser-only APIs. Verify the app loads correctly in both development and production builds.
- **Test edge cases**: empty grid, all zeros, already-solved grid, invalid grid, rapid state changes, keyboard navigation, touch interactions.
- **Verify localStorage persistence** after state management changes: ensure games save/restore correctly across page refreshes.
- **When refactoring file structure**, ensure all imports are updated and no circular dependencies are introduced.
- **When adding new dependencies**, verify they don't break existing functionality or introduce hydration/SSR issues.
- **Run the full test suite** after any significant changes, not just the specific test file for the feature being modified.
- **If a regression is detected**, immediately identify the root cause, add a test that reproduces the issue, fix it, and then commit with the test covering the regression case.

### Automated Regression Protection
The project includes several automated safeguards against regressions:

1. **Pre-commit hooks** (Husky + lint-staged)
   - Automatically runs ESLint and Prettier on staged files before allowing commits
   - Ensures code style consistency and catches basic errors before they reach the repository
   - Configured to run on TypeScript/JavaScript files and config files

2. **Test execution configuration**
   - `npm test` now runs with `--runInBand` by default for consistent, sequential test execution
   - `npm run test:ci` runs with `--runInBand --ci --coverage --maxWorkers=2` for CI environments
   - Jest config removed hardcoded `maxWorkers: 1` to allow CLI control

3. **CI pipeline enhancements**
   - Added Prettier check (`npm run prettier:check`) to CI workflow
   - Tests run with coverage collection in CI
   - Optional Codecov integration for coverage tracking (requires `CODECOV_TOKEN` secret)
   - All checks must pass before PRs can be merged

4. **Code quality tools**
   - ESLint for linting TypeScript/JavaScript with custom rules:
     - Non-test files limited to 200 lines (excluding comments/blank lines)
     - Test files limited to 400 lines (excluding comments/blank lines)
     - Encourages refactoring into smaller, focused modules
   - Prettier for consistent code formatting
   - TypeScript compiler check (`npm run tsc`) for type safety
   - Knip for detecting unused exports and dependencies

These automated checks ensure that:
- Code style is consistent across the project
- Type errors are caught before commit
- Tests pass before code is merged
- Coverage is tracked over time
- CI enforces the same standards as local development

## Architecture Patterns (from 20+ Industry Sources)

### Layered Architecture
Based on Super Sudoku, sudokUI, sudoku-core, xenobiasoft/sudoku, and Clean Architecture principles:

1. **Domain Layer** (game logic, rules, constraints)
   - Puzzle generation algorithms
   - Solving techniques (naked singles, hidden singles, backtracking)
   - Validation logic
   - Grid representation and constraint models
   - Should be testable without React/Next.js

2. **Application Layer** (use cases, orchestration)
   - Game state management
   - Difficulty selection
   - Hint system
   - Undo/redo functionality
   - Game lifecycle (new game, in progress, completed)

3. **Infrastructure Layer** (persistence, external APIs)
   - Local storage for progress
   - Puzzle databases (if pre-generated)
   - API integrations (if using external puzzle sources)

4. **Presentation Layer** (UI components)
   - Grid rendering
   - Input handling (keyboard, touch, mouse)
   - Timer display
   - Mistake highlighting
   - Notes/pencil marks UI

### File Structure Recommendations
Based on hmpastana/sudoku, buscodes/sudoku-vue, xenobiasoft/sudoku, and React game architecture patterns:

```
app/
├── sudoku/
│   ├── core/              # Domain logic (framework-free)
│   │   ├── grid.ts        # Grid data model, constraints
│   │   ├── solver/        # Solving algorithms
│   │   │   ├── constraint-propagation.ts
│   │   │   ├── backtracking.ts
│   │   │   └── techniques.ts
│   │   ├── generator/     # Puzzle generation
│   │   │   ├── seed-based.ts
│   │   │   └── difficulty-rater.ts
│   │   └── validator.ts   # Solution uniqueness checking
│   ├── state/             # Game state management
│   │   ├── game-state.ts  # Central state object
│   │   ├── actions.ts     # State transitions
│   │   └── reducers.ts    # State updates
│   ├── hooks/             # React hooks for UI
│   │   ├── useGameState.ts
│   │   ├── useSudokuInput.ts
│   │   └── useTimer.ts
│   ├── components/        # UI components
│   │   ├── Board.tsx
│   │   ├── Cell.tsx
│   │   ├── NumberPad.tsx
│   │   └── Controls.tsx
│   ├── games.ts           # Pre-generated puzzle data
│   └── sudoku.tsx         # Main game page
├── components/            # Shared UI components
└── layout.tsx             # Root layout
```

### Solver Architecture
Based on Peter Norvig's algorithm, sudoku-core (45 techniques), jonathontoon/sudoku, and constraint-propagation research:

1. **Constraint Propagation Layer**
   - Eliminate impossible values using Sudoku rules
   - Naked singles: cells with only one possible value
   - Hidden singles: values that can only go in one place
   - Naked/hidden pairs, triples, quads
   - Pointing pairs, box-line reduction

2. **Advanced Techniques** (beyond basic constraint propagation)
   - X-wing: pattern across 2 rows/columns
   - Swordfish: pattern across 3 rows/columns
   - Jellyfish: pattern across 4 rows/columns
   - XY-wing: 3-cell pattern with 2 candidates each
   - XYZ-wing: 3-cell pattern with shared candidate
   - Forcing chains: hypothetical deductions
   - Simple coloring: two-color graph of candidates
   - Multi-coloring: extended coloring patterns
   - Unique rectangles: uniqueness-based eliminations
   - ALS (Almost Locked Sets): advanced subset techniques

3. **Search Layer**
   - Backtracking with MRV heuristic (minimum remaining values)
   - Choose empty cell with fewest candidates first
   - Try each candidate, validate, recurse
   - Backtrack on contradiction

4. **Technique Hierarchy** (for hints/difficulty rating)
   - Easy: naked singles, hidden singles
   - Medium: naked/hidden pairs, pointing pairs
   - Hard: x-wing, swordfish, jellyfish
   - Expert: advanced chains, ALS, uniqueness techniques

### Difficulty Rating System
Based on sudoku-core (technique-based rating), sudokUI (complexity metrics), and human solving time estimation:

1. **Technique-Based Rating**
   - Track which solving techniques are required to solve a puzzle
   - Assign difficulty scores to each technique:
     - Naked singles: 1 point
     - Hidden singles: 2 points
     - Naked pairs: 3 points
     - Hidden pairs: 4 points
     - Pointing pairs: 5 points
     - X-wing: 10 points
     - Swordfish: 15 points
   - Sum points to determine difficulty category

2. **Complexity Metrics**
   - Count of initial clues (fewer = harder)
   - Symmetry score (higher symmetry = easier)
   - Branching factor in solving tree
   - Maximum search depth required

3. **Human Time Estimation**
   - Easy: < 2 minutes for average solver
   - Medium: 2-5 minutes
   - Hard: 5-15 minutes
   - Expert: 15+ minutes

### Pencil Marks / Notes System
Based on Super Sudoku, sudokUI, and mobile Sudoku app patterns:

1. **Data Structure**
   - 3D array: `notes[row][col][digit]` (boolean)
   - Or 2D array of Sets: `notes[row][col] = Set<Digit>`
   - Initialize with all 1-9 for empty cells
   - Clear when cell is filled

2. **Auto-Fill Notes**
   - On puzzle start, calculate initial candidates for each empty cell
   - After each move, update affected cells' notes
   - Remove numbers that appear in same row/col/box

3. **UI Patterns**
   - Small numbers in corners of cells
   - Toggle notes mode with button/keyboard shortcut
   - Click number in notes to toggle it
   - Auto-clear notes when cell is filled with value
   - Highlight cells with related notes when number selected

### Puzzle Generation Strategies
Based on sudoku-gen (transformations), Super Sudoku (constraint satisfaction), sudokUI (pattern-based), and alicommit-malp/sudoku:

1. **Seed-Based Transformation** (fast, no backtracking)
   - Start with known valid solution
   - Apply rotations (0°, 90°, 180°, 270°)
   - Shuffle row/column groups (bands/stacks)
   - Shuffle individual rows/columns within groups
   - Swap digits (9! permutations)
   - Result: 2.4+ trillion unique puzzles per seed

2. **Hole-Digging Approach** (quality-focused)
   - Start with complete grid
   - Remove cells symmetrically
   - After each removal, verify unique solution
   - Stop when removal would create ambiguity
   - Target clue counts: easy (~40), medium (~35), hard (~30)

3. **Pattern-Based Generation** (consistent difficulty)
   - Predefined seed patterns by difficulty
   - Fill pattern cells via backtracking
   - Remove cells while maintaining uniqueness
   - Enforce symmetry constraints

### State Management Patterns
Based on game-architecture patterns, martini-kit, YAGE, and React game state research:

1. **Centralized State Object**
   ```typescript
   interface GameState {
     grid: number[][];
     initialGrid: number[][];
     selectedCell: { row: number; col: number } | null;
     notes: number[][][]; // [row][col][digit]
     mistakes: number;
     timer: number;
     status: 'not-started' | 'playing' | 'completed';
     difficulty: 'easy' | 'medium' | 'hard';
     history: GridState[]; // For undo/redo
   }
   ```

2. **Immutable Updates via Actions**
   - Dispatch typed actions: `SELECT_CELL`, `INPUT_VALUE`, `CLEAR_CELL`, `TOGGLE_NOTE`, `UNDO`, `REDO`
   - Reducer creates new state objects
   - History stack for undo/redo

3. **Persistence Strategy**
   - Auto-save to localStorage on state changes
   - Debounce saves to avoid thrashing
   - Restore on page load
   - Clear on game completion or explicit reset

### Game Flow Architecture
Based on game-architecture skill, Ludenio template, and puzzle game patterns:

```
Boot → Menu (difficulty selection) → New Game Generation → Gameplay
                                                          ↓
                                                    Pause/Resume
                                                          ↓
                                                      Game Over
                                                          ↓
                                                    Restart/New Game
```

- No title screen by default (boot to gameplay)
- Difficulty selection is explicit user action
- Generation happens client-side after selection
- State persists across browser refreshes
- Restart resets to initial puzzle state (not regenerate)

### Testing Strategy
Based on sudoku-core (verification), jonathontoon/sudoku (157 tests), and game architecture patterns:

1. **Unit Tests**
   - Solver algorithms (constraint propagation, backtracking)
   - Puzzle generation (uniqueness, validity)
   - Difficulty rating consistency
   - Individual game rules (row/col/box constraints)

2. **Integration Tests**
   - End-to-end game flow (start → play → win)
   - State transitions and persistence
   - Undo/redo correctness
   - Hint system accuracy

3. **UI Tests** (optional, if adding)
   - Component rendering
   - Input handling
   - Keyboard navigation
   - Responsive behavior

### Performance Considerations
Based on sudoku-gen (transformations), sudoku-core (Rust performance), and web game patterns:

1. **Generation Performance**
   - Use transformation-based generation for instant puzzles
   - Cache pre-generated puzzles by difficulty
   - Generate in background workers if using hole-digging

2. **Solver Performance**
   - Constraint propagation before backtracking
   - MRV heuristic for search efficiency
   - Early termination on uniqueness checks
   - Limit search depth for real-time hints

3. **Rendering Performance**
   - Virtual diffing (React handles this)
   - Avoid unnecessary re-renders with memo
   - Batch state updates
   - Use CSS transforms for animations

### Accessibility and Usability
Based on Super Sudoku, sudokUI, and web game UX patterns:

1. **Input Methods**
   - Keyboard navigation (arrow keys, number keys)
   - Touch support (tap to select, number pad)
   - Mouse support (click to select, on-screen controls)
   - Keyboard shortcuts (Ctrl+Z for undo, Ctrl+Y for redo)

2. **Visual Feedback**
   - Highlight selected cell, related row/col/box
   - Show same-number occurrences
   - Mistake highlighting (optional, configurable)
   - Notes/pencil marks visualization
   - Timer display (optional)

3. **Progress Assistance**
   - Hint system (next logical move)
   - Mistake checking (optional)
   - Auto-fill notes (optional)
   - Reveal solution (last resort)

### Clean Architecture for Sudoku
Based on Clean Game Architecture, schorts99/React-Clean-Architecture, and xenobiasoft/sudoku:

1. **Dependency Rule**: Inner layers must not depend on outer layers
   - Domain (solver, generator) must not know about React
   - Application (game state) must not know about localStorage
   - Presentation (UI) must not know about solving algorithms

2. **Use Cases**
   - GeneratePuzzle(difficulty): returns grid
   - SolvePuzzle(grid): returns solution
   - ValidateMove(grid, row, col, value): returns boolean
   - GetHint(grid): returns {row, col, value, explanation}
   - CheckUniqueness(grid): returns boolean

3. **Ports and Adapters**
   - Port: IGameStorage (save, load, clear)
   - Adapter: LocalStorageGameStorage
   - Port: IPuzzleGenerator
   - Adapter: TransformationGenerator, HoleDiggingGenerator

### TypeScript Best Practices
Based on jonathontoon/sudoku, xenobiasoft/sudoku, and strict TypeScript patterns:

1. **Type Safety**
   - Strict mode enabled
   - No `any` types
   - Explicit return types
   - Discriminated unions for state
   - Branded types for domain concepts (e.g., `Grid`, `CellIndex`)

2. **Domain Types**
   ```typescript
   type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
   type Difficulty = 'easy' | 'medium' | 'hard';
   type Grid = Digit[][];
   type Cell = { value: Digit | 0; given: boolean; notes: Set<Digit> };
   ```

3. **Immutability**
   - Readonly types for immutable data
   - Copy-on-write for state updates
   - Immutable Grid operations for solver

## Research Sources
This AGENTS.md incorporates patterns and insights from 20+ industry sources:

**Sudoku Implementations:**
- Super Sudoku (TN1ck/super-sudoku) - 155 stars, MIT
- sudokUI (AImenes/sudokUI) - PWA with 80 solving techniques
- sudoku-core (kcirtapfromspace/sudoku-core) - Rust engine with 45 techniques
- jonathontoon/sudoku - Peter Norvig constraint propagation, TypeScript
- Seppuku (colatkinson/seppuku) - React + Redux + TypeScript
- GitHub Friendly Sudoku (hmpastana/sudoku) - Embeddable library
- SudokuGen (petewritescode/sudoku-gen) - Transformation-based generation
- xenobiasoft/sudoku - Clean Architecture + DDD, C# backend
- buscodes/sudoku-vue - Vue 3 + Clean Architecture + Atomic Design
- KyouyamaKazusa/Sudoku - C# SDK with multiple algorithms

**Architecture & Game Patterns:**
- Clean Game Architecture (cleangamearchitecture.com)
- React Clean Architecture (schorts99/React-Clean-Architecture)
- Web Engine Dev - Modular TypeScript game engine
- Quantum Engine - TypeScript ECS game engine
- game-architecture skill (PlayableIntelligence)
- YAGE state management patterns
- martini-kit state management
- Ludenio WebGameTemplate - Mutable UDF + deterministic lockstep

**Solver & Generation Research:**
- Peter Norvig's constraint propagation algorithm (norvig/pytudes)
- TheAlgorithms/Python sudoku solver
- SudokuPy - Python+C generator for ML datasets
- alicommit-malp/sudoku - Python generator with symmetry
- Design Sudoku Solver (theskilledcoder.com) - LLD with Strategy pattern
- Sudoku Explainer (SudokuExplainer GitHub) - Advanced solving techniques
- HoDoKu - Java Sudoku with advanced solving
- Sudoku Wiki (sudopedia.org) - Comprehensive technique reference

**DDD & Clean Architecture:**
- gushakov/game-clean - Clean DDD RPG game
- DDD in action: Armadora board game
- MateuszNaKodach DDD chess engine
- Clean Architecture React tutorial (morintd.hashnode.dev)
- UrsaManus - React+TypeScript game engine foundation
