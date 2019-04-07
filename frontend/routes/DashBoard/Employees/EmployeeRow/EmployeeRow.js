import React, { Component } from 'react';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import {
  Container,
  Badge,
  Button,
  Table,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Calendar from 'common/Calendar/Calendar';
import formatDate from 'utils/formatDate';
import s from './EmployeeRow.css';
import myFetch from 'utils/fetch';
import Timecard from '../Timecard/Timecard';

export default class EmployeeRow extends Component {
  static propTypes = {
    updateEmployee: PropTypes.func.isRequired,
    removeEmployee: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {
    editMode: false,
    isSaving: false,
    isDeleting: false,
    dateHired: this.props.employee.date_hired,
    firstName: this.props.employee.first_name,
    lastName: this.props.employee.last_name,
  };

  removeEmployee = async () => {
    const { employee } = this.props;
    try {
      this.setState({ isDeleting: true });
      const deletedEmployee = await myFetch(`/api/visitors/${employee.visitor_id}/update`, {
        method: 'PATCH',
        body: {
          date_hired: null,
          is_employee: false,
        },
      });
      this.setState({ isDeleting: false });
      this.props.removeEmployee(deletedEmployee.visitor_id);
    } catch (err) {
      this.setState({
        isDeleting: false,
      });
      this.props.setError(err);
    }
  };

  setDate = date => {
    this.setState({
      dateHired: date,
    });
  };

  updateEmployee = async () => {
    try {
      this.setState({
        isSaving: true,
      });
      const updatedEmployee = await myFetch(
        `/api/visitors/${this.props.employee.visitor_id}/update`,
        {
          method: 'PATCH',
          body: {
            date_hired: this.state.dateHired,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
          },
        },
      );

      this.setState({
        editMode: false,
        isSaving: false,
      });
      this.props.updateEmployee(updatedEmployee);
    } catch (err) {
      this.setState({
        editMode: false,
        isSaving: false,
      });
      this.props.setError(err);
    }
  };

  cancelEdit = () => {
    this.setState({
      editMode: false,
      dateHired: this.props.employee.date_hired,
      firstName: this.props.employee.first_name,
      lastName: this.props.employee.last_name,
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
    const { employee } = this.props;
    const { editMode, isSaving, isDeleting, firstName, lastName } = this.state;

    if (editMode) {
      return (
        <tr>
          <td className={s.idField}>{employee.visitor_id}</td>
          <td>
            <InputGroup size="sm">
              <Form.Control
                className={s.textInputField}
                type="text"
                name="firstName"
                placeholder="First name"
                value={firstName || ''}
                onChange={this.handleChange}
              />
            </InputGroup>
          </td>
          <td>
            <InputGroup size="sm">
              <Form.Control
                className={s.textInputField}
                type="text"
                name="lastName"
                placeholder={'Last name'}
                value={lastName || ''}
                onChange={this.handleChange}
              />
            </InputGroup>
          </td>
          <td>
            <div className={s.calendarContainer}>
              <Calendar
                setDate={this.setDate}
                date={new Date(this.state.dateHired)}
                showSideArrows={false}
              />
            </div>
          </td>
          <td className={s.timecardField}>
            <Timecard employee={employee} editMode={editMode} />
          </td>
          <td className={s.buttonField}>
            <Button variant="secondary" disabled={isSaving} size="sm" onClick={this.cancelEdit}>
              Cancel
            </Button>
          </td>
          <td className={s.buttonField}>
            <Button variant="success" disabled={isSaving} size="sm" onClick={this.updateEmployee}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td className={s.idField}>{employee.visitor_id}</td>
        <td>{employee.first_name || ''}</td>
        <td>{employee.last_name || ''}</td>
        <td>{formatDate(new Date(employee.date_hired))}</td>
        <td className={s.timecardField}>
          <Timecard employee={employee} editMode={editMode} />
        </td>
        <td className={s.buttonField}>
          <Button
            className={s.button}
            variant="info"
            size="sm"
            onClick={() => this.setState({ editMode: true })}
          >
            Edit
          </Button>
        </td>
        <td className={s.buttonField}>
          <Button variant="danger" disabled={isDeleting} size="sm" onClick={this.removeEmployee}>
            {isDeleting ? 'Removing...' : 'Remove'}
          </Button>
        </td>
      </tr>
    );
  }
}
