import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import FancyButton from 'common/FancyButton/FancyButton';

export default class CheckInPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  state = {
    id: '',
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
    const { id } = this.state;
    return (
      <FullScreenLayout>
        <Form noValidate validated onSubmit={this.props.next(id)}>
          <MainFormLayout>
            <Form.Group>
              <h1>Check In Page</h1>
              <div>Enter Your ID without the W</div>
              <FancyTextField
                autoFocus
                autoComplete="off"
                required
                type="text"
                placeholder="Student ID"
                name="id"
                onChange={this.handleChange}
              />
            </Form.Group>
            <FancyButton label="Check In" type="submit" />
          </MainFormLayout>
        </Form>
      </FullScreenLayout>
    );
  }
}
