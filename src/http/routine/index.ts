import axios from 'axios';

import { auth } from '../../auth/firebase';
import { CONFIG } from '../../config';

import { IRoutineData } from './types';

const createRoutine = async (data: object) => {
  return new Promise((resolve, reject) => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          await axios.put(`${CONFIG.API_ENDPOINT}/routine`, { ...data, token: token });
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
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          await axios.delete(`${CONFIG.API_ENDPOINT}/routine`, { data: { id, token } });
          resolve(null);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

const retrieveRoutines = async (token: string): Promise<IRoutineData> => {
  return axios.get(`${CONFIG.API_ENDPOINT}/routine?token=${token}`);
};

export { createRoutine, deleteRoutine, retrieveRoutines };
