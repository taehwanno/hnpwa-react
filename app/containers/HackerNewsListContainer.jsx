import { connect } from 'react-redux';

import HackerNewsList from 'components/HackerNewsList';
import { getFeeds } from 'store/selectors';

const mapStateToProps = (state, props) => ({
  feeds: getFeeds(state, props),
});

export default connect(mapStateToProps)(HackerNewsList);
