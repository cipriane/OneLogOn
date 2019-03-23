import React, { Component } from 'react';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import { Container } from 'react-bootstrap';
import WelcomeMessage from 'common/WelcomeMessage/WelcomeMessage';
import Profile from 'common/Profile/Profile';
import SettingsContainer from './SettingsContainer/SettingsContainer';
import ReasonListContainer from './ReasonListContainer/ReasonListContainer';
import s from './Settings.css';

export default class Settings extends Component {
  render() {
    return (
      <React.Fragment>
        <SimpleHeader title="Settings" />

        <SettingsContainer label={'Welcome Message'}>
          <WelcomeMessage />
        </SettingsContainer>

        <SettingsContainer label={'Update Password'}>
          <Profile />
        </SettingsContainer>

        <ReasonListContainer />
      </React.Fragment>
    );
  }
}
