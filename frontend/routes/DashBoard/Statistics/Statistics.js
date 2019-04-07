import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import s from './Statistics.css';
import ExportModal from './ExportModal/ExportModal';
import Calendar from 'common/Calendar/Calendar';
import MyTable from './MyTable/MyTable';
import fetchVisitors from './fetchVisitors';
import formatDate from 'utils/formatDate';

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
    showExportModal: false,
    isLoading: false,
    error: null,
  };

  componentDidMount = async () => {
    const visitors = await this.getVisitors(new Date());
    this.setState({
      visitors: visitors || [],
    });
  };

  setDate = async date => {
    const visitors = await this.getVisitors(date);
    this.setState({
      selectedDate: date,
      visitors: visitors || [],
    });
  };

  getVisitors = async date => {
    try {
      this.setState({ isLoading: true, error: null });
      let nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const visitor_data = await fetchVisitors(date, nextDate);
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

  showExportModal = () => {
    this.setState({
      showExportModal: true,
    });
  };

  hideExportModal = () => {
    this.setState({
      showExportModal: false,
    });
  };

  render() {
    const { selectedDate } = this.state;
    let statistics;
    if (this.state.error) {
      statistics = <div className={s.largeMessage}>{this.state.error}</div>;
    } else if (this.state.isLoading) {
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
            <Calendar setDate={this.setDate} date={this.state.selectedDate} showSideArrows />
            <Button className={s.right} onClick={this.showExportModal} variant="success">
              Export
            </Button>
            <ExportModal show={this.state.showExportModal} onHide={this.hideExportModal} />
          </div>
          {statistics}
        </div>
      </React.Fragment>
    );
  }
}
