import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import s from './DeleteConfirmationModal.css';

export default class DeleteConfirmationModal extends Component {
  static propTypes = {
    cancel: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Alert variant="danger" className={s.center}>
            Warning: delete is permanent.{'\n'}
            Deleting a reason will remove it from all statistics{'\n'}
            If you want to hide a reason, use Archive instead
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.cancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={this.props.confirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
