import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import AppShell from 'components/AppShell';
import configureStore from 'store/configureStore';

const store = configureStore();

function render(location) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={location}>
      <Provider store={store}>
        <AppShell />
      </Provider>
    </StaticRouter>,
  );
}

export default render;
