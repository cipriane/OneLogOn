import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

export default class AddModal extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        Nothing
      </Modal>
    );
  }
}
