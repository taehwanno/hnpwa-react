import * as React from 'react';

import HackerNewsListContainer from 'containers/HackerNewsListContainer';
import LocationPaginationContainer from 'containers/LocationPaginationContainer';

export interface IFeedRouteProps {
  readonly location: {
    pathname: string;
  };
}

const FeedRoute: React.SFC<IFeedRouteProps> = ({ location }) => {
  const feedType = location.pathname.split('/').slice(1)[0];

  return (
    <div>
      <LocationPaginationContainer type={feedType} />
      <div className="content-container">
        <HackerNewsListContainer type={feedType} />
      </div>
    </div>
  );
};

export default FeedRoute;
