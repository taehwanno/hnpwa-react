import * as cx from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeGetChildrenComments, makeGetCommentContents } from 'store/selectors';

import './HackerNewsComment.scss';

interface IHackerNewsCommentInnerProps {
  readonly comments?: number[];
  readonly contents?: {
    readonly content: string;
    readonly timeAgo: string;
    readonly user: string;
  };
}

interface IHackerNewsCommentInnerState {
  readonly collapse: boolean;
}

export class HackerNewsCommentInner extends React.Component<
  IHackerNewsCommentInnerProps,
  IHackerNewsCommentInnerState
> {
  public static defaultProps: IHackerNewsCommentInnerProps = {
    comments: [],
    contents: {
      content: '',
      timeAgo: '',
      user: '',
    },
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
            href={`/user/${contents.user}`}
            to={`/user/${contents.user}`}
          >
            {contents.user}
          </Link>
          {' '}
          <span>{contents.timeAgo}</span>
        </div>
        <div className={innerClassName}>
          <div
            className="HackerNewsComment__content"
            dangerouslySetInnerHTML={{ __html: contents.content }} // eslint-disable-line react/no-danger
          />
          {comments.map(id => <HackerNewsComment commentId={id} key={id} />)}
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
