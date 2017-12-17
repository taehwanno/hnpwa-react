import * as React from 'react';

import './LoadingIndicator.scss';

export interface ILoadingIndicatorProps {
  readonly active?: boolean;
  readonly style?: object;
}

const defaultProps: ILoadingIndicatorProps = {
  active: false,
  style: {},
};

const LoadingIndicator: React.SFC<ILoadingIndicatorProps> = ({
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
