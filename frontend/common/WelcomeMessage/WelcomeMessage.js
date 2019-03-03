import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import s from './WelcomeMessage.css';

export default class WelcomeMessage extends Component {
  state = {
    welcomeMessage:
      'A simple Open Source visitor check-in and statistics aggregation system for your facility or site.',
    isLoading: false,
    error: null,
  };

  handleSubmit = event => {
    event.preventDefault();
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
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicMessage">
            <Form.Label className={s.label}>Checkin Message:</Form.Label>
            <Form.Control
              type="text"
              name="welcomeMessage"
              value={this.state.welcomeMessage}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">Edit the welcome message on the home page.</Form.Text>
          </Form.Group>
          <Button type="submit" variant="outline-success" label="Save" className={s.submit}>
            Save changes
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}
