import { createAction } from 'redux-actions';

import {
  HACKER_COMMENTS_FETCH_REQUEST,
  HACKER_COMMENTS_FETCH_SUCCESS,
  HACKER_COMMENTS_FETCH_FAILURE,
  HACKER_NEWS_FETCH_REQUEST,
  HACKER_NEWS_FETCH_SUCCESS,
  HACKER_NEWS_FETCH_FAILURE,
  HACKER_USER_FETCH_REQUEST,
  HACKER_USER_FETCH_SUCCESS,
  HACKER_USER_FETCH_FAILURE,
} from './actionTypes';
import flattenComment from './flattenComments';
import { ActionsUnion } from './types';

export const hackerCommentsFetchRequest = createAction<number>(HACKER_COMMENTS_FETCH_REQUEST);
export const hackerCommentsFetchSuccess = createAction<any>(HACKER_COMMENTS_FETCH_SUCCESS);
export const hackerCommentsFetchFailure = createAction<Error>(HACKER_COMMENTS_FETCH_FAILURE);

export function fetchHackerComments(id: number) {
  return function thunk(dispatch) {
    dispatch(hackerCommentsFetchRequest(id));

    return fetch(`https://node-hnapi.herokuapp.com/item/${id}`)
      .then(response =>
        response.json().then(data =>
          dispatch(
            hackerCommentsFetchSuccess({
              ...data,
              timeAgo: data.time_ago,
              comments: flattenComment(data).map(v => ({ ...v, timeAgo: v.time_ago })),
            }),
          ),
        ),
      )
      .catch(error => dispatch(hackerCommentsFetchFailure(error)));
  };
}

export const hackerNewsFetchRequest = createAction(
  HACKER_NEWS_FETCH_REQUEST,
  (type: string, page: number) => ({ type, page }),
);
export const hackerNewsFetchSuccess = createAction(
  HACKER_NEWS_FETCH_SUCCESS,
  (type: string, page: number, data: any) => ({ type, page, data }),
);
export const hackerNewsFetchFailure = createAction<Error>(HACKER_NEWS_FETCH_FAILURE);

export function fetchHackerNews(type, page) {
  return function thunk(dispatch) {
    dispatch(hackerNewsFetchRequest(type, page));

    return fetch(`https://node-hnapi.herokuapp.com/${type}?page=${page}`)
      .then(response =>
        response
          .json()
          .then(data =>
            data.map(v => {
              const { comments_count: commentsCount, time_ago: timeAgo, ...rest } = v;
              return { ...rest, commentsCount, timeAgo };
            }),
          )
          .then(data => dispatch(hackerNewsFetchSuccess(type, page, data))),
      )
      .catch(error => dispatch(hackerNewsFetchFailure(error)));
  };
}

export const hackerUserFetchRequest = createAction<string>(HACKER_USER_FETCH_REQUEST);
export const hackerUserFetchSuccess = createAction(HACKER_USER_FETCH_SUCCESS);
export const hackerUserFetchFailure = createAction<Error>(HACKER_USER_FETCH_FAILURE);

export function fetchHackerUser(id: string) {
  return function thunk(dispatch) {
    dispatch(hackerUserFetchRequest(id));

    return fetch(`https://node-hnapi.herokuapp.com/user/${id}`)
      .then(response => response.json().then(data => dispatch(hackerUserFetchSuccess(data))))
      .catch(error => dispatch(hackerUserFetchFailure(error)));
  };
}

const Actions = {
  hackerCommentsFetchRequest,
  hackerCommentsFetchSuccess,
  hackerCommentsFetchFailure,
  hackerNewsFetchRequest,
  hackerNewsFetchSuccess,
  hackerNewsFetchFailure,
  hackerUserFetchRequest,
  hackerUserFetchSuccess,
  hackerUserFetchFailure,
};

export type Actions = ActionsUnion<typeof Actions>;
