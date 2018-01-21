import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import byId from './byId';
import comments from './comments';
import currentPage from './currentPage';
import isFetching from './isFetching';
import items from './items';
import user from './user';

const rootReducer = combineReducers({
  byId,
  comments,
  currentPage,
  isFetching,
  items,
  user,
  router: routerReducer,
});

export default rootReducer;
