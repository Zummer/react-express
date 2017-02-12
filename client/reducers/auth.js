import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  USER_EXISTS_REQUEST,
  USER_EXISTS_SUCCESS,
  USER_EXISTS_FAILURE,
  SET_SIGNUP_STATE
} from '../actions/signupActions';

import {CALL_API} from '../middleware/api';

const initialState = {
  isFetching: false,
  errors: {},
  data: {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    timezone: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
      // ----------------------------------------------------------------
    case USER_EXISTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case USER_EXISTS_SUCCESS:
      const errors = {...state.errors};

      if (action.response && action.response.user) {
        const field = action[CALL_API].field;

        let message;

        switch (field) {
          case 'username':
            message = 'Уже есть пользователь с таким именем';
            break;
          case 'email':
            message = 'Уже есть пользователь с такой почтой';
            break;
          default:
            message = `Пользователь с таким ${field} уже существует`;

        }

        errors[field] = message;
      }

      return {
        ...state,
        isFetching: false,
        errors
      }
    case USER_EXISTS_FAILURE:
      return {
        isFetching: false,
        errors: action.error
      }
      // ----------------------------------------------------------------
    case SIGNUP_REQUEST:
      return {
        ...state,
        errors: {},
        isFetching: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        errors: action.error,
        isFetching: false
      };
      // ----------------------------------------------------------------
    case SET_SIGNUP_STATE:
      return {
        ...state,
        ...action.payload
      };
      // ----------------------------------------------------------------
    default:
      return state;
  }
}
