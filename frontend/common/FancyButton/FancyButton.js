import React, { Component } from 'react';
import s from './FancyButton.css';

export default class FancyButton extends Component {
  render() {
    const { muted } = this.props;
    let classes = [s.root];
    if (muted) {
      classes.push(s.muted);
    } else {
      classes.push(s.vibrant);
    }

    return (
      <button className={classes.join(' ')} {...this.props}>
        {this.props.label}
      </button>
    );
  }
}
