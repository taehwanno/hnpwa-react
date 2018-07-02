import * as ACTIONS from 'store/actionTypes';
import currentPage from 'store/currentPage';

describe('currentPage reducer', () => {
  it('should return the initial state', () => {
    expect(currentPage(undefined, { type: 'DUMMY_ACTION' })).toBe(1);
  });

  it('should handle HACKER_NEWS_FETCH_REQUEST', () => {
    expect(currentPage(1, {
      type: ACTIONS.HACKER_NEWS_FETCH_REQUEST,
      payload: {
        page: 2,
      },
    })).toBe(2);
  });
});
