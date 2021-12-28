# GymTrack

Simple React.js, TypeScript, and Redux application for tracking and managing a user's fitness journey. Deploys automatically on merges to master via Netlify - https://gymtrack.netlify.app

The backend Node.js (Express) API can be found here: [https://github.com/GV79/GymTrackAPI](https://github.com/GV79/GymTrackAPI) but will be deprecated soon.

## Running

Install all dependencies using `npm install` and then run the application using `npm start`.

## Building

Run 'npm run build' and use the newly created 'build' folder for deployment.

## Development

In the text editor of your choice, install the Prettier extension and change the settings so that formatting is done automatically on save.

## Tech Stack

- React.js (w/ TypeScript)
- Redux Toolkit for global state management
- React Router for routing

## TODO REFACTORING

- Lazy load some librairies (i.e. react-body-highlighter and the graphs)
- Further break down components \*\*\*
- Replace majority of `navigate` with links
- Husky and some CI
- Replace SASS & React Bootstrap styles with Chakra UI
- Add React Hook Forms
- Add Sentry for production monitoring
