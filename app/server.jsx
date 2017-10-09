import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { renderToString } from 'react-router-server';

import AppShell from 'components/AppShell';
import configureStore from 'store/configureStore';

function render(location) {
  const history = createMemoryHistory({ initialEntries: [location] });
  const store = configureStore({ routerMiddleware: routerMiddleware(history) });

  return renderToString((
    <Provider store={store}>
      <ConnectedRouter location={location} history={history}>
        <AppShell />
      </ConnectedRouter>
    </Provider>
  )).then(({ html }) => ({ markup: html, state: store.getState() }));
}

export default render;
