import React, { Component } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import dashboardRoutes from 'routes/routes';
import userlogo from 'assets/user.png';
import s from './DashBoard.css';

export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainContent: dashboardRoutes[0].component,
      username: 'Admin',
    };
  }

  openSideMenu = () => {
    document.getElementById('sideMenu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  };

  closeSideMenu = () => {
    document.getElementById('sideMenu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  };

  renderPage = id => {
    this.setState({
      mainContent: dashboardRoutes[id].component,
    });
  };

  render() {
    return (
      <div className={s.root}>
        <nav className={s.navbar}>
          <span>
            <Button className={s.burger} variant="outline-secondary" onClick={this.openSideMenu}>
              <svg width="30" height="30">
                <path d="M0,5 30,5" stroke="#fff" strokeWidth="5" />
                <path d="M0,14 30,14" stroke="#fff" strokeWidth="5" />
                <path d="M0,23 30,23" stroke="#fff" strokeWidth="5" />
              </svg>
            </Button>
          </span>

          <div className={s.navbarNav}>
            {/* <p className={s.detail}>
              Signed in as: <span className={s.name}>{this.state.userName}</span>{' '}
            </p> */}
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic" className={s.dropToggle}>
                <img className={s.profileImage} src={userlogo} alt="user pic" />
                {this.state.username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>

        <div id="sideMenu" className={s.sideNav}>
          <button className={s.btnClose} onClick={this.closeSideMenu}>
            &times;
          </button>
          {dashboardRoutes.map(route => {
            return (
              <Button
                variant="outline-primary"
                key={route.id}
                onClick={() => this.renderPage(route.id)}
                className={s.sideNavItem}
              >
                {route.name}
              </Button>
            );
          })}
        </div>

        <div id="main" className={s.main}>
          {<this.state.mainContent />}
        </div>
      </div>
    );
  }
}
