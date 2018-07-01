import * as React from 'react';
import { shallow } from 'enzyme';

import { HackerNewsCommentInner } from './';

describe('<HackerNewsComment />', () => {
  it('should match snapshot when render default', () => {
    const wrapper = shallow(<HackerNewsCommentInner />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render comments and contents', () => {
    const contents = {
      content: '<p>How you think React with TypeScript?</p>',
      timeAgo: '1 years ago',
      user: 'taehwanno',
    };
    const comments = [1, 2, 3, 4];
    const wrapper = shallow(<HackerNewsCommentInner comments={comments} contents={contents} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have .HackerNewsComment__inner--hide when state.collapse === true', () => {
    const wrapper = shallow(<HackerNewsCommentInner />);
    wrapper.setState({ collapse: true });
    expect(wrapper.find('.HackerNewsComment__inner--hide').length).toBe(1);
  });

  it('should switch button shape by state.collapse', () => {
    const wrapper = shallow(<HackerNewsCommentInner />);
    expect(wrapper.state().collapse).toBe(false);
    expect(wrapper.find('button').children()).toMatchSnapshot();
    wrapper.setState({ collapse: true });
    expect(wrapper.find('button').children()).toMatchSnapshot();
  });

  it('should toggle state.collapse when simulate button click event', () => {
    const wrapper = shallow(<HackerNewsCommentInner />);
    expect(wrapper.state().collapse).toBe(false);
    wrapper.find('button').simulate('click');
    expect(wrapper.state().collapse).toBe(true);
    wrapper.find('button').simulate('click');
    expect(wrapper.state().collapse).toBe(false);
  });
});
