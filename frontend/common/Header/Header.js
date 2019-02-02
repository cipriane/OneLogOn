import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import Navigation from '../../common/Navigation/Navigation';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div>
        <Navbar bg="success" variant="dark">
          <Navbar.Brand href="/">OneLogOn</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse className="justify-content-end">
            <Navigation/>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}