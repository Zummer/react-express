import nock from 'nock'
import 'isomorphic-fetch'
import thunk from 'redux-thunk'
import api from '../client/middleware/api'
import * as actions from '../client/actions/signupActions'
import * as types from '../client/constants'
import configureMockStore from 'redux-mock-store';
import {CALL_API} from '../client/middleware/api';

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

    const callApi = {
          endpoint: "users", 
          method: "POST", 
          payload: newUser, 
          testUrl: "http://any.com", 
          types: ["SIGNUP_REQUEST", "SIGNUP_SUCCESS", "SIGNUP_FAILURE"]
        };

    const testUrl = 'http://any.com';

    nock(testUrl)
      .post('/api/users')
      .reply(200, { success: true } )

    const expectedActions = [
      {
        status: 'SEND',
        type: 'SIGNUP_REQUEST', 
        [CALL_API]: callApi
      },
      {
        status: 'SUCCESS', 
        type: 'SIGNUP_SUCCESS', 
        response: {success:true},
        [CALL_API]: callApi
      }
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
