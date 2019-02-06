import React, { Component } from 'react';
import { withRouter } from 'react-router';
import logout from 'utils/logout';

class Logout extends Component {
  onComponentDidMount() {
    logout();
    this.props.history.push('/');
  }
  render() {

    return (
      <div>Logging out...</div>
    );
  }
}

export default withRouter(Logout);
