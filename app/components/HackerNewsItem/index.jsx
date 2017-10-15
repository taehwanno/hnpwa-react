import React from 'react';
import PropTypes from 'prop-types';

import HackerNewsComment from 'containers/HackerNewsComment';
import HackerNewsListItem from 'components/HackerNewsListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import './HackerNewsItem.scss';

const propTypes = {
  comments: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  done: PropTypes.func,
  item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  itemId: PropTypes.number,
  onItemFetch: PropTypes.func,
};

const defaultProps = {
  comments: null,
  done() {},
  item: null,
  itemId: 0,
  onItemFetch() { return Promise.resolve(); },
};

class HackerNewsItem extends React.Component {
  componentWillMount() {
    const { done, item, itemId } = this.props;

    if (!item) {
      this.props.onItemFetch(itemId).then(done, done);
    }
  }

  render() {
    const { comments, item } = this.props;
    if (!comments || !item) {
      return (
        <LoadingIndicator
          active
          style={{ position: 'absolute', left: 'calc(50% - 24px)', marginTop: '30px' }}
        />
      );
    }

    return (
      <div className="HackerNewsItem">
        <div className="HackerNewsItem__content">
          <HackerNewsListItem {...item.toJS()} />
        </div>
        {comments.map(id => <HackerNewsComment commentId={id} key={id} />).toArray()}
      </div>
    );
  }
}

HackerNewsItem.propTypes = propTypes;
HackerNewsItem.defaultProps = defaultProps;

export default HackerNewsItem;
