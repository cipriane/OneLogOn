import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

const formatDateToTime = date => {
  if (!date) {
    return '';
  }
  return new Date(date).toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default class MyTable extends Component {
  render() {
    if (this.props.visitors.length === 0) {
      return <div>No visitors</div>;
    }
    let headers = ['Visitor ID', 'Check In Time', 'Check Out Time', 'Waiver Signed'];

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
                  <td>{visitor.visitor__visitor_id}</td>
                  <td>{formatDateToTime(visitor.check_in)}</td>
                  <td>{formatDateToTime(visitor.check_out)}</td>
                  <td>{visitor.visitor__waiver_signed ? 'Yes' : 'No'}</td>
                </tr>
              ) : null,
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
