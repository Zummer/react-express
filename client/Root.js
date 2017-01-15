import React from 'react';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import api from './middleware/api';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, api ,logger())
  
  )
);

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
