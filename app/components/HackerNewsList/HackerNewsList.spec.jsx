import Immutable from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';

import HackerNewsList from './';

describe('<HackerNewsList />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<HackerNewsList />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when render feeds', () => {
    const feeds = Immutable.fromJS([
      {
        id: 15350263,
        title: 'Keybase\'s mission is to make encryption mainstream',
        points: 172,
        user: 'BradyDale',
        time: 1506534023,
        timeAgo: '20 hours ago',
        commentsCount: 79,
        type: 'link',
        url: 'http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/',
        domain: 'observer.com',
      },
      {
        id: 15351433,
        title: 'What happens after a defendant is found not guilty by reason of insanity?',
        points: 74,
        user: 'mcone',
        time: 1506540664,
        timeAgo: '18 hours ago',
        commentsCount: 131,
        type: 'link',
        url: 'https://www.nytimes.com/2017/09/27/magazine/when-not-guilty-is-a-life-sentence.html',
        domain: 'nytimes.com',
      },
    ]);
    const wrapper = shallow(<HackerNewsList feeds={feeds} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have .HackerNewsList__noti when have no items', () => {
    const wrapper = shallow(<HackerNewsList feeds={Immutable.List()} isFetching={false} />);
    expect(wrapper.find('.HackerNewsList__noti')).toHaveLength(1);
  });
});
