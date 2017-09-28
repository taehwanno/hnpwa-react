import React from 'react';
import { shallow } from 'enzyme';

import HackerNewsListItem from './';

describe('<HackerNewsListItem />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<HackerNewsListItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
