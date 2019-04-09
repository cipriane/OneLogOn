import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import s from './AddModal.css';
import myFetch from 'utils/fetch';
import isValidEmail from 'utils/isValidEmail';

const SUPER_ADMIN_ROLE = 0;
const ADMIN_ROLE = 1;

export default class AddModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  state = {
    isLoading: false,
    error: null,
    email: '',
    firstName: '',
    lastName: '',
    areInputsValid: false,
    role: ADMIN_ROLE,
  };

  setInputValidity = () => {
    const { email, firstName, lastName } = this.state;
    const isValidFirstName = firstName.length;
    const isValidLastName = lastName.length;

    const areInputsValid = isValidFirstName && isValidLastName && isValidEmail(email);

    this.setState({
      areInputsValid,
    });
  };

  inviteAdmin = async () => {
    try {
      this.setState({
        error: null,
        isLoading: true,
      });

      const { email, firstName, lastName, role } = this.state;

      await myFetch('/api/invite', {
        method: 'POST',
        body: {
          first_name: firstName,
          last_name: lastName,
          role,
          recipient: email,
        },
      });

      this.setState({
        isLoading: false,
        email: '',
        role: ADMIN_ROLE,
        firstName: '',
        lastName: '',
      });

      this.props.onHide();
    } catch (err) {
      this.setState({
        error: err.message,
        isLoading: false,
      });
    }
  };

  isValidName = input => {
    return input && input.length;
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState(
      {
        error: null,
        [name]: value,
      },
      this.setInputValidity,
    );
  };

  render() {
    const { error, isLoading } = this.state;

    let submitButton = null;
    if (isLoading) {
      submitButton = (
        <Button disabled variant="success">
          Loading...
        </Button>
      );
    } else {
      submitButton = (
        <Button onClick={this.inviteAdmin} variant="success" disabled={!this.state.areInputsValid}>
          Invite
        </Button>
      );
    }
    let errorMessage = null;
    if (error) {
      errorMessage = <Alert variant="danger">{error} Unable to send email.</Alert>;
    }

    const { email, firstName, lastName } = this.state;

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <div className={s.title}>Invite Admin</div>
        </Modal.Header>
        {errorMessage}
        <Modal.Body>
          <Alert variant="info">Invites expire after 48 hours.</Alert>
          <InputGroup className={s.margin}>
            <InputGroup.Prepend className={s.paddingRight}>
              <InputGroup.Text className={s.whiteBg}>Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FancyTextField
              className={s.name}
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              isValid={email && isValidEmail(email)}
              isInvalid={email && !isValidEmail(email)}
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup className={s.margin}>
            <InputGroup.Prepend className={s.paddingRight}>
              <InputGroup.Text className={s.whiteBg}>Role</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as="select"
              name="role"
              value={this.state.role}
              onChange={this.handleChange}
            >
              <option value={ADMIN_ROLE}>Admin</option>
              <option value={SUPER_ADMIN_ROLE}>Super Admin</option>
            </Form.Control>
          </InputGroup>
          <InputGroup className={s.margin}>
            <InputGroup.Prepend className={s.paddingRight}>
              <InputGroup.Text className={s.whiteBg}>First name</InputGroup.Text>
            </InputGroup.Prepend>
            <FancyTextField
              className={s.name}
              placeholder="First Name"
              name="firstName"
              value={this.state.firstName}
              isValid={firstName && this.isValidName(firstName)}
              isInvalid={firstName && !this.isValidName(firstName)}
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup className={s.margin}>
            <InputGroup.Prepend className={s.paddingRight}>
              <InputGroup.Text className={s.whiteBg}>Last name</InputGroup.Text>
            </InputGroup.Prepend>
            <FancyTextField
              className={s.student_picker}
              placeholder="Last Name"
              name="lastName"
              isValid={lastName && this.isValidName(lastName)}
              isInvalid={lastName && !this.isValidName(lastName)}
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide} variant="secondary">
            Cancel
          </Button>
          {submitButton}
        </Modal.Footer>
      </Modal>
    );
  }
}
