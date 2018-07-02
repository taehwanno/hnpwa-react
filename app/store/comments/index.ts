import { combineReducers } from 'redux';

import byId, { ICommentsByIdState } from './byId';
import posts, { ICommentsPostsState } from './posts';

export interface ICommentsState {
  byId: ICommentsByIdState;
  posts: ICommentsPostsState;
}

const commentsReducer = combineReducers({
  byId,
  posts,
});

export default commentsReducer;
