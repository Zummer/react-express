import {ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE} from '../constants';

export default (state = [], action = {}) => {
  switch(action.type) {
    case DELETE_FLASH_MESSAGE: 
      return state.filter(flash => flash.id !== action.payload);
    case ADD_FLASH_MESSAGE: 
      return [
        ...state, 
        action.payload
      ];    
    default:
      return state;
  }
}
