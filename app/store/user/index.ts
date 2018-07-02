import { handleActions } from 'redux-actions';

import {
  HACKER_USER_FETCH_SUCCESS,
} from 'store/actionTypes';
import {
  Actions,
} from 'store/actions';

export interface IUserState {
  [key: string]: {
    id: string;
    createdTime: number;
    created: string;
    karma: number;
    avg: string | null;
  };
}

const initialState: IUserState = {};

export default handleActions({
  [HACKER_USER_FETCH_SUCCESS]: (state: IUserState, action: Actions) => ({
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
