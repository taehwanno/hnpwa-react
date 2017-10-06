import React from 'react';
import { shallow } from 'enzyme';

import Pagination from 'components/Pagination';
import LocationPagination from './';

const history = { push() {} };
const location = { pathname: '/news/1' };

describe('<LocationPagination />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<LocationPagination history={history} location={location} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should return query array when calls LocationPagination.getRequestQuery', () => {
    expect(LocationPagination.getRequestQuery('/news/1')).toEqual(['news', '1']);
  });

  it('should calls props.onPaginate in componentWillMount when URL path is valid and props.feedCount === 0', () => {
    const onPaginate = jest.fn(() => Promise.resolve());
    shallow(<LocationPagination history={history} location={location} onPaginate={onPaginate} />);
    expect(onPaginate.mock.calls.length).toBe(1);
  });

  it('should not calls props.onPaginate in componentWillMount when URL path is valid and props.feedCount !== 0', () => {
    const onPaginate = jest.fn(() => Promise.resolve());
    shallow(
      <LocationPagination
        history={history}
        feedCount={10}
        location={location}
        onPaginate={onPaginate}
      />,
    );
    expect(onPaginate.mock.calls.length).toBe(0);
  });

  it('should not calls props.onPaginate when location.pathname === \'/\' in componentWillMount', () => {
    const onPaginate = jest.fn();
    shallow(
      <LocationPagination
        history={history}
        location={{ pathname: '/' }}
        onPaginate={onPaginate}
      />,
    );
    expect(onPaginate.mock.calls.length).toBe(0);
  });

  it('should calls props.onPaginate when props.location.pathname is changed in componentWillReceiveProps', () => {
    const onPaginate = jest.fn(() => Promise.resolve());
    const wrapper = shallow(
      <LocationPagination
        history={history}
        location={location}
        onPaginate={onPaginate}
      />,
    );
    expect(onPaginate.mock.calls.length).toBe(1);
    wrapper.setProps({ location: { pathname: '/news/1' } });
    expect(onPaginate.mock.calls.length).toBe(1);
    wrapper.setProps({ location: { pathname: '/jobs/1' } });
    expect(onPaginate.mock.calls.length).toBe(2);
  });

  it('should calls props.history.push when simulate <Pagination /> onPaginate', () => {
    const page = 2;
    const push = jest.fn();
    const historyMock = { push };
    const wrapper = shallow(<LocationPagination history={historyMock} location={location} />);
    wrapper.find(Pagination).simulate('paginate', page);
    expect(push.mock.calls.length).toBe(1);
    expect(push.mock.calls[0]).toEqual([`/news/${page}`]);
  });
});
