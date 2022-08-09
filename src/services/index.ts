import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { CONFIG } from 'src/config';
import type { RootState } from 'src/stores/rootStore';

export const getProtectedBaseQuery = (baseUrl: string = CONFIG.API_ENDPOINT) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).context.auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  });
