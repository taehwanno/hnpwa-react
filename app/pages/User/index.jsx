import React from 'react';
import PropTypes from 'prop-types';

import HackerNewsUserContainer from 'containers/HackerNewsUserContainer';

const propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
};

function UserRoute({ match }) {
  return (
    <div className="content-container">
      <HackerNewsUserContainer user={match.params.id} />
    </div>
  );
}

UserRoute.propTypes = propTypes;

export default UserRoute;
