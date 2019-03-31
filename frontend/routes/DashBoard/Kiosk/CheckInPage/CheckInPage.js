import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import FancyButton from 'common/FancyButton/FancyButton';
import myFetch from 'utils/fetch';
import s from './CheckInPage.css';

export default class CheckInPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  state = {
    id: '',
    message: '',
  };

  async componentDidMount() {
    try {
      this.setState({
        error: false,
        isLoading: true,
      });

      const data = await myFetch('/api/companies/message');

      this.setState({
        message: data.company_message,
        isLoading: false,
      });
    } catch (err) {
      console.log('got here error');
      this.setState({
        isLoading: false,
        error: err.toString(),
      });
    }
  }

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
      <React.Fragment>
        <Form validated={id && this.isValid(id)} onSubmit={this.props.next(id)}>
          <Form.Group>
            <FancyFormHeader text="" />
            <div className={s.greeting}>{this.state.message}</div>
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
            <Form.Text className="text-muted">Enter your ID without the W</Form.Text>
          </Form.Group>
          <FancyButton
            label="Check In"
            loading={this.props.isLoading}
            disabled={!this.isValid(id) || this.props.isLoading}
            type="submit"
          />
        </Form>
      </React.Fragment>
    );
  }
}
