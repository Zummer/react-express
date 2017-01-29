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

import {
  USER_EXISTS_REQUEST,
  USER_EXISTS_SUCCESS,
  USER_EXISTS_FAILURE
} from '../constants';

export const isUserExists = (identifier) => 
  dispatch({
    [CALL_API]: {
      types: [USER_EXISTS_REQUEST, USER_EXISTS_SUCCESS, USER_EXISTS_FAILURE],
      method: 'GET',
      endpoint: `users/${identifier}`
    }
  })
