import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Layout from 'common/Layout/Layout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import isValidEmail from 'utils/isValidEmail';
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
    key: queryString.parse(this.props.location.search).key,
    error: null,
    isLoading: false,
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
  isValidAll = () => {
    return !!(
      this.isValidUsername(this.state.username) &&
      this.isValidPassword(this.state.password) &&
      ((!this.state.key && this.isValidCompany(this.state.company)) ||
        (this.state.key && !this.state.company)) &&
      isValidEmail(this.state.email)
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
      this.setState({ isLoading: true, error: null });

      await myFetch('/api/register', {
        method: 'POST',
        body: {
          username: this.state.username,
          company_name: this.state.company,
          email: this.state.email,
          key: this.state.key,
          password: this.state.password,
        },
      });
    } catch (err) {
      return this.setState({
        error: err.message,
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
    const { error, key, company } = this.state;
    let errorMessage = null;
    if (error) {
      errorMessage = <Alert variant="danger">{error}</Alert>;
    }

    let keyInputField = null;
    if (key) {
      keyInputField = (
        <Form.Group>
          <Form.Label className={s.label}>Invite Key</Form.Label>
          <FancyTextField
            required
            disabled
            type="text"
            placeholder="key"
            name="key"
            isValid={key}
            isInvalid={!key}
            value={key}
          />
        </Form.Group>
      );
    }

    let companyInputField = null;
    if (!key) {
      companyInputField = (
        <Form.Group>
          <Form.Label className={s.label}>Company Name*</Form.Label>
          <FancyTextField
            required
            autoComplete="organization"
            type="text"
            placeholder="Company Name"
            name="company"
            isValid={company && this.isValidCompany(company)}
            isInvalid={company && !this.isValidCompany(company)}
            value={company}
            onChange={this.handleChange}
          />
        </Form.Group>
      );
    }

    const { username, email, password, isLoading } = this.state;
    return (
      <Layout>
        <FullScreenLayout>
          <Form noValidate className={s.margin} onSubmit={this.handleSubmit}>
            {errorMessage}
            <MainFormLayout>
              <FancyFormHeader text="Register" />
              <Form.Group>
                <Form.Label className={s.label}>Username*</Form.Label>
                <FancyTextField
                  required
                  autoFocus
                  autoComplete="username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  isValid={this.isValidUsername(username)}
                  isInvalid={username && !this.isValidUsername(username)}
                  value={username}
                  onChange={this.handleChange}
                />
              </Form.Group>
              {companyInputField}
              <Form.Group>
                <Form.Label className={s.label}>Email*</Form.Label>
                <FancyTextField
                  required
                  autoComplete="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  isValid={email && isValidEmail(email)}
                  isInvalid={email && !isValidEmail(email)}
                  value={email}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className={s.label}>Password*</Form.Label>
                <FancyTextField
                  required
                  autoComplete="new-password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  isValid={password && this.isValidPassword(password)}
                  isInvalid={password && !this.isValidPassword(password)}
                  value={password}
                  onChange={this.handleChange}
                />
                <Form.Text className={['text-muted', s.mutedText].join(' ')}>
                  Must be 8 characters or longer
                </Form.Text>
              </Form.Group>
              {keyInputField}
              <div>
                <FancyButton
                  label="Register"
                  disabled={!this.isValidAll()}
                  loading={isLoading ? 1 : 0}
                  type="submit"
                />
              </div>
              <div className={s.redirectLink}>
                <Link to="/login">Log into your account</Link>
              </div>
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
