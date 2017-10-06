import React from 'react';
import PropTypes from 'prop-types';

import './HackerNewsUser.scss';

const propTypes = {
  done: PropTypes.func,
  information: PropTypes.shape({ created: PropTypes.string, karma: PropTypes.number }),
  user: PropTypes.string.isRequired,
  onUserFetch: PropTypes.func,
};

const defaultProps = {
  done() {},
  information: null,
  onUserFetch() { return Promise.resolve(); },
};

class HackerNewsUser extends React.Component {
  componentWillMount() {
    const { done, information, user, onUserFetch } = this.props;

    if (!information) {
      onUserFetch(user).then(done, done);
    }
  }

  render() {
    const { information, user } = this.props;

    if (!information) return null;

    return (
      <div className="HackerNewsUser">
        <table>
          <tbody>
            <tr>
              <td>User: </td>
              <td>{user}</td>
            </tr>
            <tr>
              <td>Created: </td>
              <td>{information.get('created')}</td>
            </tr>
            <tr>
              <td>Karma: </td>
              <td>{information.get('karma')}</td>
            </tr>
          </tbody>
        </table>
        <div className="HackerNewsUser__links">
          <a href={`https://news.ycombinator.com/submitted?id=${user}`}>submissions</a>
          {' | '}
          <a href={`https://news.ycombinator.com/threads?id=${user}`}>comments</a>
          {' | '}
          <a href={`https://news.ycombinator.com/favorites?id=${user}`}>favorites</a>
        </div>
      </div>
    );
  }
}

HackerNewsUser.propTypes = propTypes;
HackerNewsUser.defaultProps = defaultProps;

export default HackerNewsUser;
