import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import FancyButton from 'common/FancyButton/FancyButton';
import s from './AddModal.css';
import Form from 'react-bootstrap/Form';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Calendar from 'common/Calendar/Calendar';
import formatDate from 'utils/formatDate';
import Button from 'react-bootstrap/Button';
import myFetch from 'utils/fetch';

export default class AddModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  state = {
    employeeID: '',
    dateHired: new Date(),
    firstName: null,
    lastName: null,
    error: null,
    isLoading: false,
  };

  addEmployee = async () => {
    try {
      this.setState({ isLoading: true, error: null });

      const data = await myFetch(`/api/visitors/${this.state.employeeID}/update`, {
        method: 'PATCH',
        body: {
          is_employee: true,
          date_hired: this.state.dateHired,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
        },
      });

      // hide the modal
      this.props.onHide();
    } catch (err) {
      console.error(err);

      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
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
      [name]: value,
    });
  };

  render() {
    const { error } = this.state;
    let errorMessage = null;

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
          <InputGroup className={s.name_box}>
            <FancyTextField
              className={s.name}
              type="number"
              placeholder="Student ID without the w"
              name="employeeID"
              value={this.state.employeeID}
              onChange={this.handleChange}
            />
          </InputGroup>

          <InputGroup className={s.name_box}>
            <FancyTextField
              className={s.name}
              placeholder="First Name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </InputGroup>

          <InputGroup className={s.marginTop}>
            <FancyTextField
              className={s.student_picker}
              placeholder="Last Name"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </InputGroup>

          <div className={s.flex}>
            {/* <p className={s.label}>From:</p> */}
            <InputGroup.Prepend className={s.paddingRight}>
              <InputGroup.Text className={s.whiteBg}>Date Hired</InputGroup.Text>
            </InputGroup.Prepend>
            <Calendar setDate={this.setDateHired} date={this.state.dateHired} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide} variant="secondary">
            Cancel
          </Button>
          <Button variant="success" onClick={this.addEmployee}>
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
