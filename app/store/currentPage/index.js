import { handleActions } from 'redux-actions';

import {
  HACKER_NEWS_FETCH_REQUEST,
} from 'store/actionTypes';

const initialState = 1;

export default handleActions({
  [HACKER_NEWS_FETCH_REQUEST]: (state, action) => action.payload.page,
}, initialState);
