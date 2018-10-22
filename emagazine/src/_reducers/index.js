import { combineReducers } from 'redux';

import { authentication } from './authReducer';
import { users } from './userReducer';
import { alert } from './alertReducer';
import { notification } from './notificationReducer'
import { registration } from './registrationReducer';


const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  notification,
  registration
});

export default rootReducer;