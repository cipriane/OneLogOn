import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, InputGroup } from 'react-bootstrap';
import formatDate from 'utils/formatDate';
import Calendar from 'common/Calendar/Calendar';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import s from './EditModal.css';

export default class EditModal extends Component {
  static propTypes = {
    employee: PropTypes.object.isRequired,
    updateEmployee: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
  };

  state = {
    employee: {},
    selectedDate: new Date(),
    hiredDate: new Date(),
    checkinTime: '00:00',
    checkoutTime: '00:00',
    error: null,
    isLoading: false,
  };

  componentWillReceiveProps(props) {
    this.setState({
      hiredDate: formatDate(new Date(props.employee.date_hired)),
    });
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      error: null,
      [name]: value,
    });
  };

  setDate = async date => {
    this.setState({
      selectedDate: date,
    });
  };

  render() {
    const { error, selectedDate, checkinTime, checkoutTime, hiredDate } = this.state;
    const { editMode, onHide, updateEmployee } = this.props;

    let errorMessage = null;
    if (error) {
      errorMessage = <Alert variant="danger">{error}</Alert>;
    }
    let submitButton = null;
    if (editMode) {
      submitButton = (
        <Button variant="success" onClick={onHide}>
          Save changes
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
          <div className={s.flex}>
            <div className={s.name}>
              Time Card: {this.props.employee.first_name} {this.props.employee.last_name}
            </div>
            <Calendar
              className={s.calendar}
              setDate={this.setDate}
              date={selectedDate}
              showSideArrows
            />
          </div>
        </Modal.Header>
        {errorMessage}
        <Modal.Body>
          <InputGroup className={s.margin}>
            <InputGroup.Prepend className={s.paddingRight}>
              <InputGroup.Text className={s.whiteBg}>Date Hired</InputGroup.Text>
            </InputGroup.Prepend>
            <FancyTextField
              className={s.textfield}
              placeholder="Last Name"
              name="lastName"
              value={hiredDate}
              onChange={this.handleChange}
              disabled={editMode ? false : true}
            />
          </InputGroup>
          <InputGroup className={s.margin}>
            <InputGroup.Prepend className={s.paddingRight}>
              <InputGroup.Text className={s.whiteBg}>Checkin Time</InputGroup.Text>
            </InputGroup.Prepend>
            <FancyTextField
              className={s.textfield}
              placeholder="Last Name"
              name="lastName"
              value={checkinTime}
              onChange={this.handleChange}
              disabled={editMode ? false : true}
            />
          </InputGroup>
          <InputGroup className={s.margin}>
            <InputGroup.Prepend className={s.paddingRight}>
              <InputGroup.Text className={s.whiteBg}>Checkout Time</InputGroup.Text>
            </InputGroup.Prepend>
            <FancyTextField
              className={s.textfield}
              placeholder="Last Name"
              name="lastName"
              value={checkoutTime}
              onChange={this.handleChange}
              disabled={editMode ? false : true}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
          {submitButton}
        </Modal.Footer>
      </Modal>
    );
  }
}
