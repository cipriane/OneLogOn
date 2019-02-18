import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import FancyButton from 'common/FancyButton/FancyButton';

export default class ReasonsPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FullScreenLayout>
        <h1>Why are you here?</h1>
        <div>Please select all that apply</div>
        <FancyButton label="Next" onClick={this.props.next} />
      </FullScreenLayout>
    );
  }
}
