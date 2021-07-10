import axios from 'axios';
import firebase from '../../auth/firebase';
import { CONFIG } from '../../config';
import { RoutineData } from './metadata';

const createRoutine = async (data: object) => {
  return new Promise((resolve, reject) => {
    try {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          await axios.put(`${CONFIG.API_ENDPOINT}/api/routine`, { ...data, token: token });
          resolve(null);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

const deleteRoutine = async (id: string) => {
  return new Promise((resolve, reject) => {
    try {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          await axios.delete(`${CONFIG.API_ENDPOINT}/api/routine`, { data: { id, token } });
          resolve(null);
        }
      });
    } catch (err) {
      reject(err)
    }
  });
};

const register = async (credentials: object) => {
  await axios.post(`${CONFIG.API_ENDPOINT}/api/auth/signup`, credentials);
};

const retrieveRoutines = async (token: string): Promise<RoutineData> => {
  return await axios.get(`${CONFIG.API_ENDPOINT}/api/routine?token=${token}`);
};

export { createRoutine, deleteRoutine, register, retrieveRoutines };
