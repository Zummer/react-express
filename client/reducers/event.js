import {
  SET_EVENT_STATE,
  CREATE_EVENT_REQUEST,
  CREAT_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE
} from 'actions';

const initialState = {
  data: {
    title: ''
  },
  isFetching: false,
  errors: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state;
  }
}
