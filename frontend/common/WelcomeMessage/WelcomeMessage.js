import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import s from './WelcomeMessage.css';
import myFetch from 'utils/fetch';

export default class WelcomeMessage extends Component {
  state = {
    welcomeMessage: '',
    saveSuccess: false,
    isLoading: true,
    error: null,
  };

  componentDidMount = async () => {
    try {
      this.setState({
        isLoading: true,
        error: null,
      });
      const data = await myFetch('/api/companies/message');

      this.setState({
        welcomeMessage: data.company_message || '',
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      this.setState({
        saveSuccess: false,
        isLoading: true,
        error: null,
      });
      const data = await myFetch('/api/companies/message', {
        method: 'POST',
        body: {
          company_message: this.state.welcomeMessage,
        },
      });

      this.setState({
        saveSuccess: true,
        welcomeMessage: data.company_message,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        saveSuccess: false,
        isLoading: false,
        error: err.message,
      });
    }
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { error, saveSuccess } = this.state;
    let alertMessage = null;
    if (error) {
      alertMessage = (
        <Alert variant="danger" dismissible>
          {error}
        </Alert>
      );
    } else if (saveSuccess) {
      alertMessage = (
        <Alert variant="success" dismissible>
          Welcome Message saved successfully
        </Alert>
      );
    }

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          {alertMessage}
          <Form.Group controlId="formBasicMessage">
            <Form.Label className={s.label}>Welcome Message</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="welcomeMessage"
              value={this.state.welcomeMessage}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="outline-success" label="Save" className={s.submit}>
            Save changes
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}
