import {CALL_API} from '../middleware/api';

export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';

export const setLoginState = data => (dispatch, getState) => {

  const state = getState().auth;

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

export const login = data => async (dispatch, getState) => {
  try {
    const action = await dispatch({
      [CALL_API]: {
        types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
        method: 'POST',
        endpoint: 'auth',
        payload: data
      }
    });

    if(action.type == LOGIN_SUCCESS && action.response) {
      const token = action.response.token;
      localStorage.setItem('jwtToken', token);
      dispatch(setCurrentUser(token));
    }

    return action;

  } catch (error) {
    console.log(error);
  }

}

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch(setCurrentUser(null));
};

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = token => ({
  type: SET_CURRENT_USER,
  token
});

