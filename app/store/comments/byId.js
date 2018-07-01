import * as ACTIONS from '../actionTypes';

const initialState = {};

function byId(state = initialState, action) {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case ACTIONS.HACKER_COMMENTS_FETCH_SUCCESS:
      const newState = { ...state };
      action.payload.comments.forEach((comment) => {
        newState[comment.id] = {
          ...comment,
          comments: comment.comments,
        };
      });

      newState[action.payload.id] = {
        ...action.payload,
        commentsCount: action.payload.comments_count,
        comments: action.payload.comments
          .filter(v => v.parent === action.payload.id)
          .map(v => v.id),
      };

      return newState;
    default:
      return state;
  }
}

export default byId;
