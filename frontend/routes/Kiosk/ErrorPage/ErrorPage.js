import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import FancyButton from 'common/FancyButton/FancyButton';

export default class ErrorPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FullScreenLayout>
        <h1>Error Page</h1>
        <div>There was an error</div>
        <FancyButton label="Go Back" />
      </FullScreenLayout>
    );
  }
}
