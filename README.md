# Kickertech - FE Technical Challenge

## Demo

You can view a demo of this application [here](https://vitorleite.github.io/kt-frontend-challenge-sports-standings-app/)

## Setup

### Install

HTTP

```bash
git clone https://github.com/vitorleite/kt-frontend-challenge-sports-standings-app.git
```

SSH

```bash
git clone git@github.com:vitorleite/kt-frontend-challenge-sports-standings-app.git
```

Navigate and install

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

## Development Process

For detailed information about the development approach, architectural decisions, and implementation process, see [DEVELOPMENT.md](DEVELOPMENT.md).
