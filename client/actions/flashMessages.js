import {ADD_FLASH_MESSAGE} from '../constants';

export const addFlashMessage = message => ({
  type: ADD_FLASH_MESSAGE,
  payload: message
});
