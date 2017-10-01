import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/Pagination';

const propTypes = {
  currentPage: PropTypes.number,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  onPaginate: PropTypes.func,
};

const defaultProps = {
  currentPage: 1,
  onPaginate() {},
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
    const [type, stringPage] = LocationPagination.getRequestQuery(this.props.location.pathname);
    const page = parseInt(stringPage, 10);

    if (type && !Number.isNaN(page)) {
      this.props.onPaginate(type, parseInt(page, 10));
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
    this.props.onPaginate(type, page);
  }

  render() {
    const { currentPage } = this.props;

    return (
      <Pagination
        curentPage={currentPage}
        onPaginate={this.handlePaginate}
      />
    );
  }
}

LocationPagination.propTypes = propTypes;
LocationPagination.defaultProps = defaultProps;

export default LocationPagination;
