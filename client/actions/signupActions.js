import {CALL_API} from '../middleware/api';

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../constants';

export const fetchSignup = (userData, testUrl) => ({
  [CALL_API]: {
    types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE],
    endpoint: 'users',
    method: 'POST',
    payload: userData,
    testUrl
  }

});

export const userSignupRequest = (userData, testUrl) => (dispatch, getState) =>
  dispatch(fetchSignup(userData, testUrl));
    
