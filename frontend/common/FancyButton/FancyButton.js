import React, { Component } from 'react';
import s from './FancyButton.css';

export default class FancyButton extends Component {
  render() {
    return (
      <button className={s.root} {...this.props}>
        {this.props.label}
      </button>
    );
  }
}
