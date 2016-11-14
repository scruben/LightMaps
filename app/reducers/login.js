import { AsyncStorage } from 'react-native';

const auth = (
  state = {
    username: '',
    authToken: '',
    role: '',
    statusError: ''
  },
  action
) => {
  switch (action.type) {
  case 'LOGIN_SUCCESS': {
    if (action.response.status === 'Authorized') {
      let idString = JSON.stringify({
        authToken: action.response.idToken,
        role: action.response.clearance,
        username: action.response.username
      });
      AsyncStorage.setItem('idData', idString)
        .then(() => {console.log('Stored idData');})
        .catch(() => {console.log('Problem storing idData');});
      return Object.assign({}, state, {
        authToken: action.response.idToken,
        role: action.response.clearance,
        username: action.response.username,
        statusError: ''
      });
    } else {
      return Object.assign({}, state, {
        statusError: 'Wrong username or password.'
      });
    }
  }
  case 'LOGIN_FAILURE':
    return Object.assign({}, state, {
      statusError: 'Wrong username or password.'
    });
  case 'LOGIN_REQUEST':
    return Object.assign({}, state, {
      statusError: '' // we clear the status error in case multiple wrong logins
    });
  case 'SET_IDDATA':
    return Object.assign({}, state, {
      authToken: action.tokenId,
      username: action.username,
      role: action.role
    });
  default:
    return state;
  }
};

export default auth;
