import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withDone } from 'react-router-server';

import LocationPagination from 'components/LocationPagination';
import { fetchHackerNews } from 'store/actions';
import { getCurrentPage, getFeedCount } from 'store/selectors';

const mapStateToProps = (state, props) => ({
  currentPage: getCurrentPage(state),
  feedCount: getFeedCount(state, props),
});

const mapDispatchToProps = {
  onPaginate: fetchHackerNews,
};

export default withDone(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationPagination)));
