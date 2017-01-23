import nock from 'nock'
import 'isomorphic-fetch'
import thunk from 'redux-thunk'
import api from '../client/middleware/api'
import * as actions from '../client/actions/signupActions'
import * as types from '../client/constants'
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk, api];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates signup actions', () => {

    const newUser = {
      email: "1231@sda.ru",
      password: "123",
      passwordConfirm: "123",
      timezone: "Russia/Moskow",
      username: "123"
    }

    const testUrl = 'http://any.com';

    nock(testUrl)
      .post('/api/users')
      .reply(200, { success: true } )

    const expectedActions = [
      {type: types.SIGNUP_REQUEST},
      {type: types.SIGNUP_SUCCESS, payload: {success:true}}
    ]

    const store = mockStore({
      //isFetching: false,
      //errors: {}
    });

    store.dispatch(actions.userSignupRequest(newUser, testUrl))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
        
      })
  });

});
