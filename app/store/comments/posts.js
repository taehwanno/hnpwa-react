import { handleActions } from 'redux-actions';

import {
  HACKER_COMMENTS_FETCH_SUCCESS,
} from 'store/actionTypes';

const initialState = {};

export default handleActions({
  [HACKER_COMMENTS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.id]: {
      commentsCount: action.payload.comments_count,
      id: action.payload.id,
      title: action.payload.title,
      points: action.payload.points,
      user: action.payload.user,
      time: action.payload.time,
      timeAgo: action.payload.time_ago,
      type: action.payload.type,
      url: action.payload.url,
      domain: action.payload.domain,
    },
  }),
}, initialState);
