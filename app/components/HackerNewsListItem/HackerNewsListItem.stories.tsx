import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import HackerNewsListItem from './';

const stories = storiesOf('HackerNewsListItem', module);

stories
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/news/1']}>
      {story()}
    </MemoryRouter>
  ))
  .add('default', () => (
    <HackerNewsListItem
      commentsCount={48}
      id={15350263}
      timeAgo="20 hours ago"
      title="Keybase's mission is to make encryption mainstream"
      points={172}
      user="BradyDale"
      url="http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/"
    />
  ))
  .add('user is null', () => (
    <HackerNewsListItem
      commentsCount={48}
      id={15350263}
      timeAgo="20 hours ago"
      title="Keybase's mission is to make encryption mainstream"
      points={172}
      user={null}
      url="http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/"
    />
  ))
  .add('points are null', () => (
    <HackerNewsListItem
      commentsCount={48}
      id={15350263}
      timeAgo="20 hours ago"
      title="Keybase's mission is to make encryption mainstream"
      points={null}
      user="BradyDale"
      url="http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/"
    />
  ))
  .add('user and points are null', () => (
    <HackerNewsListItem
      commentsCount={48}
      id={15350263}
      timeAgo="20 hours ago"
      title="Keybase's mission is to make encryption mainstream"
      points={null}
      user={null}
      url="http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/"
    />
  ));
