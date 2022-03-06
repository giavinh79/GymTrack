# GymTrack

Simple & for fun React.js, TypeScript, and Redux application for tracking and managing a user's fitness journey. Deploys automatically on merges to master via Netlify - https://gymtrack.netlify.app

The backend was made in Node.js (Express.js) but is being deprecated for a Spring Boot version [here](https://github.com/GV79/GymTrackApiV2).

## Running

Install all dependencies using `npm install` and then run the application using `npm start`.

## Building

Run 'npm run build' and use the newly created 'build' folder for deployment.

## Development

In the text editor of your choice, install the Prettier extension and adjust settings so that formatting is done automatically on save.

## Tech Stack & Features

- React.js (w/ TypeScript)
- [Redux Toolkit](https://redux-toolkit.js.org/) for global state management
- [React Router](https://reactrouter.com/) for routing
- [Mantine](https://mantine.dev/) for design & styling (UI component library with useful hooks)
- Internationalization with [react-i18next](https://react.i18next.com/)
- Production error tracking with [Sentry](https://sentry.io/)
- Uses [Vite](https://vitejs.dev/) as a build tool over Webpack for significant performance increases

## TODO REFACTORING

- Lazy load some librairies (i.e. react-body-highlighter and the graphs)
- Further break down components
- Replace majority of `navigate` with accessible links
- Husky and some CI related stuff
