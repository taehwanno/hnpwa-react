import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';

import '../app/scss/style.scss';
import './storybook.scss';

setAddon(infoAddon);

const req = require.context('../app', true, /\.stories\.jsx$/);


setOptions({
  name: 'HNPWA with React',
  url: 'https://github.com/taehwanno/hnpwa-with-react',
});

function loadStories() {
  req.keys().forEach(path => req(path));
}

configure(loadStories, module);
