import {ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE} from '../constants';
import shortid from 'shortid';

export const addFlashMessage = message => {
  const payload = {
    ...message, 
    ...{ id: shortid() }
  };

  return {
    type: ADD_FLASH_MESSAGE,
    payload
  };
}

export const deleteFlashMessage = id => ({
  type: DELETE_FLASH_MESSAGE,
  payload: id
});
