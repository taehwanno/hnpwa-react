import React from 'react';
import { shallow } from 'enzyme';

import Header, { makeIsActive } from './';

describe('<Header />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should make a function that returns true when location.pathname include path', () => {
    const newsIsActive = makeIsActive('/news');
    expect(newsIsActive(null, { pathname: '/news/1' })).toBe(true);
    expect(newsIsActive(null, { pathname: '/newest/1' })).toBe(false);

    const newestIsActive = makeIsActive('/newest');
    expect(newestIsActive(null, { pathname: '/newest/1' })).toBe(true);
    expect(newestIsActive(null, { pathname: '/show/1' })).toBe(false);
  });
});
