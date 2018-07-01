import { handleActions } from 'redux-actions';

import {
  HACKER_USER_FETCH_SUCCESS,
} from 'store/actionTypes';

const initialState = {};

export default handleActions({
  [HACKER_USER_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.id]: {
      id: action.payload.id,
      createdTime: action.payload.created_time,
      created: action.payload.created,
      karma: action.payload.karma,
      avg: action.payload.avg,
      about: action.payload.about,
    },
  }),
}, initialState);
