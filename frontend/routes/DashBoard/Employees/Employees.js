import React, { Component } from 'react';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import {
  Alert,
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
import Timecard from './Timecard/Timecard';
import s from './Employees.css';

const SORT_OPTIONS = {
  ID: 1,
  FIRST_NAME: 2,
  LAST_NAME: 3,
  DATE_HIRED: 4,
};

export default class Employees extends Component {
  state = {
    employees: [],
    sort: SORT_OPTIONS.ID,
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
        employees: this.sortEmployees(data),
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  }

  sortEmployees = (employees, sort) => {
    sort = sort ? sort : this.state.sort;
    switch (sort) {
      case +SORT_OPTIONS.ID:
        return employees.sort((a, b) => {
          return a.visitor_id - b.visitor_id;
        });
      case -SORT_OPTIONS.ID:
        return employees.sort((a, b) => {
          return b.visitor_id - a.visitor_id;
        });
      case +SORT_OPTIONS.FIRST_NAME:
        return employees.sort((a, b) => {
          if (!a.first_name) return 1;
          return a.first_name > b.first_name ? 1 : -1;
        });
      case -SORT_OPTIONS.FIRST_NAME:
        return employees.sort((a, b) => {
          if (!a.first_name) return -1;
          return a.first_name < b.first_name ? 1 : -1;
        });
      case +SORT_OPTIONS.LAST_NAME:
        return employees.sort((a, b) => {
          if (!a.last_name) return 1;
          return a.last_name > b.last_name ? 1 : -1;
        });
      case -SORT_OPTIONS.LAST_NAME:
        return employees.sort((a, b) => {
          if (!a.last_name) return -1;
          return a.last_name < b.last_name ? 1 : -1;
        });
      case +SORT_OPTIONS.DATE_HIRED:
        return employees.sort((a, b) => {
          return a.date_hired > b.date_hired ? 1 : -1;
        });
      case -SORT_OPTIONS.DATE_HIRED:
        return employees.sort((a, b) => {
          return a.date_hired < b.date_hired ? 1 : -1;
        });
      default:
        return employees;
    }
  };

  setSort = selectedSort => {
    this.setState(prevState => {
      const { sort, employees } = prevState;
      const newSort = selectedSort === sort ? -selectedSort : selectedSort;
      const sortedEmployees = this.sortEmployees(employees, newSort);
      return {
        sort: newSort,
        employees: sortedEmployees,
      };
    });
  };

  addEmployee = employee => {
    if (!employee) {
      this.setState({
        error: 'Error: Invalid employee',
      });
      return;
    }

    this.setState(prevState => ({
      employees: this.sortEmployees([employee, ...prevState.employees]),
    }));
  };

  updateEmployee = employee => {
    this.setState(prevState => {
      const { employees } = prevState;
      const index = employees.findIndex(e => e.visitor_id === employee.visitor_id);
      employees[index] = employee;
      return {
        employees: this.sortEmployees(employees),
      };
    });
  };

  removeEmployee = id => {
    this.setState(prevState => {
      const { employees } = prevState;
      const index = employees.findIndex(employee => employee.visitor_id === id);
      if (index === -1) {
        return {};
      }
      employees.splice(index, 1);
      return {
        employees,
      };
    });
  };

  setError = err => {
    this.setState({
      error: err,
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
    const { error, isLoading, employees, sort } = this.state;

    let errorMessage = null;
    if (error) {
      errorMessage = <Alert variant="danger">{error}</Alert>;
    }

    let employeeTable = null;
    if (isLoading) {
      employeeTable = <div className={s.emptyMessage}>Loading...</div>;
    } else if (employees.length) {
      employeeTable = (
        <Container fluid className={s.noPad}>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th onClick={() => this.setSort(1)} className={s.sortable}>
                  ID {sort === 1 ? '▲' : sort === -1 ? '▼' : '\u00A0'}
                </th>
                <th onClick={() => this.setSort(2)} className={s.sortable}>
                  First name {sort === 2 ? '▲' : sort === -2 ? '▼' : '\u00A0'}
                </th>
                <th onClick={() => this.setSort(3)} className={s.sortable}>
                  Last name {sort === 3 ? '▲' : sort === -3 ? '▼' : '\u00A0'}
                </th>
                <th onClick={() => this.setSort(4)} className={s.sortable}>
                  Date hired {sort === 4 ? '▲' : sort === -4 ? '▼' : '\u00A0'}
                </th>
                <th>Timecard</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <EmployeeRow
                  key={employee.visitor_id}
                  employee={employee}
                  updateEmployee={this.updateEmployee}
                  removeEmployee={this.removeEmployee}
                  setError={this.setError}
                />
              ))}
            </tbody>
          </Table>
        </Container>
      );
    } else {
      employeeTable = <div className={s.emptyMessage}>No employees added yet.</div>;
    }
    const employeeIDs = employees.map(employee => employee.visitor_id);

    return (
      <React.Fragment>
        <SimpleHeader title="Employee Directory" />
        <div className={s.root}>
          <div className={s.flex}>
            <h2 className={s.tableName}>Employees</h2>
            <Button className={s.right} onClick={this.showAddModal} variant="success">
              Add Employee
            </Button>
            <AddModal
              employeeIDs={employeeIDs}
              show={this.state.showAddModal}
              onHide={this.hideAddModal}
              addEmployee={this.addEmployee}
            />
          </div>
          {errorMessage}
          {employeeTable}
        </div>
      </React.Fragment>
    );
  }
}
