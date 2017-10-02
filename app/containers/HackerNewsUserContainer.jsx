import { connect } from 'react-redux';

import { fetchHackerUser } from 'store/actions';
import { getSpecificUser } from 'store/selectors';
import HackerNewsUser from 'components/HackerNewsUser';

const mapStateToProps = (state, props) => ({
  information: getSpecificUser(state, props),
});

const mapDispatchToProps = {
  onUserFetch: fetchHackerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(HackerNewsUser);
