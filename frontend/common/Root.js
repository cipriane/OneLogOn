import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home/Home';
import ReduxExample from 'routes/ReduxExample/ReduxExample';
import Login from 'routes/Login/Login';
import Logout from 'routes/Logout/Logout';
import Register from 'routes/Register/Register';
import NoMatch from 'routes/NoMatch/NoMatch';
import DashBoard from 'routes/DashBoard/Root';
import Authorization from 'common/Authorization/Authorization';

// temporary will be rendered by dashboard
import Settings from 'routes/Settings/Settings';
import Statistics from 'routes/Statistics/Statistics';
import ManageUsers from 'routes/ManageUsers/ManageUsers';

// Role-based authorization
const NotIfLoggedIn = Authorization(['None'], true);
const Staff = Authorization(['staff', 'admin']);
const Admin = Authorization(['admin']);

const LoginProtected = NotIfLoggedIn(Login);
const RegisterProtected = NotIfLoggedIn(Register);
const DashBoardIsStaff = Staff(DashBoard);

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LoginProtected} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={RegisterProtected} />
          <Route exact path="/ReduxExample" component={ReduxExample} />
          <Route exact path="/DashBoard" component={DashBoardIsStaff} />
          <Route exact path="/Settings" component={Settings} />
          <Route exact path="/Statistics" component={Statistics} />
          <Route exact path="/ManageUsers" component={ManageUsers} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}
