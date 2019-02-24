import React, { Component } from 'react';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import s from './Reason.css';

export default class Reason extends Component {
  state = {
    value: this.props.reason,
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
    const { index, reason, deleteReason } = this.props;
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
                variant="success"
                onClick={this.saveEditReason}
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
          variant="danger"
          onClick={() => deleteReason(index)}
        >
          Delete
        </Button>
        <Button className={s.edit} type="button" variant="primary" onClick={this.startEditReason}>
          Edit
        </Button>
      </ListGroup.Item>
    );
  }
}
