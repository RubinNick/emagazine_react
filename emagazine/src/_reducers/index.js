import { combineReducers } from 'redux';

import { authentication } from './authReducer';
import { users } from './userReducer';
import { alert } from './alertReducer';
import { registration } from './registrationReducer';
import { contentToggle } from './pageReducer';


const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  registration,
  contentToggle
});

export default rootReducer;