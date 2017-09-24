import Immutable from 'immutable';
import * as ACTIONS from '../actionTypes';

const initialState = Immutable.fromJS({
  ask: {},
  jobs: {},
  newest: {},
  news: {},
  show: {},
});

function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.HACKER_NEWS_FETCH_SUCCESS:
      return state.setIn(
        [action.payload.type, action.payload.page],
        Immutable.List(action.payload.data.map(v => v.id)),
      );
    default:
      return state;
  }
}

export default itemsReducer;
