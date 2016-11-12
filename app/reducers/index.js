
import { combineReducers } from 'redux';
import routes from './routes';
import auth from './login';
// ... other reducers

export default combineReducers({
  routes,
  auth,
  // ... other reducers
});
