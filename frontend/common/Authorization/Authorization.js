import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import me from 'utils/me';
import { Roles } from 'utils/constants';

const Authorization = (allowedRoles, isRegsiterOrLogin = false) => {
  function HOC(WrappedComponent) {
    return class WithAuthorization extends Component {
      static propTypes = {
        jwt: PropTypes.string,
      };

      render() {
        const user = me(this.props.jwt);
        const role = user.is_kiosk_mode ? Roles.kiosk : user.role;
        const isLoggedIn = !!user.id && !user.is_kiosk_mode;
        const validRole = allowedRoles.includes(role);
        // Sorry this logic is a bit messy
        if (validRole) {
          return <WrappedComponent {...this.props} />;
        } else if (isLoggedIn && isRegsiterOrLogin) {
          return <Redirect to="/dashboard" />;
        } else if (!isLoggedIn && !isRegsiterOrLogin) {
          return <Redirect to="/login" />;
        } else if (!validRole && !isRegsiterOrLogin) {
          return <Redirect to="/" />;
        }
        return <WrappedComponent {...this.props} />;
      }
    };
  }
  const mapStateToProps = store => {
    return {
      jwt: store.jwt,
    };
  };

  const composedHoc = compose(
    connect(mapStateToProps),
    HOC,
  );

  return composedHoc;
};

export default Authorization;
