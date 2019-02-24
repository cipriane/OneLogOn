import React, { Component } from 'react';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import FancyButton from 'common/FancyButton/FancyButton';
import { Form, Button } from 'react-bootstrap';
import s from './Settings.css';

export default class Settings extends Component {
  state = {
    welcomeMessage:
      'A simple Open Source visitor check-in and statistics aggregation system for your facility or site.',
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <SimpleHeader title="Settings" />
        <Form className={s.form} onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicMessage">
            <Form.Label>Checkin Message:</Form.Label>
            <Form.Control
              type="text"
              value={this.state.welcomeMessage}
              name="welcomeMessage"
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">Edit the welcome message on the home page.</Form.Text>
          </Form.Group>

          <div className={s.buttonBar}>
            <Button type="submit" variant="success" label="Save">
              Save
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
