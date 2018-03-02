import * as cx from 'classnames';
import { List, Map } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeGetChildrenComments, makeGetCommentContents } from 'store/selectors';

import './HackerNewsComment.scss';

interface IHackerNewsCommentInnerProps {
  readonly comments?: List<number>;
  readonly contents?: Map<string, string>;
}

interface IHackerNewsCommentInnerState {
  collapse: boolean;
}

export class HackerNewsCommentInner extends React.Component<
  IHackerNewsCommentInnerProps,
  IHackerNewsCommentInnerState
> {
  public static defaultProps: IHackerNewsCommentInnerProps = {
    comments: List<number>(),
    contents: Map<string, string>(),
  };

  public constructor(props) {
    super(props);
    this.state = { collapse: false };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  private toggleCollapse() {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  }

  public render() {
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

const makeMapStateToProps = () => {
  const getChildrenComments = makeGetChildrenComments() as any;
  const getCommentContents = makeGetCommentContents() as any;

  return (state, props) => ({
    comments: getChildrenComments(state, props),
    contents: getCommentContents(state, props),
  });
};

const HackerNewsComment = connect(makeMapStateToProps, null)(HackerNewsCommentInner);
export default HackerNewsComment;
