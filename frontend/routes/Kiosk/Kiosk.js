import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './NoMatch.css';
import Layout from 'common/Layout/Layout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import Form from 'react-bootstrap/Form';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';

export default class NoMatch extends Component {
  render() {
    return (
      <Layout>
        <FullScreenLayout>
          <h1>Kiosk Page</h1>
          <div>Activating Kiosk mode will activate fullscreen mode and log you out.</div>
          <div>To escape Kiosk mode, press shift + ESC.</div>
        </FullScreenLayout>
      </Layout>
    );
  }
}
