import React, { Component } from 'react';
import s from './MainFormLayout.css';

export default class MainFormLayout extends Component {
  render() {
    return <div className={s.root}>{this.props.children}</div>;
  }
}
