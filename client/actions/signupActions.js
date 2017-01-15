import {CALL_API} from '../middleware/api'

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../constants';

const fetchSignup = userData => ({
  [CALL_API]: {
    types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE],
    endpoint: 'users',
    method: 'POST',
    payload: userData
  }

});

export const userSignupRequest = userData =>
  (dispatch, getState) =>
    dispatch(fetchSignup(userData));


