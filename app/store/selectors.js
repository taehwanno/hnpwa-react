import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const getById = state => state.get('byId');
export const getCurrentPage = state => state.get('currentPage');
export const getItems = state => state.get('items');

export const getFeedType = (_, props) => props.type;
export const getFeeds = createSelector(
  [getById, getCurrentPage, getItems, getFeedType],
  (byId, currentPage, items, type) => {
    const feeds = items.getIn([type, currentPage]);

    if (!feeds) return Immutable.List();

    return feeds.map(id => byId.get(id));
  },
);

