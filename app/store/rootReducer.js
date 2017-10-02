import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import byId from './byId';
import currentPage from './currentPage';
import items from './items';
import user from './user';

const rootReducer = combineReducers({
  byId,
  currentPage,
  items,
  user,
  router: routerReducer,
});

export default rootReducer;
