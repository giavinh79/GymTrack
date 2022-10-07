# GymTrack

Simple & for fun React.js, TypeScript, and Redux application for tracking and managing a user's fitness journey. Deploys automatically on merges to master via Netlify - https://gymtrack.netlify.app

The backend was made in Node.js (Express.js) but is being deprecated for a Spring Boot version [here](https://github.com/GV79/GymTrackApiV2).

![image](https://user-images.githubusercontent.com/24909563/159189357-b88bdbd4-331f-4f5e-9938-0851813ab132.png)

## Running

Install all dependencies using `npm install` and then run the application using `npm start`.

## Building

Run 'npm run build' and use the newly created 'build' folder for deployment.

## Development

In the text editor of your choice, install the Prettier extension and adjust settings so that formatting is done automatically on save.

### Terminologies in Code

`Routine`: Series of workouts you do on a weekly basis (i.e. push-pull-legs)

`Workout`: A set of exercises for a particular day (i.e. Leg day with squats, leg press, and leg curls)

`Exercise`: An individual type of exercise (i.e. bench-press, chin-ups, push-ups, bicep curl... etc.)

`Set`: A series of repetitions performed sequentially (i.e. when doing push-ups, a set could represent 50 reps which means you did 50 pushups in one go)

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

- More features
- Add all text to translation files
- Testing
- Address all @TODOs in code
- Re-consider a global modal approach with functions instead (and tradeoffs associated with this) - maybe just use Mantine's Modal Provider
- Lazy load Sentry
- Migrate to dnd-kit ?
