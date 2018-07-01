import * as React from 'react';
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
  .add('no data', () => <HackerNewsList feeds={[]} isFetching={false} />)
  .add('with data', () => (
    <HackerNewsList
      feeds={[
        {
          commentsCount: 79,
          domain: 'observer.com',
          id: 15350263,
          points: 172,
          time: 1506534023,
          timeAgo: '20 hours ago',
          title: 'Keybase\'s mission is to make encryption mainstream',
          type: 'link',
          url: 'http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/',
          user: 'BradyDale',
        },
        {
          commentsCount: 131,
          domain: 'nytimes.com',
          id: 15351433,
          points: 74,
          time: 1506540664,
          timeAgo: '18 hours ago',
          title: 'What happens after a defendant is found not guilty by reason of insanity?',
          type: 'link',
          url: 'https://www.nytimes.com/2017/09/27/magazine/when-not-guilty-is-a-life-sentence.html',
          user: 'mcone',
        },
        {
          commentsCount: 5,
          domain: 'metmuseum.org',
          id: 15334928,
          points: 21,
          time: 1506381168,
          timeAgo: '3 days ago',
          title: 'Hunt and House: Depictions of Medieval Life in German Playing Cards (2016)',
          type: 'link',
          url: 'http://www.metmuseum.org/blogs/in-season/2016/hunt-and-house',
          user: 'benbreen',
        },
        {
          commentsCount: 79,
          domain: 'observer.com',
          id: 15350264,
          points: 172,
          time: 1506534023,
          timeAgo: '20 hours ago',
          title: 'Keybase\'s mission is to make encryption mainstream',
          type: 'link',
          url: 'http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/',
          user: 'BradyDale',
        },
        {
          commentsCount: 131,
          domain: 'nytimes.com',
          id: 15351434,
          points: 74,
          time: 1506540664,
          timeAgo: '18 hours ago',
          title: 'What happens after a defendant is found not guilty by reason of insanity?',
          type: 'link',
          url: 'https://www.nytimes.com/2017/09/27/magazine/when-not-guilty-is-a-life-sentence.html',
          user: 'mcone',
        },
        {
          commentsCount: 5,
          domain: 'metmuseum.org',
          id: 15334924,
          points: 21,
          time: 1506381168,
          timeAgo: '3 days ago',
          title: 'Hunt and House: Depictions of Medieval Life in German Playing Cards (2016)',
          type: 'link',
          url: 'http://www.metmuseum.org/blogs/in-season/2016/hunt-and-house',
          user: 'benbreen',
        },
        {
          commentsCount: 79,
          domain: 'observer.com',
          id: 15350265,
          points: 172,
          time: 1506534023,
          timeAgo: '20 hours ago',
          title: 'Keybase\'s mission is to make encryption mainstream',
          type: 'link',
          url: 'http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/',
          user: 'BradyDale',
        },
        {
          commentsCount: 131,
          domain: 'nytimes.com',
          id: 15351435,
          points: 74,
          time: 1506540664,
          timeAgo: '18 hours ago',
          title: 'What happens after a defendant is found not guilty by reason of insanity?',
          type: 'link',
          url: 'https://www.nytimes.com/2017/09/27/magazine/when-not-guilty-is-a-life-sentence.html',
          user: 'mcone',
        },
        {
          commentsCount: 5,
          domain: 'metmuseum.org',
          id: 15334925,
          points: 21,
          time: 1506381168,
          timeAgo: '3 days ago',
          title: 'Hunt and House: Depictions of Medieval Life in German Playing Cards (2016)',
          type: 'link',
          url: 'http://www.metmuseum.org/blogs/in-season/2016/hunt-and-house',
          user: 'benbreen',
        },
        {
          commentsCount: 79,
          domain: 'observer.com',
          id: 15350262,
          points: 172,
          time: 1506534023,
          timeAgo: '20 hours ago',
          title: 'Keybase\'s mission is to make encryption mainstream',
          type: 'link',
          url: 'http://observer.com/2017/09/keybase-max-krohn-chris-coyne-okcupid/',
          user: 'BradyDale',
        },
        {
          commentsCount: 131,
          domain: 'nytimes.com',
          id: 15351423,
          points: 74,
          time: 1506540664,
          timeAgo: '18 hours ago',
          title: 'What happens after a defendant is found not guilty by reason of insanity?',
          type: 'link',
          url: 'https://www.nytimes.com/2017/09/27/magazine/when-not-guilty-is-a-life-sentence.html',
          user: 'mcone',
        },
        {
          commentsCount: 5,
          domain: 'metmuseum.org',
          id: 15334922,
          points: 21,
          time: 1506381168,
          timeAgo: '3 days ago',
          title: 'Hunt and House: Depictions of Medieval Life in German Playing Cards (2016)',
          type: 'link',
          url: 'http://www.metmuseum.org/blogs/in-season/2016/hunt-and-house',
          user: 'benbreen',
        },
      ]}
    />
  ));
