import { handleActions } from 'redux-actions';

import {
  HACKER_COMMENTS_FETCH_SUCCESS,
} from 'store/actionTypes';
import {
  Actions,
} from 'store/actions';

export interface ICommentsByIdState {
  [key: number]: {
    id: number;
    title: string;
    points: number;
    user: string;
    time: string;
    type: string;
    url: string;
    domain: string;
    comments: number[],
    timeAgo: string;
    commentsCount: number;
  };
}
const initialState: ICommentsByIdState = {};

export default handleActions({
  [HACKER_COMMENTS_FETCH_SUCCESS]: (state: ICommentsByIdState, action: Actions) => {
    const newState = { ...state };
    action.payload.comments.forEach((comment) => {
      newState[comment.id] = {
        ...comment,
        comments: comment.comments,
      };
    });

    newState[action.payload.id] = {
      ...action.payload,
      commentsCount: action.payload.comments_count,
      comments: action.payload.comments
        .filter(v => v.parent === action.payload.id)
        .map(v => v.id),
    };

    return newState;
  },
}, initialState);
