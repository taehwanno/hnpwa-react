import * as selectors from '../selectors';

describe('selectors', () => {
  const state = {
    byId: {},
    comments: {
      byId: {},
      posts: {},
    },
    currentPage: 1,
    isFetching: false,
    items: {
      ask: {},
      jobs: {},
      newest: {},
      news: {},
      show: {},
    },
    user: {},
  };

  it('should select byId', () => {
    expect(selectors.getById(state)).toEqual(state.byId);
  });

  it('should select currentPage', () => {
    expect(selectors.getCurrentPage(state)).toBe(state.currentPage);
  });

  it('should select isFetching', () => {
    expect(selectors.getIsFetching(state)).toBe(state.isFetching);
  });

  it('should select items', () => {
    expect(selectors.getItems(state)).toEqual(state.items);
  });

  it('should select props.type', () => {
    const props = { type: 'news' };
    expect(selectors.getFeedType(null, props)).toBe(props.type);
  });

  describe('getFeeds', () => {
    it('should return empty array when specific type feeds not exist in current page', () => {
      expect(selectors.getFeeds(state, { type: 'news' })).toEqual([]);
    });

    it('should return feeds when specific type feeds exist in current page', () => {
      const props = { type: 'ask' };
      const currentState = {
        byId: {
          1: { title: 'React with TypeScript', id: 1 },
          2: { title: 'TypeScript vs Flow', id: 2 },
        },
        currentPage: 1,
        items: {
          ask: {
            1: [1, 2],
          },
          jobs: {},
          newest: {},
          news: {},
          show: {},
        },
      };
      expect(selectors.getFeeds(currentState, props))
        .toEqual(currentState.items.ask[currentState.currentPage]
          .map(id => currentState.byId[id]));
    });
  });

  it('should return feed count', () => {
    const props = { type: 'ask' };
    const currentState = {
      byId: {
        1: { title: 'React with TypeScript', id: 1 },
        2: { title: 'TypeScript vs Flow', id: 2 },
      },
      currentPage: 1,
      items: {
        ask: {
          1: [1, 2],
        },
        jobs: {},
        newest: {},
        news: {},
        show: {},
      },
    };

    expect(selectors.getFeedCount(state, props)).toBe(0);
    expect(selectors.getFeedCount(currentState, props)).toBe(2);
  });

  it('should select props.user', () => {
    const props = { user: 'taehwanno' };
    expect(selectors.getUserId(null, props)).toBe(props.user);
  });

  describe('getSpecificUser', () => {
    it('should return null when specific user information not exist', () => {
      expect(selectors.getSpecificUser(state, { user: 'taehwanno' })).toEqual(null);
    });

    it('should return user information when specific user exist', () => {
      const props = { user: 'taehwanno' };
      const currentState = {
        user: {
          taehwanno: {
            id: 'taehwanno',
            karma: 0,
            created: '3 years ago',
          },
        },
      };
      expect(selectors.getSpecificUser(currentState, props))
        .toEqual(currentState.user.taehwanno);
    });
  });

  it('should select comments', () => {
    expect(selectors.getComments(state)).toEqual(state.comments);
  });

  it('should select props.commentId', () => {
    const props = { commentId: 1234 };
    expect(selectors.getCommentId(null, props)).toBe(props.commentId);
  });

  it('should select props.itemId', () => {
    const props = { itemId: 1234 };
    expect(selectors.getItemId(null, props)).toBe(props.itemId);
  });

  it('should select comments.byId', () => {
    expect(selectors.getCommentsById(state)).toEqual(state.comments.byId);
  });

  it('should select comments.posts', () => {
    expect(selectors.getCommentsPosts(state)).toEqual(state.comments.posts);
  });

  describe('getItem', () => {
    it('should return null when matched itemId\'s comment not exist', () => {
      expect(selectors.getItem(state, { itemId: 1234 })).toEqual(null);
    });

    it('should return item when matched itemId\'s comment exist', () => {
      const comment = {};
      expect(selectors.getItem({
        comments: {
          posts: {
            1234: comment,
          },
        },
      }, { itemId: 1234 })).toEqual(comment);
    });
  });

  it('should select matched id\'s comments', () => {
    const comment = { comments: [1, 2] };
    const currentState = {
      comments: {
        byId: {
          4321: comment,
        },
      },
    };
    expect(selectors.getChildrenComments(currentState, { commentId: 4321 }))
      .toEqual(comment.comments);
  });

  it('should return selector that select children comments', () => {
    const comment = { comments: [1, 2] };
    const currentState = {
      comments: {
        byId: {
          4321: comment,
        },
      },
    };
    const getChildrenComments = selectors.makeGetChildrenComments();
    expect(getChildrenComments(currentState, { commentId: 4321 })).toEqual(comment.comments);
  });

  it('should return selector that select comment contents', () => {
    const comment = {};
    const currentState = {
      comments: {
        byId: {
          4321: comment,
        },
      },
    };
    const getCommentContents = selectors.makeGetCommentContents();
    expect(getCommentContents(currentState, { commentId: 4321 })).toEqual(comment);
  });
});
