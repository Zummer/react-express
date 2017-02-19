import {CALL_API} from '../middleware/api';

export const SET_EVENT_STATE = 'SET_EVENT_STATE';

export const setEventState = data => (dispatch, getState) => {

  const state = getState().event;

  dispatch({
    type: SET_EVENT_STATE,
    payload: {
      ...state,
      ...data
    }

  })
};

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const createEvent = data => async (dispatch, getState) => {
  try {
    const action = await dispatch({
      [CALL_API]: {
        types:  [CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE],
        method: 'POST',
        endpoint: 'events',
        payload: data
      }
    });

    if(action.type == CREATE_EVENT_SUCCESS && action.response) {

    }

    return action;

  } catch (error) {
    console.log(error);
  }

}

