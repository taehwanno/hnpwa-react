import 'autotrack/lib/plugins/clean-url-tracker';
import 'autotrack/lib/plugins/max-scroll-tracker';
import 'autotrack/lib/plugins/outbound-link-tracker';
import 'autotrack/lib/plugins/page-visibility-tracker';
import 'autotrack/lib/plugins/url-change-tracker';
import { v4 } from 'uuid';

import createGaProxy from './createGaProxy';
import {
  TRACKING_VERSION,
  ALL_TRACKERS,
  PROD_TRACKERS,
  TEST_TRACKERS,
  NULL_VALUE,
  CONNECTION_STATUE_DEFAULT_VALUE,
  DIMENSIONS,
  METRICS,
} from './constants';

/* global ga */


/**
 * Command queue proxies
 * (exported so they can be called by other modules if needed).
 */
export const gaAll = createGaProxy(ALL_TRACKERS);
export const gaProd = createGaProxy(PROD_TRACKERS);
export const gaTest = createGaProxy(TEST_TRACKERS);


/**
 * Creates the trackers and sets the default transport and tracking
 * version fields. In non-production environments it also logs hits.
 */
const createTrackers = () => {
  // eslint-disable-next-line
  for (const tracker of ALL_TRACKERS) {
    window.ga('create', tracker.trackingId, 'auto', tracker.name);
  }

  // Ensures all hits are sent via `navigator.sendBeacon()`.
  gaAll('set', 'transport', 'beacon');
};

/**
 * Tracks a JavaScript error with optional fields object overrides.
 * This function is exported so it can be used in other parts of the codebase.
 * E.g.:
 *
 *    `fetch('/api.json').catch(trackError);`
 *
 * @param {(Error|Object)=} err
 * @param {Object=} fieldsObj
 */
export const trackError = (err = {}, fieldsObj = {}) => {
  gaAll('send', 'event', Object.assign({
    eventCategory: 'Error',
    eventAction: err.name || '(no error name)',
    eventLabel: `${err.message}\n${err.stack || '(no stack trace)'}`,
    nonInteraction: true,
  }, fieldsObj));
};


/**
 * Tracks any errors that may have occured on the page prior to analytics being
 * initialized, then adds an event handler to track future errors.
 */
const trackErrors = () => {  // eslint-disable-line
  // Errors that have occurred prior to this script running are stored on
  // `window.__e.q`, as specified in `index.html`.
  // eslint-disable-next-line
  const loadErrorEvents = (window.__e && window.__e.q) || [];

  const trackErrorEvent = (event) => {
    // Use a different eventCategory for uncaught errors.
    const fieldsObj = { eventCategory: 'Uncaught Error' };

    // Some browsers don't have an error property, so we fake it.
    const err = event.error || {
      message: `${event.message} (${event.lineno}:${event.colno})`,
    };

    trackError(err, fieldsObj);
  };

  // Replay any stored load error events.
  for (const event of loadErrorEvents) {  // eslint-disable-line
    trackErrorEvent(event);
  }

  // Add a new listener to track event immediately.
  window.addEventListener('error', trackErrorEvent);
};

/**
 * Accepts a custom dimension or metric and returns it's numerical index.
 * @param {string} definition The definition string (e.g. 'dimension1').
 * @return {number} The definition index.
 */
const getDefinitionIndex = definition => +/\d+$/.exec(definition)[0];

/**
 * Sets a default dimension value for all custom dimensions on all trackers.
 */
const trackCustomDimensions = () => {
  // Sets a default dimension value for all custom dimensions to ensure
  // that every dimension in every hit has *some* value. This is necessary
  // because Google Analytics will drop rows with empty dimension values
  // in your reports.
  Object.keys(DIMENSIONS).forEach((key) => {
    gaAll('set', DIMENSIONS[key], NULL_VALUE);
  });

  gaAll('set', DIMENSIONS.CONNECTION_STATUS, CONNECTION_STATUE_DEFAULT_VALUE);

  // Adds tracking of dimensions known at page load time.
  gaAll((tracker) => {
    tracker.set({
      [DIMENSIONS.TRACKING_VERSION]: TRACKING_VERSION,
      [DIMENSIONS.CLIENT_ID]: tracker.get('clientId'),
      [DIMENSIONS.WINDOW_ID]: v4(),
    });
  });

  // Adds tracking to record each the type, time, uuid, and visibility state
  // of each hit immediately before it's sent.
  gaAll((tracker) => {
    const originalBuildHitTask = tracker.get('buildHitTask');
    tracker.set('buildHitTask', (model) => {
      const qt = model.get('queueTime') || 0;
      model.set(DIMENSIONS.HIT_TIME, String(new Date() - qt), true);
      model.set(DIMENSIONS.HIT_ID, v4(), true);
      model.set(DIMENSIONS.HIT_TYPE, model.get('hitType'), true);
      model.set(DIMENSIONS.VISIBILITY_STATE, document.visibilityState, true);

      originalBuildHitTask(model);
    });
  });
};


/**
 * Requires select autotrack plugins and initializes each one with its
 * respective configuration options. As an example of using multiple
 * trackers, this function only requires the `maxScrollTracker` and
 * `pageVisibilityTracker` plugins on the test trackers, so you can ensure the
 * data collected is relevant prior to sending it to your production property.
 */
const requireAutotrackPlugins = () => {
  gaAll('require', 'cleanUrlTracker', {
    stripQuery: true,
    queryDimensionIndex: getDefinitionIndex(DIMENSIONS.URL_QUERY_PARAMS),
    trailingSlash: 'remove',
  });
  gaAll('require', 'maxScrollTracker', {
    sessionTimeout: 30,
    maxScrollMetricIndex: getDefinitionIndex(METRICS.MAX_SCROLL_PERCENTAGE),
  });
  gaAll('require', 'outboundLinkTracker', {
    events: ['click', 'contextmenu'],
  });
  gaAll('require', 'pageVisibilityTracker', {
    sendInitialPageview: true,
    pageLoadsMetricIndex: getDefinitionIndex(METRICS.PAGE_LOADS),
    visibleMetricIndex: getDefinitionIndex(METRICS.PAGE_VISIBLE),
    sessionTimeout: 30,
    fieldsObj: { [DIMENSIONS.HIT_SOURCE]: 'pageVisibilityTracker' },
  });
  gaAll('require', 'urlChangeTracker', {
    fieldsObj: { [DIMENSIONS.HIT_SOURCE]: 'urlChangeTracker' },
  });
};


/**
 * Gets the DOM and window load times and sends them as custom metrics to
 * Google Analytics via an event hit.
 */
const sendNavigationTimingMetrics = () => {
  // Only track performance in supporting browsers.
  if (!(window.performance && window.performance.timing)) return;

  // If the window hasn't loaded, run this function after the `load` event.
  if (document.readyState !== 'complete') {
    window.addEventListener('load', sendNavigationTimingMetrics);
    return;
  }

  const nt = performance.timing;
  const navStart = nt.navigationStart;

  const responseEnd = Math.round(nt.responseEnd - navStart);
  const domLoaded = Math.round(nt.domContentLoadedEventStart - navStart);
  const windowLoaded = Math.round(nt.loadEventStart - navStart);

  // In some edge cases browsers return very obviously incorrect NT values,
  // e.g. 0, negative, or future times. This validates values before sending.
  const allValuesAreValid = (...values) => values.every(value => value > 0 && value < 6e6);

  if (allValuesAreValid(responseEnd, domLoaded, windowLoaded)) {
    gaAll('send', 'event', {
      eventCategory: 'Navigation Timing',
      eventAction: 'track',
      eventLabel: NULL_VALUE,
      nonInteraction: true,
      [METRICS.RESPONSE_END_TIME]: responseEnd,
      [METRICS.DOM_LOAD_TIME]: domLoaded,
      [METRICS.WINDOW_LOAD_TIME]: windowLoaded,
    });
  }
};


/**
 * Initializes all the analytics setup. Creates trackers and sets initial
 * values on the trackers.
 */
export const init = () => {
  // Initialize the command queue in case analytics.js hasn't loaded yet.
  // eslint-disable-next-line no-return-assign
  window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

  createTrackers();
  trackErrors();
  trackCustomDimensions();
  requireAutotrackPlugins();
  sendNavigationTimingMetrics();
};
