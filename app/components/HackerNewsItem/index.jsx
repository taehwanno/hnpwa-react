import React from 'react';
import PropTypes from 'prop-types';

import HackerNewsComment from 'containers/HackerNewsComment';
import HackerNewsListItem from 'components/HackerNewsListItem';

import './HackerNewsItem.scss';

const propTypes = {
  comments: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  itemId: PropTypes.number,
  onItemFetch: PropTypes.func,
};

const defaultProps = {
  comments: null,
  item: null,
  itemId: 0,
  onItemFetch() {},
};

class HackerNewsItem extends React.Component {
  componentWillMount() {
    this.props.onItemFetch(this.props.itemId);
  }

  render() {
    const { comments, item } = this.props;
    if (!comments || !item) return null;

    return (
      <div className="HackerNewsItem">
        <div className="HackerNewsItem__content">
          <HackerNewsListItem {...item.toJS()} />
        </div>
        {comments.map(id => <HackerNewsComment commentId={id} key={id} />)}
      </div>
    );
  }
}

HackerNewsItem.propTypes = propTypes;
HackerNewsItem.defaultProps = defaultProps;

export default HackerNewsItem;
