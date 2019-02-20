import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import s from './HamburgerButton.css';

export default class HamburgerButton extends Component {
  render() {
    return (
      <Button className={s.root} variant="outline-secondary" onClick={this.props.onClick}>
        <svg width="30" height="30">
          <path d="M0,5 30,5" stroke="#fff" strokeWidth="5" />
          <path d="M0,14 30,14" stroke="#fff" strokeWidth="5" />
          <path d="M0,23 30,23" stroke="#fff" strokeWidth="5" />
        </svg>
      </Button>
    );
  }
}
