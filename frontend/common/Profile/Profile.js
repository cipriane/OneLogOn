import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import me from 'utils/me';
import s from './Profile.css';

class Profile extends Component {
  static propTypes = {
    jwt: PropTypes.string.isRequired,
  };

  state = {
    currentPassword: '',
    newPassword: '',
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
    const { currentPassword, newPassword } = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="username" className={s.hidden}>
            <Form.Control
              type="text"
              name="username"
              autoComplete="usernname"
              hidden
              readOnly
              value={me(this.props.jwt).username}
            />
          </Form.Group>

          <Form.Group controlId="currentPassword">
            <Form.Label className={s.label}>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              autoComplete="current-password"
              placeholder="password"
              value={this.state.currentPassword}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="newPassword">
            <Form.Label className={s.label}>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              autoComplete="new-password"
              placeholder="password"
              value={newPassword}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="outline-success" className={s.submit}>
            Save changes
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    jwt: store.jwt,
  };
};

export default connect(mapStateToProps)(Profile);

// Named unconnected export for testing
export { Profile as ProfileTest };
