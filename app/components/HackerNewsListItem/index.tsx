import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './HackerNewsListItem.scss';

export interface HackerNewsListItemProps {
  commentsCount?: number;
  id?: number;
  points?: number;
  timeAgo?: string;
  title?: string;
  url?: string;
  user?: string;
}

const defaultProps = {
  commentsCount: 0,
  id: 0,
  points: 0,
  timeAgo: '',
  title: '',
  url: '',
  user: '',
};

const HackerNewsListItem: React.SFC<HackerNewsListItemProps> = ({
  commentsCount,
  id,
  points,
  timeAgo,
  title,
  url,
  user,
}) => (
  <div className="HackerNewsListItem">
    <a className="HackerNewsListItem__title" href={url} target="__blank">
      {title}
    </a>
    <div className="HackerNewsListItem__info">
      {points !== null && `${points} points`}
      {user && ' by '}
      {user && (
        <Link className="HackerNewsListItem__link" href={`/user/${user}`} to={`/user/${user}`}>
          {user}
        </Link>
      )}
      {' '}
      {timeAgo} | {' '}
      <Link className="HackerNewsListItem__link" href={`/item/${id}/`} to={`/item/${id}`}>
        {commentsCount} comments
      </Link>
    </div>
  </div>
);

HackerNewsListItem.defaultProps = defaultProps;

export default HackerNewsListItem;
