import * as React from 'react';

import HackerNewsListItem from 'components/HackerNewsListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import './HackerNewsList.scss';

export interface IHackerNewsListProps {
  feeds?: Array<{
    commentsCount: number,
    domain: string,
    id: number,
    points: number,
    time: number,
    timeAgo: string,
    title: string,
    type: string,
    url: string,
    user: string,
  }>;
  isFetching?: boolean;
}

const defaultProps: IHackerNewsListProps = {
  feeds: [],
  isFetching: false,
};

const HackerNewsList: React.SFC<IHackerNewsListProps> = ({ feeds, isFetching }) => {
  const haveNoItems = !isFetching && feeds.length === 0;

  return (
    <ul className="HackerNewsList">
      <LoadingIndicator
        active={isFetching}
        style={{ position: 'absolute', left: 'calc(50% - 24px)', marginTop: '10px' }}
      />
      {haveNoItems && <p className="HackerNewsList__noti">There are no items to show.</p>}
      {!isFetching && feeds.map((feed, index) => (
        <li className="HackerNewsList__item" key={feed.id}>
          <span className="HackerNewsList__index">{index + 1}</span>
          <HackerNewsListItem {...feed} />
        </li>
      ))}
    </ul>
  );
};

HackerNewsList.defaultProps = defaultProps;

export default HackerNewsList;
