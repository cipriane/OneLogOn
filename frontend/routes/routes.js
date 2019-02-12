import Settings from 'routes/Settings/Settings';
import ManageUsers from 'routes/ManageUsers/ManageUsers';
import Statistics from 'routes/Statistics/Statistics';

const dashboardRoutes = [
    {id: 0, name: 'Settings', path: '/Settings', component: Settings},
    {id: 1, name: 'ManageUsers', path: '/ManageUsers', component: ManageUsers},
    {id: 2, name: 'Statistics', path: '/Statistics', component: Statistics}
];

export default dashboardRoutes;