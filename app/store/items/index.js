import * as ACTIONS from '../actionTypes';

const initialState = {
  ask: {},
  jobs: {},
  newest: {},
  news: {},
  show: {},
};

function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.HACKER_NEWS_FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          [action.payload.page]: action.payload.data.map(v => v.id),
        },
      };
    default:
      return state;
  }
}

export default itemsReducer;
