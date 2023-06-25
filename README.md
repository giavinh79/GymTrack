# GymTrack

[![CI](https://github.com/GV79/GymTrack/actions/workflows/main.yml/badge.svg)](https://github.com/GV79/GymTrack/actions/workflows/main.yml)

Simple & for fun [React.js](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Redux](https://redux-toolkit.js.org/) application for tracking and managing a user's fitness journey. This frontend application deploys automatically on merges to master via Netlify: https://gymtrack.netlify.app

The backend was made in Node.js ([Express.js](https://expressjs.com/)) but is being deprecated for a Spring Boot version here: https://github.com/giavinh79/GymTrackApiV2

![image](https://user-images.githubusercontent.com/24909563/159189357-b88bdbd4-331f-4f5e-9938-0851813ab132.png)

## Running

1. Install dependencies

```sh
$ npm install
```

2. Run the application

```sh
$ npm start
```

## Building

Run 'npm run build' and use the newly created 'build' folder for deployment.

## Development

Install:

- Prettier
- ESLint
- Enable "format on save"

## Terminologies

**Routine**: Series of workouts you do on a weekly basis (i.e. push-pull-legs)

**Workout**: A set of exercises for a particular day (i.e. Leg day with squats, leg press, and leg curls)

**Exercise**: An individual type of exercise (i.e. bench-press, chin-ups, push-ups, bicep curl... etc.)

**Set**: A series of repetitions performed sequentially (i.e. when doing push-ups, a set could represent 50 reps which means you did 50 pushups in one go)

## Tech Stack & Features

- React.js (w/ TypeScript)
- [Redux Toolkit](https://redux-toolkit.js.org/) for global state management
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for data fetching (request de-duplication, caching, optimistic updates...etc.)
- [React Router](https://reactrouter.com/) for routing
- [Mantine](https://mantine.dev/) for design & styling (UI component library with useful hooks)
- [Font Awesome 5](https://fontawesome.com/v5/search) for icons
- Internationalization with [react-i18next](https://react.i18next.com/) and https://translate.i18next.com/
- Production error tracking with [Sentry](https://sentry.io/)
- Uses [Vite](https://vitejs.dev/) as a build tool over Webpack for significant development performance increases
- Mixpanel for analytics

## TODO

- Complete routine start and update features
- Internationalize all text
- Add component tests w/ React Testing Library
- Address all @TODOs in code
- Re-consider a global modal approach with functions instead (and tradeoffs associated with this) - maybe just use Mantine's Modal Provider
- Lazy load Sentry
- Migrate to dnd-kit ?
- Increase performance on load (reduce initial bundle size load with code splitting w/ Vite.js dynamic imports, [Partytown](https://partytown.builder.io/), replacing Font Awesome at some point...etc.
- Storybook v7
- Get rid of Lodash and replace with native functions or create util functions
- TS lint on CI/CD
