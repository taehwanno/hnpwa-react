import React from 'react';
import { shallow } from 'enzyme';

import Pagination from './';

describe('<Pagination />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<Pagination />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have .Pagination__button--disabled when props.currentPage === 1', () => {
    const wrapper = shallow(<Pagination currentPage={1} />);
    const button = wrapper.find('.Pagination__button--disabled');
    expect(button.props()['data-button']).toBe('prev');
  });

  it('should have .Pagination__button--disabled when props.currentPage === 10', () => {
    const wrapper = shallow(<Pagination currentPage={10} />);
    const button = wrapper.find('.Pagination__button--disabled');
    expect(button.props()['data-button']).toBe('next');
  });

  it('should calls onPaginate with currentPage - 1 when simulate prev button click event', () => {
    const currentPage = 3;
    const onPaginate = jest.fn();
    const wrapper = shallow((
      <Pagination
        currentPage={currentPage}
        maxPage={10}
        onPaginate={onPaginate}
      />
    ));
    wrapper.find('.Pagination__button').at(0).simulate('click');
    expect(onPaginate).toHaveBeenCalledTimes(1);
    expect(onPaginate).toHaveBeenCalledWith(currentPage - 1);
  });

  it('should calls onPaginate with currentPage + 1 when simulate next button click event', () => {
    const currentPage = 3;
    const onPaginate = jest.fn();
    const wrapper = shallow((
      <Pagination
        currentPage={currentPage}
        maxPage={10}
        onPaginate={onPaginate}
      />
    ));
    wrapper.find('.Pagination__button').at(1).simulate('click');
    expect(onPaginate).toHaveBeenCalledTimes(1);
    expect(onPaginate).toHaveBeenCalledWith(currentPage + 1);
  });
});
