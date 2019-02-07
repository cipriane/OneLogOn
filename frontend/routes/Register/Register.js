import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Form from 'react-bootstrap/Form';
import Layout from 'common/Layout/Layout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import FormIcon from 'common/FormIcon/FormIcon';
import fetch from 'utils/fetch';
import s from './Register.css';

class Register extends Component {
  state = {
    username: '',
    password: '',
    error: null,
    isLoading: false,
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      this.setState({ isLoading: true, error: null });
      const resp = await fetch('api/register', {
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

      const loginResp = await login('api/login', {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      if (!loginResp.ok) {
        this.props.history.push('/login');
      }

      const loginData = await resp.json();
      login(loginData);
      this.props.history.push('/dashboard');
    }
    catch(err) {
      this.setState({
        error: err.toString(),
        isLoading: false,
      });
    }
  };

  render() {
    const { error, isLoading, username, password } = this.state;
    let errorMessage = null;
    if (error) {
      errorMessage = (
        <div>
          <pre>{error}</pre>
        </div>
      );
    }
    const buttonText = isLoading ? 'Sending...' : 'Register';

    return (
      <Layout>
        <FullScreenLayout>
          <h1>Register Route</h1>
          {errorMessage}
          <Form onSubmit={this.handleSubmit}>
            <MainFormLayout>
            <Form.Group >
              <FormIcon url="https://proxy.duckduckgo.com/ip3/www.makerhq.org.ico" />
              <Form.Label className={s.headerText}>Welcome to OneLogOn</Form.Label> <br/>
              <Form.Control
                className={s.textfield}
                type="text"
                placeholder="username"
                name="username"
                onChange={this.handleChange}
              />
              <Form.Control
                className={s.textfield}
                type="text"
                placeholder="password"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <FancyButton label={buttonText} type="submit"/>
            </MainFormLayout>
          </Form>
        </FullScreenLayout>
      </Layout>
    );
  }
}

export default withRouter(Register);
