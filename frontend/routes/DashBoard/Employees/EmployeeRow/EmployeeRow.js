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
import formatDate from 'utils/formatDate';
import s from './EmployeeRow.css';

export default class EmployeeRow extends Component {
  static propTypes = {
    removeEmployee: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {
    editMode: false,
    isDeleting: false,
  };

  removeEmployee = id => {
    this.setState({ isDeleting: true });
    try {
      const visitor = myFetch(`/api/visitors/${id}/update`, {
        method: 'PATCH',
        body: {
          date_hired: null,
          is_employee: false,
        },
      });

      this.props.removeEmployee(visitor.id);

      this.setState({ isDeleting: false });
    } catch (err) {
      this.setState({
        isDeleting: false,
      });
      this.props.setDeleteError(err);
    }
  };

  updateEmployee = () => {
    this.setState({
      editMode: false,
    });
  };

  cancelEdit = () => {
    this.setState({
      editMode: false,
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
    const { employee, removeEmployee } = this.props;
    const { editMode } = this.state;

    if (editMode) {
      return (
        <tr>
          <td>{employee.visitor_id}</td>
          <td>
            <InputGroup size="sm">
              <Form.Control
                type="text"
                name="first_name"
                placeholder={employee.first_name}
                value={employee.first_name}
                onChange={this.handleChange}
              />
            </InputGroup>
          </td>
          <td>
            <InputGroup size="sm">
              <Form.Control
                type="text"
                name="last_name"
                placeholder={employee.last_name}
                value={employee.last_name}
                onChange={this.handleChange}
              />
            </InputGroup>
          </td>
          <td>Calendar Picker</td>
          <td>View Timecard</td>
          <td>
            <Button variant="secondary" size="sm" onClick={this.cancelEdit}>
              Cancel
            </Button>
            <Button variant="success" size="sm" onClick={this.updateEmployee}>
              Save
            </Button>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td>{employee.visitor_id}</td>
        <td>{employee.first_name || ''}</td>
        <td>{employee.last_name || ''}</td>
        <td>{formatDate(new Date(employee.date_hired))}</td>
        <td>View Timecard</td>
        <td>
          <Button
            className={s.button}
            variant="info"
            size="sm"
            onClick={() => this.setState({ editMode: true })}
          >
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={removeEmployee}>
            Remove
          </Button>
        </td>
      </tr>
    );
  }
}
