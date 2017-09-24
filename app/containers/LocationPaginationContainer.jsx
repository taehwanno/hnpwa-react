import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LocationPagination from 'components/LocationPagination';
import { fetchHackerNews } from 'store/actions';

const mapDispatchToProps = {
  onPaginate: fetchHackerNews,
};

export default withRouter(connect(null, mapDispatchToProps)(LocationPagination));
