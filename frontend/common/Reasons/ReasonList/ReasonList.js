import React, { Component } from 'react';
import { ListGroup, Form, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Reason from 'common/Reasons/Reason/Reason';
import s from './ReasonList.css';

export default class ReasonList extends Component {
  static propTypes = {
    reasons: PropTypes.array.isRequired,
    addReason: PropTypes.func.isRequired,
    editReason: PropTypes.func.isRequired,
    deleteReason: PropTypes.func.isRequired,
    isArchive: PropTypes.bool,
    isMain: PropTypes.bool,
  };

  state = {
    input: '',
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addReason(this.state.input, this.props.isMain);
    this.setState({
      input: '',
    });
  };

  isValidReason = input => {
    return input && input.length >= 1;
  };

  render() {
    const { input } = this.state;
    const { reasons, editReason, deleteReason, isArchive, isMain } = this.props;

    let reasonsMap = null;
    if (reasons.length) {
      reasonsMap = reasons.map((reason, index) => (
        <Reason
          key={index}
          index={index}
          description={reason.description}
          isArchived={!reason.is_active}
          reasonId={reason.id}
          deleteReason={deleteReason}
          editReason={editReason}
          archiveReason={this.props.archiveReason}
        />
      ));
    } else {
      if (isArchive) {
        reasonsMap = <span className={s.emptyMessage}>No archived reasons</span>;
      } else if (isMain) {
        reasonsMap = <span className={s.emptyMessage}>No main reasons added yet</span>;
      } else {
        reasonsMap = <span className={s.emptyMessage}>No sub reasons added yet</span>;
      }
    }

    let addReasonForm = null;
    if (!isArchive) {
      let labelText;
      if (isMain) {
        labelText = 'New Main Reason';
      } else {
        labelText = 'New Sub Reason';
      }

      addReasonForm = (
        <Form noValidate onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicreasonList">
            <Row>
              <Col>
                <Form.Label className={s.label}>{labelText}</Form.Label>
                <Form.Control
                  type="text"
                  name="input"
                  placeholder="Add a new Visit Reason"
                  value={input}
                  onChange={this.handleChange}
                  isValid={input && this.isValidReason(input)}
                  isInvalid={input && !this.isValidReason(input)}
                />
              </Col>
              <Col>
                <Button
                  className={s.alignBottom}
                  variant="outline-success"
                  type="submit"
                  disabled={!input}
                >
                  Add Reason
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      );
    }

    return (
      <React.Fragment>
        {addReasonForm}
        <ListGroup>{reasonsMap}</ListGroup>
      </React.Fragment>
    );
  }
}
