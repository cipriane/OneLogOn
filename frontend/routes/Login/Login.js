import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Layout from 'common/Layout/Layout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import Form from 'react-bootstrap/Form';
import FormIcon from 'common/FormIcon/FormIcon';
import s from './Login.css';
import fetch from 'utils/fetch';
import login from 'utils/login';
import logo from 'assets/logo-full.png';
class Login extends Component {
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
      login(data);
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
          <h1>Login Route</h1>
          {errorMessage}
          <Form
            className={s.form}
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
          >
            <MainFormLayout>
              <FormIcon url={logo} />
              <Form.Label className={s.headerText}>Welcome to OneLogOn</Form.Label> <br />
              <Form.Group>
                <Form.Control
                  className={s.textfield}
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
              <Form.Control
                className={s.textfield}
                required
                type="password"
                placeholder="password"
                name="password"
                onChange={this.handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                The password you entered was incorrect.
              </Form.Control.Feedback>
              <Form.Group />
              <FancyButton label={buttonText} type="submit" />
            </MainFormLayout>
          </Form>
        </FullScreenLayout>
      </Layout>
    );
  }
}

export default withRouter(Login);
