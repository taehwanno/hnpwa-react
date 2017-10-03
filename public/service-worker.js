importScripts('https://unpkg.com/workbox-sw@2.0.3/build/importScripts/workbox-sw.prod.v2.0.3.js');

/* global WorkboxSW */

const workboxSW = new WorkboxSW({ clientsClaim: true });

workboxSW.precache([]);

workboxSW.router.registerRoute(
  'https://node-hnapi.herokuapp.com/(.*)',
  workboxSW.strategies.networkFirst({ networkTimeoutSeconds: 3 })
);

workboxSW.router.setDefaultHandler({
  handler: workboxSW.strategies.staleWhileRevalidate()
});
