import React, { Component } from 'react';
import s from './FormIcon.css';

export default class FormIcon extends Component {
  render() {
    return (
      <div>
        <img src={this.props.url} className={s.root} alt="Form Icon" />
      </div>
    )
  }
}
