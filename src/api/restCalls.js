import axios from 'axios';
const API_ENDPOINT = process.env.REACT_APP_ENDPOINT || '';

const retrieveExercises = async () => {
  try {
    await axios.get(`${API_ENDPOINT}/exercises`);
  } catch (err) {
    throw err;
  }
};
