const auth = (
  state = {
    username: '',
    authToken: '',
    role: '',
    statusError: ''
  },
  action
) => {
  console.log(action.type);
  switch (action.type) {
  case 'LOGIN_SUCCESS': {
    let obj = Object.assign({}, state, {
      authToken: action.response.idToken
    });
    return obj;
  }
  case 'LOGIN_FAILURE':
    return Object.assign({}, state, {
      statusError: action.error
    });
  case 'LOGIN_REQUEST':
    return state;
  default:
    return state;
  }
};

export default auth;
