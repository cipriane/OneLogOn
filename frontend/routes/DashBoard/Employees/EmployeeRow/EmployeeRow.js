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
import s from './EmployeeRow.css';

export default class EmployeeRow extends Component {
  state = {
    first_name: this.props.visitor.first_name,
    last_name: this.props.visitor.last_name,
    is_employee: this.props.visitor.is_employee,
    waiver_signed: this.props.visitor.waiver_signed,
    editMode: false,
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
    const { visitor, deleteVisitor } = this.props;
    const { first_name, last_name, is_employee, waiver_signed, editMode } = this.state;

    if (editMode) {
      return (
        <tr>
          <td>{visitor.visitor_id}</td>
          <td>
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text>First Name</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                name="first_name"
                placeholder={visitor.first_name}
                value={first_name}
                onChange={this.handleChange}
              />
              <Form.Control
                type="text"
                name="last_name"
                placeholder={visitor.last_name}
                value={last_name}
                onChange={this.handleChange}
              />
            </InputGroup>
          </td>
          <td>
            <DropdownButton
              title={is_employee ? 'Employee' : 'Visitor'}
              variant={is_employee ? 'primary' : 'success'}
              size="sm"
            >
              <Dropdown.Item onClick={() => this.setState({ is_employee: true })}>
                Employee
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.setState({ is_employee: false })}>
                Visitor
              </Dropdown.Item>
            </DropdownButton>
          </td>
          <td>
            <DropdownButton
              title={waiver_signed ? 'Waiver Signed' : 'Waiver Not Signed'}
              variant={waiver_signed ? 'success' : 'danger'}
              size="sm"
            >
              <Dropdown.Item onClick={() => this.setState({ waiver_signed: true })}>
                Waiver Signed
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.setState({ waiver_signed: false })}>
                Waiver Not Signed
              </Dropdown.Item>
            </DropdownButton>
          </td>
          <td>
            <Button variant="success" size="sm" onClick={() => this.setState({ editMode: false })}>
              Save Changes
            </Button>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td>{visitor.visitor_id}</td>
        <td>{first_name + ' ' + last_name}</td>
        <td>
          {is_employee == true ? (
            <Badge variant="primary">Employee</Badge>
          ) : (
            <Badge variant="success">visitor</Badge>
          )}
        </td>
        <td>
          {waiver_signed == true ? (
            <Badge variant="success">Waiver signed</Badge>
          ) : (
            <Badge variant="danger">Waiver not signed</Badge>
          )}
        </td>
        <td>
          <Button
            className={s.button}
            variant="info"
            size="sm"
            onClick={() => this.setState({ editMode: true })}
          >
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={deleteVisitor}>
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
