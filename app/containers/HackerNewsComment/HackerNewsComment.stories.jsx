import Immutable from 'immutable';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import rootReducer from 'store/rootReducer';
import HackerNewsComment from './';

const stories = storiesOf('HackerNewsComment', module);

const comments = Immutable.Map({
  byId: Immutable.Map(new Map([
    [3340746, Immutable.Map({
      id: 3340746,
      level: 2,
      user: 'akg',
      time: 1323630681,
      time_ago: '6 years ago',
      timeAgo: '6 years ago',
      content: '<p>You\'re right. But it was after that pain-staking experience that I became fully engrossed in using unittests for all non-trivial functionality. Live and learn.',
      comments: Immutable.List(),
      parent: 3339842,
    })],
    [3339842, Immutable.Map({
      id: 3339842,
      level: 1,
      user: 'Confusion',
      time: 1323601529,
      time_ago: '6 years ago',
      timeAgo: '6 years ago',
      content: '<p>If I have to venture a guess, I guess you didn\'t have a comprehensive set of tests at the function/method level of the code? Having that would probably have caught the bug, because you would have written a test for correctly executing the code in that branch.',
      comments: Immutable.List([3340746]),
      parent: 3338903,
    })],
  ])),
  posts: Immutable.Map(),
});

const preloadedState = Immutable.Map({ comments });

const store = createStore(rootReducer, preloadedState);

stories
  .add('default', () => (
    <MemoryRouter initialEntries={['/item/3338485']}>
      <Provider store={store}>
        <HackerNewsComment
          commentId={3339842}
          comments={Immutable.List([3340746])}
        />
      </Provider>
    </MemoryRouter>
  ));
