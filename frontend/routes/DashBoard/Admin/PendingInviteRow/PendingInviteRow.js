import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import s from './PendingInviteRow.css';
import myFetch from 'utils/fetch';
import formatDate from 'utils/formatDate';
import formatTime from 'utils/formatTime';

export default class PendingInviteRow extends Component {
  static propTypes = {
    removeInvite: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    invite: PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      expires_on: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    isDeleting: false,
  };

  revokeInvite = async () => {
    const { invite } = this.props;
    try {
      this.setState({ isDeleting: true });
      const revokedInvite = await myFetch(`/api/invite/${invite.id}/update`, {
        method: 'PATCH',
        body: {
          is_claimed: true,
        },
      });
      this.setState({ isDeleting: false });
      this.props.removeInvite(revokedInvite && revokedInvite.id);
    } catch (err) {
      this.setState({
        isDeleting: false,
      });
      this.props.setError(err.message);
    }
  };

  render() {
    const { isDeleting } = this.state;
    const { invite, setError } = this.props;
    return (
      <tr>
        <td className={s.idField}>{invite.first_name}</td>
        <td>{invite.last_name}</td>
        <td>{invite.email}</td>
        <td>{`${formatDate(new Date(invite.expires_on))}, ${formatTime(
          new Date(invite.expires_on),
        )}`}</td>
        <td className={s.buttonField}>
          <Button variant="danger" disabled={isDeleting} size="sm" onClick={this.revokeInvite}>
            {isDeleting ? 'Removing...' : 'Revoke'}
          </Button>
        </td>
      </tr>
    );
  }
}
