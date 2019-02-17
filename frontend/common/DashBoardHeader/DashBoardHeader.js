import React, { Component } from 'react';
import s from './DashBoardHeader.css';

export default class DashBoardHeader extends Component {
  render() {
    return (
      <header className={s.root}>
        <a href="./" className={s.logo}>
          The <span>Dashboard</span>
        </a>
        <a href="./" className={s.logForm}>
          Logout
        </a>
      </header>
    );
  }
}
