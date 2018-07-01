import * as ACTIONS from '../actionTypes';

const initialState = {};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.HACKER_USER_FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          createdTime: action.payload.created_time,
          created: action.payload.created,
          karma: action.payload.karma,
          avg: action.payload.avg,
          about: action.payload.about,
        },
      };
    default:
      return state;
  }
}

export default userReducer;
