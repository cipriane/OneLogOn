import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import s from './Reason.css';

export default class Reason extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    reason: PropTypes.string.isRequired,
    reasonId: PropTypes.number.isRequired,
    deleteReason: PropTypes.func.isRequired,
    editReason: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.reason,
    isEdit: false,
  };

  changeValue = event => {
    this.setState({ value: event.target.value });
  };

  startEditReason = () => {
    this.setState({ isEdit: true });
  };

  saveEditReason = (e, index) => {
    this.props.editReason(this.props.index, this.state.value);
    this.setState({ isEdit: false });
  };

  render() {
    const { index, reason, reasonId, deleteReason } = this.props;
    if (this.state.isEdit) {
      return (
        <ListGroup.Item key={index}>
          <Row>
            <Col>
              <Form.Control type="text" onChange={this.changeValue} value={this.state.value} />
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
    return (
      <ListGroup.Item key={index} className={s.reason}>
        {reason}
        <Button
          className={s.delete}
          type="button"
          variant="outline-danger"
          onClick={() => deleteReason(reasonId)}
        >
          Delete
        </Button>
        <Button
          className={s.edit}
          type="button"
          variant="outline-primary"
          onClick={this.startEditReason}
        >
          Edit
        </Button>
      </ListGroup.Item>
    );
  }
}
