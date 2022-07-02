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

## Tech Stack & Features

- React.js (w/ TypeScript)
- [Redux Toolkit](https://redux-toolkit.js.org/) for global state management
- [React Router](https://reactrouter.com/) for routing
- [Mantine](https://mantine.dev/) for design & styling (UI component library with useful hooks)
- [Font Awesome 5](https://fontawesome.com/v5/search) for icons
- Internationalization with [react-i18next](https://react.i18next.com/)
- Production error tracking with [Sentry](https://sentry.io/)
- Uses [Vite](https://vitejs.dev/) as a build tool over Webpack for significant performance increases

## TODO

- Add 404 error page not found for invalid routes
- Replace majority of `navigate` with accessible links
- Husky and some CI related stuff (husky prettify commits, on CI add ts linting)
- Add all text to translation files
