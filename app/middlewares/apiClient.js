const API_ROOT = 'http://10.0.2.2:3000';

const base64 = require('base-64');

const callApi = (endpoint, method, headers, data) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return new Promise((resolve, reject) => {
    fetch(fullUrl, {
      method,
      headers
    })
    .then(response => {
      response.json()
      .then(json => {
        if (Array.isArray(json)) return resolve([].concat(json));
        if (!response.ok) return reject(json);
        return resolve(Object.assign({}, json));
      });
    });
  });
};

export const CALL_API = 'Call API';

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') return next(action);

  let { endpoint, method, headers, data } = callAPI;
  const { type, username, password } = callAPI;

  method = method || 'GET';
  headers = headers || new Headers();

  if (username && password) {
    headers.append('Authorization',`Basic ${base64.encode(username+':'+password)}`);
  }

  // if (store.auth.authToken && store.auth.authToken !== '') {
  //   headers.append('Authorization', `Bearer ${store.auth.authToken}`);
  // }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (typeof type !== 'string') {
    throw new Error('Expected action type to be a string.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  next(actionWith({type: `${type}_REQUEST`}));

  return callApi(endpoint, method, headers, data)
  .then(
    response => {
      next(
        actionWith(
          {
            response,
            type: `${type}_SUCCESS`
          }
        )
      );
    },
    error => {
      next(
        actionWith(
          {
            error,
            type: `${type}_FAILURE`
          }
        )
      );
    }
  );
};
