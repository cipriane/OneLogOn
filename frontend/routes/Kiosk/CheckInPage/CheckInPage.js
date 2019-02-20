import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import FancyButton from 'common/FancyButton/FancyButton';

export default class CheckInPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  state = {
    id: '',
  };

  isValid = input => {
    return /^\d+$/.test(input) && input.length === 7;
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
        <Form validated={id && this.isValid(id)} onSubmit={this.props.next(id)}>
          <MainFormLayout>
            <Form.Group>
              <FancyFormHeader text="Welcome to the Innovation Center  Please check in" />
              <FancyTextField
                autoFocus
                autoComplete="off"
                required
                type="text"
                placeholder="Student ID"
                name="id"
                isValid={id && this.isValid(id)}
                isInvalid={id && !this.isValid(id)}
                onChange={this.handleChange}
              />
              <Form.Text className="text-muted">Enter Your ID without the W</Form.Text>
            </Form.Group>
            <FancyButton label="Check In" disabled={!this.isValid(id)} type="submit" />
          </MainFormLayout>
        </Form>
      </FullScreenLayout>
    );
  }
}
