import Immutable from 'immutable';
import * as ACTIONS from '../actionTypes';

const initialState = Immutable.Map();

function byIdReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case ACTIONS.HACKER_NEWS_FETCH_SUCCESS:
      action.payload.data.forEach((v) => {
        newState = newState.set(v.id, Immutable.Map(v));
      });
      return newState;
    default:
      return state;
  }
}

export default byIdReducer;
