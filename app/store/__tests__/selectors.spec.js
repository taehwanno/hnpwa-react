import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('selectors', () => {
  const state = Immutable.fromJS({
    byId: {},
    currentPage: 1,
    items: {
      ask: {},
      jobs: {},
      newest: {},
      news: {},
      show: {},
    },
  });

  it('should select byId', () => {
    expect(selectors.getById(state)).toEqual(state.get('byId'));
  });

  it('should select currentPage', () => {
    expect(selectors.getCurrentPage(state)).toBe(state.get('currentPage'));
  });

  it('should select items', () => {
    expect(selectors.getItems(state)).toEqual(state.get('items'));
  });

  it('should select props.type', () => {
    const props = { type: 'news' };
    expect(selectors.getFeedType(null, props)).toBe(props.type);
  });

  describe('getFeeds', () => {
    it('should return Immutable.List when specific type feeds not exist in current page', () => {
      expect(selectors.getFeeds(state, { type: 'news' })).toEqual(Immutable.List());
    });

    it('should return feeds when specific type feeds exist in current page', () => {
      const props = { type: 'ask' };
      const currentState = Immutable.Map({
        byId: Immutable.Map(new Map([
          [1, { title: 'React with TypeScript', id: 1 }],
          [2, { title: 'TypeScript vs Flow', id: 2 }],
        ])),
        currentPage: 1,
        items: Immutable.Map({
          ask: Immutable.Map(new Map([
            [1, Immutable.List([1, 2])],
          ])),
          jobs: Immutable.Map(),
          newest: Immutable.Map(),
          news: Immutable.Map(),
          show: Immutable.Map(),
        }),
      });
      expect(selectors.getFeeds(currentState, props))
        .toEqual(
          currentState.getIn(['items', 'ask', currentState.get('currentPage')])
            .map(id => currentState.getIn(['byId', id])),
        );
    });
  });
});
