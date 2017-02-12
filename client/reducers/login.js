import {
  SET_LOGIN_STATE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from 'actions';

import {CALL_API} from '../middleware/api';

const initialState = {
  isFetching: false,
  errors: {},
  data: {
    identifier: '',
    password: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        errors: {},
        isFetching: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        errors: action.error,
        isFetching: false
      };

      // ----------------------------------------------------------------
    case SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload
      };
      // ----------------------------------------------------------------
    default:
      return state;
  }
}
