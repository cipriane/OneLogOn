import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Layout from 'common/Layout/Layout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import myFetch from 'utils/fetch';
import s from './Register.css';
import { connect } from 'react-redux';
import { login } from 'actions';

class Register extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    company: '',
    error: null,
    isLoading: false,
    key: null,
  };

  isValidUsername = input => {
    return input && input.length <= 150;
  };
  isValidPassword = input => {
    return input && input.length >= 8;
  };
  isValidCompany = input => {
    return input && input.length <= 30;
  };
  isValidEmail = input => {
    return (
      input &&
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        input,
      )
    );
  };
  isValidAll = () => {
    return !!(
      this.isValidUsername(this.state.username) &&
      this.isValidPassword(this.state.password) &&
      this.isValidCompany(this.state.company) &&
      this.isValidEmail(this.state.email)
    );
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
      this.setState({ isLoading: true, error: null, key: 'aaa' });

      // get url to process the key
      const url = window.location.href;

      var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while ((match = regex.exec(url))) {
        params[match[1]] = match[2];
      }
      // console.log(params);

      // save the key
      this.key = params['key'];

      await myFetch('/api/register', {
        method: 'POST',
        body: {
          username: this.state.username,
          company_name: this.state.company,
          email: this.state.email,
          password: this.state.password,
          key: this.key,
        },
      });
    } catch (err) {
      return this.setState({
        error: err.toString(),
        isLoading: false,
      });
    }
    try {
      const data = await myFetch('/api/login', {
        method: 'POST',
        body: {
          username: this.state.username,
          password: this.state.password,
        },
      });

      this.props.login(data);
      this.props.history.push('/dashboard');
    } catch (err) {
      this.props.history.push('/login');
    }
  };

  render() {
    const { error } = this.state;
    let errorMessage = null;
    if (error) {
      errorMessage = <Alert variant="danger">{error}</Alert>;
    }

    const { username, company, email, password, isLoading } = this.state;
    return (
      <Layout>
        <FullScreenLayout>
          <Form noValidate onSubmit={this.handleSubmit}>
            {errorMessage}
            <MainFormLayout>
              <FancyFormHeader text="Register" />
              <Form.Group>
                <FancyTextField
                  required
                  autoFocus
                  autoComplete="username"
                  type="text"
                  placeholder="username"
                  name="username"
                  isValid={this.isValidUsername(username)}
                  isInvalid={username && !this.isValidUsername(username)}
                  value={username}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <FancyTextField
                  required
                  autoComplete="organization"
                  type="text"
                  placeholder="company"
                  name="company"
                  isValid={company && this.isValidCompany(company)}
                  isInvalid={company && !this.isValidCompany(company)}
                  value={company}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <FancyTextField
                  required
                  autoComplete="email"
                  type="email"
                  placeholder="email"
                  name="email"
                  isValid={email && this.isValidEmail(email)}
                  isInvalid={email && !this.isValidEmail(email)}
                  value={email}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <FancyTextField
                  required
                  autoComplete="new-password"
                  type="password"
                  placeholder="password"
                  name="password"
                  isValid={password && this.isValidPassword(password)}
                  isInvalid={password && !this.isValidPassword(password)}
                  value={password}
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted">Must be 8 characters or longer</Form.Text>
              </Form.Group>
              <FancyButton
                label="Register"
                disabled={!this.isValidAll()}
                loading={isLoading ? 1 : 0}
                type="submit"
              />
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
  )(Register),
);

// Named unconnected export for testing
export { Register as RegisterTest };
