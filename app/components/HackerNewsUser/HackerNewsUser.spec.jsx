import Immutable from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';

import HackerNewsUser from './';

describe('<HackerNewsUser />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<HackerNewsUser user="taehwanno" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render user view when information exist', () => {
    const information = Immutable.Map({ created: '3 years ago', karma: 1234 });
    const wrapper = shallow(<HackerNewsUser information={information} user="taehwanno" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should calls props.onUserFetch in componentWillMount when props.information not exist', () => {
    const onUserFetch = jest.fn(() => Promise.resolve());
    shallow(<HackerNewsUser user="taehwanno" onUserFetch={onUserFetch} />);
    expect(onUserFetch.mock.calls.length).toBe(1);
    expect(onUserFetch.mock.calls[0]).toEqual(['taehwanno']);
  });

  it('should not calls props.onUserFetch in componentWillMount when props.information exist', () => {
    const onUserFetch = jest.fn();
    shallow(<HackerNewsUser information={Immutable.Map()} user="taehwanno" onUserFetch={onUserFetch} />);
    expect(onUserFetch.mock.calls.length).toBe(0);
  });
});
