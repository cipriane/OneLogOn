import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      <React.Fragment>
        <h1>Error Page</h1>
        <div>There was an error</div>
        <FancyButton label="Start Over" onClick={this.props.next(null)} />
      </React.Fragment>
    );
  }
}
