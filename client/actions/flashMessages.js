import {ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE} from '../constants';

export const addFlashMessage = message => ({
  type: ADD_FLASH_MESSAGE,
  payload: {
    id: message.id,
    type: message.type,
    text: message.text
  }
});

export const deleteFlashMessage = id => ({
  type: DELETE_FLASH_MESSAGE,
  payload: id
});
