import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import s from './Calendar.css';

function formatDate(date) {
  if (!(date instanceof Date)) {
    return '';
  }
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let day = date.getDate();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export default class Calendar extends Component {
  state = {
    date: new Date(),
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
    this.setState(prevState => {
      let curDate = prevState.date;
      curDate.setDate(curDate.getDate() + 1);
      return { date: curDate };
    });
  };

  decreaseDate = () => {
    this.setState(prevState => {
      let curDate = prevState.date;
      curDate.setDate(curDate.getDate() - 1);
      return { date: curDate };
    });
  };

  setDate = date => {
    this.setState({
      date,
    });
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
          selectedDays={this.state.date}
          month={this.state.date}
          onDayClick={this.setDate}
        />
      </div>
    ) : null;
    return (
      <div className={s.flex}>
        <div
          className={[s.calendarSideButton, s.calendarButton].join(' ')}
          onClick={this.decreaseDate}
        >
          ‹
        </div>
        <div
          className={[s.calendarButton, s.calendarDate].join(' ')}
          onClick={this.toggleDisplayCalendar}
          ref={this.setDisplayCalendarRef}
        >
          {formatDate(this.state.date)}
        </div>
        {calendar}
        <div
          className={[s.calendarSideButton, s.calendarButton].join(' ')}
          onClick={this.increaseDate}
        >
          ›
        </div>
      </div>
    );
  }
}
