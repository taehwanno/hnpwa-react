import * as ACTIONS from '../actionTypes';

const initialState = 1;

function currentPageReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.HACKER_NEWS_FETCH_REQUEST:
      return action.payload.page;
    default:
      return state;
  }
}

export default currentPageReducer;
