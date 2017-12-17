import * as React from 'react';

import './LoadingIndicator.scss';

export interface LoadingIndicatorProps {
  active?: boolean;
  style?: object;
}

const defaultProps = {
  active: false,
  style: {},
};

const LoadingIndicator: React.SFC<LoadingIndicatorProps> = ({
  active,
  style,
 }) => {
  if (!active) {
    return null;
  }

  return (
    <div className="LoadingIndicator" style={style}>
      <div className="LoadingIndicator__col" />
      <div className="LoadingIndicator__col" />
      <div className="LoadingIndicator__col" />
    </div>
  );
};

LoadingIndicator.defaultProps = defaultProps;

export default LoadingIndicator;
