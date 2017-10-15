import Immutable from 'immutable';

import * as ACTIONS from 'store/actionTypes';
import posts from 'store/comments/posts';

describe('comments.posts reducer', () => {
  it('should return the initial state', () => {
    expect(posts(undefined, {})).toEqual(Immutable.Map());
  });

  it('should handle HACKER_COMMENTS_FETCH_SUCCESS', () => {
    expect(posts(undefined, {
      type: ACTIONS.HACKER_COMMENTS_FETCH_SUCCESS,
      payload: {
        comments_count: 40,
        id: 3338485,
        title: 'Lamest bug we ever encountered',
        points: 76,
        user: 'exch',
        time: 1323550709,
        time_ago: '6 years ago',
        type: 'link',
        url: 'http://joostdevblog.blogspot.com/2011/12/lamest-bug-we-ever-encountered.html',
        domain: 'joostdevblog.blogspot.com',
      },
    })).toEqual(Immutable.Map(new Map([
      [3338485, Immutable.Map({
        commentsCount: 40,
        id: 3338485,
        title: 'Lamest bug we ever encountered',
        points: 76,
        user: 'exch',
        time: 1323550709,
        timeAgo: '6 years ago',
        type: 'link',
        url: 'http://joostdevblog.blogspot.com/2011/12/lamest-bug-we-ever-encountered.html',
        domain: 'joostdevblog.blogspot.com',
      })],
    ])));
  });
});
