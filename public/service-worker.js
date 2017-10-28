importScripts('https://unpkg.com/workbox-google-analytics@2.1.0/build/importScripts/workbox-google-analytics.prod.v2.1.0.js');
importScripts('https://unpkg.com/workbox-sw@2.1.0/build/importScripts/workbox-sw.prod.v2.1.0.js');

/* global workbox, WorkboxSW */

workbox.googleAnalytics.initialize({
  parameterOverrides: {
    cd10: 'offline'
  },
  hitFilter: (searchParams) => {
    const qt = searchParams.get('qt');
    searchParams.set('cm7', qt);
  }
});

const workboxSW = new WorkboxSW({ clientsClaim: true });

workboxSW.precache([]);

workboxSW.router.registerRoute(
  'https://node-hnapi.herokuapp.com/(.*)',
  workboxSW.strategies.networkFirst({ networkTimeoutSeconds: 3 })
);

workboxSW.router.setDefaultHandler({
  handler: workboxSW.strategies.staleWhileRevalidate()
});
