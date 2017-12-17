import { List, Map } from 'immutable';
import * as React from 'react';

import HackerNewsListItem from 'components/HackerNewsListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import './HackerNewsList.scss';

export interface HackerNewsListProps {
  feeds?: List<Map<any, any>>;
  isFetching?: boolean;
}

const defaultProps = {
  feeds: List<Map<any, any>>(),
  isFetching: false,
};

const HackerNewsList: React.SFC<HackerNewsListProps> = ({ feeds, isFetching }) => {
  const haveNoItems = !isFetching && feeds.size === 0;

  return (
    <ul className="HackerNewsList">
      <LoadingIndicator
        active={isFetching}
        style={{ position: 'absolute', left: 'calc(50% - 24px)', marginTop: '10px' }}
      />
      {haveNoItems && <p className="HackerNewsList__noti">There are no items to show.</p>}
      {!isFetching && feeds.map((feed, index) => (
        <li className="HackerNewsList__item" key={feed.get('id')}>
          <span className="HackerNewsList__index">{index + 1}</span>
          <HackerNewsListItem {...feed.toJS()} />
        </li>
      )).toArray()}
    </ul>
  );
};

HackerNewsList.defaultProps = defaultProps;

export default HackerNewsList;
