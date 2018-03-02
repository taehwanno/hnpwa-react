import { List, Map } from 'immutable';
import * as React from 'react';
import PropTypes from 'prop-types';

import HackerNewsComment from 'containers/HackerNewsComment';
import HackerNewsListItem from 'components/HackerNewsListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import './HackerNewsItem.scss';

interface IHackerNewsItemProps {
  comments?: List<number> | null;
  done?: () => void;
  item?: Map<string, any> | null;
  itemId?: number;
  onItemFetch?: (arg: number) => Promise<any>;
}

class HackerNewsItem extends React.Component<IHackerNewsItemProps> {
  public static defaultProps = {
    comments: null,
    done() {},
    item: null,
    itemId: 0,
    onItemFetch(arg: number) { return Promise.resolve(); },
  };

  public componentWillMount() {
    const { done, item, itemId } = this.props;

    if (!item) {
      this.props.onItemFetch(itemId).then(done, done);
    }
  }

  public render() {
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

export default HackerNewsItem;
