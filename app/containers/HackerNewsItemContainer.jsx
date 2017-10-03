import { connect } from 'react-redux';

import HackerNewsItem from 'components/HackerNewsItem';
import { fetchHackerComments } from 'store/actions';
import { getItem, getChildrenComments } from 'store/selectors';

const mapStateToProps = (state, props) => ({
  comments: getChildrenComments(state, props),
  item: getItem(state, props),
});

const mapDispatchToProps = {
  onItemFetch: fetchHackerComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(HackerNewsItem);
