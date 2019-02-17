import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import s from './Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <Navbar fixed="bottom" bg="dark" variant="dark" className="justify-content-center">
        <span className={s.text}>OneLogOn</span>
        <span className={s.spacer}>·</span>
        <Link className={s.link} to="/">
          Home
        </Link>
        <span className={s.spacer}>·</span>
        <Link className={s.link} to="/admin">
          Admin
        </Link>
        <span className={s.spacer}>·</span>
        <Link className={s.link} to="/privacy">
          Privacy
        </Link>
        <span className={s.spacer}>·</span>
        <Link className={s.link} to="/not-found">
          Not Found
        </Link>
        <span className={s.spacer}>·</span>
        <Link className={s.link} to="/DashBoard">
          DashBoard
        </Link>
      </Navbar>
    );
  }
}
