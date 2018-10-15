import { combineReducers } from 'redux';

import { authentication } from './authReducer';
import { users } from './userReducer';
import { alert } from './alertReducer';
import { registration } from './registrationReducer';


const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  registration,
});

export default rootReducer;