import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const configureStore = ({ routerMiddleware = null, preloadedState = Immutable.Map() } = {}) => {
  const middlewares = [thunk];

  if (routerMiddleware) {
    middlewares.push(routerMiddleware);
  }

  let enhancer = applyMiddleware(...middlewares);

  if (__DEV__) {
    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancer(applyMiddleware(...middlewares));
  }

  const store = createStore(rootReducer, preloadedState, enhancer);

  if (__DEV__) {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        // eslint-disable-next-line global-require
        const nextRootReducer = require('./rootReducer').default;
        store.replaceReducer(nextRootReducer);
      });
    }
  }

  return store;
};

export default configureStore;
