import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Navigation from 'common/Navigation/Navigation';
import logo from 'assets/logo-carrot.png';
import s from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <Navbar fixed="top" variant="dark" className={s.root}>
        <Navbar.Brand href="/">
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />
          {' OneLogOn'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navigation />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
