importScripts('workbox-google-analytics.js');
importScripts('workbox-sw.js');

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

workboxSW.router.registerRoute(
  'https://www.google-analytics.com/analytics.js',
  workboxSW.strategies.staleWhileRevalidate()
);
