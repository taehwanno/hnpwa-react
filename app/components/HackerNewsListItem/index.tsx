import * as React from 'react';
import { Link } from 'react-router-dom';

import './HackerNewsListItem.scss';

export interface IHackerNewsListItemProps {
  readonly commentsCount?: number;
  readonly id?: number;
  readonly points?: number;
  readonly timeAgo?: string;
  readonly title?: string;
  readonly url?: string;
  readonly user?: string;
}

const defaultProps: IHackerNewsListItemProps = {
  commentsCount: 0,
  id: 0,
  points: 0,
  timeAgo: '',
  title: '',
  url: '',
  user: '',
};

const HackerNewsListItem: React.SFC<IHackerNewsListItemProps> = ({
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
