import axios from 'axios';

import { CONFIG } from '../../config';

const register = async (credentials: object) => {
  await axios.post(`${CONFIG.API_ENDPOINT}/auth/signup`, credentials);
};

export { register };
