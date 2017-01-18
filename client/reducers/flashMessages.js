import {ADD_FLASH_MESSAGE} from '../constants';

export default (state = [], action = {}) => {
  switch(action.type) {
    case ADD_FLASH_MESSAGE: 
      return [
        ...state, 
        action.payload
      ];    
    default:
      return state;
  }
}
