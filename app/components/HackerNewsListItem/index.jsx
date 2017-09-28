import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './HackerNewsListItem.scss';

const propTypes = {
  commentsCount: PropTypes.number,
  id: PropTypes.number,
  timeAgo: PropTypes.string,
  title: PropTypes.string,
  points: PropTypes.number,
  user: PropTypes.string,
  url: PropTypes.string,
};

const defaultProps = {
  commentsCount: 0,
  id: 0,
  timeAgo: '',
  title: '',
  points: 0,
  user: '',
  url: '',
};

function HackerNewsListItem({ commentsCount, id, points, timeAgo, title, url, user }) {
  return (
    <div className="HackerNewsListItem">
      <a className="HackerNewsListItem__title" href={url} target="__blank">{title}</a>
      <div className="HackerNewsListItem__info">
        {points} points by {' '}
        <Link to={`/user/${user}`}>{user}</Link> {timeAgo} | {' '}
        <Link to={`/item/${id}`}>{commentsCount} comments</Link>
      </div>
    </div>
  );
}

HackerNewsListItem.propTypes = propTypes;
HackerNewsListItem.defaultProps = defaultProps;

export default HackerNewsListItem;
