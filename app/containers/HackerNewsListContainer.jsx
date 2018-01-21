import { connect } from 'react-redux';

import HackerNewsList from 'components/HackerNewsList';
import { getFeeds, getIsFetching } from 'store/selectors';

const mapStateToProps = (state, props) => ({
  feeds: getFeeds(state, props),
  isFetching: getIsFetching(state),
});

export default connect(mapStateToProps)(HackerNewsList);
