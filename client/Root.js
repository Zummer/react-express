import React from 'react';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import api from './middleware/api';
import {createStore, applyMiddleware} from 'redux';


const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk, api)
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
