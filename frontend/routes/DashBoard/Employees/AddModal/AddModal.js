import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import FancyButton from 'common/FancyButton/FancyButton';
import s from './AddModal.css';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import Calendar from 'common/Calendar/Calendar';
import Button from 'react-bootstrap/Button';
import myFetch from 'utils/fetch';

export default class AddModal extends Component {
  static propTypes = {
    employeeIDs: PropTypes.array.isRequired,
    addEmployee: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  state = {
    employeeID: '',
    dateHired: new Date(),
    firstName: '',
    lastName: '',
    error: null,
    isLoading: false,
  };

  addEmployee = async () => {
    try {
      this.setState({ isLoading: true, error: null });
      const { employeeID } = this.state;
      if (employeeID.length <= 0) {
        throw new Error('Missing employee ID');
      } else if (this.props.employeeIDs.includes(employeeID)) {
        throw new Error('An employee with that ID already exists');
      }
      const employee = await myFetch(`/api/visitors/${employeeID}/update`, {
        method: 'PATCH',
        body: {
          is_employee: true,
          date_hired: this.state.dateHired,
          first_name: this.state.firstName || null,
          last_name: this.state.lastName || null,
        },
      });
      this.setState({
        isLoading: false,
        employeeID: '',
        firstName: '',
        lastName: '',
      });
      this.props.onHide();
      this.props.addEmployee(employee);
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  };

  setError = err => {
    this.setState({
      error: err.message,
    });
  };

  setDateHired = date => {
    this.setState({
      dateHired: date,
    });
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      error: null,
      [name]: value,
    });
  };

  render() {
    const { error, isLoading } = this.state;
    let errorMessage = null;
    if (error) {
      errorMessage = <Alert variant="danger">{error}</Alert>;
    }

    let submitButton = null;
    if (isLoading) {
      submitButton = (
        <Button disabled variant="success">
          Loading...
        </Button>
      );
    } else {
      submitButton = (
        <Button onClick={this.addEmployee} variant="success">
          Add Employee
        </Button>
      );
    }
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <div className={s.title}>Add Employee</div>
        </Modal.Header>
        {errorMessage}
        <Modal.Body>
          <InputGroup className={s.margin}>
            <InputGroup.Prepend className={s.paddingRight}>
              <InputGroup.Text className={s.whiteBg}>ID</InputGroup.Text>
            </InputGroup.Prepend>
            <FancyTextField
              className={s.name}
              type="number"
              placeholder="Employee ID"
              name="employeeID"
              value={this.state.employeeID}
              onChange={this.handleChange}
            />
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
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </InputGroup>
          <div className={s.flex}>
            <InputGroup.Prepend className={s.paddingRight}>
              <InputGroup.Text className={s.whiteBg}>Date hired</InputGroup.Text>
            </InputGroup.Prepend>
            <Calendar setDate={this.setDateHired} date={this.state.dateHired} showSideArrows />
          </div>
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
