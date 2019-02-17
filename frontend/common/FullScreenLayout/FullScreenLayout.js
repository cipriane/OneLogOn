import React, { Component } from 'react';
import s from './FullScreenLayout.css';

export default class FullScreenLayout extends Component {
  render() {
    return <div className={s.root}>{this.props.children}</div>;
  }
}
