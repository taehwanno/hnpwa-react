import * as React from 'react';

import HackerNewsUserContainer from 'containers/HackerNewsUserContainer';

export interface IUserRouteProps {
  readonly match: {
    readonly params: {
      readonly id: string;
    };
  };
}

const UserRoute: React.SFC<IUserRouteProps> = ({ match }) => {
  return (
    <div className="content-container">
      <HackerNewsUserContainer user={match.params.id} />
    </div>
  );
};

export default UserRoute;
