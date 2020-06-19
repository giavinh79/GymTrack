/* Core Firebase JS SDK */
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

/* Firebase Config */

const firebaseConfig = {
  apiKey: 'AIzaSyAYDuhx-r5dQRySfWluE59IC-7pnV39uOo',
  authDomain: 'gymtrack-e6a77.firebaseapp.com',
  databaseURL: 'https://gymtrack-e6a77.firebaseio.com',
  projectId: 'gymtrack-e6a77',
  storageBucket: 'gymtrack-e6a77.appspot.com',
  messagingSenderId: '1086872219631',
  appId: '1:1086872219631:web:c362984f22d36acda0901a',
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
