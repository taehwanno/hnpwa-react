import * as React from 'react';
import { shallow } from 'enzyme';

import HackerNewsList from './';

describe('<HackerNewsList />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<HackerNewsList />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when render feeds', () => {
    const feeds = [
      {
        commentsCount: 79,
        domain: 'observer.com',
        id: 15350263,
        points: 172,
        time: 1506534023,
        timeAgo: '20 hours ago',
        title: 'Keybase\'s mission is to make encryption mainstream',
        type: 'link',
        url: 'http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/',
        user: 'BradyDale',
      },
      {
        commentsCount: 131,
        domain: 'nytimes.com',
        id: 15351433,
        points: 74,
        time: 1506540664,
        timeAgo: '18 hours ago',
        title: 'What happens after a defendant is found not guilty by reason of insanity?',
        type: 'link',
        url: 'https://www.nytimes.com/2017/09/27/magazine/when-not-guilty-is-a-life-sentence.html',
        user: 'mcone',
      },
    ];
    const wrapper = shallow(<HackerNewsList feeds={feeds} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have .HackerNewsList__noti when have no items', () => {
    const wrapper = shallow(<HackerNewsList feeds={[]} isFetching={false} />);
    expect(wrapper.find('.HackerNewsList__noti')).toHaveLength(1);
  });
});
