import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'routes/DashBoard/DashBoard';
import Settings from 'routes/DashBoard/Settings/Settings';
import Manage from 'routes/DashBoard/Manage/Manage';
import Statistics from 'routes/DashBoard/Statistics/Statistics';
import Kiosk from 'routes/DashBoard/Kiosk/Kiosk';
import NoMatch from 'routes/NoMatch/NoMatch';
import Authorization from 'common/Authorization/Authorization';
import { Roles } from 'utils/constants';

const KioskRole = Authorization([Roles.kiosk, Roles.staff, Roles.admin]);
const Staff = Authorization([Roles.staff, Roles.admin]);
const Admin = Authorization([Roles.admin]);

const StatisticsProtected = Staff(Statistics);
const ManageProtected = Staff(Manage);
const SettingsProtected = Staff(Settings);
const KioskProtected = KioskRole(Kiosk);

const Root = ({ match }) => (
  <Dashboard {...match}>
    <Switch>
      <Route exact path={`${match.url}`} component={StatisticsProtected} />
      <Route path={`${match.url}/statistics`} component={StatisticsProtected} />
      <Route path={`${match.url}/manage`} component={ManageProtected} />
      <Route path={`${match.url}/settings`} component={SettingsProtected} />
      <Route path={`${match.url}/kiosk`} component={KioskProtected} />
      <Route component={NoMatch} />
    </Switch>
  </Dashboard>
);

export default Root;
