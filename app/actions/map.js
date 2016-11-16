import { CALL_API } from '../middlewares/apiClient';

export const getPanels = (region) => ({
  [CALL_API]: {
    type:'GET_PANELS',
    endpoint:'/panels',
    method: 'GET',
    region
  }
});
