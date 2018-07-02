import { handleActions } from 'redux-actions';

import {
  HACKER_COMMENTS_FETCH_REQUEST,
  HACKER_COMMENTS_FETCH_SUCCESS,
  HACKER_COMMENTS_FETCH_FAILURE,
  HACKER_NEWS_FETCH_REQUEST,
  HACKER_NEWS_FETCH_SUCCESS,
  HACKER_NEWS_FETCH_FAILURE,
  HACKER_USER_FETCH_REQUEST,
  HACKER_USER_FETCH_SUCCESS,
  HACKER_USER_FETCH_FAILURE,
} from 'store/actionTypes';

export type IsFetchingState = boolean;

const initialState = false;

export default handleActions({
  [HACKER_COMMENTS_FETCH_REQUEST]: () => true,
  [HACKER_COMMENTS_FETCH_SUCCESS]: () => false,
  [HACKER_COMMENTS_FETCH_FAILURE]: () => false,
  [HACKER_NEWS_FETCH_REQUEST]: () => true,
  [HACKER_NEWS_FETCH_SUCCESS]: () => false,
  [HACKER_NEWS_FETCH_FAILURE]: () => false,
  [HACKER_USER_FETCH_REQUEST]: () => true,
  [HACKER_USER_FETCH_SUCCESS]: () => false,
  [HACKER_USER_FETCH_FAILURE]: () => false,
}, initialState);
