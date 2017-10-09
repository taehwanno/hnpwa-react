export const TRACKING_VERSION = '1';

export const ALL_TRACKERS = [
  { name: 'prod', trackingId: 'UA-107782050-1' },
  { name: 'test', trackingId: 'UA-107782050-2' },
];

export const PROD_TRACKERS = ALL_TRACKERS.filter(({ name }) => /prod/.test(name));
export const TEST_TRACKERS = ALL_TRACKERS.filter(({ name }) => /test/.test(name));

export const NULL_VALUE = '(not set)';
export const CONNECTION_STATUE_DEFAULT_VALUE = 'online';

export const DIMENSIONS = {
  TRACKING_VERSION: 'dimension1',
  CLIENT_ID: 'dimension2',
  WINDOW_ID: 'dimension3',
  HIT_ID: 'dimension4',
  HIT_TIME: 'dimension5',
  HIT_TYPE: 'dimension6',
  HIT_SOURCE: 'dimension7',
  VISIBILITY_STATE: 'dimension8',
  URL_QUERY_PARAMS: 'dimension9',
  CONNECTION_STATUS: 'dimension10',
};

export const METRICS = {
  RESPONSE_END_TIME: 'metric1',
  DOM_LOAD_TIME: 'metric2',
  WINDOW_LOAD_TIME: 'metric3',
  PAGE_VISIBLE: 'metric4',
  MAX_SCROLL_PERCENTAGE: 'metric5',
  PAGE_LOADS: 'metric6',
  CONNECTION_ELAPSED_TIME: 'metric7',
};
