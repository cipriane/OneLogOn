import React, { Component } from 'react';
import myFetch from 'utils/fetch';
import s from './ListStudents.css';

export default class ListStudents extends Component {
  state = {
    data: null,
    isLoading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      const data = await myFetch('/api/student');

      this.setState({
        data,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.toString(),
      });
    }
  }

  render() {
    const { error, isLoading, data } = this.state;

    if (error) {
      return <div>Error loading students.</div>;
    } else if (isLoading) {
      return <div>Loading Students...</div>;
    }
    return (
      <React.Fragment>
        {data.map(student => (
          <div key={student.id} className={s.row}>
            {student.name}
          </div>
        ))}
      </React.Fragment>
    );
  }
}
