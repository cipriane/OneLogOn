import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from 'common/Navigation/Navigation';
import s from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation />
          <div className={s.clear}></div>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>OneLogOn</h1>
            <p className={s.bannerDesc}>Manage your Employees</p>
          </div>
        </div>
      </div>
    );
  }
}
