import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import AppShell from 'components/AppShell';
import configureStore from 'store/configureStore';

function render(location, staticContext) {
  const store = configureStore();

  const markup = ReactDOMServer.renderToString(
    <StaticRouter context={staticContext} location={location}>
      <Provider store={store}>
        <AppShell />
      </Provider>
    </StaticRouter>,
  );

  return {
    markup,
    state: store.getState(),
  };
}

export default render;
