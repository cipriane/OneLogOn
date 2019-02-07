import React, { Component } from 'react';
import Layout from 'common/Layout/Layout';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import Form from 'react-bootstrap/Form';
import FormIcon from 'common/FormIcon/FormIcon';
import s from './Login.css';

export default class Login extends Component {
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
      });

      if (!resp.ok) {
        throw Error(resp.statusText);
      }

      const data = await resp.json();
      this.setState({ isLoading: false });
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
          <Form className={s.form} onSubmit={this.handleSubmit}>
            <MainFormLayout>
              <Form.Group >
                <FormIcon url="https://proxy.duckduckgo.com/ip3/www.makerhq.org.ico" />
                <Form.Label className={s.headerText}>Welcome to OneLogOn</Form.Label> <br/>
                <Form.Control className={s.textfield} type="text" placeholder="username" onChange={this.handleChange}/>
                <Form.Control className={s.textfield} type="text" placeholder="password" onChange={this.handleChange}/>
              </Form.Group>
              <FancyButton label={buttonText} type="submit"/>
            </MainFormLayout>
          </Form>
        </div>
      </Layout>
    );
  }
}
