function activateAnalytics() {
  import(/* webpackChunkName: "analytics" */ './google-analytics')
    .then(analytics => analytics.init());
}

export default activateAnalytics;
