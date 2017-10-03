import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import FeedRoute from 'components/FeedRoute';
import Header from 'components/Header';
import ItemRoute from 'components/ItemRoute';
import UserRoute from 'components/UserRoute';

function AppShell() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route path="/item/:id" component={ItemRoute} />
          <Route path="/user/:id" component={UserRoute} />
          <Route path="/news/:page" component={FeedRoute} />
          <Redirect from="/news" to="/news/1" />
          <Route path="/newest/:page" component={FeedRoute} />
          <Redirect from="/newest" to="/newest/1" />
          <Route path="/show/:page" component={FeedRoute} />
          <Redirect from="/show" to="/show/1" />
          <Route path="/ask/:page" component={FeedRoute} />
          <Redirect from="/ask" to="/ask/1" />
          <Route path="/jobs/:page" component={FeedRoute} />
          <Redirect from="/jobs" to="/jobs/1" />
          <Redirect to="/news/1" />
        </Switch>
      </div>
    </div>
  );
}

export default AppShell;
