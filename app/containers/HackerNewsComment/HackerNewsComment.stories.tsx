import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import rootReducer from 'store/rootReducer';
import HackerNewsComment from './';

const stories = storiesOf('HackerNewsComment', module);

const comments = {
  byId: {
    3340746: {
      comments: [],
      // tslint:disable-next-line:max-line-length
      content: '<p>You\'re right. But it was after that pain-staking experience that I became fully engrossed in using unittests for all non-trivial functionality. Live and learn.',
      id: 3340746,
      level: 2,
      parent: 3339842,
      time: 1323630681,
      timeAgo: '6 years ago',
      time_ago: '6 years ago',
      user: 'akg',
    },
    3339842: {
      comments: [3340746],
      // tslint:disable-next-line:max-line-length
      content: '<p>If I have to venture a guess, I guess you didn\'t have a comprehensive set of tests at the function/method level of the code? Having that would probably have caught the bug, because you would have written a test for correctly executing the code in that branch.',
      id: 3339842,
      level: 1,
      parent: 3338903,
      time: 1323601529,
      timeAgo: '6 years ago',
      time_ago: '6 years ago',
      user: 'Confusion',
    },
  },
  posts: {},
};

const preloadedState = { comments };

const store = createStore(rootReducer, preloadedState);

stories
  .add('default', () => (
    <MemoryRouter initialEntries={['/item/3338485']}>
      <Provider store={store}>
        <HackerNewsComment
          commentId={3339842}
          comments={[3340746]}
        />
      </Provider>
    </MemoryRouter>
  ));
