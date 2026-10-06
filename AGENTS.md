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
4. Validate with the smallest relevant Jest command after changing behavior.
5. Avoid broad refactors unless the task requires it.
6. Maintain clear separation between domain logic (Sudoku rules, constraints, generation) and UI concerns (rendering, input handling, state display).
7. When adding features, consider whether they belong in the game engine layer, solver layer, or presentation layer.

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
- Do not rely on values that are different between server render and client hydration, such as `Math.random()`, `Date.now()`, `new Date()`, or any browser-only API during render.
- Never precompute a random game on the server for the initial page render; the app must keep the initial state stable until a user action or a client-only effect runs.
- Beware of server/client mismatches from access to `window`, `document`, `navigator`, `localStorage`, `sessionStorage`, or media queries during render.
- Avoid reading browser-only environment state in module scope or render paths that run during SSR.
- Keep interactive behavior in client-driven flows; if it must happen after mount, gate it behind `useEffect` or user input rather than server render logic.
- Do not assume SSR can fully reproduce a client-only experience such as random game selection, timers, hover-driven state, or layout decisions based on viewport size.
- If a feature cannot be reliably pre-rendered server-side, prefer a stable fallback and then hydrate or update the UI after the client has initialized.

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

2. **Search Layer**
   - Backtracking with MRV heuristic (minimum remaining values)
   - Choose empty cell with fewest candidates first
   - Try each candidate, validate, recurse
   - Backtrack on contradiction

3. **Technique Hierarchy** (for hints/difficulty rating)
   - Easy: naked singles, hidden singles
   - Medium: naked/hidden pairs, pointing pairs
   - Hard: x-wing, swordfish, jellyfish
   - Expert: advanced chains, ALS, uniqueness techniques

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

**DDD & Clean Architecture:**
- gushakov/game-clean - Clean DDD RPG game
- DDD in action: Armadora board game
- MateuszNaKodach DDD chess engine
- Clean Architecture React tutorial (morintd.hashnode.dev)
- UrsaManus - React+TypeScript game engine foundation
