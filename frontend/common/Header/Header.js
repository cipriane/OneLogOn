import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap';
import Navigation from '../../common/Navigation/Navigation';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <Navbar bg="success" fixed="top" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src="https://proxy.duckduckgo.com/ip3/www.makerhq.org.ico"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {' OneLogOn'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse className="justify-content-end">
          <Navigation/>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}