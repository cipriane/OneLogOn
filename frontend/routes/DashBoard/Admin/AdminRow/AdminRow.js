import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import s from './AdminRow.css';
import myFetch from 'utils/fetch';
import formatDate from 'utils/formatDate';
import formatTime from 'utils/formatTime';

const DEACTIVATED = -1;
const ADMIN = 0;
const SUPER_ADMIN = 1;

export default class AdminRow extends Component {
  static propTypes = {
    updateAdmin: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    admin: PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      is_active: PropTypes.bool.isRequired,
      is_staff: PropTypes.bool.isRequired,
    }).isRequired,
  };

  state = {
    role: !this.props.admin.is_active
      ? DEACTIVATED
      : this.props.admin.is_staff
      ? ADMIN
      : SUPER_ADMIN,
    isEditing: false,
    isSaving: false,
  };

  editAdmin = async () => {
    const { admin } = this.props;
    try {
      this.setState({ isSaving: true });
      const updatedAdmin = await myFetch(`/api/admin/${admin.id}/update`, {
        method: 'PATCH',
        body: {
          role: this.state.role,
        },
      });
      this.setState({
        isSaving: false,
        isEditing: false,
      });
      this.props.updateAdmin(updatedAdmin);
    } catch (err) {
      this.setState({
        isSaving: false,
      });
      this.props.setError(err.message);
    }
  };

  setEditMode = () => {
    this.setState({
      isEditing: true,
    });
  };

  cancelEdit = () => {
    this.setState({
      isEditing: false,
      role: !this.props.admin.is_active
        ? DEACTIVATED
        : this.props.admin.is_staff
        ? ADMIN
        : SUPER_ADMIN,
    });
  };

  handleChange = event => {
    this.setState({ role: event.target.value });
  };

  render() {
    const { isEditing, isSaving, role } = this.state;
    const { admin, setError } = this.props;
    if (isEditing) {
      return (
        <tr key={admin.id}>
          <td className={admin.idField}>{admin.first_name}</td>
          <td>{admin.last_name}</td>
          <td>{admin.email}</td>
          <td className="form-group">
            <select value={role} className="form-control" onChange={this.handleChange}>
              <option value={DEACTIVATED}>Deactivated</option>
              <option value={ADMIN}>Admin</option>
              <option value={SUPER_ADMIN}>Super Admin</option>
            </select>
          </td>
          <td className={s.buttonField}>
            <Button
              className={s.squishedButton}
              variant="secondary"
              size="sm"
              onClick={this.cancelEdit}
            >
              Cancel
            </Button>
          </td>
          <td className={s.buttonField}>
            <Button
              className={s.squishedButton}
              disabled={isSaving}
              variant="success"
              size="sm"
              onClick={this.editAdmin}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </td>
        </tr>
      );
    }
    return (
      <tr key={admin.id}>
        <td className={admin.idField}>{admin.first_name}</td>
        <td>{admin.last_name}</td>
        <td>{admin.email}</td>
        <td>{!admin.is_active ? 'Deactivated' : admin.is_staff ? 'Admin' : 'Super Admin'}</td>
        <td className={s.buttonField}>
          <Button className={s.squishedButton} variant="info" size="sm" onClick={this.setEditMode}>
            Edit
          </Button>
        </td>
        <td />
      </tr>
    );
  }
}
