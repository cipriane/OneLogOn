import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListStudents from 'common/ListStudents/ListStudents'
import Layout from 'common/Layout/Layout';
import s from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <Layout>
        <div className={s.root}>
          <h1>Home Route</h1>
          <Link to='/ReduxExample'>Go To Redux Example</Link>
          <h1 className={s.apiHeader}>API Example</h1>
          <ListStudents />
        </div>
      </Layout>
    );
  }
}
