import React from 'react';
import PropTypes from 'prop-types';

import HackerNewsListContainer from 'containers/HackerNewsListContainer';

const propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

function FeedRoute({ location }) {
  const feedType = location.pathname.split('/').slice(1)[0];

  return (
    <HackerNewsListContainer type={feedType} />
  );
}

FeedRoute.propTypes = propTypes;

export default FeedRoute;
