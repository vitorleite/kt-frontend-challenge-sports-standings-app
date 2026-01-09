# Kickertech - FE Technical Challenge

## Setup

### Install

```bash
git clone https://github.com/vitorleite/kt-frontend-challenge-sports-standings-app.git
```

```bash
cd kt-frontend-challenge-sports-standings-app
```

```bash
npm install
```

### Run

```bash
npm run dev
```

## Project structure

The structure aims for simplicity and clarity given the scope of the challenge.

- `features/`
  - Domain specific logic and components
  - Competition contains state management, rules, validations and shared UI

- `pages/`
  - Composed pages and layouts
  - Each page configures and composes features for a specific implementation

- `components/`
  - Reusable, generic UI components

- `hooks/`
  - Reusable hooks, in this case only the localStorage persistence

## Description and goals

Single page application to manage sports tournaments. Users can add participants, input match results and view the standings table.

Additionally, added support for different points system (win/draw/loss), and match format (single round robin/double round robin).

Themes are configured per implementation (Premier League/Eurobasket/Wimbledon).

Competition data is stored locally using local storage, but different adapters can be used per implementation as the Provider just accepts and emits its state.

## Process

### 1. Analysis, discovery and architecture planning

- Analysed the challenge to build the 3 different views
- Identified common patterns and the variations in the description and the designs provided
- Initial development of markup and CSS to establish layout and structure
- Learning modern React fundamentals, mapping concepts with my experience of Vue
- Priority was simplicity, minimal dependencies and clear code

### 2. Competition feature

- Early on was creating components under a `components/competition` folder, and passing state in the tree, but intended to refactor to redux once stable
- Introduced redux, but decided not to pursue it further for this challenge. Given the scope and my past experience with vuex, preferred something more composable
- Came across a video on React composition that had me exploring `useContext`. I've used Provide/Inject extensively in Vue, and this is the React version of it ([link to video](https://www.youtube.com/watch?v=4KvbVq3Eg5w))
- Did some quick experimentation with `useContext` and I liked it, decided to refactor what I had into a feature, and later implement into pages as needed for the design
- State management, validation and configuration could be provided by the competition context
- Logic centralised through the context allowed later to introduce redux if wanted
- Main goal was to centralise domain logic while keeping UI components mostly presentational

### 3. Components UI and Competition

- Initially created the components to make the Premier League work, adjusted the design (a bit too much at times), added some theming variables
- Created some UI components to facilitate development and start organising things
- Separated and stabilised the competition components, header, add participant, add result, standings

### 4. Page-specific implementations

- Created the 3 separate implementations
  - Each uses the shared provider
  - Applies custom themes via CSS variables
  - Implements the page specific layout and responsive grids (this is the least expanded pattern)
  - Configures the competition for its needs
  - Eurobasket uses a custom Basketball wrapper as an example of provider composition
- All implementations live under their own folder, where specific components can live and other customisations

### 5. Themes

- Layered CSS variable system (at least an idea of how it could look)
  - Base theme in index.css
  - Page specific overrides
  - Scoped to page wrapper to prevent conflicts
- Intention is to support different visual identities per brand/implementation

### 6. State persistence

- Implemented a hook to handle localStorage persistence
- Provider accepts `initialState` and `onStateChange` callback for integration with other persistence layers
- Other implementations should be straightforward (redux, tanstack db)

### 7. Responsive design

- Mobile first approach
- Uses a grid to decide how many columns to show per breakpoint
- This is an area that would need more work, I didn't manage to focus and expand it as I would like to

### 8. Developer experience

- Alias (`@/`) for cleaner imports
- Component co-location (css module next to component)
- Namespaced components (competition) for cleaner API (Competition.Header, Competition.BasketballProvider)

## Key decisions

- Favour composition over inheritance, provider wraps different implementations
- Configuration over code, but not everywhere, composition is always nicer, but configuration is more practical sometimes
- Separation of concerns, generic feature, page-specific implementation
- Scalability, it should be easy to add new pages or sports
- Flexibility, allow different persistence, themes and rules as needed
- Minimise dependencies, focus on React

## What I would add in a production version

I would have introduced a few different things if this was a production application that would be further developed going forward.

- Router, I probably would use TanstackRouter, I just like their libraries (see below)
- TanstackQuery and/or TanstackDB, depending on needs, but I like using a command/query pattern for API calls. TanstackDB if some sort of advanced collection management is needed
- Components, inclined to use BaseUI for base components
- CSS, I like TailwindCSS, so would add it as well, I think an utilities approach is quite powerful for quick development
- Themes, extend on what TailwindCSS offers, lean on variables and composing/overriding as needed
- i18n, mandatory, and it is possible it would replace the `labels` configurations if implemented per page

## React experience

Overall, the experience was positive and aligned with what I expected.

React component model and composition patterns felt intuitive, especially coming from Vue. Typescript support is great and natural, fundamental for larger code bases or working in a team environment

I opted for CSS modules for a pragmatic approach to styling in this challenge. It wasn't perfect, and sent me into loops at times, but it felt clearer and more maintainable than CSS-in-JS for the scope

## Missed goals

- No icons on the Eurobasket implementation. Initially I was going to pass a configuration for the icon in the participant, but later decided not to, I'd need to allow picking an icon for the participant when adding it, or, through the name find an icon, would work for national teams, but never got around to it
- i18n, wanted to add, but figured it wasn't mandatory and prioritised other things over it. Could have helped with different labels per sport

## Scope (previously TODO)

- [x] Create initial markup and styles
- [x] Split into components
  - [x] Add participant
  - [x] Add score
  - [x] Standings table
- [x] Add functionality
  - [x] Add participant
  - [x] Add score
  - [x] Calculate standings table
- [x] Eurobasket
- [x] Results list
- [x] Wimbledon
- [~] Configuration for different components
  - [x] Actions buttons
  - [x] Standings component columns
  - [x] Labels (team/player)
  - [ ] Standings component icons
- [x] Validations
  - [x] Single match
  - [x] Home/Away
- [x] Store data in localStorage
- [~] Responsive layout
- [x] Example of composing a Provider
- [ ] i18n
