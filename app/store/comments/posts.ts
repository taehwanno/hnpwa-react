import { handleActions } from 'redux-actions';

import {
  HACKER_COMMENTS_FETCH_SUCCESS,
} from 'store/actionTypes';
import {
  Actions,
} from 'store/actions';

export interface ICommentsPostsState {
  [key: number]: {
    commentsCount: number;
    id: number;
    title: string;
    points: number;
    user: string;
    time: string;
    timeAgo: string;
    type: string;
    url: string;
    domain: string;
  };
}

const initialState: ICommentsPostsState = {};

export default handleActions({
  [HACKER_COMMENTS_FETCH_SUCCESS]: (state: ICommentsPostsState, action: Actions) => ({
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
