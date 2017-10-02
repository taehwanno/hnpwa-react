import Immutable from 'immutable';
import * as ACTIONS from '../actionTypes';

const initialState = Immutable.Map();

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.HACKER_USER_FETCH_SUCCESS:
      return state.set(action.payload.id, Immutable.Map({
        id: action.payload.id,
        createdTime: action.payload.created_time,
        created: action.payload.created,
        karma: action.payload.karma,
        avg: action.payload.avg,
        about: action.payload.about,
      }));
    default:
      return state;
  }
}

export default userReducer;
