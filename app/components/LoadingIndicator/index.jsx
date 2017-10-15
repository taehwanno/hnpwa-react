import React from 'react';
import PropTypes from 'prop-types';

import './LoadingIndicator.scss';

const propTypes = {
  active: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  active: false,
  style: {},
};

function LoadingIndicator({ active, style }) {
  if (!active) return null;

  return (
    <div className="LoadingIndicator" style={style}>
      <div className="LoadingIndicator__col" />
      <div className="LoadingIndicator__col" />
      <div className="LoadingIndicator__col" />
    </div>
  );
}

LoadingIndicator.propTypes = propTypes;
LoadingIndicator.defaultProps = defaultProps;

export default LoadingIndicator;
