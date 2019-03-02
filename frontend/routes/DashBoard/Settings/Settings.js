import React, { Component } from 'react';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import ReasonList from 'common/Reasons/ReasonList/ReasonList';
import s from './Settings.css';

export default class Settings extends Component {
  state = {
    welcomeMessage:
      'A simple Open Source visitor check-in and statistics aggregation system for your facility or site.',
    username: 'Admin',
    password: 'password',
    isLoading: false,
    error: null,
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
    console.log('submitted');
  };

  render() {
    return (
      <div>
        <SimpleHeader title="Settings" />

        <Form className={s.form} onSubmit={this.handleSubmit}>
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
          <Button type="submit" variant="success" label="Save" className={s.submit}>
            Save changes
          </Button>
        </Form>

        <Form className={s.form} onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label className={s.label}>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">Edit your username.</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className={s.label}>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;"
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">Edit your password.</Form.Text>
          </Form.Group>
          <Button type="submit" variant="success" className={s.submit}>
            Save changes
          </Button>
        </Form>

        <div className={s.form}>
          <ReasonList />
        </div>
      </div>
    );
  }
}
