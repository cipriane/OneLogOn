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
import myFetch from 'utils/fetch';
import s from './Manage.css';

export default class ManageUsers extends Component {
  state = {
    visitors: [],
    isLoading: false,
    error: false,
  };

  async componentDidMount() {
    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      const data = await myFetch('/api/visitors');

      this.setState({
        visitors: data,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.toString(),
      });
    }
  }

  deleteVisitor = index => {
    const { visitors } = this.state;
    let list = visitors;
    list.splice(index, 1);
    this.setState({ visitors: list });
  };

  invite_api_call = async () => {
    await myFetch('/api/sendInvite', {
      method: 'POST',
      body: {},
    });
  };

  render() {
    const { visitors } = this.state;
    return (
      <div>
        <SimpleHeader title="Manage Visitors" />
        <button onClick={this.invite_api_call}>Invite</button>
        <Container fluid>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Waiver</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visitors.map((visitor, id) => (
                <TableRowVisitor key={id} visitor={visitor} deleteVisitor={this.deleteVisitor} />
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

class TableRowVisitor extends Component {
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
