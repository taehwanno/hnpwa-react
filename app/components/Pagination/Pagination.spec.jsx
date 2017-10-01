import React from 'react';
import { shallow } from 'enzyme';

import Pagination from './';

describe('<Pagination />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<Pagination />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should calls onPaginate with currentPage - 1 when simulate prev button click event', () => {
    const currentPage = 3;
    const onPaginate = jest.fn();
    const wrapper = shallow(
      <Pagination
        currentPage={currentPage}
        maxPage={10}
        onPaginate={onPaginate}
      />,
    );
    wrapper.find('.Pagination__button').at(0).simulate('click');
    expect(onPaginate.mock.calls.length).toBe(1);
    expect(onPaginate.mock.calls[0]).toEqual([currentPage - 1]);
  });

  it('should calls onPaginate with currentPage + 1 when simulate next button click event', () => {
    const currentPage = 3;
    const onPaginate = jest.fn();
    const wrapper = shallow(
      <Pagination
        currentPage={currentPage}
        maxPage={10}
        onPaginate={onPaginate}
      />,
    );
    wrapper.find('.Pagination__button').at(1).simulate('click');
    expect(onPaginate.mock.calls.length).toBe(1);
    expect(onPaginate.mock.calls[0]).toEqual([currentPage + 1]);
  });
});
