import Immutable from 'immutable';
import * as ACTIONS from '../actionTypes';

const initialState = Immutable.Map();

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.HACKER_COMMENTS_FETCH_SUCCESS:
      return state.set(action.payload.id, Immutable.Map({
        commentsCount: action.payload.comments_count,
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
    default:
      return state;
  }
}

export default postsReducer;
