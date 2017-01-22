import * as actions from '../client/actions'
import * as types from '../client/constants'
import shortid from 'shortid';

describe('actions', () => {
  it('should create an action to add a flash', () => {
    const payload = {
      id: shortid(),
      type: 'success',
      text: 'Flash!'
    };

    const expectedAction = {
      type: types.ADD_FLASH_MESSAGE,
      payload 
    };
    
    expect(actions.addFlashMessage(payload)).toEqual(expectedAction)

  })

})
