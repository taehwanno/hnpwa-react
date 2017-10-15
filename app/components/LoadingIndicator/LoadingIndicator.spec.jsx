import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from './';

describe('<LoadingIndicator />', () => {
  it('should return null when render default', () => {
    const wrapper = shallow(<LoadingIndicator />);
    expect(wrapper.type()).toBe(null);
  });

  it('should return DOM tree when props.active === true', () => {
    const wrapper = shallow(<LoadingIndicator active />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass style to root div when props.style exist', () => {
    const style = { position: 'absolute', top: 10, left: 10 };
    const wrapper = shallow(<LoadingIndicator active style={style} />);
    expect(wrapper.props().style).toEqual(style);
  });
});
