import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
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
        <MainFormLayout>
          <h1>Error Page</h1>
          <div>There was an error</div>
          <FancyButton label="Start Over" onClick={this.props.next(null)} />
        </MainFormLayout>
      </FullScreenLayout>
    );
  }
}
