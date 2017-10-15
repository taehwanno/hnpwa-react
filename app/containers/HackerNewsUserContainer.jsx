import { connect } from 'react-redux';
import { withDone } from 'react-router-server';

import { fetchHackerUser } from 'store/actions';
import { getSpecificUser } from 'store/selectors';
import HackerNewsUser from 'components/HackerNewsUser';

const mapStateToProps = (state, props) => ({
  information: getSpecificUser(state, props),
});

const mapDispatchToProps = {
  onUserFetch: fetchHackerUser,
};

export default withDone(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HackerNewsUser));
