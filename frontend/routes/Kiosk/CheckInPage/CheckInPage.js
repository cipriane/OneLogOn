import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import FancyButton from 'common/FancyButton/FancyButton';

export default class CheckInPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FullScreenLayout>
        <h1>Check In Page</h1>
        <div>Enter Your ID</div>
        <FancyButton label="Check In" onClick={this.props.next} />
      </FullScreenLayout>
    );
  }
}
