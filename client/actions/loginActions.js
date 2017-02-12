import {CALL_API} from '../middleware/api';

export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';

export const setLoginState = data => (dispatch, getState) => {

  const state = getState().login;

  dispatch({
    type: SET_LOGIN_STATE,
    payload: {
      ...state,
      ...data
    }

  })
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (data) => (dispatch, getState) => {
  dispatch({
    [CALL_API]: {
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      method: 'POST',
      endpoint: 'login',
      payload: data
    }
  })
}
