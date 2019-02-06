import React, { Component } from 'react';
import DashBoardNav from 'common/DashBoardNav/DashBoardNav';
import DashBoardView from 'common/DashBoardView/DashBoardView';
import DashBoardHeader from 'common/DashBoardHeader/DashBoardHeader';
import s from './DashBoard.css';

export default class DashBoard extends Component {
  render() {
    return (
      <div>
        <DashBoardHeader />
        <DashBoardNav />
        <DashBoardView />
      </div>
    )
  }
}
