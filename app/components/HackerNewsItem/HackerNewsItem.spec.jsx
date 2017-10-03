import Immutable from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';

import HackerNewsItem from './';

describe('<HackerNewsItem />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<HackerNewsItem />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <HackerNewsListItem /> and <HackerNewsCommentContainer />', () => {
    const item = Immutable.Map({
      commentsCount: 14,
      id: 1,
      timeAgo: '6 years ago',
      title: 'React with TypeScript',
      points: 14,
      user: 'taehwanno',
      url: 'https://github.com/taehwanno',
    });
    const comments = Immutable.List([1, 2, 3, 4]);
    const wrapper = shallow(<HackerNewsItem comments={comments} item={item} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should calls props.onItemFetch when componentWillMount is called', () => {
    const itemId = 1;
    const onItemFetch = jest.fn();
    shallow(<HackerNewsItem itemId={itemId} onItemFetch={onItemFetch} />);
    expect(onItemFetch.mock.calls.length).toBe(1);
    expect(onItemFetch.mock.calls[0]).toEqual([itemId]);
  });
});
