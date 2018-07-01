import * as ACTIONS from '../actionTypes';

const initialState = {};

function byIdReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.HACKER_NEWS_FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload.data.reduce((newState, v) => {
          // eslint-disable-next-line no-param-reassign
          newState[v.id] = v;
          return newState;
        }, {}),
      };
    default:
      return state;
  }
}

export default byIdReducer;
