import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import s from './Calendar.css';
import formatDate from 'utils/formatDate';

export default class Calendar extends Component {
  static propTypes = {
    setDate: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    showSideArrows: PropTypes.bool,
  };

  state = {
    displayCalendar: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  setDisplayCalendarRef = node => {
    this.displayCalendarRef = node;
  };

  handleClickOutside = event => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.displayCalendarRef &&
      !this.displayCalendarRef.contains(event.target)
    ) {
      this.setState({
        displayCalendar: false,
      });
    }
  };

  increaseDate = () => {
    let newDate = this.props.date;
    newDate.setDate(newDate.getDate() + 1);
    this.props.setDate(newDate);
  };

  decreaseDate = () => {
    let newDate = this.props.date;
    newDate.setDate(newDate.getDate() - 1);
    this.props.setDate(newDate);
  };

  toggleDisplayCalendar = () => {
    this.setState(prevState => ({
      displayCalendar: !prevState.displayCalendar,
    }));
  };

  render() {
    let calendar = this.state.displayCalendar ? (
      <div className={s.calendar} ref={this.setWrapperRef}>
        <DayPicker
          selectedDays={this.props.date}
          month={this.props.date}
          onDayClick={this.props.setDate}
        />
      </div>
    ) : null;
    return (
      <React.Fragment>
        {this.props.showSideArrows && (
          <div
            className={[s.calendarSideButton, s.calendarButton].join(' ')}
            onClick={this.decreaseDate}
          >
            ‹
          </div>
        )}
        <div
          className={[s.calendarButton, s.calendarDate].join(' ')}
          onClick={this.toggleDisplayCalendar}
          ref={this.setDisplayCalendarRef}
        >
          {formatDate(this.props.date)}
        </div>
        {calendar}
        {this.props.showSideArrows && (
          <div
            className={[s.calendarSideButton, s.calendarButton].join(' ')}
            onClick={this.increaseDate}
          >
            ›
          </div>
        )}
      </React.Fragment>
    );
  }
}
