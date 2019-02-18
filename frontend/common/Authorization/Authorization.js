import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import me from 'utils/me';

const Authorization = (allowedRoles, isRegsiterOrLogin = false) => {
  return WrappedComponent => {
    return class WithAuthorization extends React.Component {
      constructor(props) {
        super(props);

        const user = me();
        // console.log(user);
        this.state = {
          name: user.name,
          role: user.role || '',
        };
      }
      render() {
        const { role } = this.state;
        const isLoggedIn = !!role;
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
  };
};
export default Authorization;
