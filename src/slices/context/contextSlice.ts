import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'src/stores/rootStore';

interface IContextUser {
  email: string;
  id: string;
}

interface IContextAuth {
  token: string;
}

interface IContextState {
  user: IContextUser;
  auth: IContextAuth;
}

const initialState: IContextState = {
  user: {
    email: '',
    id: '',
  },
  auth: {
    token: '',
  },
};

const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    setContext: (_, action: PayloadAction<IContextState>) => action.payload,
    setAuth: (state, action: PayloadAction<IContextAuth>) => {
      state.auth = action.payload;
    },
    setUser: (state, action: PayloadAction<IContextUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setAuth, setContext, setUser } = contextSlice.actions;

export const selectContext = (state: RootState) => state.context;

export default contextSlice.reducer;
