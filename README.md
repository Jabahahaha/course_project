# Wordlish

A Wordle-inspired word guessing game built with React and TypeScript. Guess a 5-letter word in up to 6 attempts, with color-coded feedback for each guess. Includes a leaderboard system for tracking game scores.

## Features

- Word guessing game with 6 attempts and color-coded letter feedback (correct, present, absent)
- On-screen keyboard with letter state coloring and physical keyboard support
- Hard mode toggle that enforces reuse of revealed hints
- Player name input with personalized greeting
- Leaderboard list showing game sessions with top 3 scorers per game
- Leaderboard detail view with full top 10 ranking table
- Current player highlighting in leaderboard tables
- Loading states with Suspense and error recovery with ErrorBoundary

## Architecture Overview

The project follows a **domain-based file organization** with the **modlet pattern** for components and pages.

```
src/
  game/                              # Game domain (Wordle gameplay)
    components/
      Guesses/                       # Guess grid modlet (+ CSS module)
      Keyboard/                      # Keyboard modlet (+ CSS module)
    context/                         # GameSettings context/provider
    hooks/                           # useGameSettings
    types.ts                         # LetterResult, State
    constants.ts                     # Presentation constants (letter colors)
    logic.ts                         # Pure game logic (evaluateGuess, validateHardMode, etc.)
    words.ts                         # Word list for random word selection
  leaderboard/                       # Leaderboard domain
    api/                             # Async data-fetching functions
    components/
      GameCard/                      # Game summary card modlet
      ScorersTable/                  # Ranked scorers table modlet
    hooks/                           # useAllGames, useGame, useTopScorers
    types.ts                         # Player, GameRecord
    leaderboardData.ts               # Data source + pure query functions
  shared/                            # Cross-cutting, reusable across domains
    components/
      ErrorBoundary/                 # Error recovery modlet
      Layout/                        # App shell modlet (nav + player bar)
      LoadingFallback/               # Suspense loading indicator modlet
    context/                         # Player context/provider
    hooks/                           # usePlayer
  pages/                             # Route-level page modlets
    GamePage/
    LeaderboardListPage/
    LeaderboardDetailPage/
  main.tsx                           # Entry point, providers, routing
  global.css                         # Global styles
```

**Key design decisions:**

- **Separation of concerns:** Game logic lives in `game/logic.ts` (pure functions, no React). Data access lives in `leaderboard/leaderboardData.ts`. Rendering logic stays in components. App state is managed via React Context (Player, GameSettings) and TanStack Query (server/leaderboard data).
- **Services-hooks pattern:** API functions (`leaderboard/api/`) are consumed through custom hooks (`leaderboard/hooks/useLeaderboard.ts`) using TanStack Query's `useSuspenseQuery`, with `Suspense` boundaries for loading states.
- **Scoped state:** `GameSettingsContext` is only provided inside `GamePage`, preventing leakage to leaderboard views. `PlayerContext` is global since it's used in both domains.
- **Shared folder:** Cross-domain utilities (ErrorBoundary, Layout, Player state) live in `shared/`, imported by both game and leaderboard features.
- **Type safety:** All data structures are defined upfront in domain `types.ts` files. Strict TypeScript is enabled.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for bundling and dev server
- **TanStack Query** for data fetching and server state
- **React Router v7** for client-side routing
- **CSS Modules** for component-scoped styles
- **Vitest** + **Testing Library** for unit and integration tests

## Getting Started

```bash
npm install
npm run dev          # Start dev server at http://localhost:5173
```

## Scripts

| Command         | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run dev`   | Start Vite dev server                                    |
| `npm run build` | Type-check and build for production                      |
| `npm run lint`  | Run all quality checks (tsc, eslint, prettier, depcheck) |
| `npm test`      | Run all tests with Vitest                                |

## CI/CD

The project uses GitHub Actions (`.github/workflows/ci.yml`):

- **CI:** Runs `npm run lint` and `npm test` on every push/PR to `main`
- **CD:** Builds and deploys to GitHub Pages on pushes to `main`
