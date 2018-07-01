import * as ACTIONS from 'store/actionTypes';
import byId from 'store/byId';

describe('byId reducer', () => {
  it('should return the initial state', () => {
    expect(byId(undefined, {})).toEqual({});
  });

  it('should handle HACKER_NEWS_FETCH_SUCCESS', () => {
    expect(byId({}, {
      type: ACTIONS.HACKER_NEWS_FETCH_SUCCESS,
      payload: {
        data: [
          {
            id: 1,
            title: 'Interview with Mr. Money Mustache',
          },
        ],
      },
    })).toEqual({
      1: {
        id: 1,
        title: 'Interview with Mr. Money Mustache',
      },
    });

    expect(byId({
      1: {
        id: 1,
        title: 'Interview with Mr. Money Mustache',
      },
    }, {
      type: ACTIONS.HACKER_NEWS_FETCH_SUCCESS,
      payload: {
        data: [
          {
            id: 2,
            title: 'React with TypeScript',
          },
        ],
      },
    })).toEqual({
      1: {
        id: 1,
        title: 'Interview with Mr. Money Mustache',
      },
      2: {
        id: 2,
        title: 'React with TypeScript',
      },
    });
  });
});
