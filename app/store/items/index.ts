import { handleActions } from 'redux-actions';

import {
  HACKER_NEWS_FETCH_SUCCESS,
} from 'store/actionTypes';
import {
  Actions,
} from 'store/actions';

interface IItemsSpecificState {
  [key: number]: number[];
}

export interface IItemsState {
  ask: IItemsSpecificState;
  jobs: IItemsSpecificState;
  newest: IItemsSpecificState;
  news: IItemsSpecificState;
  show: IItemsSpecificState;
}

const initialState: IItemsState = {
  ask: {},
  jobs: {},
  newest: {},
  news: {},
  show: {},
};

export default handleActions({
  [HACKER_NEWS_FETCH_SUCCESS]: (state: IItemsState, action: Actions) => ({
    ...state,
    [action.payload.type]: {
      ...state[action.payload.type],
      [action.payload.page]: action.payload.data.map(v => v.id),
    },
  }),
}, initialState);
