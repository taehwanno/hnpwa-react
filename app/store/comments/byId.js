import { handleActions } from 'redux-actions';

import {
  HACKER_COMMENTS_FETCH_SUCCESS,
} from 'store/actionTypes';

const initialState = {};

export default handleActions({
  [HACKER_COMMENTS_FETCH_SUCCESS]: (state, action) => {
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
