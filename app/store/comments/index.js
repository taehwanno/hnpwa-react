import { combineReducers } from 'redux';

import byId from './byId';
import posts from './posts';

const commentsReducer = combineReducers({
  byId,
  posts,
});

export default commentsReducer;
