import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'routes/DashBoard/DashBoard';
import Settings from 'routes/Settings/Settings';
import ManageUsers from 'routes/ManageUsers/ManageUsers';
import Statistics from 'routes/Statistics/Statistics';
import NoMatch from 'routes/NoMatch/NoMatch';

const Root = ({ match }) => (
  <Dashboard {...match}>
    <Switch>
      <Route exact path={`${match.url}`} component={Statistics} />
      <Route path={`${match.url}/statistics`} component={Statistics} />
      <Route path={`${match.url}/manage`} component={ManageUsers} />
      <Route path={`${match.url}/settings`} component={Settings} />
      <Route component={NoMatch} />
    </Switch>
  </Dashboard>
);

export default Root;
