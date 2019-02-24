import React, { Component } from 'react';
import s from './SimpleHeader.css';

export default class SimpleHeader extends Component {
  render() {
    return (
      <div className={s.root}>
        <h1 className={s.title}>{this.props.title}</h1>
      </div>
    );
  }
}
