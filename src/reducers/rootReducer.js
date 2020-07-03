/* Imports expored reducers from state slices */

import { combineReducers } from 'redux';
import loginModalReducer from '../slices/loginSlice';
import signupModalReducer from '../slices/signupSlice';
import authReducer from '../slices/authSlice';
import modalReducer from '../slices/modalSlice';
import loadingReducer from '../slices/loadingSlice';
import routinesReducer from '../slices/routinesSlice';

const rootReducer = combineReducers({
  login: loginModalReducer,
  signup: signupModalReducer,
  auth: authReducer,
  modal: modalReducer,
  loading: loadingReducer,
  routines: routinesReducer,
});

export default rootReducer;
