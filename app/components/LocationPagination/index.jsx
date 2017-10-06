import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/Pagination';

const propTypes = {
  currentPage: PropTypes.number,
  done: PropTypes.func,
  feedCount: PropTypes.number,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  onPaginate: PropTypes.func,
};

const defaultProps = {
  currentPage: 1,
  done() {},
  feedCount: 0,
  onPaginate() { return Promise.resolve(); },
};

class LocationPagination extends React.Component {
  static getRequestQuery(pathname) {
    return pathname.split('/').filter(v => !!v);
  }

  constructor(props) {
    super(props);
    this.handlePaginate = this.handlePaginate.bind(this);
  }

  componentWillMount() {
    const { done, feedCount } = this.props;
    const [type, stringPage] = LocationPagination.getRequestQuery(this.props.location.pathname);
    const page = parseInt(stringPage, 10);

    if (type && !Number.isNaN(page) && feedCount === 0) {
      this.props.onPaginate(type, parseInt(page, 10)).then(done, done);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const [type, page] = LocationPagination.getRequestQuery(nextProps.location.pathname);
      this.props.onPaginate(type, parseInt(page, 10));
    }
  }

  handlePaginate(page) {
    const [type] = LocationPagination.getRequestQuery(this.props.location.pathname);
    this.props.history.push(`/${type}/${page}`);
  }

  render() {
    const { currentPage } = this.props;

    return (
      <Pagination
        currentPage={currentPage}
        onPaginate={this.handlePaginate}
      />
    );
  }
}

LocationPagination.propTypes = propTypes;
LocationPagination.defaultProps = defaultProps;

export default LocationPagination;
