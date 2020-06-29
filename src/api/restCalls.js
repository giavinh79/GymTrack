import axios from 'axios';
const API_ENDPOINT = process.env.REACT_APP_ENDPOINT || '';

const createRoutine = async (data) => {
  try {
    await axios.put(`${API_ENDPOINT}/routine`, data);
  } catch (err) {
    throw err;
  }
};

const retrieveExercises = async () => {
  try {
    await axios.get(`${API_ENDPOINT}/exercises`);
  } catch (err) {
    throw err;
  }
};

export { createRoutine, retrieveExercises };
