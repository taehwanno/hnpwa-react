import * as React from 'react';
import { storiesOf } from '@storybook/react';

import LoadingIndicator from './';

const stories = storiesOf('LoadingIndicator', module);

stories
  .add('default', () => (
    <LoadingIndicator active style={{ position: 'absolute', top: 70, left: 70 }} />
  ));
