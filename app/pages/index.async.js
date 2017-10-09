import asyncComponent from 'components/asyncComponent';

export const Feed = asyncComponent(() =>
  import(/* webpackChunkName: "feed" */ 'pages/Feed')
    .then(module => module.default));

export const Item = asyncComponent(() =>
  import(/* webpackChunkName: "item" */ 'pages/Item')
    .then(module => module.default));

export const User = asyncComponent(() =>
  import(/* webpackChunkName: "user" */ 'pages/User')
    .then(module => module.default));
