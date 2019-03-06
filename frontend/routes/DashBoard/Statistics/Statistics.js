import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import s from './Statistics.css';
import downloadCSV from 'utils/downloadCSV';
import jsonToCSV from 'utils/jsonToCSV';
import myFetch from 'utils/fetch';

const dummyData = [
  {
    id: 1234567,
    firstName: 'Student1',
    lastName: 's-lastname',
    isEmployee: false,
  },
  {
    id: 1234567,
    firstName: 'Student2',
    lastName: 's-lastname',
    isEmployee: false,
  },
  {
    id: 1234567,
    firstName: 'Employee1',
    lastName: 'e-lastname',
    isEmployee: true,
  },
  {
    id: 1234567,
    firstName: 'Employee2',
    lastName: 'e-lastname',
    isEmployee: true,
  },
];

export default class Statistics extends Component {
  getReport = async () => {
    // TODO: load visitors from API

    //temp variables for testing
    this.state = {};
    this.state['start_time'] = '03/01/2019';
    this.state['end_time'] = '03/03/2019';
    // FRONT END! your turn to implement a way to get get start_time and end_time from the user.

    const visitor_data = await myFetch(
      `/api/checkins?start_time=${this.state.start_time}&end_time=${this.state.end_time}`,
    );

    console.log(visitor_data);

    const data = visitor_data.map(row => ({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
    }));

    const csvData = jsonToCSV(data);
    downloadCSV(csvData);
  };

  render() {
    return (
      <div>
        <SimpleHeader title="Statistics" />
        <div className={s.root}>
          <div className={s.section}>
            <h3 className={s.tableHeader}>Visitors</h3>
            <VisitorTable visitors={dummyData} />
            <Button variant="success" onClick={this.getReport}>
              Export
            </Button>
          </div>
          <div className={s.section}>
            <h3 className={s.tableHeader}>Visitors (Employees)</h3>
            <EmployeeVisitorTable visitors={dummyData} />
            <Button variant="success" onClick={this.getReport}>
              Export
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

class VisitorTable extends Component {
  render() {
    let headers = Object.keys(this.props.visitors[0]);
    headers = headers.filter(e => e !== 'isEmployee');

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers.map((category, id) => (
                <th key={id}>{category}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.visitors.map((visitor, id) =>
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
    let headers = Object.keys(this.props.visitors[0]);
    headers = headers.filter(e => e !== 'isEmployee');

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers.map((category, id) => (
                <th key={id}>{category}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.visitors.map((visitor, id) =>
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
