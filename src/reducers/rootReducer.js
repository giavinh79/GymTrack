/* Imports expored reducers from state slices */

import { combineReducers } from 'redux';
import loginModalReducer from '../slices/loginSlice';
import signupModalReducer from '../slices/signupSlice';
import authReducer from '../slices/authSlice';
import modalReducer from '../slices/modalSlice';

const rootReducer = combineReducers({
  login: loginModalReducer,
  signup: signupModalReducer,
  auth: authReducer,
  modal: modalReducer,
});

export default rootReducer;
