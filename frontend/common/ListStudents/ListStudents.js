import React, { Component } from 'react';
import s from './ListStudents.css';

export default class ListStudents extends Component {
  state = {
    data: null,
    isLoading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const resp = await fetch('api/student');
      const data = await resp.json();
      this.setState({
        data,
        isLoading: false,
      });
    }
    catch (err) {
      console.error(err);
      return this.setState({
        isLoading: false,
        error: err,
      });
    }
  }

  render() {
    const {error, isLoading, data} = this.state;

    if (error) {
      return (
        <div>Error loading students.</div>
      );
    }
    else if (isLoading) {
      return (
        <div>Loading Students...</div>
      );
    }
    return (
      <React.Fragment>
        {data.map((student) =>
          <div key={student.id} className={s.row}>
            {student.name}
          </div>
        )}
      </React.Fragment>
    );
  }
}
