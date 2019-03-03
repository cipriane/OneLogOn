import React, { Component } from 'react';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import { Container, Badge, Button, Table } from 'react-bootstrap';
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
      console.log(this.state.visitors);
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.toString(),
      });
    }
  }

  render() {
    const { visitors } = this.state;
    return (
      <div>
        <SimpleHeader title="Manage" />

        <Container fluid>
          <Table striped bordered hover size="sm">
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
              {visitors.map(visitor => (
                <tr key={visitor.visitor_id}>
                  <td>{visitor.visitor_id}</td>
                  <td>{visitor.first_name + ' ' + visitor.last_name}</td>
                  <td>
                    {visitor.is_employee == true ? (
                      <Badge className={s.badge} variant="primary">
                        Employee
                      </Badge>
                    ) : (
                      <Badge className={s.badge} variant="success">
                        visitor
                      </Badge>
                    )}
                  </td>
                  <td>
                    {visitor.waiver_signed == true ? (
                      <Badge className={s.badge} variant="success">
                        Waiver signed
                      </Badge>
                    ) : (
                      <Badge className={s.badge} variant="danger">
                        Waiver not signed
                      </Badge>
                    )}
                  </td>
                  <td>
                    <Button className={s.button} variant="info" size="sm">
                      Edit User
                    </Button>
                    <Button className={s.button} variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
