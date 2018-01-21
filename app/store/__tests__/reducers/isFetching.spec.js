import * as ACTIONS from 'store/actionTypes';
import isFetching from 'store/isFetching';

describe('isFetching reducer', () => {
  it('should return the initial state', () => {
    expect(isFetching(undefined, {})).toBe(false);
  });

  it('should handle HACKER_COMMENTS_FETCH_REQUEST', () => {
    expect(isFetching(false, {
      type: ACTIONS.HACKER_COMMENTS_FETCH_REQUEST,
    })).toBe(true);
  });

  it('should handle HACKER_COMMENTS_FETCH_SUCCESS', () => {
    expect(isFetching(true, {
      type: ACTIONS.HACKER_COMMENTS_FETCH_SUCCESS,
    })).toBe(false);
  });

  it('should handle HACKER_COMMENTS_FETCH_FAILURE', () => {
    expect(isFetching(true, {
      type: ACTIONS.HACKER_COMMENTS_FETCH_FAILURE,
    })).toBe(false);
  });

  it('should handle HACKER_NEWS_FETCH_REQUEST', () => {
    expect(isFetching(false, {
      type: ACTIONS.HACKER_NEWS_FETCH_REQUEST,
    })).toBe(true);
  });

  it('should handle HACKER_NEWS_FETCH_SUCCESS', () => {
    expect(isFetching(true, {
      type: ACTIONS.HACKER_NEWS_FETCH_SUCCESS,
    })).toBe(false);
  });

  it('should handle HACKER_NEWS_FETCH_FAILURE', () => {
    expect(isFetching(true, {
      type: ACTIONS.HACKER_NEWS_FETCH_FAILURE,
    })).toBe(false);
  });

  it('should handle HACKER_USER_FETCH_REQUEST', () => {
    expect(isFetching(false, {
      type: ACTIONS.HACKER_USER_FETCH_REQUEST,
    })).toBe(true);
  });

  it('should handle HACKER_USER_FETCH_SUCCESS', () => {
    expect(isFetching(true, {
      type: ACTIONS.HACKER_USER_FETCH_SUCCESS,
    })).toBe(false);
  });

  it('should handle HACKER_USER_FETCH_FAILURE', () => {
    expect(isFetching(true, {
      type: ACTIONS.HACKER_USER_FETCH_FAILURE,
    })).toBe(false);
  });
});
