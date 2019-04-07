import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import EditModal from './EditModal/EditModal';
import PropTypes from 'prop-types';
import s from './Timecard.css';

export default class Timecard extends Component {
  static propTypes = {
    employee: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
  };

  state = {
    showModal: false,
    error: false,
  };

  showModal = () => {
    this.setState({
      showModal: true,
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  updateEmployee = employee => {};

  handleClick = () => {
    this.setState({
      showModal: true,
    });
  };

  render() {
    let text = this.props.editMode ? 'Edit Timecard' : 'View Timecard';

    return (
      <div>
        <EditModal
          employee={this.props.employee}
          show={this.state.showModal}
          onHide={this.hideModal}
          updateEmployee={this.updateEmployee}
          editMode={this.props.editMode}
        />
        <Button size="sm" onClick={this.handleClick}>
          {text}
        </Button>
      </div>
    );
  }
}
