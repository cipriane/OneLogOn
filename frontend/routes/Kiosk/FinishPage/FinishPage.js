import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import FancyButton from 'common/FancyButton/FancyButton';

export default class FinishPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FullScreenLayout>
        <h1>Thank you for checking in!</h1>
        <div>Please remember to sign out.</div>
        <FancyButton label="Finish" onClick={this.props.next(null)} />
      </FullScreenLayout>
    );
  }
}
