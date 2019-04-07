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
import AddModal from './AddModal/AddModal';
import myFetch from 'utils/fetch';
import EmployeeRow from './EmployeeRow/EmployeeRow';
import s from './Employees.css';

export default class Employees extends Component {
  state = {
    employees: [],
    showAddModal: false,
    isLoading: false,
    error: false,
  };

  async componentDidMount() {
    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      const data = await myFetch('/api/visitors?is_employee=true');

      this.setState({
        employees: data,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  }

  deleteVisitor = index => {
    const { employees } = this.state;
    let list = employees;
    list.splice(index, 1);
    this.setState({ employees: list });

    // what is the ID?????????
    const data = myFetch(`/api/visitors/${this.state.id}/update`, {
      method: 'DELETE',
    });
  };

  invite_api_call = async () => {
    await myFetch('/api/sendInvite', {
      method: 'POST',
      body: {
        recipient: 'skarchmit@gmail.com',
      },
    });
  };

  showAddModal = () => {
    this.setState({
      showAddModal: true,
    });
  };

  hideAddModal = () => {
    this.setState({
      showAddModal: false,
    });
  };

  render() {
    const { isLoading, employees } = this.state;

    let employeeTable = null;
    if (isLoading) {
      employeeTable = <div className={s.emptyMessage}>Loading...</div>;
    } else if (employees.length) {
      employeeTable = (
        <Container fluid className={s.noPad}>
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
              {employees.map((visitor, id) => (
                <EmployeeRow key={id} visitor={visitor} deleteVisitor={this.deleteVisitor} />
              ))}
            </tbody>
          </Table>
        </Container>
      );
    } else {
      employeeTable = <div className={s.emptyMessage}>No employees added yet.</div>;
    }

    return (
      <React.Fragment>
        <SimpleHeader title="Employee Directory" />
        <div className={s.root}>
          <div className={s.flex}>
            <h2 className={s.tableName}>Employees</h2>
            <Button className={s.right} onClick={this.showAddModal} variant="success">
              Add Employee
            </Button>
            <AddModal show={this.state.showAddModal} onHide={this.hideAddModal} />
          </div>
          {employeeTable}
        </div>
      </React.Fragment>
    );
  }
}
