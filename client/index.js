import { AppContainer  } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const rootEl = document.getElementById('app');
const renderApp = (App) => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootEl

  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    renderApp(NextApp);
  });
}



