import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Layout from 'common/Layout/Layout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import Form from 'react-bootstrap/Form';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import s from './Login.css';
import fetch from 'utils/fetch';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from 'actions';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    password: '',
    error: null,
    isLoading: false,
    validated: false,
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      this.setState({ isLoading: true, error: null, validated: true });
      const resp = await fetch('api/login', {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      if (!resp.ok) {
        throw Error(resp.statusText);
      }

      const data = await resp.json();
      this.props.login(data);
      this.props.history.push('/dashboard');
    } catch (err) {
      this.setState({
        error: err.toString(),
        isLoading: false,
      });
    }
  };

  render() {
    const { error, isLoading, username, password, validated } = this.state;
    let errorMessage = null;
    if (error) {
      errorMessage = (
        <div>
          <pre>{error}</pre>
        </div>
      );
    }
    const buttonText = isLoading ? 'Sending...' : 'Log In';

    return (
      <Layout>
        <FullScreenLayout>
          {errorMessage}
          <Form className={s.form} noValidate validated={validated} onSubmit={this.handleSubmit}>
            <MainFormLayout>
              <Form.Group>
                <FancyFormHeader text="Login" />
                <FancyTextField
                  autoFocus
                  required
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <FancyTextField
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  The password you entered was incorrect.
                </Form.Control.Feedback>
              </Form.Group>
              <FancyButton label={buttonText} type="submit" />
            </MainFormLayout>
          </Form>
        </FullScreenLayout>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data)),
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(Login),
);

// Named unconnected export for testing
export { Login as LoginTest };
