import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import * as ACTIONS from './actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('action creators', () => {
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
        .reply(200, [{
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
        }]);

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
            data: [{
              commentsCount: 116,
              domain: 'blog.ycombinator.com',
              id: 15348384,
              points: 140,
              time: 1506524153,
              timeAgo: '2 hours ago',
              title: 'Interview with Mr. Money Mustache',
              type: 'link',
              url: 'https://blog.ycombinator.com/dont-start-a-blog-start-a-cult-mr-money-mustache/',
              user: 'craigcannon',
            }],
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
