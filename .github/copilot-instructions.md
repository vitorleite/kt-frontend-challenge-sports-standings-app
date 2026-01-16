# Sports Standings App - Copilot Instructions

## Architecture Overview

This is a React + TypeScript + Vite sports competition management app with a **feature-based architecture** centered around the `features/competition` domain. The project uses **Context-based state management** (no Redux) inspired by Vue's Provide/Inject pattern.

**Core Pattern**: Each sport page (Premier League, Eurobasket, Wimbledon) composes the shared `Competition` feature with sport-specific configuration, theming via CSS variables, and optional custom providers.

## Key Architectural Decisions

### Provider Composition Pattern

- **Base**: `Competition.Provider` in [src/features/competition/providers/Provider.tsx](src/features/competition/providers/Provider.tsx) handles core competition logic (add participants, add results, validate rules)
- **Composition**: Sport-specific providers (e.g., `BasketballProvider`) wrap the base provider and inject sport-specific configs like custom points systems and standings columns
- Example: [Eurobasket](src/pages/Eurobasket/Eurobasket.tsx) uses `Competition.BasketballProvider` which configures win=2, loss=1, draw=0 points

### Competition Feature Structure

- **Context**: [src/features/competition/context.tsx](src/features/competition/context.tsx) - Single context for config, state, and actions
- **Types**: [src/features/competition/types.ts](src/features/competition/types.ts) - All domain types (participants, results, standings, config)
- **Namespace Export**: [src/features/competition/index.ts](src/features/competition/index.ts) exports `Competition` object containing all components and providers

### State Management

- Uses **React Context** (`CompetitionContext`) - not Redux, not external state libraries
- Each page implementation uses `useLocalStoragePersistence` hook ([src/hooks/useLocalStoragePersistence.ts](src/hooks/useLocalStoragePersistence.ts)) for persistence
- State flows: Page initializes → Provider manages → Components consume via `useCompetitionContext()`
- **Never** access context outside a Provider - components must be wrapped in `Competition.Provider` or sport-specific providers

## Configuration System

The `CompetitionConfig` in [types.ts](src/features/competition/types.ts) supports:

- **Match formats**: `singleRoundRobin` (each pair plays once) or `doubleRoundRobin` (plays twice, home/away)
- **Points system**: Custom win/draw/loss values (default: 3/1/0)
- **Label customization**: Override form labels via `addParticipantLabels` and `addResultLabels`
- **Standings columns**: Configure which columns appear and their order via `standingsColumns` array

Example from [PremierLeague.tsx](src/pages/PremierLeague/PremierLeague.tsx):

```tsx
<Competition.Provider
  config={{ title: 'Premier League', matchFormat: 'doubleRoundRobin' }}
  initialState={state}
  onStateChange={handleChange}
/>
```

## Theming Pattern

**CSS Variables-based theming** - each sport page defines theme in its `.module.css`:

- Define custom properties at page-level (e.g., `.premierLeague { --purple: #38003c; }`)
- Map to semantic tokens: `--app-bg`, `--surface-1-bg`, `--text-1`, etc.
- Import custom Google Fonts per theme
- See [PremierLeague.module.css](src/pages/PremierLeague/PremierLeague.module.css) vs [Eurobasket.module.css](src/pages/Eurobasket/Eurobasket.module.css)

## Component Patterns

### UI Components

- Located in `src/components/ui/` - generic, reusable, sport-agnostic
- Use **CSS Modules** for styling (`.module.css` files)
- Button component uses `class-variance-authority` for variant management
- Components follow **compound component pattern** (e.g., `Card.Root`, `Card.Title`)

### Competition Components

- Located in `src/features/competition/components/`
- **Presentational** - consume context via `useCompetitionContext()`
- Key components: `Standings`, `AddParticipantForm`, `AddResultForm`, `Header`, `ActionButtons`
- Standings uses `useMemo` for calculated data (points, rankings) based on results

### Custom Rendering

- `Standings` and `Results` components accept render props (`renderCell`, `renderName`)
- Used for sport-specific customizations without forking components
- Example: [Eurobasket](src/pages/Eurobasket/Eurobasket.tsx) uses `createCellRenderer` from [cellRenderer.ts](src/features/competition/utils/cellRenderer.ts)

## Development Workflow

### Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # TypeScript compilation + Vite production build
npm run lint     # ESLint validation
npm run preview  # Preview production build
```

### Path Aliases

TypeScript configured with `@/*` alias mapping to `src/*` in [tsconfig.app.json](tsconfig.app.json)

- Import as: `import { Competition } from '@/features/competition'`

### Adding a New Sport

1. Create page folder in `src/pages/<SportName>/`
2. Create `<SportName>.tsx` and `<SportName>.module.css`
3. Define CSS variables for theme colors, fonts
4. Compose with `Competition.Provider` or create custom provider if unique rules needed
5. Use `useLocalStoragePersistence` with unique key for state management
6. Configure `CompetitionConfig` for sport-specific rules (match format, points, columns)

## Validation Rules

In [Provider.tsx](src/features/competition/providers/Provider.tsx):

- Participant names must be unique and non-empty
- Results require both participants to be registered
- Participants cannot play against themselves
- Scores must be non-negative numbers
- Match format determines if repeat fixtures allowed (see `hasPlayedBefore` logic)

## Known Patterns to Follow

1. **Never mutate state directly** - use setter functions from Provider
2. **Return ActionResult** - all actions return `{ ok: boolean, error?: string }` for error handling
3. **CSS Modules naming** - use camelCase for class names, kebab-case for files
4. **Type imports** - use `import type` for type-only imports (enforced by `verbatimModuleSyntax`)
5. **Component exports** - use named exports with barrel files (`index.ts`)

## Current Limitations & Technical Debt

### Known Issues

- **No routing** - page switching via conditional rendering in [App.tsx](src/App.tsx)
- **LocalStorage only** - no backend integration (Provider designed to be adapter-agnostic via `onStateChange` prop)
- **No tests** - test infrastructure not yet implemented

### Areas for Improvement

#### Grid/Layout System (Priority)

- **Current state**: Grid markup duplicated across page implementations, each with custom CSS
- **Problem**: Complex CSS for relatively simple layouts, not DRY
- **Goal**: Component-based approach that's clear, scalable, and simple
- **Considerations**: Avoid over-engineering - should remain straightforward to understand and modify

#### Render Props Pattern

- `cellRenderer` pattern works but could be refactored as familiarity with React patterns improves
- Not a priority - functional and maintainable as-is

#### CSS Variable Scope & Theming

- **Current state**: Some CSS variables defined at `:root` (in [index.css](src/index.css)) conflict with page-level overrides in theme modules
- **Problem**: Variables that depend on other variables don't recalculate correctly when page-level themes redefine dependencies
- **Symptoms**: Theme colors may override each other in production builds due to scope isolation issues
- **Investigation needed**: Determine if `:root` variables recalculate when page-scoped variables (`.premierLeague`, `.eurobasket`, `.wimbledon`) redefine their dependencies
- **Potential solutions**: Use CSS `@layer` for cascade control, ensure page-level class wraps entire tree, or restructure variable inheritance hierarchy

## Plan Mode

- Make the plan extremely concise and easy to understand. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
