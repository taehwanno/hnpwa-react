import * as React from 'react';

import HackerNewsItemContainer from 'containers/HackerNewsItemContainer';

export interface IItemRouteProps {
  readonly match: {
    readonly params: {
      id: string;
    };
  };
}

const ItemRoute: React.SFC<IItemRouteProps> = ({ match }) => {
  const id = parseInt(match.params.id, 10);

  return (
    <div className="content-container">
      <HackerNewsItemContainer commentId={id} itemId={id} />
    </div>
  );
};

export default ItemRoute;
