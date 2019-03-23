import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import s from './Reason.css';

export default class Reason extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    reasonId: PropTypes.number.isRequired,
    isArchived: PropTypes.bool.isRequired,
    deleteReason: PropTypes.func.isRequired,
    editReason: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.description,
    isEdit: false,
  };

  changeValue = event => {
    this.setState({ value: event.target.value });
  };

  startEditReason = () => {
    this.setState({ isEdit: true });
  };

  cancelEdit = () => {
    this.setState({ isEdit: false });
  };

  saveEditReason = e => {
    this.props.editReason(this.props.reasonId, 'description', this.state.value);
    this.setState({ isEdit: false });
  };

  toggleIsArchived = e => {
    this.props.editReason(this.props.reasonId, 'is_active', this.props.isArchived);
    this.setState({ isEdit: false });
  };

  render() {
    const { index, description, reasonId, deleteReason, isArchived } = this.props;
    if (this.state.isEdit) {
      return (
        <ListGroup.Item key={index}>
          <Row>
            <Col xs={6}>
              <Form.Control type="text" onChange={this.changeValue} value={this.state.value} />
            </Col>
            <Col>
              <Button
                className={s.save}
                type="button"
                variant="outline-secondary"
                onClick={this.cancelEdit}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                className={s.save}
                type="button"
                variant="outline-success"
                onClick={this.saveEditReason}
                disabled={!this.state.value}
              >
                Save
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    }

    let archiveButtonText = isArchived ? 'Unarchive' : 'Archive';
    let archiveButton = (
      <Button
        className={s.archive}
        type="button"
        variant="outline-secondary"
        onClick={this.toggleIsArchived}
      >
        {archiveButtonText}
      </Button>
    );

    let allButtons;
    if (isArchived) {
      allButtons = archiveButton;
    } else {
      allButtons = (
        <React.Fragment>
          <Button
            className={s.delete}
            type="button"
            variant="outline-danger"
            onClick={() => deleteReason(reasonId)}
          >
            Delete
          </Button>
          {archiveButton}
          <Button
            className={s.edit}
            type="button"
            variant="outline-primary"
            onClick={this.startEditReason}
          >
            Edit
          </Button>
        </React.Fragment>
      );
    }

    return (
      <ListGroup.Item key={index} className={s.reason}>
        {description}
        {allButtons}
      </ListGroup.Item>
    );
  }
}
