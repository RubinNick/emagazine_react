import { combineReducers } from 'redux';

import { authentication } from './authReducer';
import { users } from './userReducer';
import { products } from './productReducer';
import { alert } from './alertReducer';
import { notification } from './notificationReducer'
import { registration } from './registrationReducer';


const rootReducer = combineReducers({
  authentication,
  users,
  products,
  alert,
  notification,
  registration
});

export default rootReducer;