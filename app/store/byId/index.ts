import { handleActions } from 'redux-actions';

import {
  HACKER_NEWS_FETCH_SUCCESS,
} from 'store/actionTypes';
import {
  Actions,
} from 'store/actions';

export interface IByIdState {
  [key: number]: {
    id: number;
    title: string;
    points: number;
    user: string;
    time: number;
    type: string;
    url: string;
    commentsCount: number;
    timeAgo: string;
  };
}
const initialState: IByIdState = {};

export default handleActions({
  [HACKER_NEWS_FETCH_SUCCESS]: (state: IByIdState, action: Actions) => ({
    ...state,
    ...action.payload.data.reduce((newState, v) => {
      // eslint-disable-next-line no-param-reassign
      newState[v.id] = v;
      return newState;
    }, {}),
  }),
}, initialState);
