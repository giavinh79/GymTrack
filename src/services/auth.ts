import { CONFIG } from 'src/config';

const register = async (credentials: object) => {
  await fetch(`${CONFIG.API_ENDPOINT}/auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
};

export { register };
