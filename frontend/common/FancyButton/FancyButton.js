import React, { Component } from 'react';
import s from './FancyButton.css';

export default class FancyButton extends Component {
  render() {
    const { muted, loading, disabled } = this.props;
    let classes = [s.root];
    if (muted) {
      classes.push(s.muted);
    } else {
      classes.push(s.vibrant);
    }
    let label = loading ? 'Loading...' : this.props.label;

    return (
      <button className={classes.join(' ')} disabled={disabled || loading} {...this.props}>
        {label}
      </button>
    );
  }
}
