import React, { Component } from 'react';
import s from './DashBoardNav.css';

export default class DashBoardNav extends Component {
  render() {
    return (
      <nav className={s.root}>
        <ul>
          <li>
            <a href="./">Home</a>
          </li>
          <li>
            <a href="./">Users</a>
          </li>
          <li>
            <a href="./">Messages</a>
          </li>
          <li>
            <a href="./">Groups</a>
          </li>
          <li>
            <a href="./">Reports</a>
          </li>
          <li>
            <a href="./">Posts</a>
          </li>
        </ul>
      </nav>
    );
  }
}
