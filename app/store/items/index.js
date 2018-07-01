import { handleActions } from 'redux-actions';

import {
  HACKER_NEWS_FETCH_SUCCESS,
} from 'store/actionTypes';

const initialState = {
  ask: {},
  jobs: {},
  newest: {},
  news: {},
  show: {},
};

export default handleActions({
  [HACKER_NEWS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.type]: {
      ...state[action.payload.type],
      [action.payload.page]: action.payload.data.map(v => v.id),
    },
  }),
}, initialState);
