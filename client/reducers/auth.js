import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';
import {
  SET_LOGIN_STATE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_CURRENT_USER
} from 'actions';

const initialState = {
  user: null,
  isFetching: false,
  isAuthenticated: false,
  statusText: null,
  errors: {},
  data: {
    identifier: '',
    password: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
      // ----------------------------------------------------------------
    case LOGIN_REQUEST:
      return {
        ...state,
        statusText: null,
        errors: {},
        isFetching: true
      }
    case LOGIN_SUCCESS: {
      const {token} = action.response;
      const user = jwt.decode(token);
      return {
        ...state,
        isFetching: false,
        isAuthenticated: !isEmpty(user),
        user,
        statusText: 'You have been successfully logged in.'
      }
    }
    case LOGIN_FAILURE:
      return {
        ...state,
        errors: action.error,
        isFetching: false,
        user: null,
        statusText: `Authentication Error: ${action.type}`
      };
      // ----------------------------------------------------------------
    case SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload
      };
      // ----------------------------------------------------------------
    case SET_CURRENT_USER: {
      const {token} = action;
      const user = jwt.decode(token);

      return {
        ...state,
        isFetching: false,
        isAuthenticated: !isEmpty(user),
        user,
        statusText: 'You have been successfully logged in.'
      }
    }
      // ----------------------------------------------------------------
    default:
      return state;

  }
}
