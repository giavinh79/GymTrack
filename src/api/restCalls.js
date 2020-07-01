import axios from 'axios';
import firebase from '../auth/firebase';

const API_ENDPOINT = process.env.REACT_APP_ENDPOINT || 'http://localhost:3030';

const createRoutine = async (data) => {
  try {
    const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
    await axios.put(`${API_ENDPOINT}/api/routine`, { ...data, token: token });
  } catch (err) {
    throw err;
  }
};

const retrieveRoutines = async () => {
  try {
    await axios.get(`${API_ENDPOINT}/api/routine`);
  } catch (err) {
    throw err;
  }
};

export { createRoutine, retrieveRoutines };
