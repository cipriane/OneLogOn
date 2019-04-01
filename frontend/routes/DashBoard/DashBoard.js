import React, { Component } from 'react';
import { Button, Dropdown, Navbar } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userlogo from 'assets/user.png';
import logo from 'assets/logo-white.png';
import HamburgerButton from 'common/HamburgerButton/HamburgerButton';
import s from './DashBoard.css';
import { Roles } from 'utils/constants';
import me from 'utils/me';

import Settings from 'routes/DashBoard/Settings/Settings';
import Statistics from 'routes/DashBoard/Statistics/Statistics';
import Employees from 'routes/DashBoard/Employees/Employees';
import Admin from 'routes/DashBoard/Admin/Admin';
import Kiosk from 'routes/DashBoard/Kiosk/Kiosk';

const dashboardRoutes = [
  { id: 0, name: 'Statistics', path: 'statistics', component: Statistics },
  { id: 1, name: 'Settings', path: 'settings', component: Settings },
  { id: 2, name: 'Employees', path: 'employees', component: Employees },
  { id: 3, name: 'Admin', path: 'admin', component: Admin },
  { id: 4, name: 'Kiosk Mode', path: 'kiosk', component: Kiosk },
];

class DashBoard extends Component {
  static propTypes = {
    jwt: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sideBarOpen: false,
    };
  }

  openSideMenu = () => {
    document.getElementById('sideMenu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
    this.setState({ sideBarOpen: true });
  };

  closeSideMenu = () => {
    document.getElementById('sideMenu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
    this.setState({ sideBarOpen: false });
  };

  handleLogout = () => {
    this.props.history.push('/logout');
  };

  render() {
    const user = me(this.props.jwt);

    if (user.is_kiosk_mode) {
      return <React.Fragment>{this.props.children}</React.Fragment>;
    }
    return (
      <div className={s.root}>
        <Navbar className={s.navbar}>
          <HamburgerButton
            onClick={this.state.sideBarOpen == true ? this.closeSideMenu : this.openSideMenu}
          />
          <Navbar.Brand>
            <img alt="" src={logo} width="30" height="30" />
          </Navbar.Brand>
          <Navbar.Brand>
            <p className={s.title}>DashBoard</p>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic" className={s.dropDownToggle}>
                <img className={s.profileImage} src={userlogo} alt="user pic" />
                {user.username}
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight>
                <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Navbar>

        <div id="sideMenu" className={s.sideNav}>
          <div className={s.sideNavHeader}>
            <HamburgerButton
              onClick={this.state.sideBarOpen == true ? this.closeSideMenu : this.openSideMenu}
            />
            <img className={s.sideNavLogo} alt="" src={logo} width="30" height="30" />
            <p className={s.sideNavTitle}>DashBoard</p>
          </div>
          {dashboardRoutes.map(route => {
            return (
              <NavLink key={route.id} to={`${this.props.url}/${route.path}`}>
                <Button variant="outline-primary" className={s.sideNavItem}>
                  {route.name}
                </Button>
              </NavLink>
            );
          })}
        </div>
        <div id="main" className={s.main}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    jwt: store.jwt,
  };
};

export default withRouter(connect(mapStateToProps)(DashBoard));

// Named unconnected export for testing
export { DashBoard as DashBoardTest };
