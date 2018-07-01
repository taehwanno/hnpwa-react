import { createSelector } from 'reselect';

export const getById = state => state.byId;
export const getCurrentPage = state => state.currentPage;
export const getIsFetching = state => state.isFetching;
export const getItems = state => state.items;
export const getUser = state => state.user;

export const getFeedType = (_, props) => props.type;
export const getFeeds = createSelector(
  [getById, getCurrentPage, getItems, getFeedType],
  (byId, currentPage, items, type) => {
    const feeds = items[type][currentPage];

    if (!feeds) return [];

    return feeds.map(id => byId[id]);
  },
);
export const getFeedCount = createSelector(
  getFeeds,
  feeds => feeds.length,
);

export const getUserId = (_, props) => props.user;
export const getSpecificUser = createSelector(
  [getUser, getUserId],
  (user, id) => {
    const information = user[id];

    if (!information) return null;
    return information;
  },
);

export const getComments = state => state.comments;
export const getCommentId = (_, props) => props.commentId;
export const getItemId = (_, props) => props.itemId;
export const getCommentsById = createSelector(
  getComments,
  comments => comments.byId,
);
export const getCommentsPosts = createSelector(
  getComments,
  comments => comments.posts,
);

export const getItem = createSelector(
  getCommentsPosts,
  getItemId,
  (commentsPosts, itemId) => {
    const item = commentsPosts[itemId];

    if (!item) return null;
    return item;
  },
);
export const getChildrenComments = createSelector(
  getCommentsById,
  getCommentId,
  (commentsIds, commentId) => {
    if (commentsIds[commentId]) {
      return commentsIds[commentId].comments;
    }
    return null;
  },
);
export const makeGetChildrenComments = () => createSelector(
  getCommentsById,
  getCommentId,
  (commentsIds, commentId) => {
    if (commentsIds[commentId]) {
      return commentsIds[commentId].comments;
    }
    return null;
  },
);
export const makeGetCommentContents = () => createSelector(
  getCommentsById,
  getCommentId,
  (commentsIds, commentId) => commentsIds[commentId],
);
