import React from 'react';
import { shallow } from 'enzyme';

import Pagination from 'components/Pagination';
import LocationPagination from './';

const location = { pathname: '/news/1' };

describe('<LocationPagination />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<LocationPagination location={location} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should return query array when calls LocationPagination.getRequestQuery', () => {
    expect(LocationPagination.getRequestQuery('/news/1')).toEqual(['news', '1']);
  });

  it('should calls props.onPaginate when componentWillMount is called', () => {
    const onPaginate = jest.fn();
    shallow(<LocationPagination location={location} onPaginate={onPaginate} />);
    expect(onPaginate.mock.calls.length).toBe(1);
  });

  it('should not calls props.onPaginate when location.pathname === \'/\' in componentWillMount', () => {
    const onPaginate = jest.fn();
    shallow(<LocationPagination location={{ pathname: '/' }} onPaginate={onPaginate} />);
    expect(onPaginate.mock.calls.length).toBe(0);
  });

  it('should calls props.onPaginate when props.location.pathname is changed in componentWillReceiveProps', () => {
    const onPaginate = jest.fn();
    const wrapper = shallow(<LocationPagination location={location} onPaginate={onPaginate} />);
    expect(onPaginate.mock.calls.length).toBe(1);
    wrapper.setProps({ location: { pathname: '/news/1' } });
    expect(onPaginate.mock.calls.length).toBe(1);
    wrapper.setProps({ location: { pathname: '/jobs/1' } });
    expect(onPaginate.mock.calls.length).toBe(2);
  });

  it('should calls props.onPaginate when simulate <Pagination /> onPaginate', () => {
    const onPaginate = jest.fn();
    const wrapper = shallow(<LocationPagination location={location} onPaginate={onPaginate} />);
    expect(onPaginate.mock.calls.length).toBe(1);
    wrapper.find(Pagination).simulate('paginate', 2);
    expect(onPaginate.mock.calls.length).toBe(2);
    expect(onPaginate.mock.calls[1]).toEqual(['news', 2]);
  });
});
