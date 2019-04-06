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
    student_id: 0,
    date_hired: new Date(),
    first_name: '',
    last_name: '',
    error: null,
    isLoading: false,
  };

  addEmployee = async () => {
    console.log(`/api/visitors/${this.state.student_id}/update`);

    try {
      this.setState({ isLoading: true, error: null });

      const data = await myFetch(`/api/visitors/${this.state.student_id}/update`, {
        method: 'PATCH',
        body: {
          date_hired: this.state.date_hired,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
        },
      });

      // hide the modal
      this.props.onHide();
    } catch (err) {
      console.log(err);

      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  };

  set_date_hired = date => {
    this.setState({
      date_hired: date,
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
              name="student_id"
              onChange={this.handleChange}
            />
          </InputGroup>

          <InputGroup className={s.name_box}>
            <FancyTextField
              className={s.name}
              placeholder="First Name"
              name="first_name"
              onChange={this.handleChange}
            />
          </InputGroup>

          <InputGroup className={s.marginTop}>
            <FancyTextField
              className={s.student_picker}
              placeholder="Last Name"
              name="last_name"
              onChange={this.handleChange}
            />
          </InputGroup>

          <div className={s.flex}>
            {/* <p className={s.label}>From:</p> */}
            <InputGroup.Prepend className={s.paddingRight}>
              <InputGroup.Text className={s.whiteBg}>Hired on:</InputGroup.Text>
            </InputGroup.Prepend>
            <Calendar setDate={this.set_date_hired} date={this.state.date_hired} />
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
