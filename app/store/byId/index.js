import { handleActions } from 'redux-actions';

import {
  HACKER_NEWS_FETCH_SUCCESS,
} from 'store/actionTypes';

const initialState = {};

export default handleActions({
  [HACKER_NEWS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload.data.reduce((newState, v) => {
      // eslint-disable-next-line no-param-reassign
      newState[v.id] = v;
      return newState;
    }, {}),
  }),
}, initialState);
