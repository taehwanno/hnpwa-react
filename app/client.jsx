import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import transit from 'transit-immutable-js';

import configureStore from 'store/configureStore';
import { history, middleware as routerMiddleware } from 'store/history';

import './scss/style.scss';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = configureStore({
  routerMiddleware,
  preloadedState: preloadedState ? transit.fromJSON(preloadedState) : undefined,
});

const MOUNT_NODE = document.getElementById('root');

const render = () => {
  // eslint-disable-next-line global-require
  const AppShell = require('components/AppShell').default;

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppShell />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    MOUNT_NODE,
  );
};

if (__DEV__) {
  if (module.hot) {
    module.hot.accept('components/AppShell', () => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  }
}

render();
