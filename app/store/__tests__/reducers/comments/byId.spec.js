import Immutable from 'immutable';

import * as ACTIONS from 'store/actionTypes';
import byId from 'store/comments/byId';

describe('comments.byId reducer', () => {
  it('should return the initial state', () => {
    expect(byId(undefined, {})).toEqual(Immutable.Map());
  });

  it('should handle HACKER_COMMENTS_FETCH_SUCCESS', () => {
    expect(byId(undefined, {
      type: ACTIONS.HACKER_COMMENTS_FETCH_SUCCESS,
      payload: {
        id: 3338485,
        title: 'Lamest bug we ever encountered',
        points: 76,
        user: 'exch',
        time: 1323550709,
        time_ago: '6 years ago',
        timeAgo: '6 years ago',
        type: 'link',
        url: 'http://joostdevblog.blogspot.com/2011/12/lamest-bug-we-ever-encountered.html',
        domain: 'joostdevblog.blogspot.com',
        comments_count: 23,
        commentsCount: 23,
        comments: [
          {
            id: 3340746,
            level: 2,
            user: 'akg',
            time: 1323630681,
            time_ago: '6 years ago',
            timeAgo: '6 years ago',
            content: '<p>You\'re right. But it was after that pain-staking experience that I became fully engrossed in using unittests for all non-trivial functionality. Live and learn.',
            comments: [],
            parent: 3339842,
          },
          {
            id: 3339842,
            level: 1,
            user: 'Confusion',
            time: 1323601529,
            time_ago: '6 years ago',
            content: '<p>If I have to venture a guess, I guess you didn\'t have a comprehensive set of tests at the function/method level of the code? Having that would probably have caught the bug, because you would have written a test for correctly executing the code in that branch.',
            comments: [3340746],
            parent: 3338903,
          },
          {
            id: 3338903,
            level: 0,
            user: 'akg',
            time: 1323563056,
            time_ago: '6 years ago',
            timeAgo: '6 years ago',
            content: '<p>Reminds me of the time I had written a physical simulation engine back in grad school and there was a "minus" sign error. Of course, the error was rare enough that we didn\'t notice it until after the code was used in a real production environment. Tracking down one minus sign in several hundred thousands of lines is a pain. Not to mention the uneasy feeling you get after you solve it, "How was everything ever working correctly before!? What else did we overlook?"',
            comments: [3339842],
            parent: 3338485,
          },
          {
            id: 3339723,
            level: 0,
            user: 'TwoBit',
            time: 1323596319,
            time_ago: '6 years ago',
            timeAgo: '6 years ago',
            content: '<p>They could have solved that bug with one developer in ten minutes by just telling the PS3 to generate a core dump and running addr2line.exe on the core dump report\'s callstacks.<p>And the report places the blame on the server instead of their code. Clearly it\'s their code\'s fault for doing blocking sockets calls in a main thread.',
            comments: [],
            parent: 3338485,
          },
        ],
      },
    })).toEqual(Immutable.Map(new Map([
      [3340746, Immutable.Map({
        id: 3340746,
        level: 2,
        user: 'akg',
        time: 1323630681,
        time_ago: '6 years ago',
        timeAgo: '6 years ago',
        content: '<p>You\'re right. But it was after that pain-staking experience that I became fully engrossed in using unittests for all non-trivial functionality. Live and learn.',
        comments: Immutable.List(),
        parent: 3339842,
      })],
      [3339842, Immutable.Map({
        id: 3339842,
        level: 1,
        user: 'Confusion',
        time: 1323601529,
        time_ago: '6 years ago',
        content: '<p>If I have to venture a guess, I guess you didn\'t have a comprehensive set of tests at the function/method level of the code? Having that would probably have caught the bug, because you would have written a test for correctly executing the code in that branch.',
        comments: Immutable.List([3340746]),
        parent: 3338903,
      })],
      [3338903, Immutable.Map({
        id: 3338903,
        level: 0,
        user: 'akg',
        time: 1323563056,
        time_ago: '6 years ago',
        timeAgo: '6 years ago',
        content: '<p>Reminds me of the time I had written a physical simulation engine back in grad school and there was a "minus" sign error. Of course, the error was rare enough that we didn\'t notice it until after the code was used in a real production environment. Tracking down one minus sign in several hundred thousands of lines is a pain. Not to mention the uneasy feeling you get after you solve it, "How was everything ever working correctly before!? What else did we overlook?"',
        comments: Immutable.List([3339842]),
        parent: 3338485,
      })],
      [3339723, Immutable.Map({
        id: 3339723,
        level: 0,
        user: 'TwoBit',
        time: 1323596319,
        time_ago: '6 years ago',
        timeAgo: '6 years ago',
        content: '<p>They could have solved that bug with one developer in ten minutes by just telling the PS3 to generate a core dump and running addr2line.exe on the core dump report\'s callstacks.<p>And the report places the blame on the server instead of their code. Clearly it\'s their code\'s fault for doing blocking sockets calls in a main thread.',
        comments: Immutable.List(),
        parent: 3338485,
      })],
      [3338485, Immutable.Map({
        id: 3338485,
        title: 'Lamest bug we ever encountered',
        points: 76,
        user: 'exch',
        time: 1323550709,
        time_ago: '6 years ago',
        timeAgo: '6 years ago',
        type: 'link',
        url: 'http://joostdevblog.blogspot.com/2011/12/lamest-bug-we-ever-encountered.html',
        domain: 'joostdevblog.blogspot.com',
        comments_count: 23,
        commentsCount: 23,
        comments: Immutable.List([3338903, 3339723]),
      })],
    ])));
  });
});
