import Immutable from 'immutable';
import * as ACTIONS from '../actionTypes';

const initialState = Immutable.Map();

function commentsReducer(state = initialState, action) {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case ACTIONS.HACKER_COMMENTS_FETCH_SUCCESS:
      let newState = state;
      action.payload.comments.forEach((comment) => {
        newState = newState.set(comment.id, Immutable.Map({
          ...comment,
          comments: Immutable.List(comment.comments),
        }));
      });

      return newState.set(action.payload.id, Immutable.Map({
        ...action.payload,
        commentsCount: action.payload.comments_count,
        comments: Immutable.List(
          action.payload.comments
            .filter(v => v.parent === action.payload.id)
            .map(v => v.id),
        ),
      }));
    default:
      return state;
  }
}

export default commentsReducer;
