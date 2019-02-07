import React, { Component } from 'react';
import s from './FancyButton.css';

export default class FancyButton extends Component {
  render() {
    return (
      <button className={s.root} onClick={this.props.onClick}>
          {this.props.label}
      </button>
    )
  }
}
