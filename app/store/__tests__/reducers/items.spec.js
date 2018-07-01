import * as ACTIONS from 'store/actionTypes';
import items from 'store/items';

describe('items reducer', () => {
  it('should return the initial state', () => {
    expect(items(undefined, {})).toEqual({
      ask: {},
      jobs: {},
      newest: {},
      news: {},
      show: {},
    });
  });

  it('should handle HACKER_NEWS_FETCH_SUCCESS', () => {
    expect(items(undefined, {
      type: ACTIONS.HACKER_NEWS_FETCH_SUCCESS,
      payload: {
        type: 'ask',
        page: 1,
        data: [
          {
            id: 10,
          },
        ],
      },
    })).toEqual({
      ask: {
        1: [10],
      },
      jobs: {},
      newest: {},
      news: {},
      show: {},
    });

    expect(items({
      ask: {
        1: [10],
      },
      jobs: {},
      newest: {},
      news: {},
      show: {},
    }, {
      type: ACTIONS.HACKER_NEWS_FETCH_SUCCESS,
      payload: {
        type: 'jobs',
        page: 1,
        data: [
          {
            id: 11,
          },
        ],
      },
    })).toEqual({
      ask: {
        1: [10],
      },
      jobs: {
        1: [11],
      },
      newest: {},
      news: {},
      show: {},
    });
  });
});
