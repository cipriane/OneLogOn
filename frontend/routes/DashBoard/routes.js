import Settings from 'routes/Settings/Settings';
import ManageUsers from 'routes/ManageUsers/ManageUsers';
import Statistics from 'routes/Statistics/Statistics';

const dashboardRoutes = [
  { id: 0, name: 'Settings', path: '/settings', component: Settings },
  { id: 1, name: 'ManageUsers', path: '/manage', component: ManageUsers },
  { id: 2, name: 'Statistics', path: '/statistics', component: Statistics },
];

export default dashboardRoutes;
