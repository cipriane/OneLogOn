import React, { Component } from 'react';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import ReasonList from 'common/Reasons/ReasonList/ReasonList';
import s from './Settings.css';
import myFetch from 'utils/fetch';

export default class Settings extends Component {
  state = {
    welcomeMessage:
      'A simple Open Source visitor check-in and statistics aggregation system for your facility or site.',
    username: 'Admin',
    password: 'password',
    reasons: [],
    reason: '',
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      const data = await myFetch('/api/listreason');

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

  handleSubmit = event => {
    event.preventDefault();
  };

  addReason = () => {
    const { reason, reasons } = this.state;
    let list = reasons;
    list.push(reason);
    this.setState({ reasons: list, reason: '' });
  };

  deleteReason = index => {
    const { reasons } = this.state;
    let list = reasons;
    list.splice(index, 1);
    this.setState({ reasons: list });
  };

  editReason = (index, value) => {
    const { reasons } = this.state;
    let list = reasons;
    list[index] = value;
    this.setState({ reasons: list });
  };

  render() {
    const { reasons } = this.state;

    return (
      <div>
        <SimpleHeader title="Settings" />
        <Form className={s.form} onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicMessage">
            <Form.Label className={s.label}>Checkin Message:</Form.Label>
            <Form.Control
              type="text"
              name="welcomeMessage"
              value={this.state.welcomeMessage}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">Edit the welcome message on the home page.</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label className={s.label}>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">Edit your username.</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className={s.label}>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;"
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">Edit your password.</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicReasons" className={s.reasonGroup}>
            <Form.Label className={s.label}>Reasons:</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  name="reason"
                  placeholder="Add a new Visit Reason"
                  value={this.state.reason}
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <Button variant="outline-primary" onClick={this.addReason}>
                  Add Reason
                </Button>
              </Col>
            </Row>
          </Form.Group>

          <ReasonList
            reasonList={reasons}
            editReason={this.editReason}
            deleteReason={this.deleteReason}
          />

          <Button type="submit" variant="success" label="Save" className={s.submit}>
            Save changes
          </Button>
        </Form>
      </div>
    );
  }
}
