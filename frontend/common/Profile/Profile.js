import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import s from './Profile.css';

export default class Profile extends Component {
  state = {
    username: 'Admin',
    password: 'password',
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
          <Button type="submit" variant="outline-success" className={s.submit}>
            Save changes
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}
