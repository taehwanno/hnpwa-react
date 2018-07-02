import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import byId, { IByIdState } from './byId';
import comments, { ICommentsState } from './comments';
import currentPage, { CurrentPageState } from './currentPage';
import isFetching, { IsFetchingState } from './isFetching';
import items, { IItemsState } from './items';
import user, { IUserState } from './user';

export interface IRootState {
  byId: IByIdState;
  comments: ICommentsState;
  currentPage: CurrentPageState;
  isFetching: IsFetchingState;
  items: IItemsState;
  user: IUserState;
}

export default combineReducers({
  byId,
  comments,
  currentPage,
  isFetching,
  items,
  user,
  router: routerReducer,
});
