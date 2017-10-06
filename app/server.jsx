import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-router-server';

import AppShell from 'components/AppShell';
import configureStore from 'store/configureStore';

function render(location, staticContext) {
  const store = configureStore();

  return renderToString(
    <StaticRouter context={staticContext} location={location}>
      <Provider store={store}>
        <AppShell />
      </Provider>
    </StaticRouter>,
  ).then(({ html }) => ({ markup: html, state: store.getState() }));
}

export default render;
