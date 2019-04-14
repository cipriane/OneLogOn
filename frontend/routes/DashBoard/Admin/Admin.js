import React, { Component } from 'react';
import myFetch from 'utils/fetch';
import { Button, Table, Container } from 'react-bootstrap';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import AddModal from './AddModal/AddModal';
import s from './Admin.css';

export default class Admin extends Component {
  state = {
    admins: [],
    pendingInvites: [],
    showAddModal: false,
    isLoading: true,
    error: false,
  };

  async componentDidMount() {
    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      const data = await myFetch('/api/admin');

      this.setState({
        admins: data,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  }

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
    const { isLoading, admins, pendingInvites } = this.state;

    let adminTable = null;
    if (isLoading) {
      adminTable = <div className={s.emptyMessage}>Loading...</div>;
    } else if (!admins.length) {
      adminTable = <div className={s.emptyMessage}>No admins added yet.</div>;
    } else {
      adminTable = (
        <Container fluid className={s.noPad}>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin.id}>
                  <td className={admin.idField}>{admin.first_name}</td>
                  <td>{admin.last_name}</td>
                  <td>{admin.email}</td>
                  <td>
                    {!admin.is_active ? 'Deactivated' : admin.is_staff ? 'Admin' : 'Super Admin'}
                  </td>
                  <td />
                  <td />
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      );
    }
    return (
      <React.Fragment>
        <SimpleHeader title="Admin Management" />
        <div className={s.root}>
          <div className={s.flex}>
            <h2 className={s.tableName}>Admins</h2>
            <Button className={s.right} onClick={this.showAddModal} variant="success">
              Invite Admin
            </Button>
            <AddModal show={this.state.showAddModal} onHide={this.hideAddModal} />
          </div>
          {adminTable}
          <div className={s.largeSpacer} />
          <h2 className={s.tableName}>Role permissions</h2>
          <div className={s.smallSpacer} />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th />
                <th>Statistics</th>
                <th>Settings</th>
                <th>Employees</th>
                <th>Admin</th>
                <th>Kiosk Mode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Admin</td>
                <td>✔️</td>
                <td>Limited</td>
                <td>✔️</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Super Admin</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}
