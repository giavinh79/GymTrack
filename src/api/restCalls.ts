import axios from 'axios';
import firebase from '../auth/firebase';
import { RoutineData } from './types';

const API_ENDPOINT = process.env.REACT_APP_ENDPOINT || 'http://localhost:3030';

const createRoutine = async (data: object) => {
  return new Promise((resolve, reject) => {
    try {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          await axios.put(`${API_ENDPOINT}/api/routine`, { ...data, token: token });
        }
      });
      return resolve();
    } catch (err) {
      return reject(err);
    }
  });
};

const register = async (credentials: object) => {
  try {
    await axios.post(`${API_ENDPOINT}/api/auth/signup`, credentials);
  } catch (err) {
    throw err;
  }
};

const retrieveRoutines = async (token: string): Promise<RoutineData> => {
  try {
    return await axios.get(`${API_ENDPOINT}/api/routine?token=${token}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { createRoutine, register, retrieveRoutines };
