import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FancyButton from 'common/FancyButton/FancyButton';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import s from './FinishPage.css';

export default class FinishPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
    checkIn: PropTypes.func.isRequired,
    checkOut: PropTypes.func.isRequired,
    isCheckedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.number.isRequired,
    checkInTime: PropTypes.string.isRequired,
    checkOutTime: PropTypes.string.isRequired,
  };

  componentDidMount() {
    if (this.props.isCheckedIn) {
      this.props.checkOut();
    } else {
      this.props.checkIn();
    }
  }

  render() {
    const { isLoading, isCheckedIn, checkInTime, checkOutTime } = this.props;
    let headerText = '';
    if (isLoading) {
      headerText = 'Processing your check in...';
    } else if (isCheckedIn) {
      headerText = 'Thank you for checking in!';
    } else if (!isCheckedIn) {
      headerText = 'Thank you for signing out.';
    }
    let subHeader = '';
    if (isCheckedIn) {
      subHeader = 'Please remember to sign out';
    } else {
      const checkInLocalTime = new Date(checkInTime).toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      });
      const checkOutLocalTime = new Date(checkOutTime).toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      });
      subHeader = `You were here from ${checkInLocalTime} to ${checkOutLocalTime}`;
    }
    return (
      <React.Fragment>
        <FancyFormHeader />
        <h1 className={s.title}>{headerText}</h1>
        <div className={s.text}>{subHeader}</div>
        <FancyButton
          label="Finish"
          loading={this.props.isLoading}
          disabled={this.props.isLoading}
          onClick={this.props.next(null)}
        />
      </React.Fragment>
    );
  }
}
