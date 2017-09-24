import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import byId from './byId';
import currentPage from './currentPage';
import items from './items';

const rootReducer = combineReducers({
  byId,
  currentPage,
  items,
  router: routerReducer,
});

export default rootReducer;
