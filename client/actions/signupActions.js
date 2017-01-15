import { CALL_API, Schemas  } from '../middleware/api'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

const fetchSignup = userData => ({
  [CALL_API]: {
    types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE],
    endpoint: 'signup',
    method: 'POST',
    data: userData
  }

});

export const userSignupRequest = userData =>
  (dispatch, getState) =>
    dispatch(fetchSignup(userData));


