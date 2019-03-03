import React, { Component } from 'react';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import { Container } from 'react-bootstrap';
import WelcomeMessage from 'common/WelcomeMessage/WelcomeMessage';
import Profile from 'common/Profile/Profile';
import ReasonList from 'common/Reasons/ReasonList/ReasonList';
import s from './Settings.css';

export default class Settings extends Component {
  render() {
    return (
      <div>
        <SimpleHeader title="Settings" />

        <Container className={s.padding}>
          <WelcomeMessage />
        </Container>

        <Container className={s.padding}>
          <Profile />
        </Container>

        <Container className={s.padding}>
          <ReasonList />
        </Container>
      </div>
    );
  }
}
