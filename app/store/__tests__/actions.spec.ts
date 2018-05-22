import * as Immutable from 'immutable';
import * as nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../actions';
import * as ACTIONS from '../actionTypes';
import flattenComments from '../flattenComments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('HACKER_COMMENTS_FETCH_* action creators', () => {
    it('should create an action to fetch hacker comments request', () => {
      const id = 1234;
      const expectedAction = {
        type: ACTIONS.HACKER_COMMENTS_FETCH_REQUEST,
        payload: id,
      };
      expect(actions.hackerCommentsFetchRequest(id)).toEqual(expectedAction);
    });

    it('should create an action to fetch hacker user success', () => {
      const data = {};
      const expectedAction = {
        type: ACTIONS.HACKER_COMMENTS_FETCH_SUCCESS,
        payload: data,
      };
      expect(actions.hackerCommentsFetchSuccess(data)).toEqual(expectedAction);
    });

    it('should create an action to fetch hacker user failure', () => {
      const error = new Error();
      const expectedAction = {
        type: ACTIONS.HACKER_COMMENTS_FETCH_FAILURE,
        payload: error,
        error: true,
      };
      expect(actions.hackerCommentsFetchFailure(error)).toEqual(expectedAction);
    });

    describe('async actions', () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it('creates HACKER_COMMENTS_FETCH_SUCCESS when fetching comments has been done', () => {
        const id = 1234;
        const responseBody = {
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
        };

        nock('https://node-hnapi.herokuapp.com/')
          .get(`/item/${id}`)
          .reply(200, responseBody);

        const expectedActions = [
          {
            type: ACTIONS.HACKER_COMMENTS_FETCH_REQUEST,
            payload: id,
          },
          {
            type: ACTIONS.HACKER_COMMENTS_FETCH_SUCCESS,
            payload: {
              ...responseBody,
              timeAgo: responseBody.time_ago,
              comments: flattenComments(responseBody).map(v => ({ ...v, timeAgo: v.time_ago })),
            },
          },
        ];
        const store = mockStore({ comments: Immutable.Map() });

        return store.dispatch(actions.fetchHackerComments(id)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('creates HACKER_COMMENTS_FETCH_FAILURE when fetching comments has been failed', () => {
        const id = 1234;

        nock('https://node-hnapi.herokuapp.com/')
          .get(`/item/${id}`)
          .reply(400);

        const expectedActions = [
          {
            type: ACTIONS.HACKER_COMMENTS_FETCH_REQUEST,
            payload: id,
          },
          {
            type: ACTIONS.HACKER_COMMENTS_FETCH_FAILURE,
            payload: new Error('Bad Request'),
            error: true,
          },
        ];
        const store = mockStore({ user: Immutable.Map() });

        return store.dispatch(actions.fetchHackerComments(id)).catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });

  describe('HACKER_NEWS_FETCH_* action creators', () => {
    it('should create an action to fetch hacker news request', () => {
      const type = 'news';
      const page = 1;
      const expectedAction = {
        type: ACTIONS.HACKER_NEWS_FETCH_REQUEST,
        payload: {
          type,
          page,
        },
      };
      expect(actions.hackerNewsFetchRequest(type, page)).toEqual(expectedAction);
    });

    it('should create an action to fetch hacker news success', () => {
      const type = 'news';
      const page = 1;
      const data = [];
      const expectedAction = {
        type: ACTIONS.HACKER_NEWS_FETCH_SUCCESS,
        payload: {
          type,
          page,
          data,
        },
      };
      expect(actions.hackerNewsFetchSuccess(type, page, data)).toEqual(expectedAction);
    });

    it('should create an action to fetch hacker news failure', () => {
      const error = new Error();
      const expectedAction = {
        type: ACTIONS.HACKER_NEWS_FETCH_FAILURE,
        payload: error,
        error: true,
      };
      expect(actions.hackerNewsFetchFailure(error)).toEqual(expectedAction);
    });

    describe('async actions', () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it('creates HACKER_NEWS_FETCH_SUCCESS when fetching news has been done', () => {
        const type = 'news';
        const page = 1;

        nock('https://node-hnapi.herokuapp.com/')
          .get(`/${type}?page=${page}`)
          .reply(200, [
            {
              comments_count: 116,
              domain: 'blog.ycombinator.com',
              id: 15348384,
              points: 140,
              time: 1506524153,
              time_ago: '2 hours ago',
              title: 'Interview with Mr. Money Mustache',
              type: 'link',
              url: 'https://blog.ycombinator.com/dont-start-a-blog-start-a-cult-mr-money-mustache/',
              user: 'craigcannon',
            },
          ]);

        const expectedActions = [
          {
            type: ACTIONS.HACKER_NEWS_FETCH_REQUEST,
            payload: { type, page },
          },
          {
            type: ACTIONS.HACKER_NEWS_FETCH_SUCCESS,
            payload: {
              type,
              page,
              data: [
                {
                  commentsCount: 116,
                  domain: 'blog.ycombinator.com',
                  id: 15348384,
                  points: 140,
                  time: 1506524153,
                  timeAgo: '2 hours ago',
                  title: 'Interview with Mr. Money Mustache',
                  type: 'link',
                  url:
                    'https://blog.ycombinator.com/dont-start-a-blog-start-a-cult-mr-money-mustache/',
                  user: 'craigcannon',
                },
              ],
            },
          },
        ];
        const store = mockStore({
          byId: {},
          currentPage: 1,
          items: {},
        });

        return store.dispatch(actions.fetchHackerNews(type, page)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('creates HACKER_NEWS_FETCH_FAILURE when fetching news has been failed', () => {
        const type = 'news';
        const page = 1;

        nock('https://node-hnapi.herokuapp.com/')
          .get(`/${type}?page=${page}`)
          .reply(400);

        const expectedActions = [
          {
            type: ACTIONS.HACKER_NEWS_FETCH_REQUEST,
            payload: { type, page },
          },
          {
            type: ACTIONS.HACKER_NEWS_FETCH_FAILURE,
            payload: new Error('Bad Request'),
            error: true,
          },
        ];
        const store = mockStore({
          byId: {},
          currentPage: 1,
          items: {},
        });

        return store.dispatch(actions.fetchHackerNews(type, page)).catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });

  describe('HACKER_USER_FETCH_* action creators', () => {
    it('should create an action to fetch hacker user request', () => {
      const id = 'taehwanno';
      const expectedAction = {
        type: ACTIONS.HACKER_USER_FETCH_REQUEST,
        payload: id,
      };
      expect(actions.hackerUserFetchRequest(id)).toEqual(expectedAction);
    });

    it('should create an action to fetch hacker user success', () => {
      const data = {};
      const expectedAction = {
        type: ACTIONS.HACKER_USER_FETCH_SUCCESS,
        payload: data,
      };
      expect(actions.hackerUserFetchSuccess(data)).toEqual(expectedAction);
    });

    it('should create an action to fetch hacker user failure', () => {
      const error = new Error();
      const expectedAction = {
        type: ACTIONS.HACKER_USER_FETCH_FAILURE,
        payload: error,
        error: true,
      };
      expect(actions.hackerUserFetchFailure(error)).toEqual(expectedAction);
    });

    describe('async actions', () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it('creates HACKER_USER_FETCH_SUCCESS when fetching user has been done', () => {
        const id = 'taehwanno';

        nock('https://node-hnapi.herokuapp.com/')
          .get(`/user/${id}`)
          .reply(200, {
            id,
            created_time: 1284124124,
            created: '7 years ago',
            karma: 1224,
            avg: null,
            about: null,
          });

        const expectedActions = [
          {
            type: ACTIONS.HACKER_USER_FETCH_REQUEST,
            payload: id,
          },
          {
            type: ACTIONS.HACKER_USER_FETCH_SUCCESS,
            payload: {
              id,
              created_time: 1284124124,
              created: '7 years ago',
              karma: 1224,
              avg: null,
              about: null,
            },
          },
        ];
        const store = mockStore({ user: Immutable.Map() });

        return store.dispatch(actions.fetchHackerUser(id)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('creates HACKER_USER_FETCH_FAILURE when fetching user has been failed', () => {
        const id = 'taehwanno';

        nock('https://node-hnapi.herokuapp.com/')
          .get(`/user/${id}`)
          .reply(400);

        const expectedActions = [
          {
            type: ACTIONS.HACKER_USER_FETCH_REQUEST,
            payload: id,
          },
          {
            type: ACTIONS.HACKER_USER_FETCH_FAILURE,
            payload: new Error('Bad Request'),
            error: true,
          },
        ];
        const store = mockStore({ user: Immutable.Map() });

        return store.dispatch(actions.fetchHackerUser(id)).catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });
});
