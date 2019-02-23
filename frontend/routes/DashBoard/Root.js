import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'routes/DashBoard/DashBoard';
import Settings from 'routes/DashBoard/Settings/Settings';
import Manage from 'routes/DashBoard/Manage/Manage';
import Statistics from 'routes/DashBoard/Statistics/Statistics';
import Kiosk from 'routes/DashBoard/Kiosk/Kiosk';
import NoMatch from 'routes/NoMatch/NoMatch';

const Root = ({ match }) => (
  <Dashboard {...match}>
    <Switch>
      <Route exact path={`${match.url}`} component={Statistics} />
      <Route path={`${match.url}/statistics`} component={Statistics} />
      <Route path={`${match.url}/manage`} component={Manage} />
      <Route path={`${match.url}/settings`} component={Settings} />
      <Route path={`${match.url}/kiosk`} component={Kiosk} />
      <Route component={NoMatch} />
    </Switch>
  </Dashboard>
);

export default Root;
