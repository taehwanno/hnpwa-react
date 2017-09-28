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
});
