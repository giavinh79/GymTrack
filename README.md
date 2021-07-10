# GymTrack

Simple application for tracking and managing a user's fitness journey. Deploys automatically on merges to master via Netlify.

The backend Node.js (Express) API can be found here: [https://github.com/GV79/GymTrackAPI](https://github.com/GV79/GymTrackAPI) but will be deprecated soon.

## Running

Install all dependencies using `npm install` and then run the application using `npm start`.

## Building

Run 'npm run build' and use the newly created 'build' folder for deployment.

## Development

In the text editor of your choice, install the Prettier extension and change the settings so that formatting is done automatically on save.
For development, Redux Toolkit and TypeScript are used.

## Environment Files

Look at the .env.example placed in GymTrackAPI. A MongoDB database needs to be set-up properly in order for the backend to work.
