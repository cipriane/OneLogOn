import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './Navigation.css';

export default class Navigation extends React.Component {
  render() {
    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/about">
          About
        </Link>
        <Link className={s.link} to="/contact">
          Contact
        </Link>
        <span className={s.spacer}> | </span>
        <Link className={s.link} to="/login">
          Log in
        </Link>
        <span className={s.spacer}>or</span>
        <Link className={[s.link, s.highlight].join(' ')} to="/register">
          Sign up
        </Link>
      </div>
    );
  }
}
