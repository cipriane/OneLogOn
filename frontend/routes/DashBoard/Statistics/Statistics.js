import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import s from './Statistics.css';

const data = {
  thead: ['ID', 'firstName', 'Last Name'],
  tbody: [
    {
      id: 1234567,
      firstName: 'Student1',
      lastName: 's',
      isEmployee: false,
    },
    {
      id: 1234567,
      firstName: 'Student2',
      lastName: 's',
      isEmployee: false,
    },
    {
      id: 1234567,
      firstName: 'Employee1',
      lastName: 'e',
      isEmployee: true,
    },
    {
      id: 1234567,
      firstName: 'Employee2',
      lastName: 'e',
      isEmployee: true,
    },
  ],
};
export default class Statistics extends Component {
  render() {
    return (
      <div>
        <SimpleHeader title="Statistics" />
        <div className={s.root}>
          <div className={s.section}>
            <h3 className={s.tableHeader}>Visitors</h3>
            <VisitorTable visitors={data} />
            <Button variant="success">Export</Button>
          </div>
          <div className={s.section}>
            <h3 className={s.tableHeader}>Visitors (Employees)</h3>
            <EmployeeVisitorTable visitors={data} />
            <Button variant="success">Export</Button>
          </div>
        </div>
      </div>
    );
  }
}

class VisitorTable extends Component {
  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              {this.props.visitors.thead.map((category, id) => (
                <th key={id}>{category}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.visitors.tbody.map((visitor, id) =>
              !visitor.isEmployee ? (
                <tr key={id}>
                  <td>{visitor.id}</td>
                  <td>{visitor.firstName}</td>
                  <td>{visitor.lastName}</td>
                </tr>
              ) : null,
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

class EmployeeVisitorTable extends Component {
  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              {this.props.visitors.thead.map((category, id) => (
                <th key={id}>{category}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.visitors.tbody.map((visitor, id) =>
              visitor.isEmployee ? (
                <tr key={id}>
                  <td>{visitor.id}</td>
                  <td>{visitor.firstName}</td>
                  <td>{visitor.lastName}</td>
                </tr>
              ) : null,
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
