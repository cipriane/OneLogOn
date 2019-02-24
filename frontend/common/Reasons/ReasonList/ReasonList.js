import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import Reason from 'common/Reasons/Reason/Reason';

export default class ReasonList extends Component {
  render() {
    const { reasonList, deleteReason, editReason } = this.props;
    return (
      <ListGroup>
        {reasonList.map((reason, index) => (
          <Reason
            key={index}
            index={index}
            reason={reason}
            deleteReason={deleteReason}
            editReason={editReason}
          />
        ))}
      </ListGroup>
    );
  }
}
