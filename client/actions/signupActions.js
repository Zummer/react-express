import {CALL_API} from '../middleware/api';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

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


export const USER_EXISTS_REQUEST = 'USER_EXISTS_REQUEST';
export const USER_EXISTS_SUCCESS = 'USER_EXISTS_SUCCESS';
export const USER_EXISTS_FAILURE = 'USER_EXISTS_FAILURE';

export const checkUserExists = (field, identifier) => (dispatch, getState) =>
  dispatch({
    [CALL_API]: {
      types: [USER_EXISTS_REQUEST, USER_EXISTS_SUCCESS, USER_EXISTS_FAILURE],
      method: 'GET',
      endpoint: `users/${identifier}`,
      field,
      queryParams: {
        field
      }
    }
  })

export const SET_SIGNUP_STATE = 'SET_SIGNUP_STATE';

export const setSignUpState = data => (dispatch, getState) => {

  const state = getState().signup;

  dispatch({
    type: SET_SIGNUP_STATE,
    payload: {
      ...state,
      ...data
    }
  })
};
