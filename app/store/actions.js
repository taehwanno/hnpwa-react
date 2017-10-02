import * as ACTIONS from './actionTypes';

export function hackerNewsFetchRequest(type, page) {
  return {
    type: ACTIONS.HACKER_NEWS_FETCH_REQUEST,
    payload: {
      type,
      page,
    },
  };
}

export function hackerNewsFetchSuccess(type, page, data) {
  return {
    type: ACTIONS.HACKER_NEWS_FETCH_SUCCESS,
    payload: {
      type,
      page,
      data,
    },
  };
}

export function hackerNewsFetchFailure(error) {
  return {
    type: ACTIONS.HACKER_NEWS_FETCH_FAILURE,
    payload: error,
    error: true,
  };
}

export function fetchHackerNews(type, page) {
  return function thunk(dispatch) {
    dispatch(hackerNewsFetchRequest(type, page));

    return fetch(`https://node-hnapi.herokuapp.com/${type}?page=${page}`)
      .then(response =>
        response.json()
          .then(data => data.map((v) => {
            const { comments_count, time_ago, ...rest } = v;
            return { ...rest, commentsCount: comments_count, timeAgo: time_ago };
          }))
          .then(data => dispatch(hackerNewsFetchSuccess(type, page, data))),
      )
      .catch(error => dispatch(hackerNewsFetchFailure(error)));
  };
}

export function hackerUserFetchRequest(id) {
  return {
    type: ACTIONS.HACKER_USER_FETCH_REQUEST,
    payload: id,
  };
}

export function hackerUserFetchSuccess(data) {
  return {
    type: ACTIONS.HACKER_USER_FETCH_SUCCESS,
    payload: data,
  };
}

export function hackerUserFetchFailure(error) {
  return {
    type: ACTIONS.HACKER_USER_FETCH_FAILURE,
    payload: error,
    error: true,
  };
}

export function fetchHackerUser(id) {
  return function thunk(dispatch) {
    dispatch(hackerUserFetchRequest(id));

    return fetch(`https://node-hnapi.herokuapp.com/user/${id}`)
      .then(response => response.json().then(data => dispatch(hackerUserFetchSuccess(data))))
      .catch(error => dispatch(hackerUserFetchFailure(error)));
  };
}
