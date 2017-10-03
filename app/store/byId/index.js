import Immutable from 'immutable';
import * as ACTIONS from '../actionTypes';

const initialState = Immutable.Map();

function byIdReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case ACTIONS.HACKER_COMMENTS_FETCH_SUCCESS:
      return state.set(action.payload.id, Immutable.Map({
        id: action.payload.id,
        title: action.payload.title,
        points: action.payload.points,
        user: action.payload.user,
        time: action.payload.time,
        timeAgo: action.payload.time_ago,
        type: action.payload.type,
        url: action.payload.url,
        domain: action.payload.domain,
      }));
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
