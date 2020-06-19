/* Imports expored reducers from state slices */

import { combineReducers } from 'redux';
import loginModalReducer from '../slices/loginSlice';
import signupModalReducer from '../slices/signupSlice';

const rootReducer = combineReducers({
  login: loginModalReducer,
  signup: signupModalReducer,
});

export default rootReducer;
