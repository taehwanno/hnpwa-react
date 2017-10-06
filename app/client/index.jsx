import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies

import configureStore from '../store/configureStore';
import { history, middleware as routerMiddleware } from '../store/history';

import '../scss/style.scss';

const store = configureStore({ routerMiddleware });

const MOUNT_NODE = document.getElementById('root');

const render = () => {
  // eslint-disable-next-line global-require
  const Root = require('./Root').default;

  ReactDOM.render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    MOUNT_NODE,
  );
};

if (__DEV__) {
  if (module.hot) {
    module.hot.accept('./Root', () => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  }
}

render();
