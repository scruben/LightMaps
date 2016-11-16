import { CALL_API } from '../middlewares/apiClient';

export const loginAction = (username, password) => ({
  [CALL_API]: {
    type:'LOGIN',
    endpoint:'/login',
    username,
    password
  }
});

export const setIdData = (tokenId, username, role) => ({
  type: 'SET_IDDATA',
  tokenId,
  username,
  role
});
