import React from 'react';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import api from './middleware/api';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import {setCurrentUser} from 'actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, api ,logger())

  )
);

const {dispatch} = store;
const authToken = localStorage.getItem('jwtToken');
if (authToken) {
  dispatch(setCurrentUser(authToken));
}

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router
          history={browserHistory}
          routes={routes}
        />
      </Provider>

    )

  }

}
