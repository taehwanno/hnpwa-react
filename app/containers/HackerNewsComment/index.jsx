import cx from 'classnames';
import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeGetChildrenComments, makeGetCommentContents } from 'store/selectors';

import './HackerNewsComment.scss';

const propTypes = {
  comments: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  contents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  comments: Immutable.List(),
  contents: Immutable.Map(),
};

export class HackerNewsCommentInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse() {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  }

  render() {
    const { comments, contents } = this.props;
    const { collapse } = this.state;

    const innerClassName = cx('HackerNewsComment__inner', {
      'HackerNewsComment__inner--hide': collapse,
    });

    return (
      <div className="HackerNewsComment">
        <div className="HackerNewsComment__head">
          <button
            type="button"
            onClick={this.toggleCollapse}
          >
            {collapse ? '[+]' : '[-]'}
          </button>
          {' '}
          <Link
            href={`/user/${contents.get('user')}`}
            to={`/user/${contents.get('user')}`}
          >
            {contents.get('user')}
          </Link>
          {' '}
          <span>{contents.get('timeAgo')}</span>
        </div>
        <div className={innerClassName}>
          <div
            className="HackerNewsComment__content"
            dangerouslySetInnerHTML={{ __html: contents.get('content') }} // eslint-disable-line react/no-danger
          />
          {comments.map(id => <HackerNewsComment commentId={id} key={id} />).toArray()}
        </div>
      </div>
    );
  }
}

HackerNewsCommentInner.propTypes = propTypes;
HackerNewsCommentInner.defaultProps = defaultProps;

const makeMapStateToProps = () => {
  const getChildrenComments = makeGetChildrenComments();
  const getCommentContents = makeGetCommentContents();

  return (state, props) => ({
    comments: getChildrenComments(state, props),
    contents: getCommentContents(state, props),
  });
};

const HackerNewsComment = connect(makeMapStateToProps, null)(HackerNewsCommentInner);
export default HackerNewsComment;
