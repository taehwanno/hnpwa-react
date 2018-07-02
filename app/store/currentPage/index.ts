import { handleActions } from 'redux-actions';

import {
  HACKER_NEWS_FETCH_REQUEST,
} from 'store/actionTypes';
import {
  Actions,
} from 'store/actions';

export type CurrentPageState = number;

const initialState = 1;

export default handleActions({
  [HACKER_NEWS_FETCH_REQUEST]: (state: CurrentPageState, action: Actions) => action.payload.page,
}, initialState);
