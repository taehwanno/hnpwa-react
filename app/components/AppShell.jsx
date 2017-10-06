import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from 'components/Header';
import { Feed, Item, User } from 'pages';

function AppShell() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route path="/item/:id" component={Item} />
          <Route path="/user/:id" component={User} />
          <Route path="/news/:page" component={Feed} />
          <Redirect from="/news" to="/news/1" />
          <Route path="/newest/:page" component={Feed} />
          <Redirect from="/newest" to="/newest/1" />
          <Route path="/show/:page" component={Feed} />
          <Redirect from="/show" to="/show/1" />
          <Route path="/ask/:page" component={Feed} />
          <Redirect from="/ask" to="/ask/1" />
          <Route path="/jobs/:page" component={Feed} />
          <Redirect from="/jobs" to="/jobs/1" />
          <Redirect to="/news/1" />
        </Switch>
      </div>
    </div>
  );
}

export default AppShell;
