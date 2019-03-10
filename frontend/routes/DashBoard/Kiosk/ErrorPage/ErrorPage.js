import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FancyButton from 'common/FancyButton/FancyButton';

export default class ErrorPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  };

  render() {
    return (
      <React.Fragment>
        <h1>Error Page</h1>
        <div>{this.props.error}</div>
        <FancyButton
          label="Start Over"
          loading={this.props.isLoading}
          onClick={this.props.next(null)}
        />
      </React.Fragment>
    );
  }
}
