import * as ACTIONS from '../actionTypes';

function itemsReducer(state = false, action) {
  switch (action.type) {
    case ACTIONS.HACKER_COMMENTS_FETCH_REQUEST:
    case ACTIONS.HACKER_NEWS_FETCH_REQUEST:
    case ACTIONS.HACKER_USER_FETCH_REQUEST:
      return true;
    case ACTIONS.HACKER_COMMENTS_FETCH_SUCCESS:
    case ACTIONS.HACKER_COMMENTS_FETCH_FAILURE:
    case ACTIONS.HACKER_NEWS_FETCH_SUCCESS:
    case ACTIONS.HACKER_NEWS_FETCH_FAILURE:
    case ACTIONS.HACKER_USER_FETCH_SUCCESS:
    case ACTIONS.HACKER_USER_FETCH_FAILURE:
      return false;
    default:
      return state;
  }
}

export default itemsReducer;
