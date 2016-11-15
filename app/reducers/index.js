
import { combineReducers } from 'redux';
import routes from './routes.js';
import auth from './login.js';
import mapState from './map.js';
// ... other reducers

export default combineReducers({
  routes,
  auth,
  mapState
  // ... other reducers
});
