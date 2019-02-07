import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Layout from 'common/Layout/Layout';
import s from './Login.css';
import fetch from 'utils/fetch';
import login from 'utils/login';

class Login extends Component {
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
    const buttonText = isLoading ? 'Sending...' : 'Log In';

    return (
      <Layout>
        <div className={s.root}>
          <h1>Login Route</h1>
          {errorMessage}
          <form className={s.form} onSubmit={this.handleSubmit}>
            <label htmlFor="username">
              <input
                className={s.field}
                name="username"
                value={username}
                placeholder="username"
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="password">
              <input
                className={s.field}
                name="password"
                type="password"
                value={password}
                placeholder="password"
                onChange={this.handleChange}
              />
            </label>
            <div className={s.buttonContainer}>
              <button type="submit" className={s.button}>
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

export default withRouter(Login);
