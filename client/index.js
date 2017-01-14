import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

const rootEl = document.getElementById('app');

const renderApp = (Root) => {
  ReactDOM.render(
    <AppContainer>
      <Root />
    </AppContainer>,
    rootEl

  )

};

renderApp(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const newRoot = require('./Root').default;
    renderApp(newRoot);
  });
}
