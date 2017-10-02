import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import FeedRoute from 'components/FeedRoute';
import Header from 'components/Header';
import UserRoute from 'components/UserRoute';

function AppShell() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route path="/user/:id" component={UserRoute} />
          <Route path="/news/:page" component={FeedRoute} />
          <Route path="/newest/:page" component={FeedRoute} />
          <Route path="/show/:page" component={FeedRoute} />
          <Route path="/ask/:page" component={FeedRoute} />
          <Route path="/jobs/:page" component={FeedRoute} />
          <Redirect to="/news/1" />
        </Switch>
      </div>
    </div>
  );
}

export default AppShell;
