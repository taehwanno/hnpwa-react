import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LocationPagination from 'components/LocationPagination';
import { fetchHackerNews } from 'store/actions';
import { getCurrentPage } from 'store/selectors';

const mapStateToProps = state => ({
  currentPage: getCurrentPage(state),
});

const mapDispatchToProps = {
  onPaginate: fetchHackerNews,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationPagination));
