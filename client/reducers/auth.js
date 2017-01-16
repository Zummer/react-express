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
        errors: action.payload,
        isFetching: false
      }
    default:
      return state;
  }
}
