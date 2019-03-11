import React, { Component } from 'react';
import { ListGroup, Form, Row, Col, Button } from 'react-bootstrap';
import Reason from 'common/Reasons/Reason/Reason';
import myFetch from 'utils/fetch';

export default class ReasonList extends Component {
  state = {
    input: '',
    reasons: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      const data = await myFetch('/api/visitreasons');

      this.setState({
        reasons: data,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.toString(),
      });
    }
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  addReason = async () => {
    try {
      const { input, reasons } = this.state;
      this.setState({
        error: null,
        isLoading: true,
      });
      const reason = await myFetch('/api/visitreason/create', {
        method: 'POST',
        body: {
          description: input,
        },
      });

      this.setState({
        reasons: [reason, ...reasons],
        isLoading: false,
        input: '',
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.toString(),
      });
    }
  };

  deleteReason = async id => {
    try {
      const { input, reasons } = this.state;
      this.setState({
        error: null,
        isLoading: true,
      });
      await myFetch(`/api/visitreason/${id}/delete`, {
        method: 'DELETE',
      });
      this.setState({
        reasons: reasons.filter(reason => {
          return reason.id !== id;
        }),
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      this.setState({
        isLoading: false,
        error: err.toString(),
      });
    }
  };

  editReason = (index, value) => {
    const { reasons } = this.state;
    let list = reasons;
    list[index].visit_reason = value;
    this.setState({ reasons: list });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.addReason();
  };

  isValidReason = inputt => {
    return inputt && inputt.length >= 1;
  };

  render() {
    const { input, reasons } = this.state;
    return (
      <React.Fragment>
        <Form noValidate onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicreasonList">
            <Row>
              <Col>
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
                <Button variant="outline-success" type="submit" disabled={!input}>
                  Add Reason
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>

        <ListGroup>
          {reasons.map((reason, index) => (
            <Reason
              key={index}
              index={index}
              reason={reason.description}
              reasonId={reason.id}
              deleteReason={this.deleteReason}
              editReason={this.editReason}
            />
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }
}
