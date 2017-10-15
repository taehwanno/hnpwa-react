import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';

import HackerNewsListItem from 'components/HackerNewsListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import './HackerNewsList.scss';

const propTypes = {
  feeds: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  feeds: Immutable.List(),
};

function HackerNewsList({ feeds }) {
  return (
    <ul className="HackerNewsList">
      <LoadingIndicator
        active={!feeds.size}
        style={{ position: 'absolute', left: 'calc(50% - 24px)', marginTop: '10px' }}
      />
      {feeds.map((feed, index) => (
        <li className="HackerNewsList__item" key={feed.get('id')}>
          <span className="HackerNewsList__index">{index + 1}</span>
          <HackerNewsListItem {...feed.toJS()} />
        </li>
      )).toArray()}
    </ul>
  );
}

HackerNewsList.propTypes = propTypes;
HackerNewsList.defaultProps = defaultProps;

export default HackerNewsList;
