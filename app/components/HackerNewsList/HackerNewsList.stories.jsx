import Immutable from 'immutable';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import HackerNewsList from './';

const stories = storiesOf('HackerNewsList', module);

stories
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/news/1']}>
      {story()}
    </MemoryRouter>
  ))
  .add('fetching data', () => <HackerNewsList isFetching />)
  .add('no data', () => <HackerNewsList feeds={Immutable.List()} isFetching={false} />)
  .add('with data', () => (
    <HackerNewsList
      feeds={Immutable.fromJS([
        {
          id: 15350263,
          title: 'Keybase\'s mission is to make encryption mainstream',
          points: 172,
          user: 'BradyDale',
          time: 1506534023,
          timeAgo: '20 hours ago',
          commentsCount: 79,
          type: 'link',
          url: 'http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/',
          domain: 'observer.com',
        },
        {
          id: 15351433,
          title: 'What happens after a defendant is found not guilty by reason of insanity?',
          points: 74,
          user: 'mcone',
          time: 1506540664,
          timeAgo: '18 hours ago',
          commentsCount: 131,
          type: 'link',
          url: 'https://www.nytimes.com/2017/09/27/magazine/when-not-guilty-is-a-life-sentence.html',
          domain: 'nytimes.com',
        },
        {
          id: 15334928,
          title: 'Hunt and House: Depictions of Medieval Life in German Playing Cards (2016)',
          points: 21,
          user: 'benbreen',
          time: 1506381168,
          timeAgo: '3 days ago',
          commentsCount: 5,
          type: 'link',
          url: 'http://www.metmuseum.org/blogs/in-season/2016/hunt-and-house',
          domain: 'metmuseum.org',
        },
        {
          id: 15350264,
          title: 'Keybase\'s mission is to make encryption mainstream',
          points: 172,
          user: 'BradyDale',
          time: 1506534023,
          timeAgo: '20 hours ago',
          commentsCount: 79,
          type: 'link',
          url: 'http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/',
          domain: 'observer.com',
        },
        {
          id: 15351434,
          title: 'What happens after a defendant is found not guilty by reason of insanity?',
          points: 74,
          user: 'mcone',
          time: 1506540664,
          timeAgo: '18 hours ago',
          commentsCount: 131,
          type: 'link',
          url: 'https://www.nytimes.com/2017/09/27/magazine/when-not-guilty-is-a-life-sentence.html',
          domain: 'nytimes.com',
        },
        {
          id: 15334924,
          title: 'Hunt and House: Depictions of Medieval Life in German Playing Cards (2016)',
          points: 21,
          user: 'benbreen',
          time: 1506381168,
          timeAgo: '3 days ago',
          commentsCount: 5,
          type: 'link',
          url: 'http://www.metmuseum.org/blogs/in-season/2016/hunt-and-house',
          domain: 'metmuseum.org',
        },
        {
          id: 15350265,
          title: 'Keybase\'s mission is to make encryption mainstream',
          points: 172,
          user: 'BradyDale',
          time: 1506534023,
          timeAgo: '20 hours ago',
          commentsCount: 79,
          type: 'link',
          url: 'http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/',
          domain: 'observer.com',
        },
        {
          id: 15351435,
          title: 'What happens after a defendant is found not guilty by reason of insanity?',
          points: 74,
          user: 'mcone',
          time: 1506540664,
          timeAgo: '18 hours ago',
          commentsCount: 131,
          type: 'link',
          url: 'https://www.nytimes.com/2017/09/27/magazine/when-not-guilty-is-a-life-sentence.html',
          domain: 'nytimes.com',
        },
        {
          id: 15334925,
          title: 'Hunt and House: Depictions of Medieval Life in German Playing Cards (2016)',
          points: 21,
          user: 'benbreen',
          time: 1506381168,
          timeAgo: '3 days ago',
          commentsCount: 5,
          type: 'link',
          url: 'http://www.metmuseum.org/blogs/in-season/2016/hunt-and-house',
          domain: 'metmuseum.org',
        },
        {
          id: 15350262,
          title: 'Keybase\'s mission is to make encryption mainstream',
          points: 172,
          user: 'BradyDale',
          time: 1506534023,
          timeAgo: '20 hours ago',
          commentsCount: 79,
          type: 'link',
          url: 'http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/',
          domain: 'observer.com',
        },
        {
          id: 15351423,
          title: 'What happens after a defendant is found not guilty by reason of insanity?',
          points: 74,
          user: 'mcone',
          time: 1506540664,
          timeAgo: '18 hours ago',
          commentsCount: 131,
          type: 'link',
          url: 'https://www.nytimes.com/2017/09/27/magazine/when-not-guilty-is-a-life-sentence.html',
          domain: 'nytimes.com',
        },
        {
          id: 15334922,
          title: 'Hunt and House: Depictions of Medieval Life in German Playing Cards (2016)',
          points: 21,
          user: 'benbreen',
          time: 1506381168,
          timeAgo: '3 days ago',
          commentsCount: 5,
          type: 'link',
          url: 'http://www.metmuseum.org/blogs/in-season/2016/hunt-and-house',
          domain: 'metmuseum.org',
        },
      ])}
    />
  ));
