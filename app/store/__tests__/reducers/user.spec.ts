import * as ACTIONS from 'store/actionTypes';
import user from 'store/user';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(user(undefined, { type: 'DUMMY_ACTION' })).toEqual({});
  });

  it('should handle HACKER_USER_FETCH_SUCCESS', () => {
    expect(user(undefined, {
      type: ACTIONS.HACKER_USER_FETCH_SUCCESS,
      payload: {
        id: 'taehwanno',
        created_time: 1284124124,
        created: '3 years ago',
        karma: 0,
        avg: null,
        about: null,
      },
    })).toEqual({
      taehwanno: {
        id: 'taehwanno',
        createdTime: 1284124124,
        created: '3 years ago',
        karma: 0,
        avg: null,
        about: null,
      },
    });
  });
});
