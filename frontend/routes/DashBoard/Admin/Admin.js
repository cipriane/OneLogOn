import React, { Component } from 'react';
import myFetch from 'utils/fetch';
import { Alert, Button, Table, Container } from 'react-bootstrap';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import AddModal from './AddModal/AddModal';
import s from './Admin.css';
import formatDate from 'utils/formatDate';
import formatTime from 'utils/formatTime';

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
      const [adminData, inviteData] = await Promise.all([
        myFetch('/api/admin'),
        myFetch('/api/invite'),
      ]);

      this.setState({
        admins: adminData,
        pendingInvites: inviteData,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  }

  addPendingInvite = invite => {
    this.setState(prevState => ({
      pendingInvites: [...prevState.pendingInvites, invite],
    }));
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
    const { error, isLoading, admins, pendingInvites } = this.state;

    let errorMessage = null;
    if (error) {
      errorMessage = <Alert variant="danger">{error}</Alert>;
    }

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
                  <td>Edit</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      );
    }

    let pendingInvitesTable = null;
    if (isLoading) {
      pendingInvitesTable = <div className={s.emptyMessage}>Loading...</div>;
    } else if (!pendingInvites.length) {
      pendingInvitesTable = <div className={s.emptyMessage}>No pending invites.</div>;
    } else {
      pendingInvitesTable = (
        <Container fluid className={s.noPad}>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Expires</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pendingInvites.map(invite => (
                <tr key={invite.id}>
                  <td className={s.idField}>{invite.first_name}</td>
                  <td>{invite.last_name}</td>
                  <td>{invite.email}</td>
                  <td>{`${formatDate(new Date(invite.expires_on))}, ${formatTime(
                    new Date(invite.expires_on),
                  )}`}</td>
                  <td>Revoke</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      );
    }

    let tables = null;
    if (error) {
      tables = errorMessage;
    } else {
      tables = (
        <React.Fragment>
          <div className={s.flex}>
            <h2 className={s.tableName}>Admins</h2>
            <Button className={s.right} onClick={this.showAddModal} variant="success">
              Invite Admin
            </Button>
            <AddModal
              show={this.state.showAddModal}
              onHide={this.hideAddModal}
              addPendingInvite={this.addPendingInvite}
            />
          </div>
          {adminTable}
          <div className={s.largeSpacer} />
          <h2 className={s.tableName}>Pending Invites</h2>
          <div className={s.smallSpacer} />
          {pendingInvitesTable}
          <div className={s.largeSpacer} />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <SimpleHeader title="Admin Management" />
        <div className={s.root}>
          {tables}
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
