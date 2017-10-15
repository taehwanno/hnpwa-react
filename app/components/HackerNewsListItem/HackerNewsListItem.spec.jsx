import React from 'react';
import { shallow } from 'enzyme';

import HackerNewsListItem from './';

describe('<HackerNewsListItem />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<HackerNewsListItem />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render points when props.points === null', () => {
    const wrapper = shallow((
      <HackerNewsListItem
        commentsCount={48}
        id={15350263}
        timeAgo="20 hours ago"
        title="Keybase's mission is to make encryption mainstream"
        points={null}
        user="BradyDale"
        url="http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/"
      />
    ));
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render user when props.user === null', () => {
    const wrapper = shallow((
      <HackerNewsListItem
        commentsCount={48}
        id={15350263}
        timeAgo="20 hours ago"
        title="Keybase's mission is to make encryption mainstream"
        points={147}
        user={null}
        url="http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/"
      />
    ));
    expect(wrapper).toMatchSnapshot();
  });
});
