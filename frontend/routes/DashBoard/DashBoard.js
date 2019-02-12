import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import dashboardRoutes from 'routes/routes';
import s from './DashBoard.css';

export default class DashBoard extends Component {
  constructor(props){
    super(props);
    this.state={
      mainContent: dashboardRoutes[0].component,
      userName: 'Admin'
    };
  }

  openSideMenu = () => {
    document.getElementById('sideMenu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  closeSideMenu = () => {
    document.getElementById('sideMenu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

  renderPage = (id) => {
    this.setState({
      mainContent: dashboardRoutes[id].component
    });
  }

  render() {
    return (
      <div className={s.root}>
        <nav className={s.navbar}>
          <span>
            <Button className={s.burger} variant="outline-secondary" onClick={this.openSideMenu}>
              <svg width="30" height="30">
                  <path d="M0,5 30,5" stroke="#fff" strokeWidth="5"/>
                  <path d="M0,14 30,14" stroke="#fff" strokeWidth="5"/>
                  <path d="M0,23 30,23" stroke="#fff" strokeWidth="5"/>
              </svg>
            </Button>
          </span>

          <div className={s.navbarNav}>
            <p className={s.detail}>Signed in as: <span className={s.name}>{this.state.userName}</span> </p>
          </div>
        </nav>

        <div id="sideMenu" className={s.sideNav}>
          <a href="#" className={s.btnClose} onClick={this.closeSideMenu}>&times;</a>
          {dashboardRoutes.map((route) => {
            return <Button variant="outline-primary" key={route.id} onClick={() => this.renderPage(route.id)} className={s.sideNavItem}>
              {route.name}
            </Button>
          })}
        </div>

        <div id="main" className={s.main}>
          {< this.state.mainContent />}
        </div>
      </div>
    )
  }
}
