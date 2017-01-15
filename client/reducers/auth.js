import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../constants';

const initialState = {
  isFetching: false,
  errors: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
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
        isFetching: false,
        errors: action.payload
      }
    default:
      return state;
  }
}
