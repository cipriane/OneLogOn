import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'routes/DashBoard/DashBoard';
import Settings from 'routes/DashBoard/Settings/Settings';
import Employees from 'routes/DashBoard/Employees/Employees';
import Admin from 'routes/DashBoard/Admin/Admin';
import Statistics from 'routes/DashBoard/Statistics/Statistics';
import Kiosk from 'routes/DashBoard/Kiosk/Kiosk';
import NoMatch from 'routes/NoMatch/NoMatch';
import Authorization from 'common/Authorization/Authorization';
import { Roles } from 'utils/constants';

const KioskRole = Authorization([Roles.kiosk, Roles.superAdmin]);
const AdminRole = Authorization([Roles.superAdmin, Roles.admin]);
const SuperAdminRole = Authorization([Roles.superAdmin]);

const StatisticsProtected = AdminRole(Statistics);
const SettingsProtected = AdminRole(Settings);
const EmployeesProtected = AdminRole(Employees);
const AdminProtected = SuperAdminRole(Admin);
const KioskProtected = KioskRole(Kiosk);

const Root = ({ match }) => (
  <Dashboard {...match}>
    <Switch>
      <Route exact path={`${match.url}`} component={StatisticsProtected} />
      <Route path={`${match.url}/statistics`} component={StatisticsProtected} />
      <Route path={`${match.url}/settings`} component={SettingsProtected} />
      <Route path={`${match.url}/employees`} component={EmployeesProtected} />
      <Route path={`${match.url}/admin`} component={AdminProtected} />
      <Route path={`${match.url}/kiosk`} component={KioskProtected} />
      <Route component={NoMatch} />
    </Switch>
  </Dashboard>
);

export default Root;
