import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import s from './Statistics.css';
import downloadCSV from 'utils/downloadCSV';
import jsonToCSV from 'utils/jsonToCSV';
import myFetch from 'utils/fetch';
import Calendar from './Calendar/Calendar';
import MyTable from './MyTable/MyTable';
import formatDate from 'utils/formatDate';

const formatDateForAPI = date => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const countUniqueVisitors = visitors => {
  return new Set(visitors.map(visitor => visitor.visitor_id)).size;
};

const calculateAverageDuration = visitors => {
  let count = 0;
  let minutes = 0;
  visitors.forEach(visitor => {
    if (!visitor.check_out || !visitor.check_in) {
      return 'continue';
    }
    count += 1;
    let visitTime = new Date(visitor.check_out) - new Date(visitor.check_in);
    minutes += visitTime / (60 * 1000);
  });
  if (count === 0) {
    return 0;
  }
  return Math.round(minutes / count);
};

export default class Statistics extends Component {
  state = {
    visitors: [],
    selectedDate: new Date(),
    isLoading: false,
    error: null,
  };

  setDate = async date => {
    const visitors = await this.getVisitors(date);
    this.setState({
      selectedDate: date,
      visitors,
    });
  };

  componentDidMount = async () => {
    const visitors = await this.getVisitors();
    this.setState({
      visitors,
    });
  };

  getVisitors = async () => {
    try {
      this.setState({ isLoading: true, error: null });
      const selectedDate = this.state.selectedDate;
      const nextDate = new Date(selectedDate);
      nextDate.setDate(selectedDate.getDate() + 1);
      const visitor_data = await myFetch(
        `/api/checkins?start_time=${formatDateForAPI(selectedDate)}&end_time=${formatDateForAPI(
          nextDate,
        )}`,
      );
      this.setState({
        isLoading: false,
      });
      return visitor_data;
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  };

  getReport = async () => {
    const visitor_data = await myFetch(
      `/api/checkins?start_time=${this.state.start_time}&end_time=${this.state.end_time}`,
    );

    const data = visitor_data.map(row => ({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
    }));

    const csvData = jsonToCSV(data);
    downloadCSV(csvData);
  };

  render() {
    const { selectedDate } = this.state;
    let statistics;
    if (this.state.isLoading) {
      statistics = <div className={s.largeMessage}>Loading...</div>;
    } else if (this.state.visitors.length) {
      statistics = (
        <React.Fragment>
          <div className={s.statisticContainer}>
            <div className={s.statistic}>
              <div className={s.description}>Unique Visitors</div>
              <div className={s.number}>{countUniqueVisitors(this.state.visitors)}</div>
            </div>
            <div className={s.statistic}>
              <div className={s.description}>Total Visits</div>
              <div className={s.number}>{this.state.visitors.length}</div>
            </div>
            <div className={s.statistic}>
              <div className={s.description}>Avg Duration</div>
              <div className={s.number}>
                {calculateAverageDuration(this.state.visitors)} minutes
              </div>
            </div>
          </div>
          <MyTable visitors={this.state.visitors} />
        </React.Fragment>
      );
    } else {
      statistics = <div className={s.largeMessage}>No visitors on {formatDate(selectedDate)}.</div>;
    }
    return (
      <React.Fragment>
        <SimpleHeader title="Statistics" />
        <div className={s.root}>
          <div className={s.flex}>
            <Calendar setDate={this.setDate} date={this.state.selectedDate} />
            <Button className={s.right} variant="success" onClick={this.getReport}>
              Export
            </Button>
          </div>
          {statistics}
        </div>
      </React.Fragment>
    );
  }
}
