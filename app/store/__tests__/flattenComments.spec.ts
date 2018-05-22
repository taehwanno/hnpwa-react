import flattenComments from '../flattenComments';

describe('flattenComments', () => {
  it('should return flatComments', () => {
    expect(
      flattenComments({
        id: 3338485,
        title: 'Lamest bug we ever encountered',
        points: 76,
        user: 'exch',
        time: 1323550709,
        time_ago: '6 years ago',
        type: 'link',
        url: 'http://joostdevblog.blogspot.com/2011/12/lamest-bug-we-ever-encountered.html',
        domain: 'joostdevblog.blogspot.com',
        comments: [
          {
            id: 3338903,
            level: 0,
            user: 'akg',
            time: 1323563056,
            time_ago: '6 years ago',
            content: 'a',
            comments: [
              {
                id: 3339842,
                level: 1,
                user: 'Confusion',
                time: 1323601529,
                time_ago: '6 years ago',
                content: 'b',
                comments: [
                  {
                    id: 3340746,
                    level: 2,
                    user: 'akg',
                    time: 1323630681,
                    time_ago: '6 years ago',
                    content: 'c',
                    comments: [],
                  },
                ],
              },
            ],
          },
          {
            id: 3339723,
            level: 0,
            user: 'TwoBit',
            time: 1323596319,
            time_ago: '6 years ago',
            content: 'd',
            comments: [],
          },
        ],
        comments_count: 23,
      }),
    ).toEqual([
      {
        id: 3340746,
        level: 2,
        user: 'akg',
        time: 1323630681,
        time_ago: '6 years ago',
        content: 'c',
        comments: [],
        parent: 3339842,
      },
      {
        id: 3339842,
        level: 1,
        user: 'Confusion',
        time: 1323601529,
        time_ago: '6 years ago',
        content: 'b',
        comments: [3340746],
        parent: 3338903,
      },
      {
        id: 3338903,
        level: 0,
        user: 'akg',
        time: 1323563056,
        time_ago: '6 years ago',
        content: 'a',
        comments: [3339842],
        parent: 3338485,
      },
      {
        id: 3339723,
        level: 0,
        user: 'TwoBit',
        time: 1323596319,
        time_ago: '6 years ago',
        content: 'd',
        comments: [],
        parent: 3338485,
      },
    ]);
  });
});
