import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from 'actions';

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.logout();
    this.props.history.push('/');
  }
  render() {
    return <div>Logging out...</div>;
  }
}

const mapDispatchToProps = {
  logout,
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(Logout),
);

// Named unconnected export for testing
export { Logout as LogoutTest };
