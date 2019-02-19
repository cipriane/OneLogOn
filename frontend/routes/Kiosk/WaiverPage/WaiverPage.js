import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import FancyButton from 'common/FancyButton/FancyButton';

export default class WaiverPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FullScreenLayout>
        <h1>Waiver</h1>
        <div>You must sign a waiver to use the facilities.</div>
        <div>Please ask a staff member for assistance in signing a waiver.</div>
        <FancyButton label="Ok" onClick={this.props.next(null)} />
      </FullScreenLayout>
    );
  }
}
