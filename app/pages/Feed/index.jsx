import React from 'react';
import PropTypes from 'prop-types';

import HackerNewsListContainer from 'containers/HackerNewsListContainer';
import LocationPaginationContainer from 'containers/LocationPaginationContainer';

const propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

function FeedRoute({ location }) {
  const feedType = location.pathname.split('/').slice(1)[0];

  return (
    <div>
      <LocationPaginationContainer />
      <HackerNewsListContainer type={feedType} />
    </div>
  );
}

FeedRoute.propTypes = propTypes;

export default FeedRoute;
