import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';

import Header from './';

const stories = storiesOf('Header', module);

stories
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/top/1']}>{story()}</MemoryRouter>
  ))
  .add('default', () => <Header />);
