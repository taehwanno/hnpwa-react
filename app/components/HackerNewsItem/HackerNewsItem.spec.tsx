import * as React from 'react';
import { shallow } from 'enzyme';

import HackerNewsItem from './';

describe('<HackerNewsItem />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<HackerNewsItem />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <HackerNewsListItem /> and <HackerNewsCommentContainer />', () => {
    const item = {
      commentsCount: 14,
      id: 1,
      timeAgo: '6 years ago',
      title: 'React with TypeScript',
      points: 14,
      user: 'taehwanno',
      url: 'https://github.com/taehwanno',
    };
    const comments = [1, 2, 3, 4];
    const wrapper = shallow(<HackerNewsItem comments={comments} item={item} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should calls props.onItemFetch in componentWillMount when the item does not exist', () => {
    const itemId = 1;
    const onItemFetch = jest.fn(() => Promise.resolve());
    shallow(<HackerNewsItem itemId={itemId} onItemFetch={onItemFetch} />);
    expect(onItemFetch).toHaveBeenCalledTimes(1);
    expect(onItemFetch).toHaveBeenCalledWith(itemId);
  });

  it('should not calls props.onItemFetch in componentWillMount when the item does exist', () => {
    const onItemFetch = jest.fn();
    shallow(<HackerNewsItem item={{}} onItemFetch={onItemFetch} />);
    expect(onItemFetch).not.toHaveBeenCalled();
  });
});
