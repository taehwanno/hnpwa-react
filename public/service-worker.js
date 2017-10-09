importScripts('workbox-sw.js');

/* global WorkboxSW */

const workboxSW = new WorkboxSW({ clientsClaim: true });

workboxSW.precache([]);

workboxSW.router.registerRoute(
  'https://node-hnapi.herokuapp.com/(.*)',
  workboxSW.strategies.networkFirst({ networkTimeoutSeconds: 3 })
);

workboxSW.router.registerRoute(
  'https://www.google-analytics.com/analytics.js',
  workboxSW.strategies.staleWhileRevalidate()
);
