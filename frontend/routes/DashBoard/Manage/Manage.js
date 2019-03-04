import React, { Component } from 'react';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import { Container, Badge, Button, Table, Modal, Form, InputGroup } from 'react-bootstrap';
import myFetch from 'utils/fetch';
import s from './Manage.css';

export default class ManageUsers extends Component {
  state = {
    visitors: [],
    isLoading: false,
    error: false,
    modalShow: false,
    selectedVisitor: {},
  };

  async componentDidMount() {
    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      const data = await myFetch('/api/visitors');

      this.setState({
        visitors: data,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.toString(),
      });
    }
  }

  modalClose = () => {
    this.setState({ modalShow: false });
  };

  modalOpen = visitor => {
    this.setState({ selectedVisitor: visitor, modalShow: true });
  };

  render() {
    const { visitors } = this.state;
    return (
      <div>
        <SimpleHeader title="Manage" />

        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          visitor={this.state.selectedVisitor}
        />

        <Container fluid>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Waiver</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visitors.map(visitor => (
                <tr key={visitor.visitor_id}>
                  <td>{visitor.visitor_id}</td>
                  <td>{visitor.first_name + ' ' + visitor.last_name}</td>
                  <td>
                    {visitor.is_employee == true ? (
                      <Badge className={s.badge} variant="primary">
                        Employee
                      </Badge>
                    ) : (
                      <Badge className={s.badge} variant="success">
                        visitor
                      </Badge>
                    )}
                  </td>
                  <td>
                    {visitor.waiver_signed == true ? (
                      <Badge className={s.badge} variant="success">
                        Waiver signed
                      </Badge>
                    ) : (
                      <Badge className={s.badge} variant="danger">
                        Waiver not signed
                      </Badge>
                    )}
                  </td>
                  <td>
                    <Button
                      className={s.button}
                      variant="info"
                      size="sm"
                      onClick={() => this.modalOpen(visitor)}
                    >
                      Edit User
                    </Button>
                    <Button className={s.button} variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

class MyVerticallyCenteredModal extends Component {
  state = {
    first_name: '',
    last_name: '',
    waiver_signed: false,
    is_employee: false,
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {};

  handleSave = () => {};

  render() {
    const { visitor } = this.props;
    return (
      <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {visitor.first_name + ' ' + visitor.last_name + ' (' + visitor.visitor_id + ')'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>First Name</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              name="first_name"
              placeholder={visitor.first_name}
              value={this.state.first_name}
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Last Name</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              name="last_name"
              placeholder={visitor.last_name}
              value={this.state.last_name}
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Waiver</InputGroup.Text>
            </InputGroup.Prepend>
            <Button
              onClick={() => this.setState({ waiver_signed: !this.state.waiver_signed })}
              variant={this.state.waiver_signed ? 'primary' : 'danger'}
            >
              {this.state.waiver_signed ? 'Waiver Signed' : 'Waiver Not Signed'}
            </Button>
            <InputGroup.Prepend>
              <InputGroup.Text>Role</InputGroup.Text>
            </InputGroup.Prepend>
            <Button
              onClick={() => this.setState({ is_employee: !this.state.is_employee })}
              variant={this.state.is_employee ? 'primary' : 'success'}
            >
              {this.state.is_employee ? 'Employee' : 'Visitor'}
            </Button>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.props.onHide}>
            Save Changes
          </Button>
          <Button variant="white" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
