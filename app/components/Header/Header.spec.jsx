import React from 'react';
import { shallow } from 'enzyme';

import Header from './';

describe('<Header />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
